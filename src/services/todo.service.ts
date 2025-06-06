import { NewTodo } from "../types";

export const fetchTodos = async () => {
    return {
        todos: [
            { id: 1, title: "Comprar leche", completed: false },
            { id: 2, title: "Leer un libro", completed: true },
            { id: 3, title: "Hacer ejercicio", completed: false }
        ]
    }
}

export const addTodo = async (todo: NewTodo) => {
    return { message: "Todo added successfully", todo };
}

export const updateTodo = async (id: string, title: string) => {
    return { message: "Todo updated successfully", id, title };
}

export const completeTodo = async (id: string) => {
    return { message: "Todo marked as completed", id };
}

export const deleteTodo = async (id: string) => {
    return { message: "Todo deleted successfully", id };
}