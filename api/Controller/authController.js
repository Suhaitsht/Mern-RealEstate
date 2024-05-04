const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

exports.userSignup = async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 16);
  try {
    const newUser = await User.create({
      username,
      password: hashPassword,
      email,
    });
    res.status(200).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

exports.UserSignin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"));
    const { password: pass, ...rest } = validUser._doc;

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
