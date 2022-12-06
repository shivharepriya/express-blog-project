const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    password: {
        type:String,
        Required:true
      },
},{timestamps:true})
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel