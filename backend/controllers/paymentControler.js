// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Order = require("../models/orderModule");
const stripe = require("stripe")(
  "sk_test_51MdZfRSH3GkL6hjyIHPzefJK8bVV3zBdI9pg23vZbkfY7LTofCCQ7DcpQv58S34lu8Wlh3tLRDi0iBkHxXIjocDI00ywJ9PxM1"
);
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
  let paymentUrl = "";
  if (paymentMethod !== "cash on delivery") {
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

      success_url: `http://${hostValue}:3000/success`,
      cancel_url: `http://${hostValue}:3000/error`,
    });
    paymentId = session.id;
    paymentUrl = session.url;
  }
  order = await Order.create({
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
    url: paymentUrl,
    paymentId: paymentId,
    // id: order.id,
  });
};
const createPayment = async (req, res) => {
  const items = req.items;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items.map((item) => {
      let product = products.find((e) => e.id === item.productId.split("#")[0]);
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

    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/error`,
  });
  console.log(session);

  res.status(200).json({ url: session.url, paymentId: paymentId });
};

const getPaymentStatus = async (req, res) => {
  const { paymentId } = req.body;
  const payment = await stripe.paymentIntents.retrieve(paymentId);
  const paymentStatus = payment.status;
  res.status(200).json({ paymentStatus });
};

module.exports = { fillOrderOetails, createPayment, getPaymentStatus };
