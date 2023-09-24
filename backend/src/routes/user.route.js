const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers");
const { checkAuthIsUser } = require("../middleware/auth.middleware");

router.route("/getUser/:userId").get(UserController.getUser);
router.use(checkAuthIsUser);
router.route("/update").patch(UserController.updateUser);

module.exports = router;
