const { model, Schema } = require("mongoose");
const CONSTANT  = require("../constant");
const COLLECTION_NAME = CONSTANT.MODELS_NAMES.userAddress;

const UserAddressModel = new Schema({
  userAddress_location: {
    type: String,
    required: [true, "Please provide address location"],
  },
});

module.exports = model(COLLECTION_NAME, UserAddressModel);
