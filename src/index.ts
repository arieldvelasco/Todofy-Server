import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    console.log('Received ping request');
    res.send('pong');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})