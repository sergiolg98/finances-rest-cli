'use strict'

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')

const categoryController = require('../controllers/CategoryController')
router.get('/', auth, categoryController.getAll)
router.get('/:id', auth, categoryController.getOne)
router.get('/:id/type', auth, categoryController.getType) //mixin, para saber de que tipo es una categoría en caso se necesitara.
router.post('/', auth, categoryController.create)
router.put('/:id', auth, categoryController.update)
router.delete('/:id', auth, categoryController.deleteInstance)


module.exports = router