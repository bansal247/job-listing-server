const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.ObjectId,
        auto:true,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    mobile:{
        type:String,
        maxLength:10,
        minLength:10,
        unique:true
    }
});

module.exports = mongoose.model("User",userSchema)
