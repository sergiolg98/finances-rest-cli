'use strict'

/** Type Controller */
const {Type, Category} = require('../models/index')


function getAll(req, res){
    Type.findAll().then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getOne(req, res){
    Type.findByPk(req.params.id).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getCategoriesLinked(req, res){
    Type.findByPk(req.params.id).then((type)=>{
        type.getCategories({
            attributes: ['name']
        }).then((result) => {
            res.status(200).json(result)
        }).catch((err)=>{
            res.status(500).json(err)
        })
    }).catch(err => res.status(500).json(err))
}

function getAllWithCategories(req, res){
    Type.findAll({
        include: {
            model: Category,
            as: 'categories',
            attributes: ['name']
        }
    }).then((types)=>{
        res.status(200).json(types)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}


function create(req, res){
    Type.create({
        name: req.body.name
    }).then( (type) => {
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function update(req, res){
    Type.update({
        name: req.body.name //CAMPOS A ACTUALIZAR
    }, {
        where: {id: req.params.id} //CONSULTA WHERE
    }).then((result)=>{
        res.status(200).json(result)
    }).catch( (err) =>{
        res.status(500).json(err)
    });
}

//Busco primero si una categoría lo tiene
function deleteInstance(req, res){

    Category.findAndCountAll({
        where: {type_id: req.params.id}
    }).then((result) => {
        if(parseInt(result.count) > 0){
            res.status(406).json({
                msg: `${result.count} DB categories using this Type. Can't be destroyed.`
            })
        }
        else {
            Type.destroy({
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
    getOne,
    getAllWithCategories,
    getCategoriesLinked,
    create, 
    update,
    deleteInstance
}
