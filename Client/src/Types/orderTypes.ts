import type { Menu } from "./menuTypes";

export type CheckOutSessionRequest = {
  cartItems: Menu[];
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
  };
  restaurantId: string;
};

export interface Orders extends CheckOutSessionRequest{
    _id:string;
    status:string;
    totalAmount:number;
    createdAt:Date;
}

export type OrderState = {
    loading:boolean;
    orders:Orders[];
    createCheckOutSession:(CheckOutSessionRequest:CheckOutSessionRequest)=>Promise<void>;
    getOrderDetails:()=>Promise<void>
}