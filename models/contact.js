const mongoose = require ('mongoose')

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    phone:{
        type:String,
        Required:true
    },
    message:{
        type:String,
        Required:true
    },
})

const ContactModel = new mongoose.model('contact', ContactSchema);
module.exports = ContactModel