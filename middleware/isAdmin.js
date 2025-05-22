const {UnauthenticatedError} = require('../errors')

const isAdmin = async(req,res,next)=>{
    if(!req.user.admin){
        throw new UnauthenticatedError('Invalid Credentials')
        
    }
    next()
}

module.exports = isAdmin