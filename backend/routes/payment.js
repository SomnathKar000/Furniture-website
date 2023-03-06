const {
  fillOrderOetails,
  createPayment,
  getPaymentStatus,
} = require("../controllers/paymentControler");
const authentication = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router.route("/").post(authentication, fillOrderOetails);
router.route("/create-checkout-session").post(createPayment);
// router.route("/check-payment-status").get(getPaymentStatus);

module.exports = router;
