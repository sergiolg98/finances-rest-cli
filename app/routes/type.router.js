'use strict'

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const typeController = require('../controllers/TypeController')
router.get('/', auth, typeController.getAll)
router.get('/search/:id', auth, typeController.getOne)
router.get('/search/:id/categories', auth, typeController.getCategoriesLinked)
router.get('/full_categories', auth, typeController.getAllWithCategories)
router.post('/', auth, typeController.create)
router.put('/:id', auth, typeController.update)
router.delete('/:id', auth, typeController.deleteInstance)


module.exports = router