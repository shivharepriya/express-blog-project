const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/Category')
const ContactModel = require('../models/contact')

class FrontendController{

    static home = async(req, res)=>{
        try{
            // const blog_data = await BlogModel.find()
            // console.log(blog_data)
            const blog_data = await BlogModel.find().sort({_id:-1}).limit(8)
            res.render('front/home',{d:blog_data})
        }catch(err){
            console.log(err)
        }      
    }
    
    static about = async(req,res)=>{
        res.render('front/about')
    }

    static contact = async(req,res)=>{
        // const contactData = await ContactModel.find()
        // console.log(contactData);
        res.render('front/contact',{message:req.flash('message send'), error:req.flash('error')}) 
    }

    static blogdetail = async(req,res)=>{
       try{
         // console.log(req.params.id)
         const category = await CategoryModel.find().sort({_id:-1})
         //  console.log(category)
         const recentblog = await BlogModel.find().sort({_id:-1}).limit(4)
         const detail = await BlogModel.findById(req.params.id)
         // console.log(detail)
         res.render('front/blogdetail',{d:detail,c:category,r:recentblog})
        }catch(err){
          console.log(err)
        }
    }

    static bloglist = async(req,res)=>{
        try{
            const bloglist = await BlogModel.find().sort({_id:-1})
            // console.log(bloglist)
            res.render('front/bloglist',{blogL:bloglist})
        }catch(err){
            console.log(err)
        }
       
    }

    static login = async(req,res)=>{
        res.render('front/login',{message:req.flash('success'), error:req.flash('error')})
    }

}

module.exports = FrontendController