import express, { Request, Response } from "express";
import { restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type checkOutItems = {
  carItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
  };
  restaurantId: string;
};

type menuItems = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

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

export const createCheckOutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: checkOutItems = req.body;
    const Restaurant = await restaurant
      .findById(checkoutSessionRequest.restaurantId)
      .populate("menu");

    if (!Restaurant) {
      res.status(404).json({ success: false, message: "Restaurant not found" });
      return;
    }
    const order = await Order.create({
      user: req.userId,
      restaurant: Restaurant._id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.carItems,
      status: "pending",
    });

    const menuItems = Restaurant.menus;
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(menuItems.map((item: any) => item.image)),
      },
    });

    if (!session.url) {
      res
        .status(400)
        .json({ success: false, message: "Error while creating sessions" });
      return;
    }

    await order.save();
    res.status(200).json({ session });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createLineItems = (
  checkoutSessionRequest: checkOutItems,
  menuItems: any
) => {
  // create line items
  const lineItems = checkoutSessionRequest.carItems.map((carItems) => {
    const menuItem = menuItems.find(
      (item: any) => item._id === carItems.menuId
    );

    if (!menuItem) {
      throw new Error("Menu item id not found");
    }

    return {
      // according to stripe syntax
      price_data: {
        currency: "inr",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: carItems.quantity,
    };
  });
  // returning lineItems
  return lineItems;
};
