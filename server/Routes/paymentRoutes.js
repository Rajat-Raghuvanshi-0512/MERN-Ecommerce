const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../Middleware/auth");
const { processPayment, stripeApiKey } = require("../Controller/paymentController");

router.route("/payment/process").post(isAuthenticated, processPayment)
router.route("/payment/apikey").get(isAuthenticated, stripeApiKey)

module.exports = router;