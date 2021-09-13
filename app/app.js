'use strict'

const express = require('express')
const app = express()

//Middleware
//Para poder llenar el req.body
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Routes
app.use('/api', require('./routes/auth.router'))
app.use('/api/type', require('./routes/type.router'))
app.use('/api/category', require('./routes/category.router'))
app.use('/api/role', require('./routes/role.router'))

//app.use('/api/year', require('./routes/year.router'))
//app.use('/api/month', require('./routes/month.router'))


module.exports = app