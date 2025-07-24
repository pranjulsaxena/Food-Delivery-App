import React, {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "../../store/useUserStore";
import type { CheckOutSessionRequest } from "@/Types/orderTypes";
import { useCartStore } from "../../store/useCartStore";
import { useRestaurantOrder } from "../../store/useRestaurantStore";
import { useOrderStore } from "../../store/useOrderStore";
import { Loader2 } from "lucide-react";

const CheckOutPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { cartItem } = useCartStore();
  const { user } = useUserStore();
  const { restaurant } = useRestaurantOrder();
  const { createCheckOutSession, loading } = useOrderStore();
  const [data, setData] = useState({
    Fullname: user?.fullName || "",
    Email: user?.email || "",
    Phone: user?.contact || "",
    Address: user?.address || "",
    City: user?.city || "",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const CheckOutSessionRequest: CheckOutSessionRequest = {
      carItems: cartItem.map((item) => {
        return {
          menuId: item._id,
          name: item.name,
          price: item.price.toString(),
          image: item.imageUrl,
          quantity: item.quantity.toString(),
        };
      }),
      deliveryDetails: {
        email: data.Email,
        name: data.Fullname,
        address: data.Address,
        city: data.City,
      },
      restaurantId: restaurant!._id,
    };
    try {
      await createCheckOutSession(CheckOutSessionRequest);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Order</DialogTitle>
          <DialogDescription>
            Make sure to review the details before proceeding to checkout.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formHandler} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.keys(data).map((item) => (
              <div key={item} className="flex flex-col space-y-1">
                <Label htmlFor={item}>{item}</Label>
                <Input
                  id={item}
                  type="text"
                  name={item}
                  value={data[item as keyof typeof data]}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-0 focus-visible:border-black"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            {loading ? (
              <Button
                disabled={true}
                className="w-full bg-[#D19254] hover:bg-[#d18c47] disabled:cursor-not-allowed"
              >
                <Loader2 className="animate-spin mr-2 w-4 h-4"></Loader2>Loading
                ...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#D19254] hover:bg-[#d18c47]"
              >
                Continue to payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutPage;
