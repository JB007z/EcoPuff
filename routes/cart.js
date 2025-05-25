const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const checkId = require('../middleware/checkId')


const {createCart, getCarts, getCart, editCart,deleteCart} = require('../controllers/cart')
router.route('/').post(createCart).get(isAdmin,getCarts)
router.route('/:id').get(checkId,getCart).patch(checkId,editCart).delete(deleteCart)






module.exports = router