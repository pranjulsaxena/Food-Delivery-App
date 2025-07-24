import express, { Request, Response } from "express";
import { restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.WEBHOOK_ENDPOINT_SECRET!;

type checkOutItems = {
  carItems: menuItems[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    country: string;
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
      .findOne({ _id: checkoutSessionRequest.restaurantId })
      .populate("menus");

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
      totalAmount: checkoutSessionRequest.carItems.reduce(
        (amount, item) => amount + item.price * item.quantity,
        0
      ),
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
      success_url: `${process.env.FRONTEND_URL}/orders/status`,
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


export const stripeWebhook = async (req: express.Request, res: express.Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(" Webhook signature verification failed.", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const orderId = session.metadata?.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        console.warn("Order not found for ID:", orderId);
        res.status(404).json({ message: "Order not found" });
        return;
      }

      order.status = "confirmed";
      if (session.amount_total) {
        order.totalAmount = session.amount_total / 100;
      }

      await order.save();
      console.log("✅ Order updated after payment confirmation");
    } catch (error) {
      console.error("Error handling checkout session:", error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};


export const createLineItems = (
  checkoutSessionRequest: checkOutItems,
  menuItems: any
) => {
  // create line items
  const lineItems = checkoutSessionRequest.carItems.map((carItems) => {
    const menuItem = menuItems.find(
      (item: any) => item._id.toString() === carItems.menuId
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
