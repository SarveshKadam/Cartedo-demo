const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim:true
    }
})

userSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = jwt.sign({id : user._id.toString()},'tryingtoken')

    //user.tokens = await user.tokens.concat({token})

    //await user.save()

    return token
}

userSchema.pre('save',async function(next){
    const user =  this;
    if(user.isModified('password')){
        const hashedPassword = await bcrypt.hash(user.password,8)
        user.password = hashedPassword
    }
    next()
})

const User = mongoose.model('User',userSchema);
module.exports = User;