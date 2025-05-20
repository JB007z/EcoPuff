require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./db/connect')

//middleware
const authUser = require('./middleware/authentication')

//routes
const authRouter = require('./routes/auth')
const productsRouter = require('./routes/product')

app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/products',authUser,productsRouter)



const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(process.env.port||3000,()=>{
            console.log(`Backend running on port ${process.env.port||3000}`);
        })
    } catch (error) {
        console.log(error);
        
    }
}

start()