import { GLOBALTYPES } from './globalTypes'
import { imageUpload2 } from '../../utils/imageUpload2'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'
import { adaptPostFormData, getDetailTypeFromSubCategory } from '../../utils/adaptPostFormData'

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
  GET_POST: 'GET_POST',
  DELETE_POST: 'DELETE_POST',
  VIEW_POST: 'VIEW_POST',
  GET_CATEGORIES: 'GET_CATEGORIES',   // 🆕
}

// ============================================================
// 🆕 Cargar categorías del backend (para selects)
// ============================================================
export const getCategories = () => async (dispatch) => {
  try {
      console.log('🟢 getCategories INICIO');
      const res = await getDataAPI('categories');
      console.log('📥 Respuesta:', res.data);

      const categories = res.data?.categories || [];
      console.log('📊 Categorías:', categories.length);

      dispatch({
          type: POST_TYPES.GET_CATEGORIES,
          payload: categories,
      });
      console.log('✅ Dispatch ejecutado');
  } catch (err) {
      console.error('❌ getCategories ERROR:', err);
  }
};
// ============================================================
// VIEW
// ============================================================
export const viewPost = ({ id, auth }) => async (dispatch) => {
  try {
    const res = await postDataAPI(`post/${id}/view`, {}, auth.token)
    dispatch({
      type: POST_TYPES.VIEW_POST,
      payload: { postId: id, updatedPost: res.data.post },
    })
  } catch (err) {
    console.error('Error viewPost:', err.response?.data || err.message)
  }
}

// ============================================================
// CREATE  — usa adapter
// ============================================================
export const createPost = ({ postData, images, auth, socket, categoryId }) => async (dispatch) => {
  let media = []
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

    if (images.length > 0) media = await imageUpload2(images)

    // 🔑 Separar base vs detail con el adapter
    const { postData: base, detailData } = adaptPostFormData(postData, categoryId)

    const res = await postDataAPI('posts', {
      postData: { ...base, content: base.description || postData.content },
      detailData,
      images: media,
    }, auth.token)

    dispatch({
      type: POST_TYPES.CREATE_POST,
      payload: { ...res.data.newPost, user: auth.user },
    })

    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })

    const msg = {
      id: res.data.newPost._id,
      text: 'added a new post.',
      recipients: res.data.newPost.user.followers,
      url: `/post/${res.data.newPost._id}`,
      content: base.description,
      image: media[0]?.url,
    }
    dispatch(createNotify({ msg, auth, socket }))
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || err.message },
    })
  }
}

// ============================================================
// UPDATE — usa adapter
// ============================================================
export const updatePost = ({ postData, images, auth, status, categoryId }) => async (dispatch) => {
  let media = []
  const imgNewUrl = images.filter((img) => !img.url)
  const imgOldUrl = images.filter((img) => img.url)

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

    if (imgNewUrl.length > 0) media = await imageUpload2(imgNewUrl)

    const { postData: base, detailData } = adaptPostFormData(
      postData,
      categoryId || postData.category
    )

    const res = await patchDataAPI(`post/${status._id}`, {
      postData: { ...base, content: base.description || postData.content },
      detailData,
      images: [...imgOldUrl, ...media],
    }, auth.token)

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || 'Échec de la mise à jour' },
    })
  }
}

// ============================================================
// GET POSTS — ahora acepta filtros 🔑
// ============================================================
export const getPosts = (filters = {}) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true })

    // Construir query string desde filtros
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params.append(k, v)
    })
    const qs = params.toString()
    const url = `posts${qs ? `?${qs}` : ''}`

    const res = await getDataAPI(url)

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: 2 },
    })

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    return res.data.posts
  } catch (err) {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.data?.msg || err.message },
    })
  }
}

// ============================================================
// resto igual (like/unlike/save/getPost/deletePost)
// ============================================================
export const likePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: [...post.likes, auth.user] }
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
  socket.emit('likePost', newPost)
  try {
    await patchDataAPI(`post/${post._id}/like`, null, auth.token)
    const msg = {
      id: auth.user._id, text: 'like your post.',
      recipients: [post.user._id], url: `/post/${post._id}`,
      content: post.content, image: post.images?.[0]?.url,
    }
    dispatch(createNotify({ msg, auth, socket }))
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const unLikePost = ({ post, auth, socket }) => async (dispatch) => {
  const newPost = { ...post, likes: post.likes.filter((l) => l._id !== auth.user._id) }
  dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
  socket.emit('unLikePost', newPost)
  try {
    await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)
    const msg = {
      id: auth.user._id, text: 'like your post.',
      recipients: [post.user._id], url: `/post/${post._id}`,
    }
    dispatch(removeNotify({ msg, auth, socket }))
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const getPost = ({ detailPost, id }) => async (dispatch) => {
  if (detailPost.every((p) => p._id !== id)) {
    try {
      const res = await getDataAPI(`post/${id}`)
      dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
  }
}

export const deletePost = ({ post, auth, socket }) => async (dispatch) => {
  dispatch({ type: POST_TYPES.DELETE_POST, payload: post })
  try {
    await deleteDataAPI(`post/${post._id}`, auth.token)
    const msg = {
      id: post._id, text: 'added a new post.',
      recipients: post.user.followers, url: `/post/${post._id}`,
    }
    dispatch(removeNotify({ msg, auth, socket }))
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const savePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] }
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
  try {
    await patchDataAPI(`savePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}

export const unSavePost = ({ post, auth }) => async (dispatch) => {
  const newUser = { ...auth.user, saved: auth.user.saved.filter((id) => id !== post._id) }
  dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
  try {
    await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
  }
}