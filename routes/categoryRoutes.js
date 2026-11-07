const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl')
const auth = require('../middleware/auth')

router.get('/categories', categoryCtrl.getCategories)
router.post('/categories', auth, categoryCtrl.createCategory)
router.patch('/categories/:id', auth, categoryCtrl.updateCategory)
router.delete('/categories/:id', auth, categoryCtrl.deleteCategory)

module.exports = router