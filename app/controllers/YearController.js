'use strict'

/** Year Controller */
const {Year, Month} = require('../models/index')


function getAll(req, res){
    Year.findAll().then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getOne(req, res){
    Year.findByPk(req.params.id).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getMonthsLinked(req, res){
    Year.findByPk(req.params.id).then((type)=>{
        type.getMonths({
            attributes: ['name']
        }).then((result) => {
            res.status(200).json(result)
        }).catch((err)=>{
            res.status(500).json(err)
        })
    }).catch(err => res.status(500).json(err))
}

function getAllWithMonths(req, res){
    Year.findAll({
        include: {
            model: Month,
            as: 'months',
            attributes: ['name']
        }
    }).then((months)=>{
        res.status(200).json(months)
    }).catch((err)=>{
        res.status(500).json(err)
    })
}


function create(req, res){
    Year.create({
        name: req.body.name,
        description: req.body.description,
        color: req.body.color
    }).then( (type) => {
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function update(req, res){
    Year.update({
        name: req.body.name,
        description: req.body.description,
        color: req.body.color
    }, {
        where: {id: req.params.id}
    }).then((result)=>{
        res.status(200).json(result)
    }).catch( (err) =>{
        res.status(500).json(err)
    });
}


function deleteInstance(req, res){

    Month.findAndCountAll({
        where: {year_id: req.params.id}
    }).then((result) => {
        if(parseInt(result.count) > 0){
            res.status(406).json({
                msg: `${result.count} Months belongs to this Year. Can't be destroyed.`
            })
        }
        else {
            Year.destroy({
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
    getAllWithMonths,
    getMonthsLinked,
    create, 
    update,
    deleteInstance
}
