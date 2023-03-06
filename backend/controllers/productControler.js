const products = require("../products.json");
const singleProducts = require("../singleProducts.json");
const customError = require("../errors/error");

const getProducts = (req, res) => {
  // console.log(products);
  return res.status(200).send(products);
};
const getSingleProductd = (req, res) => {
  const product = singleProducts.find((item) => item.id === req.query.id);
  if (product) {
    return res.status(200).send(product);
  }
  throw new customError("product does not found", 404);
};

module.exports = { getProducts, getSingleProductd };
