/* eslint-disable */
const Tesseract = require('tesseract.js')

Tesseract.recognize('./src/Controllers/images/positive-vibes.gif', 'eng')
.then((result) => {
    let{ data } = result
    console.log('inside')
   console.log(data.text)
})
.catch((error) => {
   console.log(error.message)
})
console.log('from text extraction')