const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')


const getUsers = async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(StatusCodes.OK).json({users,nHits:users.length})
    } catch (error) {
        console.log(error);
        
    }
}

const getUser = async(req,res)=>{
    const userId = req.params.id
    const user = await User.findOne({_id:userId})
    if(!user){
        throw new BadRequestError('No user with that id')
    }
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async(req,res)=>{
    const userId = req.params.id
    const allowedFields = ['username','email','isAdmin']
    const updatedUser = {}
    console.log(req.body);
    
    allowedFields.forEach(field=>{
        if (req.body[field]!== undefined){
            updatedUser[field] = req.body[field]
        }
    })
    const newPassword = req.body.password
    if(newPassword){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword,salt)
        updatedUser.password = hashedPassword
    }
    console.log(updatedUser);
    
    try {
        const newUser = await User.findOneAndUpdate({_id:userId},{$set:updatedUser},{new:true})
        if (!newUser){
            throw new BadRequestError('No user with that id')
        }
        res.status(StatusCodes.OK).json({newUser,msg:'User edited'})
    } catch (error) {
        console.log(error);
        
    }
}

const deleteUser = async(req,res)=>{
    const userId = req.params.id
    try {
        
        const user = await User.findOneAndDelete({_id:userId})
        if(!user){
            throw new BadRequestError('No user with that id')
        }
        res.status(StatusCodes.OK).json({user,msg:'User deleted'})
    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {getUsers,getUser,updateUser,deleteUser}