const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique:true

    },
    email:{
        type:String,
        required:[true],
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

userSchema.pre('save',async function(){
    const username = this.username
    const email = this.email
    const existingUser = await this.constructor.findOne({
        $or:[
            {username},{email}
        ],
        _id:{$ne:this._id}
    })
    if(existingUser){
        if(existingUser.username===username){
            throw new BadRequestError('This username is already being used')
        }
        if(existingUser.email===email){
            throw new BadRequestError('This email is already being used')
        }
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
   
   
})

userSchema.pre('findOneAndUpdate',async function(){
    const update = this.getUpdate()
    const username = update.$set.username
    const email = update.$set.email
    if (username || email){
        const existingUser = await this.model.findOne({
            $or:[
                {username},{email}
            ],
            _id:{$ne:this._conditions._id}
        })
        if(existingUser){
            if(existingUser.username===username){
                throw new BadRequestError('This username is already being used')
            }
            if(existingUser.email===email){
                throw new BadRequestError('This email is already being used')
            }
        }
    }
    if (update.$set.password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(update.$set.password,salt)
        update.$set.password = hashedPassword
}
    
})
    


userSchema.methods.createJWT = function(){
    
    return jwt.sign({
        userId:this.id,username:this.username,email:this.email,admin:this.isAdmin
    },process.env.JWT_SECRET,{expiresIn:'30d'})
}

userSchema.methods.comparePassword = async function(password){
    
       return await bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('User',userSchema)