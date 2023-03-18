const express = require("express");
const router = express.Router();
const {
  getAllOrderList,
  getSingleOrderList,
} = require("../controllers/orderListControler");
const authentication = require("../middleware/authentication");

router.route("/").post(authentication, getAllOrderList);
router.route("/single-order").post(authentication, getSingleOrderList);

module.exports = router;
