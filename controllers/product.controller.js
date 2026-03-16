const { error } = require("console");
const producModel = require("../models/product.Model");
const fs = require("fs");
const path = require("path");

// Add Products
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !price || !category || stock == null) {
      return res.status(400).json({
        message: "Name, price, stock and category required",
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
      category,
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

exports.deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await producModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image_url) {
      const imagePath = path.join(
        __dirname,
        "..",
        product.image_url.replace(/^\//, ""),
      );
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.log("Image delete error", err.message);
      }
    }

    // delete row
    await producModel.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// updateProduct

exports.updateProduct = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const existingProduct = await producModel.getProductById(id);
    if (!existingProduct) {
      res.setatus(404).json({ message: "Product not fount " });
    }

    let image_url = existingProduct.image_url;
    if (req.file) {
      if (existingProduct.image_url) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          existingProduct.image_url,
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.log("Old image delete error:", err.message);
          }
        });
      }
      image_url = `/uploads/${req.file.filename}`;
    }
    await producModel.updateProduct(id, {
      name,
      description,
      price,
      stock,
      image_url,
    });

    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await producModel.getProductsByCategory(category);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const product = await producModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
