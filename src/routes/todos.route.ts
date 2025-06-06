import { fetchTodos, addTodo, updateTodo, completeTodo, deleteTodo } from "../services/todo.service";
import { Request, Response } from "express";

const todosRouter = require("express").Router();

todosRouter.get("/fetch", async (_req: Request, res: Response) => {
    res.status(200).json(await fetchTodos());
})

todosRouter.post("/add", async (req: Request, res: Response) => {
    res.status(200).json(await addTodo(req.body));
})

todosRouter.put("/update/", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    res.status(200).json(await updateTodo(id, title));
})

todosRouter.put("/complete/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json(await completeTodo(id));
})

todosRouter.delete("/delete/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json(await deleteTodo(id));
})

export default todosRouter;