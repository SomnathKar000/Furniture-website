const express = require("express");
const router = express.Router();
const {
  getAllOrderList,
  getSingleOrderList,
  checkPaymentStatus,
  cancelOrder,
} = require("../controllers/orderListControler");
const authentication = require("../middleware/authentication");

router.route("/").post(authentication, getAllOrderList);
router.route("/single-order").post(authentication, getSingleOrderList);
router.route("/check").get(checkPaymentStatus);
router.route("/cancel-order").patch(authentication, cancelOrder);

module.exports = router;
