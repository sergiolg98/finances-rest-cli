'use strict'

const express = require('express')
const router = express.Router()

const categoryController = require('../controllers/CategoryController')
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.get('/:id/type', categoryController.getType) //mixin, para saber de que tipo es una categoría en caso se necesitara.
router.post('/', categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.deleteInstance)


module.exports = router