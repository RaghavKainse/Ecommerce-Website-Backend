const express = require("express");
const router = express.Router();
const { createOrder,userOrder,getUserOrderItems } = require("../../controllers/order.controller");
const { protectUser } = require("../../middleware/auth.middleware");

router.post("/", protectUser, createOrder);
router.get('/my-orders',protectUser,userOrder)
router.get('/my-orders/:id',protectUser,getUserOrderItems)

module.exports = router;