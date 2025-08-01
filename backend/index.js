// se importa el modulo express para crear el servidor
const express = require('express')
// se importa el modulo fs para trabajar con archivos del sistema
const fs = require('fs')
// se importa el modulo cors para permitir peticiones desde el frontend
const cors = require('cors')  

// se crea una instancia de la aplicacion express
const app = express()

// se habilita cors para aceptar conexiones desde otros puertos o dominios
app.use(cors())               
// se habilita el middleware para parsear el cuerpo de las peticiones en formato json
app.use(express.json())

// se define el puerto donde va a escuchar el servidor
const PORT = 3000

// ruta principal que muestra un mensaje simple al ingresar a la raiz
app.get('/', (req, res) => {
    res.send('bienvenido al backend de la to-do app')
})

// ruta get para obtener la lista de tareas guardadas en el archivo tareas.json
app.get('/tareas', (req, res) => {
    // se lee el contenido del archivo
    const data = fs.readFileSync('./tareas.json', 'utf8')
    // se convierte el contenido de texto a un array de objetos
    const tareas = JSON.parse(data)

    // se envia el array como respuesta en formato json
    res.json(tareas)
})

// ruta post para agregar una nueva tarea al archivo
app.post('/tareas', (req, res) => {
    // se obtiene el cuerpo de la peticion que contiene los datos de la nueva tarea
    const nuevaTarea = req.body
    // se lee el archivo actual para obtener las tareas existentes
    const data = fs.readFileSync('./tareas.json', 'utf8')
    const tareas = JSON.parse(data)

    // se asigna un id unico a la nueva tarea usando la hora actual
    nuevaTarea.id = Date.now()

    // se agrega la nueva tarea al array de tareas
    tareas.push(nuevaTarea)

    // se guarda el array actualizado de tareas en el archivo
    fs.writeFileSync('./tareas.json', JSON.stringify(tareas, null, 2))

    // se responde con la nueva tarea creada
    res.status(201).json(nuevaTarea)
})

// ruta delete para eliminar una tarea segun el id recibido en la url
app.delete('/tareas/:id', (req, res) => {
    // se convierte el parametro id a numero
    const id = parseInt(req.params.id)
    // se lee el archivo de tareas actual
    const data = fs.readFileSync('./tareas.json', 'utf8')
    let tareas = JSON.parse(data)

    // se filtran las tareas para quitar la que tiene el id igual al recibido
    tareas = tareas.filter(t => t.id !== id)

    // se guarda el array actualizado sin la tarea eliminada
    fs.writeFileSync('./tareas.json', JSON.stringify(tareas, null, 2))

    // se envia un mensaje confirmando que fue eliminada
    res.json({ mensaje: 'tarea eliminada' })
})

// se arranca el servidor y se muestra en consola la url donde esta corriendo
app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`)
})
