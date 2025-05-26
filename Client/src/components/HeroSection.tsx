import React from "react";
import { Input } from "./ui/input";
import  {Button}  from "./ui/button";

function HeroSection() {
  return (
    <div className="flex max-w-7xl flex-col md:flex-row mx-auto md:p-10 bg-red-500 justify-center items-center m-4 gap-20">
      <div className="flex flex-col md:w-[40%] gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:text-5xl md:extra-bold text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicious food is waiting for you, we are always near to you.
          </p>
        </div>
        <div className="relative"><Input className="" placeholder="Search"/><Button className="absolute right-0 -top-0">Search</Button></div>
      </div>
    </div>
  );
}

export default HeroSection;
