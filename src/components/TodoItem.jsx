import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.li
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      layout // Anima el cambio de posición si la lista se reordena
      initial={{ opacity: 0, y: 50 }} // Estado inicial: invisible y 50px abajo
      animate={{ opacity: 1, y: 0 }} // Estado animado: totalmente visible y en su posición final
      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }} // Estado de salida: se desvanece y se mueve a la izquierda
      transition={{ type: 'spring', stiffness: 120, damping: 15 }} // Tipo de animación elástica
    >
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

      {/* Contenedor de acciones y popover */}
      <div className="todo-actions">
        {/* --- POPOVER DE CONFIRMACIÓN (renderizado condicional) --- */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div
              className="confirm-popover"
              initial={{ opacity: 0, scale: 0.95, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 10 }}
              transition={{ duration: 0.15 }}
            >
              <span>¿Seguro?</span>
              <button onClick={confirmDelete} className="confirm-yes" aria-label="Confirmar eliminación">Sí</button>
              <button onClick={cancelDelete} className="confirm-no" aria-label="Cancelar eliminación">No</button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* --- FIN POPOVER DE CONFIRMACIÓN --- */}
        
        {isEditing ? (
          <>
            <button onMouseDown={handleSave} className="save-button" disabled={showConfirm} aria-label="Guardar cambios de la tarea">Guardar</button>
            <button onClick={handleCancel} className="cancel-button" disabled={showConfirm} aria-label="Cancelar edición de la tarea">Cancelar</button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <button onClick={handleEdit} className="edit-button" disabled={showConfirm} aria-label={`Editar la tarea: ${todo.text}`}>Editar</button>
            )}
            <button
              onClick={handleDeleteClick}
              className="delete-button" /* Asegurarse que esta clase está presente */
              disabled={showConfirm}
              aria-label={`Eliminar la tarea: ${todo.text}`}>
              Eliminar
            </button>
          </>
        )}
      </div>
    </motion.li>
  );
}

export default TodoItem;