'use strict'

const express = require('express')
const router = express.Router()

//Auth Middleware 
const auth = require('../middlewares/auth')

//Policy
const policy = require('../policies/type.policies')


const typeController = require('../controllers/TypeController')
router.get('/', auth,  policy.read, typeController.getAll)
router.get('/search/:id', auth,  policy.read, typeController.getOne)
router.get('/search/:id/categories', auth, policy.read,  typeController.getCategoriesLinked)
router.get('/full_categories', auth, policy.read, typeController.getAllWithCategories)
router.post('/', auth, policy.create, typeController.create)
router.put('/:id', auth, policy.update, typeController.update)
router.delete('/:id', auth, policy.deleteInstance, typeController.deleteInstance)


module.exports = router