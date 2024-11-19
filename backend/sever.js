const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const pasport = require('passport')
const pinRoutes = require('./routes/pins') 
const userRoutes = require('./routes/user')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({
    origin: 'localhost',
    credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('uploads'))

app.use('/pins',pinRoutes)
app.use('/users',userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Servidor Corriendo en http://localhost:${PORT}`)
})