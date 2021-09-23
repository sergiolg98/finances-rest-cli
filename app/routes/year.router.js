'use strict'

const express = require('express')
const router = express.Router()

//Auth Middleware 
const auth = require('../middlewares/auth')

//Policy
const policy = require('../policies/year.policies')


const yearController = require('../controllers/YearController')
router.get('/', auth,  policy.read, yearController.getAll)
router.get('/search/:id', auth,  policy.read, yearController.getOne)
router.get('/search/:id/months', auth, policy.read,  yearController.getMonthsLinked)
router.get('/full_months', auth, policy.read, yearController.getAllWithMonths)
router.post('/', auth, policy.create, yearController.create)
router.post('/full_months', auth, policy.create, yearController.createWithFullMonths)
router.put('/:id', auth, policy.update, yearController.update)
router.delete('/:id', auth, policy.deleteInstance, yearController.deleteInstance)


module.exports = router