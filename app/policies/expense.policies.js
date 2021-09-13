const { User } = require('../models/index')

/** Expense Policies - based on DB permissions */


function create(req, res, next){
    if(User.hasAccess(req.roles_permissions, "create_expense")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}


// Adicionalmente para politicas de lectura, se debe considerar que solo puede leer los expenses de el mismo 
// Si fuera el admin, puede ver absolutamente todos (y como se mostraria en frontend... para pensar) - esta aun no


function read(req, res, next){
    if(User.hasAccess(req.roles_permissions, "read_expense")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function update(req, res, next){
    if(User.hasAccess(req.roles_permissions, "update_expense")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function deleteInstance(req, res, next){
    if(User.hasAccess(req.roles_permissions, "delete_expense")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}


module.exports = {
    create,
    read,
    update,
    deleteInstance
}