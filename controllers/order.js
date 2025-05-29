const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const Order = require('../models/order')
const { default: mongoose } = require('mongoose')


const createOrder = async(req,res)=>{
    const userId = req.params.id
    console.log(req.sanitizedInput);
    
    const {products,amount,address,status} = req.sanitizedInput
    try {
        
        const order = await Order.create({userId,products,amount,address,status})
        res.status(StatusCodes.CREATED).json({order,msg:'Order was created'})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message });
    }
}


const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find({})
        res.status(StatusCodes.OK).json({orders,nHits:orders.length})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message });
        
    }
}

const getAllUserOrders = async(req,res)=>{
    const {id:userId} = req.params
    try {
        const orders = await Order.find({userId})
        if(!orders||orders.length===0){
            throw new NotFoundError('This user has no orders')
        }
        res.status(StatusCodes.OK).json({orders,nHits:orders.length})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message });

    }
}

const editOrder = async(req,res)=>{
    const userId = req.user.id
    const orderId = req.params.id
    const {products,amount,address,status} = req.sanitizedInput
        try{
            const oldOrder = await Order.find({_id:orderId})
            if(!oldOrder){
                    throw new NotFoundError('No order with that id')
                }
            if(oldOrder.userId!==userId&&!req.user.admin){
                throw new UnauthenticatedError('Invalid Credentials')
            }
    
            const updatedOrder = await Order.findOneAndUpdate({_id:orderId,userId},{userId,products,amount,address,status},{new:true})
                res.status(StatusCodes.OK).json({updatedOrder,msg:'Order Edited'})
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ msg: error.message });
        }}


const deleteOrder = async(req,res)=>{
    const userId = req.user.id
    const {id:orderId} = req.params
    try {
        
        const oldOrder = await Order.find({_id:orderId})
        if(!oldOrder){
                throw new BadRequestError('No order with that id')
            }
        if(oldOrder.userId!==userId&&!req.user.admin){
            throw new UnauthenticatedError('Invalid Credentials')
        }
        const deletedOrder = await Order.findOneAndDelete({_id:orderId},{new:true})
        res.status(StatusCodes.OK).json({deletedOrder,msg:'Order deleted'})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message });
    }
}


module.exports = {createOrder,getAllOrders,getAllUserOrders,editOrder,deleteOrder}