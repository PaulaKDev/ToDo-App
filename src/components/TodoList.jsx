import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

// Recibir editTodo aquí
function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
  return (
    // Si no hay tareas, mostrar un mensaje amigable
    todos.length === 0 ? (
      <p className="empty-list-message">¡No hay tareas pendientes! Añade una nueva.</p>
    ) : (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
    )
  );
}

export default TodoList;