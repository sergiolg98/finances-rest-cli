'use strict'

/** Expense Controller */
const {Expense, Card, Category, Month } = require('../models/index')


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
    Expense.create({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        amount: req.body.amount
    }).then( (expense ) => {
        
        Category.findByPk(req.body.category_id).then((category) => {
            
            if(category !== null) { 
                expense.setCategory(category).then( (exp_cat) => {

                    Month.findByPk(req.body.month_id).then((month) => {
                        
                        if(month !== null){
                            exp_cat.setMonth(month).then((exp_cat_mont) => {
                                //Agregar el card y terminamos

                                Card.findByPk(req.body.card_id).then((card)=>{
                                    exp_cat_mont.setCard(card).then((complete)=>{

                                        if(card !== null){
                                            res.status(200).json({
                                                msg: "Expense created",
                                                expense: complete
                                            })
                                        } else{ res.status(404).json({msg: "Card no reconocida."}) } 
                                    })
                                }).catch( (err) =>{ res.status(500).json(err) })

                            }).catch( (err) =>{ res.status(500).json(err) })
                        } else { res.status(404).json({msg: "Mes no reconocido."})}
                    })

                }).catch( (err) =>{ res.status(500).json(err) })
            } else{  res.status(404).json({msg: "Categoría no reconocida."}) }
        })
    }).catch( (err) =>{ res.status(500).json(err) })
}

function update(req, res){

    Expense.findByPk(req.params.id).then((expense)=>{

        if(expense !== null){

            Expense.update({
                name: req.body.name,
                description: req.body.description,
                date: req.body.date,
                amount: req.body.amount
            }, {
                where: {id: req.params.id}
            }).then((result)=>{
        
                Category.findByPk(req.body.category_id).then((category) => {
                    
                    if(category !== null) { 
                        expense.setCategory(category).then( (exp_cat) => {
        
                            Month.findByPk(req.body.month_id).then((month) => {
                                
                                if(month !== null){
                                    exp_cat.setMonth(month).then((exp_cat_mont) => {
                                        //Agregar el card y terminamos
        
                                        Card.findByPk(req.body.card_id).then((card)=>{
                                            exp_cat_mont.setCard(card).then((complete)=>{
        
                                                if(card !== null){
                                                    res.status(200).json({
                                                        msg: "Expense created",
                                                        expense: complete
                                                    })
                                                } else{ res.status(404).json({msg: "Card no reconocida."}) } 
                                            })
                                        }).catch( (err) =>{ res.status(500).json(err) })
        
                                    }).catch( (err) =>{ res.status(500).json(err) })
                                } else { res.status(404).json({msg: "Mes no reconocido."})}
                            })
        
                        }).catch( (err) =>{ res.status(500).json(err) })
                    } else{  res.status(404).json({msg: "Categoría no reconocida."}) }
                })
        
            }).catch( (err) =>{
                res.status(500).json(err)
            });
        }
        else { res.status(404).json({msg: "expense_id not recognized."}) }
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
