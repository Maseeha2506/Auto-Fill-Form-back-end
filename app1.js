/* eslint-disble */
const cors = require('cors')

const express = require('express')

const multer = require("multer")

const app = express()

const path = require('path')

const fs = require('fs')

const Tesseract = require('tesseract.js')

const port = 3000

app.use(cors())


// Allow requests from a specific domain
app.use(cors({
  origin: 'http://localhost:8080'
}))

// Allow requests from all domains
app.use(cors())

const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, './src/UploadDocuments')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

// Define the route for handling image uploads
app.post("/upload-image", upload.single('image'), (req, res) => {
const filePath = req.file.path
Tesseract.recognize(fs.readFileSync(filePath), 'eng')
.then((result) => {
    const { data } = result
    res.status(200).json({
      status: 'success',
      data: {
          imageText: data.text
      }
  })

})
.catch((error) => {
})
})

app.post('/form-fields', (req, res) => {
  const getbFeilds = req.body
  res.status(201).json({
    status: 'success',
    data: {
        tour: getbFeilds
    }
})
})

module.exports = app