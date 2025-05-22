const express = require('express')
const {getProducts, addProduct} = require('../controllers/product')
const router = express.Router()


router.route('/').get(getProducts).post(addProduct)

module.exports = router