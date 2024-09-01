const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const errorMiddleware = require('../middlewares/errorMiddleware')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(router)
app.use(errorMiddleware)

module.exports = app