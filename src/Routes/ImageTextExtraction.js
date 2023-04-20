const express = require('express')

const imageController = require('../Controllers/ImageTextExtraction')

const router = express.Router()

router
  .route('/upload-image')
//   .get(imageController.getAllImages)
  .post(imageController.saveImage)
// router
//     .route('/upload-image/:id')
//     .get(imageController.getImage)
//     .patch(imageController.updateImage)
//     .delete(imageController.deleteImage)
module.exports = router