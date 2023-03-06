require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payment");
const productdRoute = require("./routes/products");
const notfoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDb = require("./db/connect.js");

const port = 5000;
// middleware

app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/user", authRoutes);
app.use("/api/v1", productdRoute);

// error handler
app.use(errorMiddleware);
app.use(notfoundMiddleware);

const start = async () => {
  try {
    // console.log(process.emv.SERVER_URL);
    await connectDb(
      "mongodb+srv://Somnath000:som007007@nodeexpressprojects.c4mduyu.mongodb.net/furniture-store?retryWrites=true&w=majority"
    );
    app.listen(port, () => {
      console.log("connected to the database ", port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
