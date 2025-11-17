import React from 'react';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';
import './TodoList.css';

// Recibir editTodo aquí
function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
  return (
    // Si no hay tareas, mostrar un mensaje amigable
    todos.length === 0 ? (
      <p className="empty-list-message">¡No hay tareas pendientes! Añade una nueva.</p>
    ) : ( // Usamos motion.ul para el contenedor si queremos animar los hijos en secuencia
      <motion.ul className="todo-list">
        <AnimatePresence>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    ) 
  );
}

export default TodoList;