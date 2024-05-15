const express = require("express");
const listing = require("../Controller/listingController");
const Verify = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", Verify.VerifyToken, listing.CreateListing);

module.exports = router;
