const Tesseract = require('tesseract.js')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Image =  require('../Model/ImageTextModel')

const storage = multer.diskStorage({
  destination: (req,file, cb) => {
    cb(null, './src/UploadDocuments')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

exports.saveImage = async (req, res) => {
  upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({
            status: 'Fail',
            message: err.message
          })
    }
    // If no errors occurred, continue with saving the image to the database
     Image.create({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer
    })
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
      .catch( (error) => {
        res.status(400).json({
          status: 'Fail',
          message: error.message
        })
      })
  })
}
