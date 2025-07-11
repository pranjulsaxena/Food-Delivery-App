import express from "express"
import { createCheckOutSession, getOrders } from "../controller/order.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = express.Router();

router.route("/").get(isAuthenticated,getOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckOutSession);
router.route("/webhook").post();

export default router;