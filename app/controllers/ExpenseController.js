'use strict'

/** Expense Controller */

const moment = require('moment')
const {Expense, Card, Category, Month, Year} = require('../models/index')


function getAll(req, res){
    //Aun no, para que traer todos los gastos?
    //By the time I realize how, I will, this is not restrictive
}


//Middleware para saber a que card pertenece expense y ahi se lo mando por el req para que compruebe
//el user_id del card contra el id del usuario que esta haciendo la peticion (este lo saco por el token)
function findCard(req, res, next){
    Expense.findByPk(req.params.id).then(( expense ) => {
        if(expense !== null){

            Card.findByPk(expense.card_id).then((card) => {

                if(card !== null){
                    req.expense = expense
                    req.card = card
                    next()
                }
                else { res.status(404).json({msg: "Expense not associated with a valid card."}) }

                
            }).catch(err => res.status(500).json(err))

        }
        else{
            res.status(404).json({msg: "Expense not found."})
        }
    }).catch(err => res.status(500).json(err))
}

//Solo envia lo que ya tiene del anterior
function getOne(req, res){
    res.status(200).json(req.expense)
}



function create(req, res){

    let month_array = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    Category.findByPk(req.body.category_id).then((category)=>{
        if(category !== null) {
            console.log('pase cat')
            Card.findByPk(req.body.card_id).then((card)=>{
                console.log('pase CARD')
                if(card !== null){

                    let date = moment(req.body.date,'DD-MM-YYYY').format('MM-DD-YYYY');
                    Expense.create({
                        name: req.body.name,
                        description: req.body.description,
                        date: date,
                        amount: req.body.amount
                    }).then( (expense ) => {
                        console.log('entro luego de expense')
                        expense.setCategory(category).then( (exp_cat) => {
                            console.log('seteo categoria')
                            
                            exp_cat.setCard(card).then((exp_cat_card)=>{
                                console.log('seteo card')

                                Year.findOne({ where: { name: req.body.year } }).then((year) => {
                                    console.log('ENCUENTRO AÑO: ', year)
                                    Month.findOne({
                                        where: { 
                                            name: month_array[req.body.month],
                                            year_id: year.id
                                        }
                                    }).then((month_gotten) => {
                                        console.log('ENCONTRE MES: ', month_gotten)
                                        exp_cat_card.setMonth(month_gotten).then((completed) => {
                                            res.status(200).json({
                                                msg: "Expense created",
                                                expense: completed
                                            })
                                        })
                                    }).catch( (err) =>{ res.status(500).json(err) })


                                }).catch((err)=> res.status(500).json({msg: 'No se encontró el año', err: err}))

                                


                            }).catch( (err) =>{ res.status(500).json(err) })

                        }).catch( (err) =>{ res.status(500).json(err) })
                    })


                }
                else{ res.status(404).json({msg: "Card no reconocida."}) }

            }).catch( (err) =>{ res.status(500).json(err) })
        }
        else{ res.status(404).json({msg: "Categoría no reconocida."}) }

    }).catch( (err) =>{ res.status(500).json(err) })        
}

/** 
 * TIENES QUE MODIFICARLO COMO EL CREATE
*/
function update(req, res){

    let month_array = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    Expense.findByPk(req.params.id).then((expense)=>{
        if(expense !== null){
            let date = moment(req.body.date,'DD-MM-YYYY').format('MM-DD-YYYY');
            Expense.update({
                name: req.body.name,
                description: req.body.description,
                date: date,
                amount: req.body.amount
            }, {
                where: {id: req.params.id}
            }).then((result)=>{
                
                Category.findByPk(req.body.category_id).then((category) => {
                    
                    if(category !== null) { 
                        expense.setCategory(category).then( (exp_cat) => {
                            
                            Card.findByPk(req.body.card_id).then((card)=>{
                                if(card !== null){
                                    exp_cat.setCard(card).then((exp_cat_card)=>{
                                    
                                        Year.findOne({ where: { name: req.body.year } }).then((year) => {
                                            console.log('ENCUENTRO AÑO: ', year)
                                            Month.findOne({
                                                where: { 
                                                    name: month_array[req.body.month],
                                                    year_id: year.id
                                                }
                                            }).then((month_gotten) => {
                                                console.log('ENCONTRE MES: ', month_gotten)
                                                exp_cat_card.setMonth(month_gotten).then((completed) => {
                                                    res.status(200).json({
                                                        msg: "Expense updated",
                                                        expense: completed
                                                    })
                                                })
                                            }).catch( (err) =>{ res.status(500).json(err) })
        
        
                                        }).catch((err)=> res.status(500).json({msg: 'No se encontró el año', err: err}))


                                    }).catch( (err) =>{ res.status(500).json(err) })


                                } else{ res.status(404).json({msg: "Card no reconocida."}) } 

                            }).catch( (err) =>{ res.status(500).json(err) })

                        })     
                    } else{  res.status(404).json({msg: "Categoría no reconocida."}) }
                })
            }).catch( (err) =>{ res.status(500).json(err) });
        } else { res.status(404).json({msg: "expense_id not recognized."}) }
    }).catch( (err) =>{ res.status(500).json(err) });
}


function deleteInstance(req, res){
    Expense.destroy({
        where: {id: req.params.id}
    }).then( (result)=>{
        res.status(200).json({
            msg: `${result} rows affected.`
        })
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

module.exports = {
    getOne,
    findCard,
    create, 
    update,
    deleteInstance
}
