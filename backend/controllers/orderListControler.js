const Order = require("../models/orderModule");
const products = require("../products.json");
const addImage = (e) => {
  let addImageItems = e.map((item) => {
    let Pid = item.productId.split("#")[0];
    let product = products.find((ele) => ele.id === Pid);
    const image = product.image;
    return { ...item, image: image };
  });
  return addImageItems;
};

const getAllOrderList = async (req, res) => {
  const userId = req.user.id;
  const data = await Order.find({ userId: userId });
  data.map((product) => {
    const itemsWithImage = addImage(product.items);
    product.items = itemsWithImage;
    return product;
  });
  res.status(200).send({ success: true, data });
};

module.exports = { getAllOrderList };
