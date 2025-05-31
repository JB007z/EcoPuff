const express = require('express')
const {getProducts, addProduct, editProduct,deleteProduct, getProduct} = require('../controllers/product')
const isAdmin = require('../middleware/isAdmin')
const sanitizeInput = require('../middleware/product/sanitize')
const router = express.Router()


router.route('/').get(getProducts).post(isAdmin,addProduct)
router.route('/:id').get(getProduct).patch(isAdmin,sanitizeInput,editProduct).delete(isAdmin,deleteProduct)
module.exports = router