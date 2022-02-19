const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../Controller/orderController");
const { isAuthenticated, isAdmin } = require("../Middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder)
router.route("/order/:id").get(isAuthenticated, getSingleOrder)
router.route("/orders/me").get(isAuthenticated, myOrders)
router.route("/admin/orders").get(isAuthenticated, isAdmin, getAllOrders)
router.route("/admin/order/update/:id").put(isAuthenticated, isAdmin, updateOrderStatus)
router.route("/admin/order/delete/:id").delete(isAuthenticated, isAdmin, deleteOrder)

module.exports = router;