const allowedFields = ['username','password','email']


const sanitizeInput = async(req,res,next)=>{
    req.sanitizedInput = {}
    allowedFields.forEach(field=>{
        if (req.body[field]!==undefined){
            req.sanitizedInput[field] = req.body[field]
        }
    })
    next()
}


module.exports = sanitizeInput