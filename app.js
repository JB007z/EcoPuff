require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./db/connect')

//middleware
const authUser = require('./middleware/authentication')
const isAdmin = require('./middleware/isAdmin')

//routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const productsRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')

app.use(express.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',authUser,userRouter)
app.use('/api/v1/products',authUser,productsRouter)
app.use('/api/v1/carts/',authUser,cartRouter)
app.use('/api/v1/orders/',authUser,orderRouter)


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