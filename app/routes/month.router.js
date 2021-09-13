'use strict'

const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const policy = require('../policies/month.policies')


const monthController = require('../controllers/MonthController')
router.get('/', auth, policy.read, monthController.getAll)
router.get('/:id', auth, policy.read, monthController.getOne)
router.get('/:id/year', auth, policy.read, monthController.getYear)
router.post('/', auth, policy.create, monthController.create)
router.put('/:id', auth, policy.update, monthController.update)
router.delete('/:id', auth, policy.deleteInstance, monthController.deleteInstance)


module.exports = router