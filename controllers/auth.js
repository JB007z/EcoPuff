const User = require('../models/User')
const {badRequestError} = require('../errors')
const http_status = require('http-status-codes')
const register = async(req,res)=>{
    const {username,email,password} = req.body
    const newUser = new User({
        username,email,password
    })
    res.status(200).json({newUser,msg:"User was created"})
    
}


module.exports = {register}