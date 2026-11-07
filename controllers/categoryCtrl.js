const Category = require('../models/Category')

const categoryCtrl = {
  // 🟢 GET /api/categories (público)
  getCategories: async (req, res) => {
    try {
      const { detailType, active } = req.query
      const query = {}

      if (detailType) query.detailType = detailType
      if (active !== undefined) query.active = active === 'true'
      else query.active = true

      const categories = await Category.find(query)
        .sort({ order: 1, key: 1 })
        .lean()

      res.json({ categories })
    } catch (err) {
      console.error('❌ Error getCategories:', err.message)
      res.status(500).json({ msg: err.message })
    }
  },

  // 🟢 GET /api/categories/:id
  getCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).lean()
      if (!category) return res.status(404).json({ msg: 'Catégorie introuvable.' })
      res.json({ category })
    } catch (err) {
      console.error('❌ Error getCategory:', err.message)
      res.status(500).json({ msg: err.message })
    }
  },

  // 🟡 POST /api/categories (admin)
  createCategory: async (req, res) => {
    try {
      const { key, label, detailType, icon, color, parent, order } = req.body

      if (!key || !label.fr || !detailType) {
        return res.status(400).json({
          msg: 'key, label.fr et detailType sont requis.',
        })
      }

      const exists = await Category.findOne({ key })
      if (exists) {
        return res.status(400).json({ msg: 'Cette catégorie existe déjà.' })
      }

      const category = await Category.create({
        key,
        label,
        detailType,
        icon,
        color,
        parent: parent || null,
        order: order || 0,
      })

      res.status(201).json({ msg: 'Catégorie créée!', category })
    } catch (err) {
      console.error('❌ Error createCategory:', err.message)
      res.status(500).json({ msg: err.message })
    }
  },

  // 🟡 PATCH /api/categories/:id (admin)
  updateCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!category) return res.status(404).json({ msg: 'Catégorie introuvable.' })
      res.json({ msg: 'Catégorie mise à jour!', category })
    } catch (err) {
      console.error('❌ Error updateCategory:', err.message)
      res.status(500).json({ msg: err.message })
    }
  },

  // 🔴 DELETE /api/categories/:id (admin) — soft delete
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { active: false },
        { new: true }
      )
      if (!category) return res.status(404).json({ msg: 'Catégorie introuvable.' })
      res.json({ msg: 'Catégorie désactivée.', category })
    } catch (err) {
      console.error('❌ Error deleteCategory:', err.message)
      res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = categoryCtrl