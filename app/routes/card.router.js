'use strict'

const express = require('express')
const router = express.Router()

//Auth Middleware 
const auth = require('../middlewares/auth')

//Policy
const policy = require('../policies/card.policies')


const cardController = require('../controllers/CardController')

//Estas rutas tienen un middleware más, donde les trae el card y ahi compara si el user_id es igual al id del usuario que 
//viene de auth. Para garantizar que un usuario solo pueda ver lo suyo y de nadie mas
router.get('/look/:id', auth, cardController.findCardInfo, policy.read_one, cardController.getOne)
router.get('/look/:id/expenses', auth, cardController.findCardInfo, policy.read_one, cardController.getExpensesLinked)

//Estas rutas solo traen lo del usuario propio
router.get('/', auth,  policy.read, cardController.getAll)
router.get('/full_expenses', auth, policy.read, cardController.getAllWithExpenses)

//Esta no hay problema, auth y politica de permisos suficiente, ya al crear se le asigna al usuario propio
router.post('/', auth, policy.create, cardController.create)

//Estas rutas solo cuidan que un usuario haga cambios sobre lo suyo
router.put('/:id', auth, cardController.findCardInfo, policy.update, cardController.update)
router.delete('/:id', auth, cardController.findCardInfo, policy.deleteInstance, cardController.deleteInstance)


module.exports = router