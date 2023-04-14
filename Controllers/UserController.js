const UserModel = require('../models/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const ContactModel = require('../models/contact');

class UserController{
    static AdminRegister = async(req,res)=>{
        res.render('admin/register', {message:req.flash('error')})
    }

    static Register = async(req,res)=>{
        // console.log(req.body)
        const {name, email, password, confirm_password} = req.body;
        const admin = await UserModel.findOne({email:email})
        if(admin){
            req.flash('error', 'email already exists')
            return res.redirect('/admin/register')
        }
        else{
            if(name && email && password && confirm_password){
               if(password === confirm_password){

                    try{
                        const hashpassword = await bcrypt.hash(password,10)
                        const result = await UserModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                        })
                        
                        await result.save()
                        req.flash('success','Registration successfull, Please login')
                        return res.redirect('/login')

                    }catch(err){
                        console.log(err)
                    }
                }else{
                    req.flash('error', 'password and confirm password does not match')
                    return res.redirect('/admin/register')
                }
            }else{
                req.flash('error', 'All Fields are Required')
                return res.redirect('/admin/register')
            }
        }
    }

    static VerifyLogin = async(req,res)=>{
        try{
            const {email,password}= req.body;
            // console.log(password)
            if(email && password){
               const user = await UserModel.findOne({email:email})
                // console.log(user.password)
                if(user != null){
                    const isMatched = await bcrypt.compare(password,user.password)
                        if((user.email === email) && isMatched){
                            // verify token
                            const token = jwt.sign({ userId: user._id }, 'priya12345');
                            res.cookie('token', token)
                            // console.log(token)
                            res.redirect('/admin/dashboard')
                        }else{
                            req.flash('error','Email or Password is not Valid')
                            return res.redirect('/login')
                        }
                }else{
                    req.flash('error', 'You are not a Registered User')
                    return res.redirect('/login')
                }
            }else{
                req.flash('error', 'All Filed Required!')
                return res.redirect('/login')
            }
        }catch(err){
            console.log(err)
        }
    }

    static Logout = async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }catch(err){
            console.log(err)
        }
    }

    static sendMessage = async(req,res)=>{
        // console.log(req.body)
        const {name, email, phone, message} = req.body;
       
        if(name && email && phone){
            try{
                const sendMessage = await ContactModel({
                    name:name,
                    email:email,
                    phone:phone,
                    message:message,
                })

                await sendMessage.save()
                req.flash('message send','Message send')
                return res.redirect('/contact',)

            }catch(error){
              console.log(error)
            }
        }else{
            req.flash('error', 'All Fileds Required') 
            return res.redirect('/contact')
        }          
    }
}
module.exports = UserController