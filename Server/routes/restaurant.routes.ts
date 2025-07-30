import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import upload from "../middleware/multer";
import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrders,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurant.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/restaurant/:
 *   post:
 *     summary: Create a new restaurant
 *     description: Creates a new restaurant linked to the authenticated user. Requires restaurant banner image upload and saves cuisines as an array.
 *     tags: [Restaurant]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - city
 *               - country
 *               - deliveryTime
 *               - cuisines
 *               - image
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 example: "Paaji Da Dhaba"
 *               city:
 *                 type: string
 *                 example: "Amritsar"
 *               country:
 *                 type: string
 *                 example: "India"
 *               deliveryTime:
 *                 type: number
 *                 example: 30
 *               cuisines:
 *                 type: string
 *                 description: Stringified array of cuisines, e.g. '["North Indian", "Punjabi"]'
 *                 example: "[\"North Indian\", \"Punjabi\"]"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Restaurant banner/image file
 *     responses:
 *       '201':
 *         description: Restaurant created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantResponse'
 *       '400':
 *         description: Restaurant already exists or missing banner image
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router
  .route("/")
  .post(isAuthenticated, upload.single("image"), createRestaurant);

/**
 * @swagger
 * /api/v1/restaurant/:
 *   get:
 *     summary: Get authenticated user's restaurant
 *     description: Returns restaurant info with all menus for the authenticated owner.
 *     tags: [Restaurant]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Restaurant found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantResponse'
 *       '404':
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/").get(isAuthenticated, getRestaurant);

/**
 * @swagger
 * /api/v1/restaurant/:
 *   put:
 *     summary: Update restaurant details
 *     description: Updates an existing restaurant, including optional new image and cuisines.
 *     tags: [Restaurant]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 example: "Paaji Da Dhaba (Updated)"
 *               city:
 *                 type: string
 *                 example: "Amritsar"
 *               country:
 *                 type: string
 *                 example: "India"
 *               deliveryTime:
 *                 type: number
 *                 example: 45
 *               cuisines:
 *                 type: string
 *                 example: "[\"North Indian\", \"Punjabi\"]"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Restaurant updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantResponse'
 *       '401':
 *         description: Restaurant not found for update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router
  .route("/")
  .put(isAuthenticated, upload.single("image"), updateRestaurant);

/**
 * @swagger
 * /api/v1/restaurant/orders:
 *   get:
 *     summary: Get all orders for the authenticated restaurant owner
 *     description: Returns all orders placed for the logged-in user's restaurant, including customer and restaurant info.
 *     tags: [Restaurant]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Orders retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersListResponse'
 *       '401':
 *         description: Restaurant not found or unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/orders").get(isAuthenticated, getRestaurantOrders);

/**
 * @swagger
 * /api/v1/restaurant/orders/{orderId}/status:
 *   put:
 *     summary: Update order status
 *     description: Updates the status of a specific order (e.g., from 'pending' to 'delivered').
 *     tags: [Restaurant]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 example: "delivered"
 *     responses:
 *       '200':
 *         description: Status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Status updated
 *                 status:
 *                   type: string
 *                   example: delivered
 *       '404':
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/orders/:orderId/status").put(isAuthenticated, updateOrderStatus);

/**
 * @swagger
 * /api/v1/restaurant/search/{searchText}:
 *   get:
 *     summary: Search restaurants
 *     description: Search for restaurants by name, city, country, or cuisines. Supports filters via query params.
 *     tags: [Restaurant]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: searchText
 *         schema:
 *           type: string
 *         required: true
 *         description: The text to search by
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         required: false
 *         description: Additional search query (e.g. cuisine)
 *       - in: query
 *         name: selectedCuisines
 *         schema:
 *           type: string
 *         required: false
 *         description: Comma-separated cuisine filters
 *     responses:
 *       '200':
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 */
router.route("/search/:searchText").get(isAuthenticated, searchRestaurant);

/**
 * @swagger
 * /api/v1/restaurant/{id}:
 *   get:
 *     summary: Get single restaurant by ID
 *     description: Get a restaurant (by Mongo ID) with recent menus.
 *     tags: [Restaurant]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Restaurant ID
 *     responses:
 *       '200':
 *         description: Restaurant found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RestaurantResponse'
 *       '401':
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route("/:id").get(isAuthenticated, getSingleRestaurant);

export default router;
