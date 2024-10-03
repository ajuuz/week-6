const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/week6-project')
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.error(err))

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pendingTopics:{
        type:[String]
    }
})


const adminSchema = new mongoose.Schema({
    adminname:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const User = mongoose.model("user",userSchema);
const Admin = mongoose.model("admin",adminSchema);

module.exports = {
    User,Admin
}