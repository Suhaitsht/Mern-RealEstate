const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRouter = require("./Routes/userRoutes");
const AuthRouter = require("./Routes/authRoutes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
