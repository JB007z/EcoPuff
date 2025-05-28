const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')


const getUsers = async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(StatusCodes.OK).json({users,nHits:users.length})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })        
    }
}

const getUser = async(req,res)=>{
    const userId = req.params.id
    try {
        const user = await User.findOne({_id:userId})
        if(!user){
            throw new BadRequestError('No user with those credentials')
        }
        res.status(StatusCodes.OK).json({user})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })
    }
}

const updateUser = async(req,res)=>{
    const userId = req.params.id
    const updatedUser = req.sanitizedInput
    try {
        console.log(updatedUser);
        
        const newUser = await User.findOneAndUpdate({_id:userId},{$set:updatedUser},{returnDocument:'after'})
        console.log(newUser);
        
        if (!newUser){
            throw new BadRequestError('No user with that id')
        }
        res.status(StatusCodes.OK).json({newUser,msg:'User edited'})
    } catch (error) {
        res.status(error.statusCode || 500).json({ msg: error.message })
        
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
        res.status(error.statusCode || 500).json({ msg: error.message })
        
    }
}



module.exports = {getUsers,getUser,updateUser,deleteUser}