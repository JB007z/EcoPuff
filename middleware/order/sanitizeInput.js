const mongoose = require("mongoose")
const { BadRequestError } = require("../../errors")
const Product = require('../../models/product')
const sanitizeInput = async(req,res,next)=>{
    const allowedFields = ['products','amount','address','status']
    const allowedProductFields = ['productId','quantity']
    req.sanitizedInput = {}
    for (const field of allowedFields){
        if(field==='products'){
            if(!Array.isArray(req.body[field])){
                throw new BadRequestError('Invalid products list format')
            }
            if(req.body[field].length===0){
                throw new BadRequestError('There must be at least one product')
            }
            const checkedProducts = []
            const productsId = new Set()
            for(const product of req.body[field]){
                const checkedProduct ={}
                for(const key of Object.keys(product)){
                    if(allowedProductFields.includes(key)){
                        if(key==='productId'){
                            if(productsId.has(product[key])){
                                throw new BadRequestError('Duplicate product in the products list')
                            }
                            productsId.add(product[key])
                            if(!mongoose.isValidObjectId(product[key])){
                                throw new BadRequestError('Invalid productId format')
                            }
                            const productExists = await Product.findOne({_id:product[key]})
                            if(!productExists){
                                throw new BadRequestError('One or more invalid product id in the products list')
                            }
                        }
                        checkedProduct[key] = product[key]
                    }
                }
                if(!checkedProduct.productId){
                    throw new BadRequestError('All products must have an Id')
                }
                checkedProducts.push(checkedProduct)
            }
          
            req.body[field] = checkedProducts
        }

        if(req.body[field]!==undefined){
            req.sanitizedInput[field] = req.body[field]
        }
    }

    if(!req.sanitizedInput.amount||!req.sanitizedInput.address){
        throw new BadRequestError('The order must have an amount and address')
    }
    next()
}

module.exports = sanitizeInput