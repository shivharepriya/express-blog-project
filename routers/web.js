const express = require('express')
const router = express.Router()


const AdminController = require('../Controllers/Admin/AdminController')
const FrontendController = require('../Controllers/FrontendController')
const CategoryController = require('../Controllers/Admin/CategoryController')
const UserController = require('../Controllers/UserController')
const CheckUserAuth = require('../middleware/auth')

// Frontend Controller route
router.get('/', FrontendController.home )
router.get('/about', FrontendController.about )
router.get('/contact', FrontendController.contact)
router.get('/blogdetail/:id', FrontendController.blogdetail)
router.get('/bloglist', FrontendController.bloglist)
router.get('/login', FrontendController.login)


// admin controller route
router.get('/admin/dashboard',CheckUserAuth,AdminController.dashboard)
router.get('/admin/blogs',CheckUserAuth, AdminController.blogs)
router.get('/admin/addblogs',CheckUserAuth, AdminController.Addblogs)
router.post('/admin/insert_blog',CheckUserAuth, AdminController.insertblog)
router.get('/admin/blog_view/:id', CheckUserAuth,AdminController.blogview)
router.get('/admin/blog_edit/:id',CheckUserAuth, AdminController.blogEdit)
router.post('/admin/blog_update/:id',CheckUserAuth, AdminController.blogUpdate)
router.get('/admin/blog_delete/:id',CheckUserAuth, AdminController.BlogDelete)



// admin category controller route
router.get('/admin/categorydisplay', CategoryController.Categorydisplay)
router.get('/admin/createcategory', CategoryController.CreateCategory)
router.post('/admin/category_insert', CategoryController.CategoryInsert)
router.get('/admin/view_catalogue/:iidd',CategoryController.ViewCatalogue)
router.get('/admin/edit_catalogue/:Cid', CategoryController.EditCatalogue)
router.post('/admin/update_catalogue/:UCID', CategoryController.UpdateCatalogue)
router.get('/admin/delete_catalogue/:delCatalogue', CategoryController.DeleteCatalogue)

// usercontroller
router.get('/admin/register', UserController.AdminRegister)
router.post('/register', UserController.Register)
router.post('/verify_login', UserController.VerifyLogin)
router.get('/logout', UserController.Logout)
router.post('/sendmessage', UserController.sendMessage);

module.exports = router
