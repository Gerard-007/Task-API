const express = require('express');
const app = express();

// Connecting to DB here...
const connectDB = require('./db/connect')

// Setting env variables
require('dotenv').config()

// json middleware
app.use(express.json())
app.use(express.static('./public'))

// routes
const tasks = require('./routes/tasks')
app.use('/api/v1/tasks', tasks)


const notFound = require('./middleware/not-found')
app.use(notFound)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()