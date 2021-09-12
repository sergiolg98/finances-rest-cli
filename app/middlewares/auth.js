const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const { User, Role } = require('../models/index')

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
                        as: "roles"
                    }
                }).then( (user) => {
                    //console.log(user.roles) Voy a sacar al usuario con los roles que tiene para usar en politicas
                    req.user = user
                    next()
                })
            }
        })
    }

}