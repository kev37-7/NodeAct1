import { useEffect, useState } from 'react'
import { obtenerTareas, agregarTarea, eliminarTarea } from './Services/api'
import TaskItem from './Components/TaskItem'
import './App.css'


function App() {
  // se crea un estado para almacenar las tareas
  const [tareas, setTareas] = useState([])

  // se crea un estado para guardar lo que escribe el usuario en el input
  const [titulo, setTitulo] = useState('')

  // useEffect se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    cargarTareas()
  }, [])

  // esta funcion obtiene las tareas del backend y las guarda en el estado
  const cargarTareas = async () => {
    const tareasDesdeBackend = await obtenerTareas()
    setTareas(tareasDesdeBackend)
  }

  // esta funcion se llama cuando el usuario hace click en el boton agregar
  const handleAgregar = async () => {
    // si el input esta vacio, no hace nada
    if (titulo.trim() === '') return

    // se crea una nueva tarea y se envia al backend
    const nueva = await agregarTarea({ titulo, completado: false })

    // se actualiza el estado agregando la nueva tarea
    setTareas([...tareas, nueva])

    // se limpia el input
    setTitulo('')
  }

  // esta funcion elimina una tarea segun su id
  const handleEliminar = async (id) => {
    await eliminarTarea(id)

    // se actualiza el estado quitando la tarea eliminada
    setTareas(tareas.filter((t) => t.id !== id))
  }

  // el componente retorna el contenido visual
  return (
    <div className="App">
      <h1>📝 lista de tareas</h1>

      {/* input donde el usuario escribe el titulo de la tarea */}
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="escribe una tarea"
      />

      {/* boton para agregar la tarea */}
      <button onClick={handleAgregar}>agregar</button>

      {/* se recorren las tareas y se muestra un componente por cada una */}
      {tareas.map((tarea) => (
        <TaskItem key={tarea.id} tarea={tarea} onDelete={handleEliminar} />
      ))}
    </div>
  )
}

// se exporta el componente para poder usarlo en la app
export default App
