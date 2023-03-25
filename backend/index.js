require("dotenv").config();
require("express-async-errors");

// const asyncErrors = require("express-async-errors");

const cors = require("cors");
const express = require("express");
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
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

// app.use(asyncErrors());

// error handler
app.use(errorMiddleware);
app.use(notfoundMiddleware);

const dirName = path.dirname(__dirname);
const fileName = path.join(dirName, "/src/utils/constants.js");
const content = readFileSync(fileName, "utf-8");
const reactPort = content.split("// Split")[1].split("=")[1].slice(1, 5);

const start = async () => {
  try {
    // await connectDb(process.env.DB_URL);
    await connectDb(
      "mongodb+srv://Somnath000:som007007@nodeexpressprojects.c4mduyu.mongodb.net/furniture-store?retryWrites=true&w=majority"
    );
    const server = app.listen(port, () => {
      // My port value
      const newPortValue = server.address().port;

      // // Updating the port value in frontend
      if (Number(reactPort) !== newPortValue) {
        const newContent = content.replace(
          /const portValue = \d+/g,
          `const portValue = ${newPortValue};`
        );

        writeFileSync(fileName, newContent);
      }
      console.log(content);
      console.log(fileName);
      console.log(
        "New port value " + newPortValue + ", Frontend port value " + reactPort
      );
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
