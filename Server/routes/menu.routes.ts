import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import upload from "../middleware/multer";
import { createMenu, editMenu } from "../controller/menu.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/menu/:
 *   post:
 *     summary: Create a new menu item
 *     description: Adds a new menu item to the restaurant owned by the authenticated user. Requires an image upload.
 *     tags: [Menu]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Paneer Butter Masala"
 *               description:
 *                 type: string
 *                 example: "A delicious paneer curry in a buttery tomato sauce."
 *               price:
 *                 type: number
 *                 example: 250
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file of the dish
 *     responses:
 *       '201':
 *         description: Menu item created successfully
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
 *                   example: "Menu added successfully"
 *                 menu:
 *                   $ref: '#/components/schemas/Menu'
 *                 Restaurant:
 *                   $ref: '#/components/schemas/Restaurant'
 *       '401':
 *         description: Unauthorized (e.g., no restaurant found or image missing)
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
router.route("/").post(isAuthenticated, upload.single("image"), createMenu);

/**
 * @swagger
 * /api/v1/menu/{id}:
 *   put:
 *     summary: Update an existing menu item
 *     description: Updates details of an existing menu item by menu ID. Image upload is optional.
 *     tags: [Menu]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Menu item ID to update
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Paneer Butter Masala Deluxe"
 *               description:
 *                 type: string
 *                 example: "Updated description with extra flavor."
 *               price:
 *                 type: number
 *                 example: 300
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional new image file for the menu item
 *     responses:
 *       '200':
 *         description: Menu item updated successfully
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
 *                   example: "Menu updated successfully!"
 *                 data:
 *                   $ref: '#/components/schemas/Menu'
 *       '404':
 *         description: Menu item not found
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
router.route("/:id").put(isAuthenticated, upload.single("image"), editMenu);

export default router;
