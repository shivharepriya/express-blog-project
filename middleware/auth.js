const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const CheckUserAuth = async(req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token)
    if(!token){
        req.flash('error', 'Unauthorized User! please Login')
        return res.redirect('/login')
    }else{
        const verify_login = jwt.verify(token,'priya12345')
        // console.log(verify_login)
        //  console.log(verify_login.userId)
         const data = await UserModel.findOne({_id:verify_login.userId})
        //  console.log(data)
        req.data1 = data;
        next()
    }
}
module.exports = CheckUserAuth