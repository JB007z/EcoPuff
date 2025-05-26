const express = require('express')
const router = express.Router()
const {createOrder, getAllOrders,getAllUserOrders,editOrder, deleteOrder} = require('../controllers/order')
const checkId = require('../middleware/checkId')
const isAdmin = require('../middleware/isAdmin')
router.route('/').get(isAdmin,getAllOrders)
router.route('/:id').post(checkId,createOrder).get(getAllUserOrders).patch(checkId,editOrder).delete(isAdmin,deleteOrder)

module.exports = router