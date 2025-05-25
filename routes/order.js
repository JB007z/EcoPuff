const express = require('express')
const router = express.Router()
const {createOrder} = require('../controllers/order')
const checkId = require('../middleware/checkId')
router.route('/:id').post(checkId,createOrder)

module.exports = router