const mongoose = require('mongoose')
const { BadRequestError } = require('../errors')
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    size:{
        type:String,
       
    },
    price:{
        type:Number,
        required:true,        
    },
    
},{timestamps:true})

productSchema.pre('save',async function(){
    const title = this.title
    const existingProduct = await this.constructor.findOne({title,_id:{$ne:this._id}})
    if(existingProduct){
        throw new BadRequestError('This product already exists')
    }
    next()
})

productSchema.pre('findOneAndUpdate',async function(){
    const update = this.getUpdate()
    const title = update.$set.title
    if(title){
        const existingProduct = await this.model.findOne({title,_id:{$ne:this._conditions._id}})
        if(existingProduct){
            throw new BadRequestError('This product already exists')
        }
    }
})

module.exports = mongoose.model('Product',productSchema)