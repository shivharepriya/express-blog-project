const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({

    title:{
        type:String,
        Required:true
    },
    description:{
        type:String,
        Required:true
    },
    image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
},{timestamps:true})
const BlogModel = mongoose.model('blog', BlogSchema)

module.exports = BlogModel