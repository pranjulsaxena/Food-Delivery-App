import mongoose, { mongo } from "mongoose";
import { User } from "./usermodel";
import { restaurant } from "./restaurant.model";

type deliveryDetails = {
  email: string;
  name: string;
  address: string;
  city: string;
};
type cartItems = {
  menuId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};
export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  deliveryDetails: deliveryDetails;
  cartItems: cartItems;
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "delivered"
    | "preparing"
    | "outfordelivery";
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: restaurant,
    },
    deliveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItems: {
      menuId: { type: String, required: true },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
