const { UnauthenticatedError } = require("../errors")

const checkId = async(req,res,next)=>{
    if (req.params.id!==req.user.id && !req.user.admin){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    next()
}




module.exports = checkId