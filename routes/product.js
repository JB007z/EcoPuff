const express = require('express')
const {getProducts, addProduct, editProduct,deleteProduct, getProduct} = require('../controllers/product')
const isAdmin = require('../middleware/isAdmin')
const router = express.Router()


router.route('/').get(getProducts).post(isAdmin,addProduct)
router.route('/:id').get(getProduct).patch(isAdmin,editProduct).delete(isAdmin,deleteProduct)
module.exports = router