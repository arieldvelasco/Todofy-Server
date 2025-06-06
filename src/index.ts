// Inport necessary modules
import express from 'express'
import dotenv from 'dotenv'
import todosRouter from './routes/todos.route'
import mongoose from 'mongoose'
import userRouter from './routes/user.route'

// Load environment variables from .env file
dotenv.config()

// Set the port from environment variables or default to 3000
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos')
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    })

// Create an Express application
const app = express()
app.use(express.json())

// to respond to GET requests at /ping with a "pong" message
app.get('/ping', (_req, res) => {
    console.log('Received ping request')
    res.send('pong')
})

// and set up app routes for todos and user
app.use('/api/todos', todosRouter)
app.use('/api/user', userRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
