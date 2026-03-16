const db = require("../config/db");

exports.createProduct = async (productData) => {
  const { name, description, price, stock, image_url , category} = productData;
  const [result] = await db.execute(
    "INSERT INTO products(name,description,price,stock,image_url,category) VALUES (?,?,?,?,?,?)",
    [name, description, price, stock, image_url, category],
  );
  return result;
};

exports.getAllProducts = async () => {
  const [rows] = await db.query(
    "SELECT * FROM products ORDER BY created_at DESC",
  );
  return rows;
};

// getProductById

exports.getProductById = async (id) => {
  const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};


// delete 
exports.deleteProduct = async (id) => {
  const [result] = await db.query("DELETE FROM products where id= ?", [id]);
  return result;
};


// update
exports.updateProduct = async (id, product) => {
  const { name, description, price, stock, image_url } = product;
  const [result] = await db.query(
    "UPDATE products SET name=? ,description=?,price=?,stock=?,image_url=? WHERE id=?",
    [name, description, price, stock, image_url, id],
  );
  return result;
};

// get Products category

exports.getProductsByCategory = async (category) => {
  const [rows] = await db.query(
    "SELECT * FROM products WHERE category= ? ORDER BY created_at DESC",
    [category],
  );
  return rows;
};
