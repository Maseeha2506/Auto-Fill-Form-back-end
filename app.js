/* eslint-disble */
const cors = require('cors')

const express = require('express')

const app = express()

const imageRouter = require('./src/Routes/ImageTextExtraction')

app.use(cors())


// Allow requests from a specific domain
app.use(cors({
  origin: 'http://localhost:8080'
}))

// Allow requests from all domains
app.use(cors())

// mounting the router
app.use('/image',imageRouter)

module.exports = app