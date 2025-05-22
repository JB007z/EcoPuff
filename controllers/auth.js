const User = require('../models/User')
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const register = async(req,res)=>{
    const {username,email,password,isAdmin} = req.body
    if (!email||!username||!password){
        throw new BadRequestError("Please provide email,username and password")
    }
    try {
        const newUser = await User.create({username,email,password,isAdmin})

        const token = newUser.createJWT()

        res.status(StatusCodes.CREATED).json({token,msg:"User was created"})

    } catch (error) {
        console.log(error);
        
    }
    
}

const login = async(req,res)=>{
    const {email,password} = req.body
    if(!email||!password){
        throw new BadRequestError("Please provide email,username and password")
    }
    
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isMatch = await user.comparePassword(password)
    if(isMatch){
        const token = user.createJWT()
        res.status(StatusCodes.OK).json({token,msg:"User logged in"})
    }
    
    else{
        throw new UnauthenticatedError('Invalid Credentials')
    }


}

module.exports = {register,login}