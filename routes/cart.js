const express = require('express')
const router = express.Router()
const {createCart} = require('../controllers/cart')
router.route('/').post(createCart)






module.exports = router