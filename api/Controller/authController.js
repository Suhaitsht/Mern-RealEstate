const User = require("../models/user");
const bcryptjs = require("bcryptjs");

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
