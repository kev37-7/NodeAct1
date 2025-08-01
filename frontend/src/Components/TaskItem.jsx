function TaskItem({ tarea, onDelete }) {
  return (
    <div>
      <span>{tarea.titulo}</span>
      <button onClick={() => onDelete(tarea.id)}>❌</button>
    </div>
  );
}

export default TaskItem;
