import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import pizzaImage from "@/assets/pizza.png";
import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { useOrderStore } from "../../store/useOrderStore";
import type { Orders } from "@/Types/orderTypes";

const OrderItem = ({ name, price,image }: { name: string; price: number,image:string }) => (
  <div className="flex justify-between items-center gap-4 mb-4">
    <div className="flex gap-4 items-center">
      <img
        src={image}
        className="size-16 md:size-20 object-cover rounded-md"
        alt="Order"
      />
      <span className="font-medium text-base md:text-lg">{name}</span>
    </div>
    <div className="flex items-center gap-1 font-semibold text-base md:text-lg">
      <IndianRupee className="w-4 h-4" /> {price}
    </div>
  </div>
);

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);
  if (orders.length == 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
          <Link to="/cart">
            <Button className="w-full bg-[#D19c54] hover:bg-[#d18c47]">
              Move to Cart
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-muted px-4">
      {orders.map((item) => (
        <div className="bg-white rounded-xl shadow-lg p-6  m-10 w-full max-w-xl space-y-6">
          <h1 className="text-center text-3xl font-extrabold">
            Order Status:{item.status}
            <span className="text-[#D19C54] tracking-wide"></span>
          </h1>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {item.cartItems?.map((cartItems) => (
              <>
                <OrderItem name={cartItems.name} price={(cartItems.price*cartItems.quantity)} image={cartItems.image}/>
                <Separator />
              </>
            ))}
          </div>

          <div className="flex justify-between items-center text-lg font-bold pt-4">
            <span>Total</span>
            <span className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4" /> {item.totalAmount}
            </span>
          </div>

          <div className="pt-4">
            <Link to="/">
              <Button className="w-full bg-[#D19C54] hover:bg-[#d18c47]">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Success;
