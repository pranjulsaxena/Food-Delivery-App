import React from "react";
import pizzaImage from "@/assets/pizza.png";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";

function RestaurantDetails() {
  return (
    <div className="max-w-6xl mx-auto my-10 px-2">
      <div className="relative w-full h-32 md:h-64 lg:h-72">
        <img
          src={pizzaImage}
          className="size-full object-cover rounded-lg shadow-lg"
          alt="pizzaImage"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="">
          <h1 className="font-medium text-xl my-2">Punjabi Tadka</h1>
          <div className="flex gap-2  ">
            {["Biryani", "Momos", "Pizza"].map(
            (cuisines: string, idx: number) => (
              <Badge className="mr-2" key={idx}>
                {cuisines}
              </Badge>
            )
          )}
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5"/>
            <h1 className="flex items-center gap-2 my-5 font-medium">
              Delivery Time: <span className="text-[#D19254]"> 35 mins</span>
            </h1>
          </div>
        </div>
      </div>
       <AvailableMenu/>

       
    </div>
  );
}

export default RestaurantDetails;
