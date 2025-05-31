const User = require('../models/User')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const register = async(req,res)=>{
    const {username,email,password} = req.sanitizedInput
    if (!email||!username||!password){
        throw new BadRequestError("Please provide email,username and password")
    }
    try {
        const newUser = await User.create({username,email,password})

        const token = newUser.createJWT()

        res.status(StatusCodes.CREATED).json({token,msg:"User was created"})

    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message });
    }
    
}

const login = async(req,res)=>{
    const {email,password} = req.sanitizedInput
    try {
        
        if(!email||!password){
            throw new BadRequestError("Please provide email,username and password")
        }
        
        const user = await User.findOne({email})
        if(!user){
            throw new UnauthenticatedError('This user doesnt exist')
        }
    
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            throw new UnauthenticatedError('Invalid Credentials')
        }
        
        const token = user.createJWT()
        res.status(StatusCodes.OK).json({token,msg:"User logged in"})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message });
    }


}

module.exports = {register,login}