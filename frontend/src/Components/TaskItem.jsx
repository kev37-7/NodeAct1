function TaskItem({ tarea, onDelete }) {
  return (
    <div style={{
      backgroundColor: '#3a3a3a',
      padding: '12px 15px',
      borderRadius: '6px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{tarea.titulo}</span>
      <button onClick={() => onDelete(tarea.id)} style={{
        backgroundColor: '#e53935',
        border: 'none',
        color: 'white',
        borderRadius: '4px',
        padding: '6px 10px',
        cursor: 'pointer'
      }}>
        eliminar
      </button>
    </div>
  );
}

export default TaskItem;
