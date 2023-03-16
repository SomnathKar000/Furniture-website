const Order = require("../models/orderModule");

const getAllOrderList = async (req, res) => {
  const userId = req.user.id;
  const data = await Order.find({ userId: userId });
  res.status(200).send({ success: true, data });
};

module.exports = { getAllOrderList };
