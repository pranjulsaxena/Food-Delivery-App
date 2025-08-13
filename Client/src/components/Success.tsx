import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderStore } from "../../store/useOrderStore";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { IndianRupee, PackageCheck, Truck, Clock, ClipboardX, ShoppingBag } from "lucide-react";
import {type Orders } from "@/Types/orderTypes";
import type { Menu } from "@/Types/menuTypes";

const StatusInfo = {
  DELIVERED: { variant: "secondary", icon: <PackageCheck className="w-4 h-4 mr-2" />, text: "Delivered" },
  "IN PROGRESS": { variant: "outline", icon: <Truck className="w-4 h-4 mr-2" />, text: "In Progress" },
  PLACED: { variant: "default", icon: <Clock className="w-4 h-4 mr-2" />, text: "Placed" },
} as const;

type StatusKey = keyof typeof StatusInfo; 

const OrderItem = ({ name, price,  imageUrl, quantity }: { name: string; price: number; imageUrl: string; quantity: number }) => (
  <div className="flex justify-between items-center py-3 border-b last:border-b-0">
    <div className="flex items-center gap-3">
      <img src={imageUrl} className="size-14 rounded-lg object-cover" alt={name} />
      <div>
        <p className="font-medium text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
      </div>
    </div>
    <div className="flex items-center gap-1 font-semibold">
      <IndianRupee className="w-4 h-4" />
      {(price) * (quantity)}
    </div>
  </div>
);

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails]);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center p-6">
          <CardHeader>
            <div className="mx-auto size-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <ClipboardX className="size-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">No Orders Found</CardTitle>
            <CardDescription>Start shopping to see your orders here!</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Start Shopping
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Orders</h1>
          <p className="text-muted-foreground">Track your recent purchases</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order:Orders) => {
            const status = order.status.toUpperCase() as StatusKey;
            const statusInfo = StatusInfo[status] ?? StatusInfo.PLACED;
            return (
              <Card key={order._id} className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order._id.slice(-6)}</CardTitle>
                      <CardDescription>{new Date(order.createdAt).toLocaleDateString()}</CardDescription>
                    </div>
                    <Badge variant={statusInfo.variant}>{statusInfo.icon}{statusInfo.text}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-0">
                    {order.cartItems?.map((cartItem:Menu) => (
                      <OrderItem key={cartItem._id} {...cartItem} />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pt-4">
                  <div className="flex justify-between items-center w-full text-lg font-bold">
                    <span>Total</span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-5 h-5" />
                      {order.totalAmount}
                    </span>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Success;
