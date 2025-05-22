const mongoose = require('mongoose')
const {StatusCodes} = require('http-status-codes')
const Product = require('../models/product')
const {UnauthenticatedError,BadRequestError} = require('../errors')

const addProduct = async(req,res)=>{
    console.log(req.user);

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
    res.status(200).json({id:req.user.id,username:req.user.username})
}

const getProduct = async(req,res)=>{
    res.status(200).json({id:req.user.id,username:req.user.username})
}

const editProduct = async(req,res)=>{
    res.status(200).json({id:req.user.id,username:req.user.username})
}

const deleteProduct = async(req,res)=>{
    res.status(200).json({id:req.user.id,username:req.user.username})
}





module.exports = {addProduct,getProducts,getProduct,editProduct,deleteProduct}
