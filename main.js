import express from 'express'
import leerArchivo from './helpers.js'

const app = express()
const port = 8080;

//Inicio de servidor
const server = app.listen(port, () => {
    console.log(`${server.address().port}`)
})
server.on('error', error => console.log(error))

//Método get Items
let contadorItems = 0
app.get('/items', (req, respuesta, next) => {
    contadorItems++
    //Objecto vacio
    let objt = [{
        items: "",
        cantidad: ""
    }]

   leerArchivo().then(resp => {
        //Defino cantidad de productos
        let cantidad = Object.values(JSON.parse(resp)).length
        
        objt = [{
            items: JSON.parse(resp),
            cantidad: cantidad
        }]

        respuesta.json(objt)

    }).catch(e => next(e))
})

//Método item random
let contadorRandom = 0;
app.get('/item-random', (req, respuesta, next) => {
    contadorRandom++

    leerArchivo().then(resp => {
        const items = Object.entries(JSON.parse(resp))
        const randomItem = Math.floor(Math.random() * items.length)    

        respuesta.json(items[randomItem])
    
    }).catch(e => next(e))
    
})

//Método visitas
app.get('/visitas', (req, resp) => {
    const contadores = {
        visitas: {
            items: contadorItems,
            item: contadorRandom
        },
    }

    resp.json(contadores)
})
