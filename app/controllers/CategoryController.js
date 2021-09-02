'use strict'
/** Category Controller */
const {Type, Category} = require('../models/index')

function getAll(req, res){
    Category.findAll({
        include: {
            model: Type,
            as: "type",
            attributes: ['name']
        }
    }).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getOne(req, res){
    Category.findByPk(req.params.id).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

//Sequelize mixin usign AS name of the relationship
function getType(req, res){
    Category.findByPk(req.params.id).then( (category) => {
        category.getType({
            attributes: ['name'] 
        }).then(( type ) =>{
            res.status(200).json(type)
        }).catch( (err) => {
            res.status(500).json(err)
        })
    }).catch( err => res.status(500).json(err))
}

function create(req, res){

    Type.findByPk(req.body.type_id).then((type)=>{
        if(type !== null){
            Category.create({
                name: req.body.name, 
                description: req.body.description
            }).then((category) => {
                category.setType(type).then((created)=>{
                    res.status(200).json(created)
                }).catch(err => {
                    res.status(500).json(err)
                })
            }).catch((err) => {
                res.status(500).json(err)
            })
        }
        else{
            res.status(401).json({
                msg: 'type_id not recognized'
            })
        }
    }).catch((err) => {
        res.status(500).json(err)
    })
}

//Si intentas hacer un update y luego usar un mixin, no se puede porque el método update de sequelize no devuelve el objeto actualizado
//solo devuelve la cantidad de filas que se cambiaron, por eso lo modificamos directamente con el id
function update(req, res){
    Type.findByPk(req.body.type_id).then((type) => {
        if(type !== null){
            Category.update({
                name: req.body.name,
                description: req.body.description,
                type_id: req.body.type_id
            }, {
                where: {id: req.params.id}
            }).then((result)=>{
                res.status(200).json(result)
            }).catch( (err) =>{
                res.status(500).json(err)
            });
        }
        else{
            res.status(401).json({
                msg: 'type_id not recognized.'
            })
        }
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

function deleteInstance(req, res){
    Category.destroy({
        where: {id: req.params.id}
    }).then( (result)=>{
        res.status(200).json(result)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

module.exports = {
    getAll,
    getOne,
    getType,
    create, 
    update,
    deleteInstance
}
