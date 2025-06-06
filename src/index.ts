// Inport necessary modules
import express from 'express'
import dotenv from 'dotenv'
import todosRouter from './routes/todos.route'

// Load environment variables from .env file
dotenv.config()

// Set the port from environment variables or default to 3000
const port = process.env.PORT || 3000

// Create an Express application
// and set up a simple route
// to respond to GET requests at /ping
// with a "pong" message
const app = express()
app.use(express.json())

app.get('/ping', (_req, res) => {
    console.log('Received ping request')
    res.send('pong')
})

app.use('/api/todos', todosRouter)

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
