const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const checkId = require('../middleware/checkId')
const sanitizeInput = require('../middleware/cart/santizeInput')
const {createCart, getCarts, getCart, editCart,deleteCart} = require('../controllers/cart')

router.route('/').post(sanitizeInput,createCart).get(isAdmin,getCarts)
router.route('/:id').get(checkId,getCart).patch(checkId,sanitizeInput,editCart).delete(checkId,deleteCart)






module.exports = router