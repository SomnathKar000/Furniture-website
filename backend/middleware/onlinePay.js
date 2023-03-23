const stripe = require("stripe")(process.env.REACT_APP_STRIPE_PRIVATE_KEY);
const products = require("../products.json");

const createPayment = async (req, res, next) => {
  const { items } = req.body;
  const online = {
    url: "",
    id: "cash",
  };
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

      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/error`,
    });
    res.online = { ...online, id: session.id, url: session.url };
  }

  next();
};

module.exportd = { createPayment };
