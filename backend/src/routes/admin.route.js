const express = require("express");
const router = express.Router();
const { AdminController } = require("../controllers");
const { checkAuthIsAdmin } = require("../middleware/auth.middleware");

router.use(checkAuthIsAdmin);
// -------------------- User --------------------
router.route("/createEmployees").post(AdminController.createEmployees);
router.route("/getAllUsers").get(AdminController.getAllUsers);
router.route("/getUsersIsBlocking").get(AdminController.getAllUsersIsBlocking);
router.route("/search").get(AdminController.getUsersByEmailOrUserName);
router.route("/update/:userId").patch(AdminController.updateUserById);
router.route("/deleteUser/:userId").delete(AdminController.deleteUserById);

// -------------------- Product --------------------

module.exports = router;
