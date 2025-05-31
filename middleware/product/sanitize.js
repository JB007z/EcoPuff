const sanitizeInput = async(req,res,next)=>{
    req.sanitizedInput = {}
    const allowedFields = ['title','desc','image','price']
    allowedFields.forEach(field=>{
        if(req.body[field]!==undefined){
            req.sanitizedInput[field] = req.body[field]
        }
    })
    next()
}




module.exports = sanitizeInput