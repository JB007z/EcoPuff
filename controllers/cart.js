const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const Cart = require('../models/cart')

const createCart = async(req,res)=>{
    const {id:userId} = req.user
    const products = req.sanitizedInput    
    try {
            const cart = await Cart.create({userId,products})
            res.status(StatusCodes.CREATED).json({cart,msg:'Cart created'})
    } catch (error) {
            res.status(error.statusCode || 500).json({ msg: error.message });
        } 

    }


const getCarts = async(req,res)=>{
    try {
        const carts = await Cart.find({})
        res.status(StatusCodes.OK).json({carts,nHits:carts.length})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })
    }
}

const getCart = async(req,res)=>{
    const userId = req.params.id
    try {
        const cart = await Cart.findOne({userId})
        if(!cart){
            throw new NotFoundError('The user doesnt have a cart or the user doesnt exist')
    
        }
        res.status(StatusCodes.OK).json({cart})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })
    }
}


const editCart = async(req,res)=>{
    const products = req.sanitizedInput
    const userId = req.params.id
    try {
        const updatedCart = await Cart.findOneAndUpdate({userId},{$set:{products}},{new:true})
        if(!updatedCart){
            throw new NotFoundError('No user with that id')
        }
        res.status(StatusCodes.OK).json({updatedCart})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })
    }

}

const deleteCart = async(req,res)=>{
    const userId = req.params.id
    try {
        const cart = await Cart.findOneAndDelete({userId})
        if(!cart){
            throw new NotFoundError('No cart with that id')
        }
        res.status(StatusCodes.OK).json({cart,msg:'Cart deleted'})
    } catch (error) {
       res.status(error.statusCode || 500).json({ msg: error.message })
        
    }
}
module.exports = {createCart,getCarts,getCart,editCart,deleteCart}

