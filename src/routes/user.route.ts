import express from 'express';
import { Request, Response } from 'express';
import { fetchUser, createUser, updateUser } from '../services/user.service';

const userRouter = express.Router();

userRouter.get("/fetch/:userId", async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
        res.status(400).json({ error: "userId is required in the URL" });
    }
    const result = await fetchUser(userId)
    res.status(result.status).json({ message: result.message, user: result.user });
});

userRouter.post('/create/', async (req: Request, res: Response) => {
    const userData = req.body;
    if (!userData.userName || !userData.userId || !userData.email) {
        res.status(400).json({ error: "Username, userId, and email are required" });
    }
    const result = await createUser(userData);
    res.status(result.status).json({ message: result.message });
});

userRouter.put('/update/', async (req: Request, res: Response) => {
    const { userId, userName } = req.params;
    const userData = req.body;
    if (!userId || !userData.userName) {
        res.status(400).json({ error: "UserId and username are required" });
    }
    const result = await updateUser(userId, userName);
    res.status(result.status).json({ message: result.message });
});

export default userRouter;