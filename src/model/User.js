
const mongoose=require('mongoose')

const UserShcema=mongoose.Schema({
    email:{
        type:String,
        unique:true,
        lowercase:true,
       required:true
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
    type:String,
    required:true,
    unique:true
    },
},{
    timestamps:true,
    versionKey:false
})

 const User=mongoose.model('user',UserShcema)
 module.exports={User}