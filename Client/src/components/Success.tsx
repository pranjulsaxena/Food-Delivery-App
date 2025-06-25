import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import pizzaImage from "@/assets/pizza.png";
import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";

const OrderItem = ({ name, price }: { name: string; price: number }) => (
  <div className="flex justify-between items-center gap-4 mb-4">
    <div className="flex gap-4 items-center">
      <img
        src={pizzaImage}
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
  const [order, setOrder] = useState(false);

  if (order) {
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
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl space-y-6">
        <h1 className="text-center text-3xl font-extrabold">
          Order Status:{" "}
          <span className="text-[#D19C54] tracking-wide">CONFIRMED</span>
        </h1>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <OrderItem name="Pizza" price={80} />
          <Separator />
          <OrderItem name="Pizza" price={80} />
          <Separator />
          <OrderItem name="Pizza" price={80} />
          <Separator />
        </div>

        <div className="flex justify-between items-center text-lg font-bold pt-4">
          <span>Total</span>
          <span className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" /> 240
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
    </div>
  );
};

export default Success;
