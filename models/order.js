const mongoose = require('mongoose')
const Product = require('./product')
const { BadRequestError } = require('../errors')
const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[{
        _id:false,
        productId:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }],
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'}
},{timestamps:true})






module.exports = mongoose.model('Order',orderSchema)