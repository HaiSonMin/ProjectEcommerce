const express = require("express");
const router = express.Router();
const { AdminController } = require("../controller");
const { checkAuthIsAdmin } = require("../middleware/checkAuth.middleware");

router.use(checkAuthIsAdmin);
// -------------------- User --------------------
router.route("/getUsers").get(AdminController.getAllUsers);
router.route("/getUsersIsBlocking").get(AdminController.getAllUsersIsBlocking);
router.route("/getUser/:userId").get(AdminController.getUserById);
router.route("/search/getUsers").get(AdminController.getUsersByEmailOrUserName);
router.route("/user/block/:userId").patch(AdminController.blockUserById);
router.route("/user/unblock/:userId").patch(AdminController.unblockUserById);
router.route("/user/delete/:userId").delete(AdminController.deleteUserById);

// -------------------- Product --------------------

module.exports = router;
