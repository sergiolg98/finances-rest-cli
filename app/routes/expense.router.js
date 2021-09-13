'use strict'

const express = require('express')
const router = express.Router()

//Auth Middleware 
const auth = require('../middlewares/auth')

//Policy
const policy = require('../policies/expense.policies')


const expenseController = require('../controllers/ExpenseController')

router.get('/look/:id', auth, expenseController.findCard, policy.read_one, expenseController.getOne)
router.post('/', auth, policy.create, expenseController.create)
router.put('/:id', auth, expenseController.findCard, policy.update, expenseController.update)
router.delete('/:id', auth, expenseController.findCard, policy.deleteInstance, expenseController.deleteInstance)


module.exports = router