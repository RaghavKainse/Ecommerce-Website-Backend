const db = require("../config/db");

exports.createProduct = async (productData) => {
  const { name, description, price, stock, image_url } = productData;
  console.log(image_url);
  const [result] = await db.execute(
    "INSERT INTO products(name,description,price,stock,image_url) VALUES (?,?,?,?,?)",
    [name, description, price, stock, image_url],
  );
  return result;
};

exports.getAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC",
  );
  return rows;
};

exports.deleteProduct = async () => {
  const [rows] = await db.query("DELETE FROM products where id= ?",[id]);
  return rows[0];
};
