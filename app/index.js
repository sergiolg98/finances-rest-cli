'use strict'

const app = require('./app')
const {sequelize} = require('./models/index')

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`BACKEND running in localhost:${PORT}`)

    //sync()
    //Force: true, cualquier cambio en los modelos hace un DROP y luego genera las nuevas tablas en base a ello
    //force: false, alter: true => solo hace ALTER para sincronizar las tablas como los modelos indican. Si se deben borran campos con valores, habrá problemas.
    
    //authenticate()
    //Con authenticate() nos olvidamos de sincronizar los cambios, trabajmos con migraciones a partir de ahora.
    sequelize.authenticate().then( () => {
        console.log('DB Connection established')
    })
})

