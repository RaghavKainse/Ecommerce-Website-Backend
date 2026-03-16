const pool = require("../config/db");

exports.getUserOrder = async (userId) => {
  const [rows] = await pool.query(
    `SELECT id,total_amount,status,created_at FROM orders WHERE user_id=? ORDER BY created_at DESC`,
    [userId],
  );
  return rows;
};

exports.getUserOrderItems = async (orderId) => {
// console.log()
  const [rows] = await pool.query(`
    SELECT
      products.name,
      products.image_url,
      order_items.quantity,
      order_items.price
    FROM order_items
    JOIN products
    ON order_items.product_id = products.id
    WHERE order_items.order_id = ?
  `,[orderId]);
// console.log(rows)
  return rows;
};
