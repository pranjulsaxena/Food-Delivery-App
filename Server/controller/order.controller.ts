import express, { Request, Response } from "express";
import { restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const Orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");
    if (Orders) {
      res.status(200).json({ success: true, Orders });
      return;
    }
    res.status(404).json({ success: false, message: "No Orders found!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
