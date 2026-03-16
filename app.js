const express = require("express");
const app = express();
const productRouter = require("./routes/admin/admin.product.routes");
const publicProducsRouter = require("./routes/public/public.product.routes");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userAuthRoutes = require("./routes/user.auth.routes");
const orderRoutes = require("./routes/public/order.routes");

// Body Parser Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Api Working....");
});
app.get("/test-db", async (req, res) => {
  const [rows] = await pool.query("SELECT 1");
  res.json(rows);
});
// user
app.use("/api/auth", userAuthRoutes);
// admin
app.use("/api/admin", authRoutes);
// Products
app.use("/api/admin/products", productRouter);
// image uploads
app.use("/uploads", express.static("uploads"));
// public
app.use("/api/products", publicProducsRouter);
// orders
app.use("/api/orders", orderRoutes);

module.exports = app;
