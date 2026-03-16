const express=require('express')
const router=express.Router()
const {getAllProducts,getProductsByCategory,getSingleProduct}=require('../../controllers/product.controller')


router.get("/",getAllProducts)
router.get("/category/:category", getProductsByCategory);
router.get("/:id",getSingleProduct)

module.exports=router