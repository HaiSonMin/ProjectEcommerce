const express = require("express");
const router = express.Router();
const { UserController } = require("../controller");
const { checkAuthIsUser } = require("../middleware/checkAuth.middleware");

router.use(checkAuthIsUser);
router.route("/update").patch(UserController.updateUser);

module.exports = router;
