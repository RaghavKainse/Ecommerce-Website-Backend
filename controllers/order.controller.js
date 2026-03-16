const pool = require("../config/db");
const order = require("../models/order.Model");

exports.createOrder = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    console.log("hiiii");
    const { items, total } = req.body;
    // console.log(items)
    const userId = req.user.id;

    await connection.beginTransaction();
    const [orderResult] = await connection.query(
      "INSERT INTO orders(user_id,total_amount) VALUES(?,?)",
      [userId, total],
    );
    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items(order_id,product_id,quantity,price) VALUES(?,?,?,?)`,
        [orderId, item.id, item.quantity, item.price],
      );
    }
    await connection.commit();
    res.status(201).json({ meassage: "Order created", orderId });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

exports.userOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await order.getUserOrder(userId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getUserOrderItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id ,'from get user orders')
    const items =await order.getUserOrderItems(id);
    // console.log(items)
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// exports.getUserOrders = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const [orders] = await pool.query(
//       `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
//       [userId],
//     );
//     res.json(orders);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getUserOrderItems = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const [items] = await pool.query(
//       `SELECT
//         order_items.quantity,
//         order_items.price,
//         products.name,
//         products.image_url
//        FROM order_items
//        JOIN products
//        ON order_items.product_id = products.id
//        WHERE order_items.order_id = ?`,
//       [id],
//     );

//     res.json(items);
//   } catch (error) {
//     next(error);
//   }
// };
