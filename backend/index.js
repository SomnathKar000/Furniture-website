require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const productdRoute = require("./routes/products");
const orderListRoute = require("./routes/orderList");
const notfoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDb = require("./db/connect.js");

const port = process.env.REACT_APP_BACKEND_PORT || 5000;
// middleware

app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/user", authRoutes);
app.use("/api/v1", productdRoute);
app.use("/api/v1/orders", orderListRoute);

// error handler
app.use(errorMiddleware);
app.use(notfoundMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.REACT_APP_DB_URL);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
