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

const CheckOutPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState({
    Fullname: "",
    Email: "",
    Phone: "",
    Address: "",
    Country: "",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", data);
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
            <Button
              type="submit"
              className="bg-[#D19254] hover:bg-[#d18c47] w-full"
            >
              Continue to payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutPage;
