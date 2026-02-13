const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const {protectAdmin}=require('../middleware/auth.middleware')

router.post("/",protectAdmin, controller.addProduct);
router.get("/",protectAdmin,controller.getAllProducts)

module.exports = router;
