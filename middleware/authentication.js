const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
const User = require('../models/User')
const auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne({_id:payload.userId})
        if(!user){
            throw new UnauthenticatedError('User no longer exists')
        }        
        req.user = {id:payload.userId,username:payload.username,admin:payload.admin}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid credentials')
    }
}

module.exports = auth