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

router
  .route("/")
  .post(isAuthenticated, upload.single("image"), createRestaurant)
  .put(isAuthenticated, upload.single("image"), updateRestaurant)
  .get(isAuthenticated, getRestaurant);

router.route("/orders").get(isAuthenticated, getRestaurantOrders);
router.route("/orders/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated,searchRestaurant)
router.route("/:id").get(isAuthenticated,getSingleRestaurant);

export default router