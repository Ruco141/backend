const express = require('express')
require('dotenv').config({ path: '.env.local' })
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)

connectDB().then(() => {
    app.listen(port, () => console.log(`El servidor se inició correctamente en el puerto ${port}`))
})