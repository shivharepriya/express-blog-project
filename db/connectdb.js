const mongoose = require('mongoose')
const url ='mongodb+srv://priyashivhare:1029priya@cluster0.opbng5r.mongodb.net/blogProjectdb?retryWrites=true&w=majority' 
const connectDB = ()=>{

    // return mongoose.connect('mongodb://localhost:27017/blog_project')
    return mongoose.connect(url)
    .then(()=>{
        console.log('connected successfully')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB