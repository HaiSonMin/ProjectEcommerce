const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const CLOUD_NAME = "dbpldobhx";
const STORE_NAME = "FullStackWebEcommerce";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jgp", "png"],
  params: {
    folder: `${STORE_NAME}/Brands`,
  },
});

const uploadCloud = multer({
  storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

module.exports = uploadCloud;
