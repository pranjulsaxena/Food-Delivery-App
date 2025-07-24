export type CheckOutSessionRequest = {
  carItems: {
    menuId: string;
    name: string;
    image: string;
    price: string;
    quantity: string;
  }[];
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
    totalAmout:number;
}

export type OrderState = {
    loading:boolean;
    orders:Orders[];
    createCheckOutSession:(CheckOutSessionRequest:CheckOutSessionRequest)=>Promise<void>;
    getOrderDetails:()=>Promise<void>
}