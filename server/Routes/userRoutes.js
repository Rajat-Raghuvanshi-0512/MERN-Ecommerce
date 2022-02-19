const express = require("express");
const router = express.Router();
const { signup, login, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser, getUserPhoto } = require("../Controller/userController");
const { isAuthenticated, isAdmin } = require('../Middleware/auth');

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/photo/:id").get(getUserPhoto);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

// User's profile routes
router.route("/aboutme").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);

// Admin routes
router.route("/admin/users").get(isAuthenticated, isAdmin, getAllUsers);
router.route("/admin/user/:id").get(isAuthenticated, isAdmin, getSingleUser).put(isAuthenticated, isAdmin, updateUserRole).delete(isAuthenticated, isAdmin, deleteUser)


module.exports = router;