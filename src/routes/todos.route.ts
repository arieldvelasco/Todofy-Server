import { fetchTodos, addTodo, updateTodo, completeTodo, deleteTodo } from "../services/todo.service";
import { Request, Response } from "express";

const todosRouter = require("express").Router();

todosRouter.get("/fetch/", (_req: Request, res: Response) => {
    res.status(400).json({ error: "userId es requerido en la URL" });
});

todosRouter.get("/fetch/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { status, message, todos } = await fetchTodos(userId);
    res.status(status).json({ message, todos });
})

todosRouter.post("/add", async (req: Request, res: Response) => {
    const { title, userId } = req.body;
    const result = await addTodo(title, userId);
    res.status(result.status).json({ message: result.message });
})

todosRouter.put("/update/", async (req: Request, res: Response) => {
    const { id, title } = req.body;
    const result = await updateTodo(id, title);
    res.status(result.status).json({ message: result.message });
})

todosRouter.put("/complete/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await completeTodo(id);
    res.status(result.status).json({ message: result.message });
})

todosRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteTodo(id);
    res.status(result.status).json({ message: result.message });
})

export default todosRouter;