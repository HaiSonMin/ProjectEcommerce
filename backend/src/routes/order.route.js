const express = require("express");
const router = express.Router();
const { OrderController } = require("../controllers");

router.route("/create").post(OrderController.createOrder);
router.route("/getAll").get(OrderController.getAllOrders);
router.route("/getById/:orderId").get(OrderController.getOneOrder);
router.route("/search").get(OrderController.searchOrders);
router.route("/update/:orderId").patch(OrderController.updateOrder);
router.route("/delete/:orderId").delete(OrderController.deleteOrder);

module.exports = router;
