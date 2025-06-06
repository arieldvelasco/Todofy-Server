import { NewTodo } from "../types";
import TodoModel from "../models/todo.model";

export const fetchTodos = async (userId: string) => {
    try {
        const todos = await TodoModel.find().lean();
        const noUserTodos = {
            id: "0",
            title: "Make your first Todo",
            completed: false,
            userId: "0"
        }

        if (userId && todos) {
            const userTodos = todos.filter(todo => todo.userId === userId);
            if (userTodos.length === 0) {
                return { noUserTodos, status: 400, message: "No todos found for this user" };
            }
            return { todos: userTodos, status: 200, message: "Todos fetched successfully" };
        } else {
            return { todos: noUserTodos, status: 400, message: "User ID is required" };
        }
    } catch (error) {
        return { status: 500, message: "Error fetching todos", todos: error };
    }
}

export const addTodo = async (todo: NewTodo) => {
    const { title, userId } = todo;
    if (!title || !userId) {
        return { status: 400, message: "Title and userId are required" };
    }
    const newTodo = new TodoModel({
        title,
        userId,
        completed: false
    });
    await newTodo.save();

    return { status: 200, message: "Todo added successfully" };
}

export const updateTodo = async (id: string, title: string) => {
    if (!id || !title) {
        return { status: 400, message: "ID and title are required" };
    }
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedTodo) {
            return { status: 404, message: "Todo not found" };
        }
    } catch (error) {
        return { status: 500, message: "Error updating todo" };
    }
    return { status: 200, message: "Todo updated successfully" };
}

export const completeTodo = async (id: string) => {
    if (!id) {
        return { status: 400, message: "ID is required" };
    }
    try {
        const todo = await TodoModel.findById(id);
        if (todo) {
            todo.completed = !todo.completed;
            await todo.save();
        } else {
            return { status: 404, message: "Todo not found" };
        }
    } catch (error) {
        return { status: 500, message: "Error completing todo" };
    }
    return { status: 200, message: "Todo completed successfully" };
}

export const deleteTodo = async (id: string) => {
    if (!id) {
        return { status: 400, message: "ID is required" };
    }
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(id);
        if (!deletedTodo) {
            return { status: 404, message: "Todo not found" };
        }
    } catch (error) {
        return { status: 500, message: "Error deleting todo" };
    }
    return { status: 200, message: "Todo deleted successfully" };
}