const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRouter = require("./Routes/userRoutes");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONOGODB)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", UserRouter);

app.listen(3000, () => {
  console.log("Server is running port is 300!");
});
