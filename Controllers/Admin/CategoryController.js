const cloudinary = require('cloudinary').v2
const categoryModel = require('../../models/Category')

cloudinary.config({ 
  cloud_name: 'desy4zkbm', 
  api_key: '112322991571153', 
  api_secret: 'y4Lp1Gc6UyOX6At32lUdAisTXiA',
});


class CategoryController{

    static Categorydisplay = async(req,res)=>{
      const data1 = await categoryModel.find()
      // console.log(data1)
      res.render('admin/category/categorydisplay',{d:data1})
    }

    static CreateCategory = async(req,res)=>{
        res.render('admin/category/createcategory')
    }

    static CategoryInsert = async(req,res)=>{
        // console.log(req.body);
        // console.log(req.files);
        const catalogueimages = req.files.catalogue_image
        // console.log(catalogueimages);
        const cataImage_upload = await cloudinary.uploader.upload(catalogueimages.tempFilePath,{
          folder:'cat_images'
        })
        try{
          const result = new categoryModel({
            title:req.body.title,
            description:req.body.description,
            name:req.body.name,
            email:req.body.email,
            catalogueImage:{
              public_id:cataImage_upload.public_id,
              url:cataImage_upload.secure_url,
            },
          })
          await result.save()
          res.redirect('/admin/categorydisplay') // route url so we can get back on some page after submitting the form
        }catch(err){
          console.log(err);
        }
    }

    static ViewCatalogue = async(req,res)=>{
      const d = await categoryModel.findById(req.params.iidd)
      // console.log(d);
      // console.log(req.params.iidd);
      res.render('admin/category/catalogueview',{data:d})
    }

    static EditCatalogue = async(req,res)=>{
      const EditCatalogue = await categoryModel.findById(req.params.Cid)
      // console.log(EditCatalogue); //isse console me voh data show ho rha hai jisse hum edit krna chahte h 
      // console.log(req.params.Cid); // isse uss data ki id show ho rhi hai jo edit ho rhi hai.
      res.render('admin/category/catalogueedit',{data:EditCatalogue})
    }

    static UpdateCatalogue = async(req,res)=>{
      // console.log(req.body) //isse update wala data console me show ho rha hai.
      // console.log(req.params.UCID); //isse console me update wale data ki id show ho rhi hai
      try{
        
        const catalogue_img = await categoryModel.findById(req.params.UCID)
        const catalogueimgfiles = catalogue_img.catalogueImage.public_id
        // console.log(catalogueimgfiles);
        await cloudinary.uploader.destroy(catalogueimgfiles);
        const catalogueimages = req.files.catalogue_image
        const cataImage_upload = await cloudinary.uploader.upload(catalogueimages.tempFilePath,{
          folder:'cat_images'
        })
        const updatecataloguedata = await categoryModel.findByIdAndUpdate(req.params.UCID,{
          title:req.body.title,
          description:req.body.description,
          name:req.body.name,
          email:req.body.email,
          catalogueImage:{
            public_id:cataImage_upload.public_id,
            url:cataImage_upload.secure_url,
          }  
        })
        await updatecataloguedata.save()
        res.redirect('/admin/categorydisplay')
      }catch(err){
        console.log(err)
      }
    }

    static DeleteCatalogue = async(req,res)=>{
      // console.log(req.params.delCatalogue)
      try{
        const catalogue_img = await categoryModel.findById(req.params.delCatalogue)
        const catalogueimgfiles = catalogue_img.catalogueImage.public_id
        // console.log(catalogueimgfiles);
        await cloudinary.uploader.destroy(catalogueimgfiles);
        const cataloguedel = await categoryModel.findByIdAndDelete(req.params.delCatalogue)
        res.redirect('/admin/categorydisplay')
      }catch(err){
        console.log(err)
      }
    }
}

module.exports = CategoryController