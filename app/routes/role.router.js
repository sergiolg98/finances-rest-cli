'use strict'

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const policy = require('../policies/role.policies')

const roleController = require('../controllers/RoleController')
router.get('/', auth, policy.read, roleController.getAll)
router.get('/search/:id', auth, policy.read, roleController.getOne)
router.post('/', auth, policy.create, roleController.create)
router.post('/permissions/:id', auth, policy.create, roleController.addPermissions)
router.put('/:id', auth, policy.update, roleController.update)
router.post('/permissions/:id', auth, policy.update, roleController.updatePermissions)
router.delete('/:id', auth, policy.deleteInstance, roleController.deleteInstance)


module.exports = router