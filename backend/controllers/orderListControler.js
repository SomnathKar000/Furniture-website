const Order = require("../models/orderModule");

const getAllOrderList = (req, res) => {
  res.status(200).send({ success: true, msg: "done" });
};

module.exports = { getAllOrderList };
