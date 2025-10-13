import React, { useState } from 'react'; // Importa useState
import './TodoItem.css';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar si se edita
  const [editText, setEditText] = useState(todo.text); // Estado para el texto del input de edición

  const handleEdit = () => {
    setIsEditing(true); // Cambia a modo edición
  };

  const handleSave = () => {
    if (editText.trim() === '') {
      alert('La tarea no puede estar vacía.');
      return;
    }
    editTodo(todo.id, editText); // Llama a la función de App.jsx para actualizar
    setIsEditing(false); // Sale del modo edición
  };

  const handleCancel = () => {
    setEditText(todo.text); // Restaura el texto original
    setIsEditing(false); // Sale del modo edición
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        disabled={isEditing} // Deshabilita el checkbox mientras se edita
      />

      {isEditing ? (
        // Si está en modo edición, muestra un input
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown} // Guardar con Enter o cancelar con Escape
          className="edit-input" // Añade esta clase para estilos
          autoFocus // Enfoca el input automáticamente
        />
      ) : (
        // Si no está en modo edición, muestra el texto
        <span onDoubleClick={handleEdit}>{todo.text}</span> // Doble click para editar
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-button">Guardar</button>
            <button onClick={handleCancel} className="cancel-button">Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="edit-button">Editar</button>
            <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;