import React, { useState } from "react";
import './TodoForm.css';

function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");// Estado para el valor del input

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe y se recargue la página
        if (!value.trim()) return; // No añadir tareas vacías
        addTodo(value);
        setValue(""); // Limpiar el input después de añadir la tarea
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
        <input
            type="text"
            className="todo-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Agregar nueva tarea"
        />
        <button type="submit" className="todo-button">Agregar</button>
        </form>
    );
}

export default TodoForm;