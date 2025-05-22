const express = require('express')
const {getProducts, addProduct, editProduct,deleteProduct, getProduct} = require('../controllers/product')
const router = express.Router()


router.route('/').get(getProducts).post(addProduct)
router.route('/:id').get(getProduct).patch(editProduct).delete(deleteProduct)
module.exports = router