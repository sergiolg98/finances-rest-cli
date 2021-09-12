const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

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
                req.user = decoded //Lo guardo en una variable user, al obtener el payload que mando, es el usuario ya decodificado
                next()
            }
        })
    }

}