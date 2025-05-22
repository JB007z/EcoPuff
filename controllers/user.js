const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError } = require('../errors')




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


module.exports = {getUsers,getUser}