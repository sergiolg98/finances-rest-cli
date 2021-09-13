const { User } = require('../models/index')

/** Category Policies - based on DB permissions */

function create(req, res, next){
    if(User.hasAccess(req.roles_permissions, "create_category")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function read(req, res, next){
    if(User.hasAccess(req.roles_permissions, "read_category")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function update(req, res, next){
    if(User.hasAccess(req.roles_permissions, "update_category")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function deleteInstance(req, res, next){
    if(User.hasAccess(req.roles_permissions, "delete_category")){
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