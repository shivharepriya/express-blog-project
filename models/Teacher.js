const mongoose = require('mongoose')

const TeacherSchema = new mongoose.Schema({ // TeacherSchema = object
    
    name:{ // Schema = field
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    address:{
        type:String,
        Required:true
    }
})
const TeacherModel = mongoose.model('Teacher', TeacherSchema) //TeacherSchema = 
module.exports = TeacherModel  
