import express from 'express';
import {
  signup,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
  updateProfile,
} from '../controller/user.controller';
import { isAuthenticated } from '../middleware/isAuthenticated';

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account, sets JWT in HTTP-only cookie, and sends a verification email.
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - contact
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               contact:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       '201':
 *         description: Account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: User already exists or server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route('/signup').post(signup);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and sets JWT in HTTP-only cookie.
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Invalid credentials or account not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route('/login').post(login);

/**
 * @swagger
 * /api/v1/user/verify-email:
 *   post:
 *     summary: Verify user email
 *     description: Verify user email using the code sent to email.
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - verificationToken
 *             properties:
 *               verificationToken:
 *                 type: string
 *                 example: "s2C56f"
 *     responses:
 *       '200':
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponseWithUser'
 *       '400':
 *         description: Invalid or expired verification token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route('/verify-email').post(verifyEmail);

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     summary: Logs out the current user
 *     description: Logs out the user by clearing authentication cookie.
 *     tags: [User Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 */
router.route('/logout').post(logout);

/**
 * @swagger
 * /api/v1/user/forgot-password:
 *   post:
 *     summary: Request password reset email
 *     description: Sends a password reset link to the user's email.
 *     tags: [User Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *     responses:
 *       '200':
 *         description: Password reset link sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Account does not exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route('/forgot-password').post(forgotPassword);

/**
 * @swagger
 * /api/v1/user/reset-password/{token}:
 *   post:
 *     summary: Reset password with token
 *     description: Resets user password using a reset token from email.
 *     tags: [User Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newpassword123
 *     responses:
 *       '200':
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Invalid or expired reset token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route('/reset-password/:token').post(resetPassword);

/**
 * @swagger
 * /api/v1/user/check-auth:
 *   get:
 *     summary: Check if user is authenticated
 *     description: Returns the current authenticated user's details.
 *     tags: [User Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route('/check-auth').get(isAuthenticated, checkAuth);

/**
 * @swagger
 * /api/v1/user/profile/update:
 *   put:
 *     summary: Update user profile
 *     description: Update user's profile details and optionally upload a new profile picture.
 *     tags: [User Profile]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               city:
 *                 type: string
 *                 example: New York
 *               country:
 *                 type: string
 *                 example: USA
 *               profilePicture:
 *                 type: string
 *                 description: Base64 string or URL of the profile picture
 *                 example: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.route('/profile/update').put(isAuthenticated, updateProfile);

export default router;
