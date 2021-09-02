'use strict'

const express = require('express')
const router = express.Router()

const typeController = require('../controllers/TypeController')
router.get('/', typeController.getAll)
router.get('/search/:id', typeController.getOne)
router.get('/search/:id/categories', typeController.getCategoriesLinked)
router.get('/full_categories', typeController.getAllWithCategories)
router.post('/', typeController.create)
router.put('/:id', typeController.update)
router.delete('/:id', typeController.deleteInstance)


module.exports = router