const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/isAdmin')
const {createCart, getCarts, getCart} = require('../controllers/cart')
router.route('/').post(createCart).get(isAdmin,getCarts)
router.route('/:id').get(getCart)






module.exports = router