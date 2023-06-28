const Order = require("../models/orderModule");
const products = require("../products.json");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);

const createPaymentIntent = async (amount, currency) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
  });
  return paymentIntent;
};

const checkPaymentStatus = async (req, res) => {
  const { paymentId } = req.body; // assuming the payment ID is passed in the URL params

  // const paymentIntent = await createPaymentIntent(100, "inr");
  // res.send(paymentIntent);
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

const checkPayment = async (id) => {
  const session = await stripe.checkout.sessions.retrieve(id);

  if (session.payment_intent) {
    const payment = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );

    if (payment.status === "succeeded") {
      await Order.findOneAndUpdate(
        { paymentId: id },
        { upToDate: true, isPaid: true, paymentStatus: "Success" }
      );
    } else if (payment.status === "requires_payment_method") {
      await Order.findOneAndUpdate(
        { paymentId: id },
        { upToDate: true, isPaid: false, paymentStatus: "Payment required" }
      );
    } else {
      await Order.findOneAndUpdate(
        { paymentId: id },
        { upToDate: true, isPaid: false, paymentStatus: "Payment failed" }
      );
    }
  } else {
    await Order.findOneAndUpdate(
      { paymentId: id },
      { upToDate: true, isPaid: false, paymentStatus: "Payment required" }
    );
  }
};

const getAllOrderList = async (req, res) => {
  try {
    const userId = req.user.id;
    const responce = await Order.find({ userId: userId });

    await Promise.all(
      responce.map(async (order) => {
        if (!order.upToDate) {
          if (order.paymentId !== null && order.paymentId !== "cash") {
            await checkPayment(order.paymentId);
          }
          return order;
        } else {
          return order;
        }
      })
    );
    const data = await Order.find({ userId: userId });
    res.status(200).send({ success: true, data, products });
  } catch (error) {
    console.log(error);
    res.status(404).send("some error");
  }
};

const getSingleOrderList = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const data = await Order.find({ userId: userId, _id: productId });

  // check the payment status

  try {
    const session = await stripe.checkout.sessions.retrieve(data.paymentId);
    const payment = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );
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

    res.status(200).json({ session });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("An error occurred while checking the payment status.");
  }

  res.status(200).send({ success: true, data, products });
};

const cancelOrder = async (req, res) => {
  const { productId } = req.body;

  await Order.findByIdAndUpdate(productId, {
    orderStatus: "Canceled",
  });

  res.status(200).send({ success: true, msg: "Order cancelled" });
};

module.exports = {
  getAllOrderList,
  getSingleOrderList,
  checkPaymentStatus,
  cancelOrder,
};
