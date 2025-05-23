const express = require('express')
const router = express.Router()
const {getUsers,getUser,updateUser,deleteUser} = require('../controllers/user')


router.route('/').get(getUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)



module.exports = router