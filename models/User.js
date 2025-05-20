const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique:true

    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password']
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

userSchema.pre('save',async()=>{
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function(){
    return jwt.sign({
        userId:this.id,name:this.username,email:this.email,admin:this.isAdmin
    })
}


module.exports = mongoose.model('User',userSchema)