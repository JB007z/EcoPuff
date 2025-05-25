const mongoose = require('mongoose')
const Product = require('./product')
const { BadRequestError } = require('../errors')
const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[{
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
    adress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'}
},{timestamps:true})


orderSchema.pre('save',async function(next){
    try {
        
        const productsId = this.products.map(p=>{
            return p.productId
        })
        const products = await Product.find({_id:{$in:productsId}})
        if(products.length!==productsId.length){
            throw new BadRequestError('One or more invalid products in the order')
        }
    } catch (error) {
        console.log(error);
        
    }
    next()
})

orderSchema.pre('findOneAndUpdate',async function(next){
    try {
        const update = this.getUpdate()
        const productIds = update.map(p=>{
            return p.productId
        })
        const products = await Product.find({_id:{$in:productsId}})
        if(products.length!==productsId.length){
            throw new BadRequestError('One or more invalid products in the order')
        }
    } catch (error) {
        console.log(error);
    }
    next()
})

module.exports = mongoose.model('Order',orderSchema)