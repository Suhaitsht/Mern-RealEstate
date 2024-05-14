const User = require("../models/user");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");

exports.createUser = (req, res) => {
  res.status(200).json({
    messages: "This route is not implemented",
  });
};

exports.updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update your own account "));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 16);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete  your own account"));
  try {
    const userDelete = await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been deleted Successfully");
  } catch (error) {
    next(error);
  }
};
