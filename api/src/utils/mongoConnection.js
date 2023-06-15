const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', true)

const db = async () => {

    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        })
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected')
        })
        
    } catch (error) {
        mongoose.connection.on('error', error => {
            console.log('MongoDB connection error', error);
        })
        
    }
}

module.exports = { db }