const {StatusCodes} = require('http-status-codes')
const Product = require('../models/product')
const {UnauthenticatedError,BadRequestError} = require('../errors')

const addProduct = async(req,res)=>{
    const {title,desc,image,price} = req.body
    try {
        if(!title||!desc||!image||!price){
            throw new BadRequestError('Invalid product')
        }
        const product = await Product.create({title,desc,image,price})
        res.status(StatusCodes.CREATED).json({product})
    } catch (error) {
        console.log(error);
        
        res.status(error.statusCode || 500).json({ msg: error.message })
        
    }
}

const getProducts = async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(StatusCodes.OK).json({products,nHits:products.length})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })        
    }
}

const getProduct = async(req,res)=>{
        const productId = req.params.id
        try {   
            const product = await Product.findOne({_id:productId})
            if(!product){
                throw new BadRequestError('No product with that id')
            }
            res.status(StatusCodes.OK).json({product})
        } catch (error) {
            res.status(error.statusCode || 500).json({ msg: error.message })
        }
   
}

const editProduct = async(req,res)=>{
    const productId = req.params.id
    const newProduct = req.sanitizedInput
    try {
        const product = await Product.findOneAndUpdate({_id:productId},{$set:newProduct},{new:true})
        if(!product){
            throw new BadRequestError('No product with that id')
        }
        res.status(StatusCodes.OK).json({product})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })
        
    }
}

const deleteProduct = async(req,res)=>{
    const productId = req.params.id
    try {
        const product = await Product.findOneAndDelete({_id:productId})
        if(!product){
            throw new BadRequestError('No product with that id')
        }
        res.status(StatusCodes.OK).json({product,msg:'Product Deleted'})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })
    }
}





module.exports = {addProduct,getProducts,getProduct,editProduct,deleteProduct}
