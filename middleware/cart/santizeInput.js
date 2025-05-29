const { BadRequestError } = require("../../errors")
const Product = require('../../models/product')
const mongoose = require('mongoose')
const sanitizeInput = async(req,res,next)=>{
    const allowedFields = ['productId','quantity']
    const {products} = req.body
    if(!products||products.length===0){
        throw new BadRequestError('Invalid cart, there must be at least one product')
    }
    req.sanitizedInput = []
    const productIdsSet = new Set()
    for(const product of products){
        const sanitizedProduct = {}
        for(const key of Object.keys(product)){
            if(allowedFields.includes(key)){
                if(key==='productId'){
                    //check if id is valid or if its a duplicate
                    if(!mongoose.isValidObjectId(product[key])||productIdsSet.has(product[key])){
                        throw new BadRequestError('One or more invalid products in the cart')
                    }
                    productIdsSet.add(product[key])
                    
                    //check if the product exists
                    const productExists = await Product.findOne({_id:product[key]})
                    if(!productExists){
                        throw new BadRequestError('One or more invalid products in the cart')
                    }
                }
                sanitizedProduct[key] = product[key]
            }
        }
        if(!sanitizedProduct.productId){
            throw new BadRequestError('All products must have a productId')
        }
        req.sanitizedInput.push(sanitizedProduct)
    }

    next()
}



module.exports = sanitizeInput