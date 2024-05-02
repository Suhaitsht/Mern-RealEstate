const User = require("../models/user");
const bcryptjs = require("bcryptjs");

exports.userSignup = async (req, res) => {
  const { username, password, email } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 16);
  const newUser = await User.create({
    username,
    password: hashPassword,
    email,
  });
  res.status(200).json({
    user: newUser,
  });
};
