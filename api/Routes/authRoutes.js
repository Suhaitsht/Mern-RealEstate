const express = require("express");
const authController = require("../Controller/authController");

const router = express.Router();

router.post("/signup", authController.userSignup);
router.post("/signin", authController.UserSignin);
router.post("/google", authController.Google);
router.get("/signout", authController.userSignOut);

module.exports = router;
