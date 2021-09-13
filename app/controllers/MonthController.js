'use strict'

/** Month Controller */

const {Month, Year} = require('../models/index')

function getAll(req, res){
    Month.findAll({
        include: {
            model: Year,
            as: "year",
            attributes: ['name']
        }
    }).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getOne(req, res){
    Month.findByPk(req.params.id).then( (type)=>{
        res.status(200).json(type)
    }).catch( (err) =>{
        res.status(500).json(err)
    })
}

function getYear(req, res){
    Month.findByPk(req.params.id).then( (category) => {
        category.getYear({
            attributes: ['name'] 
        }).then(( type ) =>{
            res.status(200).json(type)
        }).catch( (err) => {
            res.status(500).json(err)
        })
    }).catch( err => res.status(500).json(err))
}

function create(req, res){

    Year.findByPk(req.body.year_id).then((year)=>{
        if(year !== null){
            Month.create({
                name: req.body.name
            }).then((month) => {
                month.setYear(year).then((created)=>{
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
                msg: 'year_id not recognized'
            })
        }
    }).catch((err) => {
        res.status(500).json(err)
    })
}

function update(req, res){
    Year.findByPk(req.body.year_id).then((year) => {
        if(year !== null){
            Month.update({
                name: req.body.name
            }, {
                where: {id: req.params.id}
            }).then((result)=>{
                Month.findByPk(req.params.id).then((month) =>{
                    month.setYear(year).then((updated) =>{
                        res.status(200).json(updated)
                    }).catch(err => res.status(500).json(err))
                }).catch(err => res.status(500).json(err))

            }).catch( (err) =>{
                res.status(500).json(err)
            });
        }
        else{
            res.status(401).json({
                msg: 'year_id not recognized.'
            })
        }
    }).catch((err)=>{
        res.status(500).json(err)
    })
}

function deleteInstance(req, res){
    Month.destroy({
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
    getYear,
    create, 
    update,
    deleteInstance
}
