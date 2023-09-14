const { model, Schema } = require("mongoose");
const constant = require("../utils/constant");
const COLLECTION_NAME = constant.MODELS_NAMES.userAddress;

const UserAddressModel = new Schema({
  userAddress_location: {
    type: String,
    required: [true, "Please provide address location"],
  },
});

module.exports = model(COLLECTION_NAME, UserAddressModel);
