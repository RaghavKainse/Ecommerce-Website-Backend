const express = require("express");
const router = express.Router();
const controller = require("../../controllers/product.controller");
const { protectAdmin } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/uploads.middleware");

router.post(
  "/",
  protectAdmin,
  upload.single("image"),
  controller.createProduct,
);
router.get("/", protectAdmin, controller.getAllProducts);
router.delete("/", protectAdmin, controller.removeProducts);

module.exports = router;
