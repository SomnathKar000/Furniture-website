// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require("../models/orderModule");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);
const products = require("../products.json");

const fillOrderOetails = async (req, res) => {
  const { userAddress, items, paymentMethod, totalamount, hostValue } =
    req.body;

  const {
    fullName,
    phoneNo1,
    phoneNo2,
    pincode,
    state,
    city,
    houseNo,
    area,
    landmark,
  } = userAddress;
  let paymentId = "cash";
  let url = "";
  if (paymentMethod !== "cash on delivery") {
    const shippingRate = await stripe.shippingRates.create({
      display_name: "Shipping charge",
      type: "fixed_amount",
      fixed_amount: { amount: 7500, currency: "inr" },
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        let product = products.find(
          (e) => e.id === item.productId.split("#")[0]
        );
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 14,
          },
          quantity: item.quantity,
        };
      }),
      shipping_options: [{ shipping_rate: shippingRate.id }],
      success_url: `http://${hostValue}/success`,
      cancel_url: `http://${hostValue}/error`,
    });
    console.log(session.url, session.id, "Ok");
    paymentId = session.id;
    url = session.url;
  }
  let order = await Order.create({
    userId: req.user.id,
    items: items.map(({ productId, price, quantity }) => ({
      productId,
      price,
      quantity,
    })),
    shippingAddress: {
      fullName: fullName,
      phoneNo1: Number(phoneNo1),
      phoneNo2: Number(phoneNo2),
      pincode: Number(pincode),
      state: state,
      city: city,
      houseNo: houseNo,
      area: area,
      landmark: landmark,
    },
    paymentId: paymentId,
    paymentMethod: paymentMethod,
    totalPrice: totalamount,
    isPaid: false,
    isDelivered: false,
  });

  if (paymentMethod === "cash on delivery") {
    return res.status(200).json({
      success: true,
      msg: "Your order will deliver soon",
      // id: order.id,
    });
  }

  return res.status(200).json({
    success: true,
    url: url,
    paymentId: paymentId,
    // id: order.id,
  });
};

const createPayment = async (req, res) => {
  const shippingRate = await stripe.shippingRates.create({
    display_name: "Shipping charge",
    type: "fixed_amount",
    fixed_amount: { amount: 7500, currency: "inr" },
  });

  const { items, hostValue, totalamount, _id } = req.body;
  let paymentId = "cash";
  let url = "";
  console.log("session");
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        let product = products.find(
          (e) => e.id === item.productId.split("#")[0]
        );
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 14,
          },
          quantity: item.quantity,
        };
      }),
      shipping_options: [{ shipping_rate: shippingRate.id }],
      success_url: `http://${hostValue}/success`,
      cancel_url: `http://${hostValue}/error`,
    });
    console.log("after session");
    console.log(session.url, session.id, "Ok");
    paymentId = session.id;
    url = session.url;
    await Order.findByIdAndUpdate(_id, {
      paymentId: paymentId,
      upToDate: false,
    });

    res.status(200).json({ success: true, url: session.url, paymentId });
  } catch (error) {
    console.log(error);
    res.status(500).send("some error");
  }
};

const getPaymentStatus = async (req, res) => {
  const { paymentId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(paymentId);
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
};

module.exports = { fillOrderOetails, createPayment, getPaymentStatus };
