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

    // Variable para determinar si el botón debe estar deshabilitado.
    const isButtonDisabled = value.trim() === "";

    return (
        <form onSubmit={handleSubmit} className="todo-form">
        <input
            type="text"
            className="todo-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Añadir nueva tarea"
            aria-label="Campo para añadir una nueva tarea"
        />
        <button type="submit" className="add-button" disabled={isButtonDisabled} aria-label="Añadir tarea">
            Añadir
        </button>
        </form>
    );
}

export default TodoForm;