'use strict'

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const policy = require('../policies/category.policies')


const categoryController = require('../controllers/CategoryController')
router.get('/', auth, policy.read, categoryController.getAll)
router.get('/:id', auth, policy.read, categoryController.getOne)
router.get('/:id/type', auth, policy.read, categoryController.getType) //mixin, para saber de que tipo es una categoría en caso se necesitara.
router.post('/', auth, policy.create, categoryController.create)
router.put('/:id', auth, policy.update, categoryController.update)
router.delete('/:id', auth, policy.deleteInstance, categoryController.deleteInstance)


module.exports = router