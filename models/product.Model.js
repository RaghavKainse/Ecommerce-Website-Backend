const db = require("../config/db");

exports.createProduct = async (productData) => {
  const { name, description, price, stock, image_url } = productData;
  const [result] = await db.execute(
    "INSERT INTO products(name,description,price,stock,image_url) VALUES (?,?,?,?,?)",
    [name, description, price, stock, image_url]
  );
  return result;
};


exports.getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products ORDER BY created_at DESC");
  return rows;
};
