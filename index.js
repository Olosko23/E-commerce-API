const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/Cart");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth.js");
//const stripeRoute = require('./routes/stripe');
//const port = process.env.PORT;
//const url = process.env.MONGO_URL;

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
app.use(cors());
app.use(express.json());

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo DB Connected!");
  } catch (error) {
    console.log("Mongo DB Connection Failed! Possible Cause: " + error);
  }
};
DBconnect();



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
//app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend Server Running");
});
