const express = require("express");
const UserController = require("../Controller/userController");
const VerifyUser = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", UserController.createUser);
router.post("/update/:id", VerifyUser.VerifyToken, UserController.updateUser);

module.exports = router;
