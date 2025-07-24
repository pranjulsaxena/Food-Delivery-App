import express from "express"
import { createCheckOutSession, getOrders, stripeWebhook } from "../controller/order.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";


const router = express.Router();

router.route("/").get(isAuthenticated,getOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated,createCheckOutSession);

export default router;