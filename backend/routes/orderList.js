const express = require("express");
const router = express.Router();
const { getAllOrderList } = require("../controllers/orderListControler");
const authentication = require("../middleware/authentication");

router.route("/").get(authentication, getAllOrderList);

module.exports = router;
