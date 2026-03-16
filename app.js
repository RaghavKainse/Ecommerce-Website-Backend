const express = require("express");
const app = express();
const productRouter = require("./routes/admin/admin.product.routes");
const publicProducsRouter = require("./routes/public/public.product.routes");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

// Body Parser Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded(true));
app.get("/", (req, res) => {
  res.send("Api Working....");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", authRoutes);
// Products
app.use("/api/admin/products", productRouter);
// image uploads
app.use("/uploads", express.static("uploads"));
// public
app.use("/api/products", publicProducsRouter);

module.exports = app;
