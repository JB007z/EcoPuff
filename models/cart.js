const mongoose = require('mongoose')
const Product = require('./product')
const { BadRequestError } = require('../errors')
const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    products:[{
        _id: false,
        productId:{
            type:String
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
},{timestamps:true})


cartSchema.pre('save',async function(next){
    const userId = this.userId
    const hasCart = await this.constructor.findOne({userId})                
    if(hasCart){
        throw new BadRequestError('User already has a cart')
    }
    next()
})




module.exports = mongoose.model('Cart',cartSchema)