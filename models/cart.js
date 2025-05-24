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
    const productIds = this.products.map(p=>{
        return p.productId
    })

    const products = await Product.find({_id:{$in:productIds}})
    if(products.length!==productIds.length){
        throw new BadRequestError('One or more invalid products')
    }
    next()
})


cartSchema.pre('findOneAndUpdate',async function(next){
    const update = this.getUpdate()
    const productIds = update.products.map(p=>{
        return p.productId
    })
    const products = await Product.find({_id:{$in:productIds}})
    if(products.length!==productIds.length){
        throw new BadRequestError('One or more invalid products')
    }
    next()

})

module.exports = mongoose.model('Cart',cartSchema)