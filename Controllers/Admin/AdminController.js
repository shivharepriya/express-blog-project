const cloudinary = require('cloudinary').v2
const BlogModel = require('../../models/Blog')
const TeacherModel = require('../../models/Teacher')

cloudinary.config({ 
  cloud_name: 'desy4zkbm', 
  api_key: '112322991571153', 
  api_secret: 'y4Lp1Gc6UyOX6At32lUdAisTXiA',
});

 

class AdminController{
  static dashboard = async(req, res)=>{
    const{name,email} = req.data1;
    res.render('admin/dashboard',{n:name,e:email})
  }

  static blogs = async(req,res)=>{
    const getdata = await BlogModel.find()
    // console.log(getdata);
    res.render('admin/blog/blogdisplay',{d:getdata})
  }

  static Addblogs = async(req,res)=>{
    res.render('admin/blog/addblogs')
  }

  static insertblog = async(req,res)=>{
    // console.log(req.body);
    // console.log(req.files)
    const imagefile = req.files.blog_image
    // console.log(imagefile)
    const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
      folder:'Blog_images',
      width:400,
    })
    try{
      const result = new BlogModel({
        title:req.body.title,
        description:req.body.description,
        image: {
          public_id: image_upload.public_id,
          url: image_upload.secure_url,
        },
      })
      await result.save()
      res.redirect('/admin/blogs') // => route url
    }catch(err){
      console.log(err);
    }
  }

  static blogview = async(req,res)=>{
    const data = await BlogModel.findById(req.params.id)
    // console.log(req.params.id)
    // console.log(data)
    res.render('admin/blog/blogview',{viewdata:data})
  }

  static blogEdit = async(req,res)=>{
    const data = await BlogModel.findById(req.params.id)
    // console.log(req.params.id)
    // console.log(data)
    res.render('admin/blog/blogedit',{editdata:data})
  }

  static blogUpdate = async(req,res)=>{
    // console.log(req.body)
    // console.log(req.params.id)
    try{
      const user = await BlogModel.findById(req.params.id)
      const image_id = user.image.public_id;
      // console.log(image_id);
      await cloudinary.uploader.destroy(image_id)
      const imagefile = req.files.blog_image
      const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
        folder:'Blog_images',
        width:400,
      })
      const data = await BlogModel.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        description:req.body.description,
        image:{
          public_id: image_upload.public_id,
          url:image_upload.secure_url,
        },
      })
      await data.save()
      res.redirect('/admin/blogs')
    }catch(err){
      console.log(err)
    }
  }
  
  static BlogDelete = async(req,res)=>{
    // console.log(req.params.id)
    try{
      const user = await BlogModel.findById(req.params.id)
      const image_id = user.image.public_id;
      // console.log(image_id);
      await cloudinary.uploader.destroy(image_id)
    const result = await BlogModel.findByIdAndDelete(req.params.id)
    res.redirect('/admin/blogs')
    
    }catch(err){
      console.log(err)
    } 
  }
}

module.exports = AdminController