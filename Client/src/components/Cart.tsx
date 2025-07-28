import React, { useState, type ButtonHTMLAttributes } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  CreditCard,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";
import CheckOutPage from "./CheckOutPage";
import { useCartStore, type cartItemType } from "../../store/useCartStore";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItem,
    clearCartItems,
    removeCartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();
  const [clearAll, setClearAll] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const totalAmount = cartItem.reduce(
    (sum, current) => sum + current.price * current.quantity,
    0
  );
  const totalItems = cartItem.reduce(
    (sum, current) => sum + current.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-600 dark:via-amber-600 dark:to-yellow-600">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ShoppingCart className="w-4 h-4" />
            Shopping Cart
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Your Cart
          </h1>
          <p className="text-lg text-white/90 drop-shadow">
            {totalItems} {totalItems === 1 ? "item" : "items"} ready for
            checkout
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-6 relative z-1">
        {cartItem.length === 0 ? (
          // Enhanced Empty Cart State
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/20 p-12 text-center border dark:border-gray-700">
            <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-orange-500 dark:text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Your Cart is Empty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added anything to your cart yet!
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold">
            <Link to="/">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Header with Clear All */}
            <div className="bg-white dark:bg-gray-800 rounded-t-2xl shadow-lg dark:shadow-xl dark:shadow-black/20 border dark:border-gray-700 p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Cart Items
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Review your selected items
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setClearAll(true);
                    clearCartItems();
                  }}
                  variant="outline"
                  className="text-red-500 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>

            {/* Enhanced Table */}
            <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-xl dark:shadow-black/20 border-x dark:border-gray-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Item
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Price
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                      Quantity
                    </TableHead>
                    <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">
                      Total
                    </TableHead>
                    <TableHead className="text-end font-semibold text-gray-700 dark:text-gray-300">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {cartItem.map((item:cartItemType, index) => (
                    <TableRow
                      className="hover:bg-orange-50 dark:hover:bg-gray-700/30 transition-all duration-200 border-b dark:border-gray-700"
                      key={index}
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-14 w-14 ring-2 ring-orange-200 dark:ring-orange-800">
                              <AvatarImage
                                src={item.imageUrl}
                                alt={item.name}
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-semibold">
                                {item.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="space-y-1">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              {item.name}
                            </span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Fresh & Delicious
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          ₹{item.price}
                        </span>
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-600 rounded-full px-3 py-2 bg-gray-50 dark:bg-gray-700 w-fit shadow-sm hover:shadow-md transition-shadow">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                            onClick={() => decreaseQuantity(item._id)}
                          >
                            <Minus className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          </Button>
                          <span className="min-w-[24px] text-center font-semibold text-gray-900 dark:text-gray-100">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                            onClick={() => increaseQuantity(item._id)}
                          >
                            <Plus className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          </Button>
                        </div>
                      </TableCell>

                      <TableCell className="text-right py-4">
                        <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                          ₹{item.price * item.quantity}
                        </span>
                      </TableCell>

                      <TableCell className="text-end py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200"
                          onClick={() => removeCartItems(item._id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <TableRow className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 hover:from-orange-50 hover:to-amber-50 dark:hover:from-gray-700 dark:hover:to-gray-600">
                    <TableCell
                      colSpan={3}
                      className="font-bold text-lg text-gray-900 dark:text-gray-100"
                    >
                      Grand Total ({totalItems} items)
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                        ₹{clearAll ? 0 : totalAmount}
                      </span>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {/* Enhanced Checkout Section */}
            <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-lg dark:shadow-xl dark:shadow-black/20 border dark:border-gray-700 p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <AlertCircle className="w-4 h-4" />
                  Secure checkout with 256-bit SSL encryption
                </div>
                <Button
                  onClick={() => setOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
                  disabled={cartItem.length === 0}
                >
                  <CreditCard className="mr-2 w-5 h-5" />
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <CheckOutPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
