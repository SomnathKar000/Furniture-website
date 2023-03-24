const express = require("express");
const router = express.Router();
const {
  getAllOrderList,
  getSingleOrderList,
  checkPaymentStatus,
} = require("../controllers/orderListControler");
const authentication = require("../middleware/authentication");

router.route("/").post(authentication, getAllOrderList);
router.route("/single-order").post(authentication, getSingleOrderList);
router.route("/check").get(checkPaymentStatus);

module.exports = router;
