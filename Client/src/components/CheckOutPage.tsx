import  {
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
import { Loader2, ShoppingBag, Sparkles } from "lucide-react";
import type { Menu } from "@/Types/menuTypes";

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

    const checkoutPayload: CheckOutSessionRequest = {
      cartItems: cartItem.map((item:Menu) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
      })),
      deliveryDetails: {
        email: data.Email,
        name: data.Fullname,
        address: data.Address,
        city: data.City,
      },
      restaurantId: restaurant!._id,
    };

    try {
      await createCheckOutSession(checkoutPayload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl">
        {/* Header */}
        <DialogHeader className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 px-4 py-2 rounded-full font-semibold text-sm shadow-sm">
            <ShoppingBag className="w-4 h-4" />
            Order Checkout
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Review Your Order
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Make sure all your details are correct before continuing.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={formHandler} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(data).map(([field, value]) => (
              <div key={field} className="flex flex-col gap-1">
                <Label
                  htmlFor={field}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {field}
                </Label>
                <Input
                  id={field}
                  type="text"
                  name={field}
                  value={value}
                  onChange={changeEventHandler}
                  className="h-11 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-orange-400 dark:focus:border-orange-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-700 transition-all"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            {loading ? (
              <Button
                disabled
                className="w-full h-12 bg-orange-400 dark:bg-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Loader2 className="animate-spin w-5 h-5" />
                Processing...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 hover:from-orange-600 hover:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Continue to Payment
                <Sparkles className="w-4 h-4" />
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutPage;
