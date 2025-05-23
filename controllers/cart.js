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
    try {
        const cart = await Cart.create({userId,products})
        res.status(StatusCodes.CREATED).json({cart,msg:'Car created'})
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {createCart}