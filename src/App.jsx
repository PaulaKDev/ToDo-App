import { useState, useEffect } from 'react';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import './App.css'; // Para los estilos generales

function App() {

  // Estado para almacenar la lista de tareas
    const [todos, setTodos] = useState(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

  // Estado para el filtro de tareas
    const [filter, setFilter] = useState('all'); // / Por defecto, mostrar todas las tareas

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

    // --- NUEVA FUNCIÓN PARA EDITAR TAREAS ---
    const editTodo = (id, newText) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };
      // --- FIN NUEVA FUNCIÓN PARA EDITAR TAREAS ---

  // --- NUEVA LÓGICA DE FILTRADO ---
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'pending') {
      return !todo.completed;
    }
    return true; // Si filter es 'all', devuelve todas las tareas
  });
  // --- FIN NUEVA LÓGICA DE FILTRADO ---

  return (
    <div className="todo-app-container">
      <h1>Mi Lista de Tareas</h1>
      <TodoForm addTodo={addTodo} />

         {/* --- NUEVOS BOTONES DE FILTRO --- */}
      <div className="filter-buttons">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'active' : ''}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completadas
        </button>
      </div>
      {/* --- FIN NUEVOS BOTONES DE FILTRO --- */}

      {filteredTodos.length > 0 ? ( // Usamos filteredTodos aquí
        <TodoList
          todos={filteredTodos} // Pasamos las tareas filtradas
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ) : (
        <p className="no-todos">
          {filter === 'all' && "¡No tienes tareas pendientes! Añade una nueva."}
          {filter === 'pending' && "¡No tienes tareas pendientes!"}
          {filter === 'completed' && "¡No tienes tareas completadas!"}
        </p>
      )}
    </div>
  );
}
export default App;