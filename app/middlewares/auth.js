const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const { User, Role, Permission } = require('../models/index')

module.exports = (req, res, next) =>{

    //Comprobar que nos mandan el token por headers
    if(!req.headers.authorization){
        res.status(401).json({msg: "Acceso no autorizado."})
    } else {

        //Comprobar la validez del token
        let token = req.headers.authorization.split(" ")[1]

        jwt.verify(token, authConfig.secret, (err, decoded) =>{
            if(err) {
                res.status(500).json({msg: "Ha ocurrido un problema al decodificar el token.", err})
            } else {
                
                //Token verificado, en el decoded nos devuelve el payload decodificado y al mandar el usuario, de ahi me saco su id
                User.findByPk(decoded.user.id, {
                    include: { 
                        model: Role, 
                        as: "role" 
                    }
                }).then( (user) => {
                    
                    //Le mando el usuario a la siguiente funcion (policy) si tiene que hacer algo
                    req.user = user
                    
                    Role.findByPk(user.role_id, {
                        include: {
                            model: Permission,
                            as: "permissions",
                            attributes: ['name']
                        }
                    }).then( (roles_permissions)=>{
                        //Le mando los permisos a la policy en el req
                        req.roles_permissions = roles_permissions.permissions
                        next()

                    }).catch( (err) =>{
                        res.status(500).json(err)
                    })
                    
                    //El metodo que sigue en next() ahora tiene acceso al req.user con toda la información del user y sus permisos incluido
                })
            }
        })
    }

}