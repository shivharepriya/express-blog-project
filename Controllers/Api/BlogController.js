const BlogModel = require('../../models/Blog')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'desy4zkbm',
    api_key: '112322991571153',
    api_secret: 'y4Lp1Gc6UyOX6At32lUdAisTXiA',
});

class BlogController {
    static Blogs = async (req, res) => {
        try {
            const blogs = await BlogModel.find()
            res.status(200).json({
                success: true,
                blogs
            })
        } catch (err) {
            console.log(err)
        }
    }

    static BlogInsert = async (req, res) => {

        const Blogimages = req.files.image
        const blogImage_upload = await cloudinary.uploader.upload(Blogimages.tempFilePath, {
            folder: 'Blog_images'
        })
        try {
            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: blogImage_upload.public_id,
                    url: blogImage_upload.secure_url,
                },
            })

            await result.save()
            res
                .status(201)
                .send({
                    status: "success",
                    message: "Registration Successfully 😃🍻",
                    Image: blogImage_upload.secure_url,
                });

        } catch (err) {
            console.log(err);
        }
    }

    static blogView = async (req, res) => {
        try {
            const viewdata = await BlogModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                viewdata,
            });
        } catch (err) {
            console.log(err)
        }
    }

    static blogUpdate = async (req, res) => {
        try {
            const updateimage = await BlogModel.findById(req.params.id)
            const imageId = updateimage.image.public_id;
            // console.log(imageId); //getting imgId
            await cloudinary.uploader.destroy(imageId); //delete image then update
            const Blogimages = req.files.image;
            // console.log(imagefile)
            const blogImage_upload = await cloudinary.uploader.upload(Blogimages.tempFilePath, {
                folder: "Blog_images",
                width: 400,
            });
            const update = await BlogModel.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                description: req.body.description,
                image: {
                    public_id: blogImage_upload.public_id,
                    url: blogImage_upload.secure_url,
                },
            })
            //saving data
            await update.save();
            res.status(200).send({
                status: "success",
                message: "Update Successfully 😃🍻",
                Image: blogImage_upload.secure_url,
            });
        } catch (err) {
            console.log(err)
        }
    }

    static blogDelete = async (req, res) => {
        try {
            const deleteBlogData = await BlogModel.findById(req.params.Id)
            const image_id = deleteBlogData.image.public_id;
            await cloudinary.uploader.destroy(image_id);

            const deleteData = await BlogModel.findByIdAndDelete(req.params.Id)
            res.send({status:204, message:"deleted successfully"}) //204 is no content
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = BlogController