const mongoose = require('mongoose')
const validator = require('validator')

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


const User = mongoose.model('User',userSchema);
module.exports = User;