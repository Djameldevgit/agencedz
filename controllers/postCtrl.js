const mongoose = require('mongoose')
const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')
const Category = require('../models/Category')

// 🔧 Registry de los modelos Detail
const TravelDetail = require('../models/details/TravelDetail')
const HajjDetail   = require('../models/details/HajjDetail')
const VisaDetail   = require('../models/details/VisaDetail')
const RentalDetail = require('../models/details/RentalDetail')

const DETAIL_MAP = {
  travel: { model: TravelDetail, name: 'travelDetail' },
  hajj:   { model: HajjDetail,   name: 'hajjDetail'   },
  visa:   { model: VisaDetail,   name: 'visaDetail'   },
  rental: { model: RentalDetail, name: 'rentalDetail' },
}

// ============================================================
// 🔧 HELPERS
// ============================================================

// Aplana detailRef en el post → compatibilidad con el front viejo
function flattenPost(post) {
  if (!post) return post

  const { detailRef, ...rest } = post

  // Si no hay detail o no está populado, devolver tal cual
  if (!detailRef || typeof detailRef !== 'object' || Array.isArray(detailRef)) {
    return rest
  }

  // Quitar campos internos del detail antes de aplanar
  const { _id, post: _postRef, __v, createdAt: _c, updatedAt: _u, ...detailFields } = detailRef

  return {
    ...rest,
    detail: detailRef,
    ...detailFields,
  }
}

// Devuelve { category, detailType, model, name } desde un categoryId
async function getDetailConfig(categoryId) {
  if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
    const err = new Error('Catégorie invalide.')
    err.status = 400
    throw err
  }

  const category = await Category.findById(categoryId).lean()
  if (!category) {
    const err = new Error('Catégorie introuvable.')
    err.status = 400
    throw err
  }

  const config = DETAIL_MAP[category.detailType]
  if (!config) {
    const err = new Error(`Type de détail inconnu: ${category.detailType}`)
    err.status = 400
    throw err
  }

  return { category, detailType: category.detailType, ...config }
}

// Populate estándar reutilizable
function basePopulate(query) {
  return query
    .populate({ path: 'user', select: 'avatar username fullname followers', strictPopulate: false })
    .populate({ path: 'category', select: 'key label icon', strictPopulate: false })
    .populate({ path: 'detailRef', strictPopulate: false })
}

// Populate completo (con comments) para vista detallada
function fullPopulate(query) {
  return basePopulate(query)
    .populate({
      path: 'comments',
      populate: { path: 'user likes', select: '-password' },
      strictPopulate: false,
    })
}

// ============================================================
// 📦 APIfeatures
// ============================================================
class APIfeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }
  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 9
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

// ============================================================
// 🎮 CONTROLADOR
// ============================================================
const postCtrl = {

  // ===================== CREATE =====================
  createPost: async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const { postData, detailData, images } = req.body
  
      if (!images || images.length === 0) {
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ msg: 'Veuillez ajouter au moins une photo.' })
      }
      if (!postData) {
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ msg: 'Données du post manquantes.' })
      }
      if (!postData.category) {
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ msg: 'La catégorie est requise.' })
      }
      if (!postData.wilaya || !postData.commune) {
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ msg: 'La wilaya et la commune sont requises.' })
      }

      const { category, detailType, model: DetailModel, name: detailModel } =
        await getDetailConfig(postData.category)

      const [newPost] = await Posts.create([{
        ...postData,
        category: category._id,
        subCategory: postData.subCategory || category.key,
        images,
        user: req.user._id,
        detailType,
        detailModel,
        status: postData.status || 'published',
      }], { session })

      const [detail] = await DetailModel.create([{
        ...(detailData || {}),
        post: newPost._id,
      }], { session })

      newPost.detailRef = detail._id
      await newPost.save({ session })

      await session.commitTransaction()
      session.endSession()

      // Populate final
      const populated = await basePopulate(Posts.findById(newPost._id)).lean()
      const flat = flattenPost(populated)

      res.json({
        msg: 'Post créé avec succès!',
        newPost: flat,
      })
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      console.error('❌ Error createPost:', err.message)
      return res.status(err.status || 500).json({ msg: err.message })
    }
  },

  // ===================== UPDATE =====================
  updatePost: async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const { postData, detailData, images } = req.body
      if (!postData) {
        await session.abortTransaction()
        session.endSession()
        return res.status(400).json({ msg: 'Données de mise à jour manquantes.' })
      }

      const post = await Posts.findById(req.params.id).session(session)
      if (!post) {
        await session.abortTransaction()
        session.endSession()
        return res.status(404).json({ msg: 'Post non trouvé.' })
      }

      if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        await session.abortTransaction()
        session.endSession()
        return res.status(403).json({ msg: 'Non autorisé.' })
      }

      const baseFields = [
        'title', 'content', 'description', 'link', 'price', 'priceType', 'devise',
        'offerType', 'features', 'wilaya', 'commune', 'contact', 'status', 'subCategory',
      ]
      baseFields.forEach(k => {
        if (postData[k] !== undefined) post[k] = postData[k]
      })
      if (images && images.length > 0) post.images = images

      await post.save({ session })

      // Actualizar Detail si existe
      if (post.detailRef && post.detailModel && detailData) {
        try {
          const DetailModel = mongoose.model(post.detailModel)
          await DetailModel.findByIdAndUpdate(
            post.detailRef,
            { $set: detailData },
            { session, new: true, runValidators: false }
          )
        } catch (detailErr) {
          console.warn('⚠️ updatePost: no se pudo actualizar el detail:', detailErr.message)
        }
      }

      await session.commitTransaction()
      session.endSession()

      // Recargar
      const updated = await fullPopulate(Posts.findById(post._id)).lean()
      const flat = flattenPost(updated)

      res.json({
        msg: 'Post mis à jour avec succès!',
        newPost: flat,
      })
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      console.error('❌ Error updatePost:', err.message)
      return res.status(err.status || 500).json({ msg: err.message })
    }
  },

  // ===================== DELETE =====================
  deletePost: async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const postId = req.params.id
      const post = await Posts.findById(postId).session(session)
      if (!post) {
        await session.abortTransaction()
        session.endSession()
        return res.status(404).json({ msg: 'Post non trouvé.' })
      }

      if (post.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        await session.abortTransaction()
        session.endSession()
        return res.status(403).json({ msg: 'Non autorisé à supprimer ce post.' })
      }

      // 1. Borrar Detail
      if (post.detailRef && post.detailModel) {
        try {
          const DetailModel = mongoose.model(post.detailModel)
          await DetailModel.findByIdAndDelete(post.detailRef, { session })
        } catch (detailErr) {
          console.warn('⚠️ deletePost: no se pudo borrar detail:', detailErr.message)
        }
      }

      // 2. Borrar comments
      if (post.comments && post.comments.length > 0) {
        await Comments.deleteMany({ _id: { $in: post.comments } }, { session })
      }

      // 3. Limpiar likes y saved
      if (post.likes && post.likes.length > 0) {
        await Users.updateMany(
          { _id: { $in: post.likes } },
          { $pull: { likes: post._id } },
          { session }
        )
      }
      await Users.updateMany(
        { saved: post._id },
        { $pull: { saved: post._id } },
        { session }
      )

      // 4. Borrar post
      await Posts.findByIdAndDelete(post._id, { session })

      await session.commitTransaction()
      session.endSession()

      res.json({ msg: 'Post supprimé avec succès!', deletedPostId: postId })
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      console.error('❌ Error deletePost:', err.message)
      return res.status(err.status || 500).json({ msg: err.message })
    }
  },

  // ===================== GET LIST =====================
  getPosts: async (req, res) => {
    try {
      const { title, category, subCategory, detailType, wilaya } = req.query
      const query = { status: 'published' }

      if (title && title.trim()) query.title = { $regex: title.trim(), $options: 'i' }
      if (category && mongoose.Types.ObjectId.isValid(category)) query.category = category
      if (subCategory && subCategory.trim()) query.subCategory = { $regex: subCategory.trim(), $options: 'i' }
      if (detailType && detailType.trim()) query.detailType = detailType
      if (wilaya && wilaya.trim()) query.wilaya = { $regex: wilaya.trim(), $options: 'i' }

      const features = new APIfeatures(
        basePopulate(Posts.find(query)).lean(),
        req.query
      ).paginating()

      const posts = await features.query.sort('-createdAt')

      res.json({
        msg: 'Success!',
        result: posts.length,
        posts: posts.map(flattenPost),
      })
    } catch (err) {
      console.error('❌ Error getPosts:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  // ===================== GET ONE =====================
  getPost: async (req, res) => {
    try {
      const post = await fullPopulate(Posts.findById(req.params.id))
      if (!post) return res.status(404).json({ msg: 'Post non trouvé.' })

      res.json({ post: flattenPost(post.toObject()) })
    } catch (err) {
      console.error('❌ Error getPost:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  // ===================== VIEW =====================
  viewPost: async (req, res) => {
    try {
      const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID invalide' })
      }

      const post = await fullPopulate(
        Posts.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
      )
      if (!post) return res.status(404).json({ msg: 'Post non trouvé.' })

      res.json({ post: flattenPost(post.toObject()) })
    } catch (err) {
      console.error('❌ Error viewPost:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  // ===================== LIKE / UNLIKE =====================
  likePost: async (req, res) => {
    try {
      const exists = await Posts.findOne({ _id: req.params.id, likes: req.user._id })
      if (exists) return res.status(400).json({ msg: 'Vous avez déjà aimé ce post.' })

      const like = await Posts.findByIdAndUpdate(
        req.params.id,
        { $push: { likes: req.user._id } },
        { new: true }
      )
      if (!like) return res.status(404).json({ msg: 'Post inexistant.' })

      res.json({ msg: 'Post aimé!' })
    } catch (err) {
      console.error('❌ Error likePost:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  unLikePost: async (req, res) => {
    try {
      const like = await Posts.findByIdAndUpdate(
        req.params.id,
        { $pull: { likes: req.user._id } },
        { new: true }
      )
      if (!like) return res.status(404).json({ msg: 'Post inexistant.' })

      res.json({ msg: "Mention J'aime retirée!" })
    } catch (err) {
      console.error('❌ Error unLikePost:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  // ===================== SAVE / UNSAVE =====================
  savePost: async (req, res) => {
    try {
      const exists = await Users.findOne({ _id: req.user._id, saved: req.params.id })
      if (exists) return res.status(400).json({ msg: 'Vous avez déjà sauvegardé ce post.' })

      const save = await Users.findByIdAndUpdate(
        req.user._id,
        { $push: { saved: req.params.id } },
        { new: true }
      )
      if (!save) return res.status(404).json({ msg: 'Utilisateur inexistant.' })

      res.json({ msg: 'Post sauvegardé!' })
    } catch (err) {
      console.error('❌ Error savePost:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  unSavePost: async (req, res) => {
    try {
      const save = await Users.findByIdAndUpdate(
        req.user._id,
        { $pull: { saved: req.params.id } },
        { new: true }
      )
      if (!save) return res.status(404).json({ msg: 'Utilisateur inexistant.' })

      res.json({ msg: 'Post retiré des favoris!' })
    } catch (err) {
      console.error('❌ Error unSavePost:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  // ===================== SAVED POSTS =====================
  getSavePosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        basePopulate(
          Posts.find({ _id: { $in: req.user.saved } })
        ).lean(),
        req.query
      ).paginating()

      const savePosts = await features.query.sort('-createdAt')

      res.json({
        savePosts: savePosts.map(flattenPost),
        result: savePosts.length,
      })
    } catch (err) {
      console.error('❌ Error getSavePosts:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  // ===================== USER POSTS =====================
  getUserPosts: async (req, res) => {
    try {
      const features = new APIfeatures(
        basePopulate(
          Posts.find({ user: req.params.id })
        ).lean(),
        req.query
      ).paginating()

      const posts = await features.query.sort('-createdAt')

      res.json({
        posts: posts.map(flattenPost),
        result: posts.length,
      })
    } catch (err) {
      console.error('❌ Error getUserPosts:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },

  // ===================== DISCOVER =====================
  getPostsDicover: async (req, res) => {
    try {
      const newArr = [...req.user.following, req.user._id]
      const num = req.query.num || 9

      const posts = await Posts.aggregate([
        { $match: { user: { $nin: newArr }, status: 'published' } },
        { $sample: { size: Number(num) } },
      ])

      return res.json({ msg: 'Success!', result: posts.length, posts })
    } catch (err) {
      console.error('❌ Error getPostsDicover:', err.message)
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = postCtrl