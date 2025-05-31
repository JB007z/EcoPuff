const express = require('express')
const router = express.Router()
const {getUsers,getUser,updateUser,deleteUser} = require('../controllers/user')
const checkId = require('../middleware/checkId')
const isAdmin = require('../middleware/isAdmin')
const sanitizeInput = require('../middleware/user/sanitizeInput')

router.route('/').get(isAdmin,getUsers)
router.route('/:id').get(checkId,getUser).patch(checkId,sanitizeInput,updateUser).delete(checkId,deleteUser)



module.exports = router