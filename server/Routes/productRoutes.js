const express = require('express');
const router = express.Router();
const { addNewProduct, getProducts, updateProduct, deleteProduct, addReview, getAllReviews, deleteReview, getSingleProduct, getAdminProducts } = require('../Controller/productController');
const { isAuthenticated, isAdmin } = require('../Middleware/auth');

router.route("/products").get(getProducts)
router.route("/product/:id").get(getSingleProduct)
router.route("/addreview").put(isAuthenticated, addReview)
router.route("/reviews").get(getAllReviews).delete(isAuthenticated, deleteReview)

// Admin routes
router.route("/admin/products").get(isAuthenticated, isAdmin, getAdminProducts)
router.route("/newproduct").post(isAuthenticated, isAdmin, addNewProduct)
router.route("/updateproduct/:id").put(isAuthenticated, isAdmin, updateProduct)
router.route("/deleteproduct/:id").delete(isAuthenticated, isAdmin, deleteProduct)

module.exports = router;