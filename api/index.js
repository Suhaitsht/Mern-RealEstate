const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRouter = require("./Routes/userRoutes");
const AuthRouter = require("./Routes/authRoutes");

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONOGODB)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

app.listen(3000, () => {
  console.log("Server is running port is 3000!");
});
