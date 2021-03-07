import express from 'express'
import FS from 'fs'

const app = express()
const port = 8080;
//Inicio de server
const server = app.listen(port, () => {
    console.log(`${server.address().port}`)
})
server.on('error', error => console.log(error))

//Método get Items
app.get('/items', (req, respuesta, next) => {
    //Objecto vacio
    let objt = [{
        items: "",
        cantidad: ""
    }]
    
    //Lectura del archivo productos
    const productos = FS.promises.readFile('./productos.txt', 'utf-8')
    productos.then(resp => {
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
app.get('/item-random', (req, resp) => {
    

    resp.send('Hola item random')
})

//Método visitas
app.get('/visitas', (req, resp) => {
    console.log('request recibido')

    resp.send('Hola visitas')
})
