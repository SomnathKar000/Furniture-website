const Order = require("../models/orderModule");
const products = require("../products.json");

const getAllOrderList = async (req, res) => {
  const userId = req.user.id;
  const data = await Order.find({ userId: userId });

  res.status(200).send({ success: true, data, products });
};
const getSingleOrderList = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const data = await Order.find({ userId: userId, _id: productId });

  res.status(200).send({ success: true, data, products });
};

module.exports = { getAllOrderList, getSingleOrderList };
