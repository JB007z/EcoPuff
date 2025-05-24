const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Cart = require('../models/cart')
const User = require('../models/User')



//Create Cart
const createCart = async(req,res)=>{
    const {id:userId} = req.user
    const {products} = req.body
    if(!products){
        throw new BadRequestError('Your cart must have atleast one product')
    }
        const hasCart = await Cart.findOne({userId})
        console.log(hasCart);
        
        if(hasCart){
            throw new BadRequestError('User already has a cart')
        }
        const cart = await Cart.create({userId,products})
        res.status(StatusCodes.CREATED).json({cart,msg:'Car created'})
    } 


const getCarts = async(req,res)=>{
    try {
        const carts = await Cart.find({})
        res.status(StatusCodes.OK).json({carts,nHits:carts.length})
    } catch (error) {
        
    }
}

const getCart = async(req,res)=>{
    const userId = req.params.id
    const cart = await Cart.find({userId})
    if(!cart){
        throw new BadRequestError('The user doesnt have a cart or the user doesnt exist')

    }
    res.status(StatusCodes.OK).json({cart})
}




module.exports = {createCart,getCarts,getCart}