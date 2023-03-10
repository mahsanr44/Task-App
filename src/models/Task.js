const mongoose=require('mongoose');
const validator=require('validator');

const Task=mongoose.model('Task',{
    task:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
});

module.exports = Task