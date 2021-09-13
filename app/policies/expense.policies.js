const { User } = require('../models/index')

/** Expense Policies - based on DB permissions */


function create(req, res, next){
    if(User.hasAccess(req.roles_permissions, "create_expense")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}


function read_one(req, res, next){
    if(User.hasAccess(req.roles_permissions, "read_expense") && (req.user.id === req.card.user_id) ){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

//Aun sin uso
function read(req, res, next){
    if(User.hasAccess(req.roles_permissions, "read_expense")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function update(req, res, next){
    if(User.hasAccess(req.roles_permissions, "update_expense") && (req.user.id === req.card.user_id)){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function deleteInstance(req, res, next){
    if(User.hasAccess(req.roles_permissions, "delete_expense") && (req.user.id === req.card.user_id)){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}


module.exports = {
    create,
    read,
    read_one,
    update,
    deleteInstance
}