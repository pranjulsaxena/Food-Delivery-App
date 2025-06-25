import React, { useState, type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import pizzaImage from "@/assets/pizza.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="flex max-w-7xl flex-col md:flex-row mx-auto md:p-10  justify-center items-center m-4 gap-10">
      <div className="flex flex-col md:w-[60%] gap-5">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:text-5xl md:font-extrabold text-4xl">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500">
            Hey! Our Delicious food is waiting for you, we are always near to
            you.
          </p>
        </div>
        <div className="relative w-full max-w-[500px]">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              e.code == "Enter" && searchText ? navigate(`/search/${searchText}`) : "";
            }}
            className="w-full pl-10 pr-24 max-w-[500px] shadow-xl focus-visible:ring-1 focus-visible:border-black"
            placeholder="Search restaurant by name, city & country"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Button
            onClick={() => {
              searchText ? navigate(`/search/${searchText}`) : "";
            }}
            className=" absolute right-[2px] top-[2px]  bg-[#D19254] hover:bg-[#d18c47]"
            size="sm"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="max-w-[500px] flex justify-center">
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
