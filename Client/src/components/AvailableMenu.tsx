import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import pizzaImage from "@/assets/pizza.png";
import { Button } from "./ui/button";

function AvailableMenu() {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-8">
        <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img src={pizzaImage} className="w-full object-cover h-40" alt="" />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-grey-800 dark:text-white">
              Tandoori Biryani
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price:<span className="text-[#D19254]">$80</span>
            </h3>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#D19254] w-full ">Add to Cart</Button>
          </CardFooter>
        </Card>
        <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img src={pizzaImage} className="w-full object-cover h-40" alt="" />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-grey-800 dark:text-white">
              Tandoori Biryani
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price:<span className="text-[#D19254]">$80</span>
            </h3>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#D19254] w-full ">Add to Cart</Button>
          </CardFooter>
        </Card>
        <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img src={pizzaImage} className="w-full object-cover h-40" alt="" />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-grey-800 dark:text-white">
              Tandoori Biryani
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price:<span className="text-[#D19254]">$80</span>
            </h3>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#D19254] w-full ">Add to Cart</Button>
          </CardFooter>
        </Card>
        <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img src={pizzaImage} className="w-full object-cover h-40" alt="" />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-grey-800 dark:text-white">
              Tandoori Biryani
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <h3 className="text-lg font-semibold mt-4">
              Price:<span className="text-[#D19254]">$80</span>
            </h3>
          </CardContent>
          <CardFooter>
            <Button className="bg-[#D19254] w-full ">Add to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AvailableMenu;
