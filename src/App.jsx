import { useState, useEffect } from 'react';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './App.css'; // Para los estilos generales del contenedor

function App() {

  // Estado para almacenar la lista de tareas
  // Intentamos cargar las tareas desde el localStorage al inicio
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    // Efecto para guardar las tareas en el localStorage cada vez que 'todos' cambie
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(), // Un ID único basado en el timestamp
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]); // Añade la nueva tarea al array existente
    };

    // Función para marcar/desmarcar una tarea como completada
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    //Función para eliminar una tarea
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

  return (
    <div className="todo-app-container">
      <h1>Mi Lista de Tareas</h1>
      <TodoForm addTodo={addTodo} />
      {/* Solo mostramos la lista si hay tareas */}
      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ) : (
        <p className='no-todos'>¡No hay tareas pendientes! Añade nuevas.</p>
      )}
    </div>
  );
}
export default App;