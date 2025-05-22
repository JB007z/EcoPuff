const express = require('express')
const {getProducts, addProduct, editProduct,deleteProduct} = require('../controllers/product')
const router = express.Router()


router.route('/').get(getProducts).post(addProduct)
router.route('/:id').patch(editProduct).delete(deleteProduct)
module.exports = router