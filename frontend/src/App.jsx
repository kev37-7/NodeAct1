import { useEffect, useState } from 'react';
import { obtenerTareas, agregarTarea, eliminarTarea } from './Services/api';
import TaskItem from './Components/TaskItem';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    const tareasDesdeBackend = await obtenerTareas();
    setTareas(tareasDesdeBackend);
  };

  const handleAgregar = async () => {
    if (titulo.trim() === '') return;
    const nueva = await agregarTarea({ titulo, completado: false });
    setTareas([...tareas, nueva]);
    setTitulo('');
  };

  const handleEliminar = async (id) => {
    await eliminarTarea(id);
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <h1>lista de tareas</h1>

      <div className="formulario">
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="escribe una tarea"
        />
        <button onClick={handleAgregar}>agregar</button>
      </div>

      <div className="lista-tareas">
        {tareas.length === 0 ? (
          <p className="sin-tareas">no hay tareas por ahora</p>
        ) : (
          tareas.map((tarea) => (
            <TaskItem
              key={tarea.id}
              tarea={tarea}
              onDelete={handleEliminar}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
