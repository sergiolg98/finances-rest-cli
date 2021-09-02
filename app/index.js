'use strict'

const app = require('./app')
const {sequelize} = require('./models/index')

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`BACKEND running in localhost:${PORT}`)

    //Force: true, cualquier cambio en los modelos hace un DROP y luego genera las nuevas tablas en base a ello
    //force: false, alter: true => solo hace ALTER para sincronizar las tablas como los modelos indican. Si se deben borran campos con valores, habrá problemas.
    //Aún no estamos haciendo migraciones
    sequelize.sync({force: false, alter: true}).then( () => {
        console.log('DB Connection stablished')
    })
})

