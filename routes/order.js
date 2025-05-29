const express = require('express')
const router = express.Router()
const {createOrder, getAllOrders,getAllUserOrders,editOrder, deleteOrder} = require('../controllers/order')
const checkId = require('../middleware/checkId')
const isAdmin = require('../middleware/isAdmin')
const sanitizeInput = require('../middleware/order/sanitizeInput')
router.route('/').get(isAdmin,getAllOrders)
router.route('/:id').post(checkId,sanitizeInput,createOrder).get(getAllUserOrders).patch(sanitizeInput,editOrder).delete(deleteOrder)

module.exports = router