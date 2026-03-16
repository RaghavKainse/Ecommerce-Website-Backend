const producModel = require("../models/product.Model");

// Add Products
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !price || stock == null) {
      return res.status(400).json({
        message: "Name, price and stock required",
      });
    } 

    // Get uploaded file path
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await producModel.createProduct({
      name,
      description,
      price,
      stock,
      image_url,
    });

    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

// get All Products

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await producModel.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Delete Products

exports.removeProducts=async (req,res,next)=>{
  try{
    const removed= await producModel.removeProduct;
    res.status(200).json({message:"Product Deleted Succesfully"})
  }catch(error){
    next(error)
  }
}