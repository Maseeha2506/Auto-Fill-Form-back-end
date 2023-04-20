const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

// CONNECTING LOCAL DATABASWE
mongoose.connect(process.env.DATABASE_LOCAL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,

}).then( () => { console.log(`DB connection successfull LOCAL`)}).catch((err) => {
console.log(err)
})

const app = require('./app')

// START SERVER
const port = process.env.port || 3000
app.listen(port, () => {
console.log('connected')
})
