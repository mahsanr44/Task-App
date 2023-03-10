const mongoose = require('mongoose');
const validator = require('validator');


const User=mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        trim:true
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
        trim:true,
        validate(value){
            if(value.length<6){
                throw new Error("Password must be greater than 6 characters")
            }
        },
        validate(value){
            if(value.toLowerCase().includes('password'))
            // if(value==='password')
            {
                throw new Error("Password must be a valid password")
            }
        }

    }
})

module.exports = User