import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  // --- NUEVO ESTADO: Para controlar la visibilidad del popover de confirmación ---
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() === '') {
      alert('La tarea no puede estar vacía.');
      return;
    }
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // --- NUEVAS FUNCIONES PARA ELIMINAR CON CONFIRMACIÓN ---
  const handleDeleteClick = () => {
    setShowConfirm(true); // Mostrar el popover de confirmación
  };

  const confirmDelete = () => {
    deleteTodo(todo.id); // Llamar a la función de eliminación de App.jsx
    setShowConfirm(false); // Ocultar el popover
  };

  const cancelDelete = () => {
    setShowConfirm(false); // Ocultar el popover sin eliminar
  };
  // --- FIN NUEVAS FUNCIONES ---

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        disabled={isEditing || showConfirm} // Deshabilitar si se está editando o confirmando
      />

      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="edit-input"
          autoFocus
          onBlur={handleSave}
          disabled={showConfirm} // Deshabilitar si se está confirmando
        />
      ) : (
        <span onDoubleClick={handleEdit} className={showConfirm ? 'disabled-text' : ''}>
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-button" disabled={showConfirm}>Guardar</button>
            <button onClick={handleCancel} className="cancel-button" disabled={showConfirm}>Cancelar</button>
          </>
        ) : (
          <>
            {/* Solo mostramos el botón Editar si la tarea no está completada */}
            {!todo.completed && (
              <button onClick={handleEdit} className="edit-button" disabled={showConfirm}>
                Editar
              </button>
            )}
            {/* Llamamos a handleDeleteClick para mostrar el popover */}
            <button onClick={handleDeleteClick} className="delete-button" disabled={showConfirm}>
              Eliminar
            </button>
          </>
        )}

        {/* --- POPOVER DE CONFIRMACIÓN (renderizado condicional) --- */}
        {showConfirm && (
          <div className="confirm-popover">
            <span>¿Seguro?</span>
            <button onClick={confirmDelete} className="confirm-yes">Sí</button>
            <button onClick={cancelDelete} className="confirm-no">No</button>
          </div>
        )}
        {/* --- FIN POPOVER DE CONFIRMACIÓN --- */}
      </div>
    </li>
  );
}

export default TodoItem;