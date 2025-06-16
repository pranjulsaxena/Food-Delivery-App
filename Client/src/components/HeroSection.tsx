import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import pizzaImage from "@/assets/pizza.png";

function HeroSection() {
  return (
    <div className="flex max-w-7xl flex-col md:flex-row mx-auto md:p-10  justify-center items-center m-4 gap-10">
      <div className="flex flex-col md:w-[60%] gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:text-5xl md:extra-bold text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicious food is waiting for you, we are always near to
            you.
          </p>
        </div>
        <div className="relative w-full">
          <Input className="w-full pl-10 pr-24" placeholder="Search" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Button
            className="absolute right-1 top-1 bg-[#D19254] hover:bg-[#d18c47]"
            size="sm"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <img
          src={pizzaImage}
          alt="Pizza"
          className="w-[80%] max-w-[500px] sm:w-full md:w-full h-auto"
        />
      </div>
    </div>
  );
}

export default HeroSection;
