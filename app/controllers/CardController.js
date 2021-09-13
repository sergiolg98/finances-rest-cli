'use strict'

/** Card Controller */
const {Card, Expense} = require('../models/index')


function getAll(req, res){
    Card.findAll({
        where: {user_id: req.user.id}
    }).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

//Middleware para cuidar la info que solo sea del usuario
function findCardInfo(req, res, next){
    Card.findByPk(req.params.id).then( (card)=>{

        if(card !== null){
            //Se lo pongo en el req para que la policy evalúe si es del usuario
            req.card = card
            next()
        }
        else{
            res.status(404).json({msg: "Card no encontrado."})
        }
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getOne(req, res){
    //Ya viene el req con el card desde los middlewares
    res.status(200).json(req.card)
}

//Traer los gastos de 01 tarjeta
function getExpensesLinked(req, res){

    req.card.getExpenses({
        attributes: ['name', 'description', 'date']
    }).then((result) => {
        res.status(200).json(result)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

//Traer todas las tarjetas con sus gastos incluidos
function getAllWithExpenses(req, res){
    Card.findAll({
        include: {
            model: Expense,
            as: 'expenses',
            attributes: ['name', 'description', 'date']
        },
        where: {
            user_id: req.user.id
        }
    }).then((months)=>{
        res.status(200).json(months)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}


function create(req, res){
    Card.create({
        bank: req.body.bank,
        currency: req.body.currency,
        currency_symbol: req.body.currency_symbol,
        processor: req.body.processor
    }).then( (card) => {
        card.setUser(req.user.id).then((created) => {
            res.status(200).json(created)
        }).catch( (err) =>{ res.status(500).json(err) })

    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

//No se puede actualizar de dueño obviamente
function update(req, res){
    Card.update({
        bank: req.body.bank,
        currency: req.body.currency,
        currency_symbol: req.body.currency_symbol,
        processor: req.body.processor
    }, {
        where: {id: req.params.id}
    }).then((result)=>{
        res.status(200).json(result)
    }).catch( (err) =>{
        res.status(500).json(err)
    });
}


function deleteInstance(req, res){

    Expense.findAndCountAll({
        where: {card_id: req.params.id}
    }).then((result) => {
        if(parseInt(result.count) > 0){
            res.status(406).json({
                msg: `${result.count} Expenses belongs to this Card. Can't be destroyed.`
            })
        }
        else {
            Card.destroy({
                where: {id: req.params.id}
            }).then( (result)=>{
                res.status(200).json({
                    msg: `${result} rows affected.`
                })
            }).catch( (err) =>{
                res.status(500).json(err)
            })
        }
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

module.exports = {
    getAll,
    findCardInfo, //Middleware
    getOne,
    getAllWithExpenses,
    getExpensesLinked,
    create, 
    update,
    deleteInstance
}
