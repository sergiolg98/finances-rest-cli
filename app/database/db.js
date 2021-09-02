const { Sequelize, DataTypes } = require('sequelize')
const config = require('../../config/database')
const db = {}

db.connection = new Sequelize(config.database, config.username, config.password, config)

//Vincular a los modelos con la BD (es necesario porque les cambiamos de nombre)
db.Type = require('../models/Type')(db.connection, DataTypes)
db.Category = require('../models/Category')(db.connection, DataTypes)

//Asociar los modelos
db.Type.associate(db);
db.Category.associate(db);

module.exports = db