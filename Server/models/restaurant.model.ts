import mongoose, { model } from "mongoose";
import { User } from "./usermodel";

export interface IRestaurant {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  iamgeUrl: string;
  menus: mongoose.Schema.Types.ObjectId[];
}
export interface IRestaurantDocument extends IRestaurant, Document {
  createdAt: Date;
  updatedAt: Date;
}
const restaurantSchema = new mongoose.Schema<IRestaurantDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  restaurantName:{type:String, required:true},
  city:{type:String, required:true},
  country:{type:String, required:true},
  deliveryTime:{tyep:Number, required:true},
  cuisines:[{type:String,required:true}],
  menus:[{type:mongoose.Schema.Types.ObjectId, ref:'Menu'}],
  iamgeUrl:{type:String, required:true}
},{timestamps:true});

export const restaurant = mongoose.model("restaurant",restaurantSchema);

