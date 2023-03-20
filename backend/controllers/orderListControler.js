const Order = require("../models/orderModule");
const products = require("../products.json");
const stripe = require("stripe")(
  "sk_test_51MdZfRSH3GkL6hjyIHPzefJK8bVV3zBdI9pg23vZbkfY7LTofCCQ7DcpQv58S34lu8Wlh3tLRDi0iBkHxXIjocDI00ywJ9PxM1"
);
const createPaymentIntent = async (amount, currency) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  return paymentIntent;
};

const checkPaymentStatus = async (req, res) => {
  const { paymentId } = req.body; // assuming the payment ID is passed in the URL params

  const paymentIntent = await createPaymentIntent(100, "inr");
  res.send(paymentIntent);
  // try {
  //   const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
  //   const paymentStatus = paymentIntent.status;
  //   res.status(200).send(paymentStatus);
  // } catch (error) {
  //   console.log(error);
  //   res.status(404).send("Not found" + paymentId);
  // }
  try {
    const payment = await stripe.paymentIntents.retrieve(paymentId);
    if (payment.status === "succeeded") {
      // Payment succeeded
      res.status(200).send("Success");
    } else if (payment.status === "requires_payment_method") {
      // Payment requires additional action
      res.status(402).send("Payment requires additional action.");
    } else {
      // Payment failed
      res.status(400).send("Payment failed.");
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("An error occurred while checking the payment status.");
  }
};

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

module.exports = { getAllOrderList, getSingleOrderList, checkPaymentStatus };
