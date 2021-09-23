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

//Esas creaciones son asíncronas, puede no haber terminado el método y mandarme que todo se hizo bien, corregir.
function createWithFullMonths(req, res){
    Year.create({
        name: req.body.name,
        description: req.body.description,
        color: req.body.color
    }).then( (year) => {

        Month.create({name: 'Enero'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "ene", msg: "Error al crear el mes Enero."})})
        Month.create({name: 'Febrero'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "feb", msg: "Error al crear el mes Febrero."})})
        Month.create({name: 'Marzo'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "mar", msg: "Error al crear el mes Marzo."})})
        Month.create({name: 'Abril'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "abr", msg: "Error al crear el mes Abril."})})
        Month.create({name: 'Mayo'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "may", msg: "Error al crear el mes Mayo."})})
        Month.create({name: 'Junio'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "jun", msg: "Error al crear el mes Junio."})})
        Month.create({name: 'Julio'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "jul", msg: "Error al crear el mes Julio."})})
        Month.create({name: 'Agosto'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "ago", msg: "Error al crear el mes Agosto."})})
        Month.create({name: 'Septiembre'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "sep", msg: "Error al crear el mes Septiembre."})})
        Month.create({name: 'Octubre'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "oct", msg: "Error al crear el mes Octubre."})})
        Month.create({name: 'Noviembre'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "nov", msg: "Error al crear el mes Noviembre."})})
        Month.create({name: 'Diciembre'}).then((month_created) => { month_created.setYear(year) }).catch(err => { res.status(500).json({value: "dic", msg: "Error al crear el mes Diciembre."})})


        res.status(200).json({
            msg: 'Creación de año y meses correctamente',
            year: year
        })
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
            res.status(409).json({
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
    createWithFullMonths,
    update,
    deleteInstance
}
