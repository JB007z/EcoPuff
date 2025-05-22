const mongoose = require('mongoose')
const {StatusCodes} = require('http-status-codes')
const Product = require('../models/product')
const {UnauthenticatedError,BadRequestError} = require('../errors')

const addProduct = async(req,res)=>{

    const {admin,userId,username} = req.user
    if (!admin){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const {title,desc,image,price} = req.body
    if(!title||!desc||!image||!price){
        throw new BadRequestError('Invalid product')
    }
    try {
        const product = await Product.create({title,desc,image,price})
        res.status(StatusCodes.CREATED).json({product})
    } catch (error) {
        console.log(error);
        
    }
}

const getProducts = async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(StatusCodes.OK).json({products,nHits:products.length})
    } catch (error) {
        console.log(error);
        
    }
}

const getProduct = async(req,res)=>{
    try {
        const productId = req.params.id
        const product = await Product.findOne({_id:productId})
        if(!product){
            throw new BadRequestError('No product with that id')
        }
        res.status(StatusCodes.OK).json({product})
    } catch (error) {
        
    }
}

const editProduct = async(req,res)=>{
    const {admin} = req.user
    const productId = req.params.id
    if (!admin){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const {title,desc,image,price} = req.body
    const newProduct = {}
    if(title){
        newProduct.title = title
    }
    if(desc){
        newProduct.desc = desc
    }
    if(image){
        newProduct.image = image
    }
    if(price){
        newProduct.price = price
    }
    try {
        const product = await Product.findOneAndUpdate({_id:productId},{$set:newProduct},{new:true})
        if(!product){
            throw new BadRequestError('No product with that id')
        }
        res.status(StatusCodes.OK).json({product})
    } catch (error) {
        console.log(error);
        
    }
}

const deleteProduct = async(req,res)=>{
    const {admin} = req.user
    if(!admin){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const productId = req.params.id
    try {
        const product = await Product.findOneAndDelete({_id:productId})
        if(!product){
            throw new BadRequestError('No product with that id')
        }
        res.status(StatusCodes.OK).json({product,msg:'Product Deleted'})
    } catch (error) {
        console.log(error);
        
    }
}





module.exports = {addProduct,getProducts,getProduct,editProduct,deleteProduct}
