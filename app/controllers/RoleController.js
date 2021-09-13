'use strict'

/** Role Controller */
const {Role, Permission, User} = require('../models/index')


function getAll(req, res){
    Role.findAll({
        include: {
            model: Permission,
            as: "permissions",
            attributes: ['name']
        }
    }).then( (roles)=>{
        res.status(200).json(roles)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getOne(req, res){
    Role.findByPk(req.params.id, {
        include: {
            model: Permission,
            as: "permissions",
            attributes: ['name']
        }
    }).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}


//Solo crear roles
function create(req, res){
    Role.create({
        name: req.body.name,
        color: req.body.color,
        description: req.body.description,
    }).then( (type) => {
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

//Funcion para añadirle permisos
function addPermissions(req, res){

}

//Funcion para actualizar el rol
function update(req, res){
    Role.update({
        name: req.body.name,
        color: req.body.color,
        description: req.body.description,
    }, {
        where: {id: req.params.id} //CONSULTA WHERE
    }).then((result)=>{
        res.status(200).json(result)
    }).catch( (err) =>{
        res.status(500).json(err)
    });
}

//Funcion para actualizar permisos del rol
function updatePermissions(){

}

//Busco primero si una categoría lo tiene
function deleteInstance(req, res){

    User.findAndCountAll({
        where: {role_id: req.params.id}
    }).then((result) => {
        if(parseInt(result.count) > 0){
            res.status(406).json({
                msg: `${result.count} Users using this Role. Can't be destroyed.`
            })
        }
        else {
            Role.destroy({
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
    create,
    addPermissions,
    update,
    updatePermissions,
    deleteInstance
}
