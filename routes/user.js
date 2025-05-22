const express = require('express')
const router = express.Router()
const {getUsers,getUser,updateUser,deleteUser} = require('../controllers/user')
const isAdmin = require('../middleware/isAdmin')


router.route('/').get(getUsers)
router.route('/:id').get(getUser).patch(isAdmin,updateUser).delete(deleteUser)



module.exports = router