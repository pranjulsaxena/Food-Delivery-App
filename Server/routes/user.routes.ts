import express, { Request,Response } from "express";
import {
  signup,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
  updateProfile,
} from "../controller/user.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
const router = express.Router();

router.route("/check-auth").post(isAuthenticated, checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/profile/update").put(isAuthenticated, updateProfile);

export default router;
