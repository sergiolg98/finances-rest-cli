'use strict'

const express = require('express')
const router = express.Router()

//Auth Middleware 
const auth = require('../middlewares/auth')



const roleController = require('../controllers/RoleController')
router.get('/', auth, roleController.getAll)
router.get('/search/:id', auth, roleController.getOne)
router.post('/', auth, roleController.create)
router.post('/permissions/:id', auth, roleController.addPermissions)
router.put('/:id', auth, roleController.update)
router.post('/permissions/:id', auth, roleController.updatePermissions)
router.delete('/:id', auth, roleController.deleteInstance)


module.exports = router