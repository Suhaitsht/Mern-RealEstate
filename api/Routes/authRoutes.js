const express = require("express");
const authController = require("../Controller/authController");

const router = express.Router();

router.post("/signup", authController.userSignup);
router.post("/signin", authController.UserSignin);

module.exports = router;
