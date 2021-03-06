const { User } = require('../models/index')

/** Type Policies - based on DB permissions */

//TODO cuando mejore el sistema para diferentes usuarios, también se debería validar en otras instancias como expenses que solo pueda ver aquellas instancias propias del usuario, no las de otro. Las de otro para el admin
function create(req, res, next){
    if(User.hasAccess(req.roles_permissions, "create_type")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function read(req, res, next){
    if(User.hasAccess(req.roles_permissions, "read_type")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function update(req, res, next){
    if(User.hasAccess(req.roles_permissions, "update_type")){
        next()
    }
    else { res.status(401).json({msg: "Unauthorized access for this action."}) }
}

function deleteInstance(req, res, next){
    if(User.hasAccess(req.roles_permissions, "delete_type")){
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