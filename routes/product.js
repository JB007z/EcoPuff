const express = require('express')
const {getProducts, addProduct, editProduct} = require('../controllers/product')
const router = express.Router()


router.route('/').get(getProducts).post(addProduct)
router.route('/:id').patch(editProduct)
module.exports = router