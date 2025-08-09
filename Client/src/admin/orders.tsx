import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantOrder } from "../../store/useRestaurantStore";
import type { Orders as orderType } from "@/Types/orderTypes";
import { MapPinIcon, WalletIcon } from "lucide-react";
const Orders = () => {
  const { restaurantOrders, getRestaurantOrders, updateOrderStatus } =
    useRestaurantOrder();

  const handleStatusChange = async (orderId: string, status: string) => {
    await updateOrderStatus(orderId, status);
  };

  useEffect(() => {
    getRestaurantOrders();
  }, []);
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold text-gray-900 darK:text-white mb-10 dark:text-white">
        Orders Overview
      </h1>
      <div className="space-y-8">
        {restaurantOrders.map((order: orderType) => (
          <div
            className="flex flex-col md:flex-row justify-between items-start sm:items-center 
            bg-gradient-to-br from-white to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b]
            shadow-xl dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] 
            rounded-2xl border border-gray-200 dark:border-zinc-700 p-6 sm:p-8 gap-6 transition-all duration-300"
          >
            {/* LEFT SECTION: CUSTOMER DETAILS */}
            <div className="flex-1 space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {order.deliveryDetails.name}
              </h1>

              <div className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Address
                  </p>
                  <p className="text-gray-800 dark:text-zinc-200">
                    {order.deliveryDetails.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <WalletIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-zinc-400">
                    Total
                  </p>
                  <p className="text-gray-800 dark:text-zinc-100 font-medium">
                    ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Update Order Status
              </Label>

              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(order._id, newStatus)
                }
                defaultValue={order.status}
              >
                <SelectTrigger className="w-full rounded-md border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>

                <SelectContent className="dark:bg-zinc-900 dark:text-white rounded-lg">
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status, idx) => (
                      <SelectItem
                        key={idx}
                        value={status.toLowerCase()}
                        className="px-3 py-2 cursor-pointer rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
