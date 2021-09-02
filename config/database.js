require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "taf&$Qeb",
  database: process.env.DB_DATABASE || "finances_dev",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  define: {
    timestamps: false,

    //Para generar claves foraneas snake case: user_id en vez de userId
    underscored: true
  }
}