import express from "express"
import { createCheckOutSession, getOrders, stripeWebhook } from "../controller/order.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";


const router = express.Router();


/**
 * @swagger
 * /api/v1/order/:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     description: Returns a list of all orders placed by the authenticated user. Orders include restaurant and user details.
 *     tags: [Order]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 Orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       '404':
 *         description: No orders found for this user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/").get(isAuthenticated, getOrders);

/**
 * @swagger
 * /api/v1/order/checkout/create-checkout-session:
 *   post:
 *     summary: Create Stripe checkout session (place order)
 *     description: Creates a new order and initiates a Stripe checkout session for payment. Returns the session URL.
 *     tags: [Order]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carItems
 *               - deliveryDetails
 *               - restaurantId
 *             properties:
 *               carItems:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/CartItem'
 *               deliveryDetails:
 *                 $ref: '#/components/schemas/DeliveryDetails'
 *               restaurantId:
 *                 type: string
 *                 example: "64e0fe4f5311236168b222cd"
 *     responses:
 *       '200':
 *         description: Stripe checkout session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cs_test_a1b2c3d4"
 *                     url:
 *                       type: string
 *                       example: "https://checkout.stripe.com/pay/cs_test_a1b2c3d4"
 *       '400':
 *         description: Restaurant not found or error creating checkout session
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckOutSession);

/**
 * @swagger
 * /api/v1/order/webhook/stripe:
 *   post:
 *     summary: Stripe webhook endpoint (internal)
 *     description: Stripe will use this endpoint to notify payment status. Not for client use.
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { }
 *     responses:
 *       '200':
 *         description: Webhook received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *                   example: true
 *       '400':
 *         description: Webhook error
 */


export default router;