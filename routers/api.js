const express = require('express')
const BlogController = require('../Controllers/Api/BlogController')
const UsersContoller = require('../Controllers/Api/UsersController')
const router = express.Router()




router.get('/blogs', BlogController.Blogs)
router.post('/bloginsert', BlogController.BlogInsert)
router.get('/blogview/:id', BlogController.blogView)
router.post('/blogupdate/:id', BlogController.blogUpdate)
router.get('/blogdelete/:Id', BlogController.blogDelete)


// userscontroller 
router.post('/register', UsersContoller.Register)
router.post('/verifylogin',UsersContoller.VerifyLogin)
router.get('/logout', UsersContoller.Logout)



module.exports = router;