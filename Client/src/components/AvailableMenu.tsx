import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useRestaurantOrder } from "../../store/useRestaurantStore";
import { useCartStore } from "../../store/useCartStore";
import { ShoppingCart, Sparkles } from "lucide-react";
import type { Menu } from "@/Types/menuTypes";

function AvailableMenu() {
  const cartItem = useCartStore((state) => state.cartItem);
  const setCartItems = useCartStore((state) => state.setCartItems);
  const { singleRestaurant } = useRestaurantOrder();

  const handleAddtoCart = (menus:Menu) => {
    setCartItems(menus);
  };

  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-3xl font-extrabold mb-8 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-orange-500 dark:text-orange-400" />
        Available Menus
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {singleRestaurant!.menus.map((menus, i) => (
          <Card
            key={menus._id || i}
            className="group bg-white/90 dark:bg-gray-800/80 border border-orange-100 dark:border-gray-700 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-2 overflow-hidden"
          >
            <div className="relative">
              <img
                src={menus.imageUrl}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                alt={menus.name}
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-orange-100 dark:bg-orange-900/70 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full shadow font-bold text-sm tracking-wide">
                ₹{menus.price}
              </div>
              {cartItem.find(item => item._id === menus._id) && (
                <div className="absolute top-2 left-2 bg-green-500/80 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  In Cart
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
                {menus.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                {menus.description}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 px-6 pb-6">
              <Button
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => handleAddtoCart(menus)}
                disabled={cartItem.some(item => item._id === menus._id)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItem.some(item => item._id === menus._id) ? "Added" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AvailableMenu;
