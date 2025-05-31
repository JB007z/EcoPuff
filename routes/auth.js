const express = require('express')
const router = express.Router()
const {register, login} = require('../controllers/auth')
const sanitizeInput = require('../middleware/user/sanitizeInput')

router.route('/register').post(sanitizeInput,register)
router.route('/login').post(sanitizeInput,login)


module.exports = router