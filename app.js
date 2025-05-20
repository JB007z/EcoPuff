require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const start = async()=>{
    try {
        await connectDB(process.env.mongo_url)
        app.listen(process.env.port||5000,()=>{
            console.log(`Backend running on port ${process.env.port||5000}`);
        })
    } catch (error) {
        console.log(error);
        
    }
}

start()