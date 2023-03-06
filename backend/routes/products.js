const {
  getSingleProductd,
  getProducts,
} = require("../controllers/productControler");
const express = require("express");
const router = express.Router();
router.route("/store-products").get(getProducts);
router.route("/store-single-products").get(getSingleProductd);

module.exports = router;
