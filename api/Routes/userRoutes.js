const express = require("express");
const UserController = require("../Controller/userController");

const router = express.Router();

router.post("/create", UserController.createUser);

module.exports = router;
