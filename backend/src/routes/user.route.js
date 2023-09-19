const express = require("express");
const router = express.Router();
const { UserController } = require("../controllers");
const { checkAuthIsUser } = require("../middleware/auth.middleware");

router.route("/checkUser").post(UserController.checkUser);
router.use(checkAuthIsUser);
router.route("/update").patch(UserController.updateUser);

module.exports = router;
