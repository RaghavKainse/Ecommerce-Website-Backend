const producModel = require("../models/product.Model");

// Add Products
exports.addProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, description, price, stock, image_url } = req.body;
    if (!name || !price || !stock || !image_url == null) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    const result = await producModel.createProduct({
      name,
      description,
      price,
      stock,
      image_url,
    });
    return res.status(201).json({
      message: "Product Created Successfully",
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
