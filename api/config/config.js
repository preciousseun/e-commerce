const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI);
        console.log('connected to database');
};

module.exports = connectDB;