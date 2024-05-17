const Listing = require("../models/listingModels");
const errorHandler = require("../utils/error");

exports.CreateListing = async (req, res, next) => {
  try {
    const CreateListing = await Listing.create(req.body);
    return res.status(201).json(CreateListing);
  } catch (error) {
    next(error);
  }
};
