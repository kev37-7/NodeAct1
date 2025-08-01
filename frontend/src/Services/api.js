// se define la url base para las peticiones al backend
const API_URL = 'http://localhost:3000/tareas'

// funcion que obtiene todas las tareas del backend
export async function obtenerTareas() {
  // hace una peticion get a la url
  const res = await fetch(API_URL)

  // convierte la respuesta en json
  const data = await res.json()

  // retorna el arreglo de tareas
  return data
}

// funcion que envia una nueva tarea al backend
export async function agregarTarea(tarea) {
  // hace una peticion post con la tarea en formato json
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  })

  // retorna la tarea creada con su id
  return await res.json()
}

// funcion que elimina una tarea segun su id
export async function eliminarTarea(id) {
  // hace una peticion delete a la url con el id de la tarea
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}
