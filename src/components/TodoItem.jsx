import React, { useState, useEffect, useRef } from 'react';
import './TodoItem.css';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  // --- NUEVO ESTADO: Para controlar la visibilidad del popover de confirmación ---
  const [showConfirm, setShowConfirm] = useState(false);
  const editInputRef = useRef(null); // Referencia para el input de edición

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim() === '') {
      // Si el texto está vacío al guardar, cancelamos la edición para no tener una tarea vacía.
      handleCancel();
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
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSave();
    }
    if (e.code === 'Escape') {
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

  // Efecto para enfocar el input cuando entramos en modo de edición
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        disabled={isEditing || showConfirm}
        aria-label={`Marcar como ${todo.completed ? 'incompleta' : 'completada'} la tarea: ${todo.text}`}
      />

      {isEditing ? (
        <input
          type="text"
          ref={editInputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="edit-input"
          onBlur={handleCancel} // Si pierde el foco, cancela la edición para evitar guardados accidentales
          disabled={showConfirm}
          aria-label={`Editando la tarea: ${todo.text}`}
        />
      ) : (
        <span
          onDoubleClick={!todo.completed ? handleEdit : undefined}
          // Mejoras de accesibilidad: permite editar con la tecla Enter
          onKeyDown={(e) => {
            if ((e.code === 'Enter' || e.code === 'NumpadEnter') && !todo.completed) {
              handleEdit();
            }
          }}
          role="button" // Indica que es un elemento interactivo
          tabIndex={0} // Hace que el span sea enfocable
          className={showConfirm ? 'disabled-text' : ''}
          aria-label={`Tarea: ${todo.text}. Doble clic o presiona Enter para editar.`}
        >
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {isEditing ? (
          <>
            {/* Usar onMouseDown para que se ejecute antes del onBlur del input */}
            <button onMouseDown={handleSave} className="save-button" disabled={showConfirm} aria-label="Guardar cambios de la tarea">Guardar</button>
            <button onClick={handleCancel} className="cancel-button" disabled={showConfirm} aria-label="Cancelar edición de la tarea">Cancelar</button>
          </>
        ) : (
          <>
            {/* Solo mostramos el botón Editar si la tarea no está completada */}
            {!todo.completed && (
              <button onClick={handleEdit} className="edit-button" disabled={showConfirm} aria-label={`Editar la tarea: ${todo.text}`}>
                Editar
              </button>
            )}
            {/* Se añade la clase 'delete-button' para que coincida con el CSS */}
            <button
              onClick={handleDeleteClick}
              className="delete-button"
              disabled={showConfirm}
              aria-label={`Eliminar la tarea: ${todo.text}`}
            >
              Eliminar
            </button>
          </>
        )}

        {/* --- POPOVER DE CONFIRMACIÓN (renderizado condicional) --- */}
        {showConfirm && (
          <div className="confirm-popover">
            <span>¿Seguro?</span>
            <button onClick={confirmDelete} className="confirm-yes" aria-label="Confirmar eliminación">Sí</button>
            <button onClick={cancelDelete} className="confirm-no" aria-label="Cancelar eliminación">No</button>
          </div>
        )}
        {/* --- FIN POPOVER DE CONFIRMACIÓN --- */}
      </div>
    </li>
  );
}

export default TodoItem;