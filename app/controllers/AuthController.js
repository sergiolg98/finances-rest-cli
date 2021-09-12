'use strict'

/** Auth Controller */
const {User} = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const authConfig = require('../../config/auth')



function signIn(req, res){

    let email = req.body.email
    let password = req.body.password

    //Buscar usuario
    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if(user !== null){
            
            //Comparo el password que nos han pasado por el body y el password encriptado del user que viene de BD
            //Ya se encarga de hacer la encriptación del password del body por su cuenta
            if (bcrypt.compareSync(password, user.password)){
               
                //Devolver token
                let token = jwt.sign( {user:user}, authConfig.secret, {
                    expiresIn: authConfig.expires
                })
                res.status(200).json({
                    user: user,
                    token: token
                })
            
            } else {
                //Unauthorized Access
                res.status(401).json({msg: "Contraseña incorrecta."})
            }
        }
        else{
            res.status(404).json({ msg: "Usuario con este correo no encontrado." })
        }
        
    }).catch((err) => {
        res.status(500).json(err)
    })

}

function signUp(req, res){
    
    if(req.body.password.length < 6 ){
        res.status(500).json({
            msg: "La contraseña debe tener como mínimo 6 caracteres."
        })
    }
    else{
        //Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, parseInt(authConfig.rounds))
        
        //Crear un usuario
        User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: password,
            photo: req.body.photo
        }).then((user) => {

            //Crear el token - usuario ya registrado osea existente
            let token = jwt.sign({user: user}, authConfig.secret, {
                expiresIn: authConfig.expires
            })

            res.status(200).json({
                user: user,
                token: token
            })

        }).catch((err) => {
            res.status(500).json(err)
        })
    }
    

}

module.exports = {
    signIn,
    signUp
}
