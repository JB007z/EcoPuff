const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Order = require('../models/order')


const createOrder = async(req,res)=>{
    const userId = req.params.id
    const {products,amount,adress,status} = req.body
    if(!products||!amount||!adress){
        throw new BadRequestError('The order must have a products list, amount and adress')
    }
    const allowedFields = ['productId','quantity']
    const checkedList = []
    products.forEach(p => {
        const checkedProduct = {}
        const keys = Object.keys(p)
        keys.forEach(key=>{
            if(allowedFields.includes(key)){
                checkedProduct[key] = p[key]
            }
        })
        if(!checkedProduct.productId){
            throw new BadRequestError('All the products must have a product id')
        }
        if(!checkedProduct.quantity){
            checkedProduct.quantity = 1
        }
        checkedList.push(checkedProduct)
    });
    console.log(checkedList);
    try {
        
        const order = await Order.create({userId,products:checkedList,amount,adress,status})
        res.status(StatusCodes.CREATED).json({order,msg:'Order was created'})
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {createOrder}