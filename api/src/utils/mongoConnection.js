const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', true)

const db = async () => {
    const MONGO_URI = 'mongodb+srv://talhaubeytalan:NaJ8lunJdYddFPfI@cluster1.xkchhlh.mongodb.net/kanban?retryWrites=true&w=majority'


    try {
        mongoose.connect(MONGO_URI, {
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