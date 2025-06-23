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
import pizzaImage from "@/assets/pizza.png";
import { Minus, Plus } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import CheckOutPage from "./CheckOutPage";

type data = {
  itemName: string;
  price: number;
  quantity: number;
  Total?: number;
  Action?: Element;
};

const mydata: data[] = [
  {
    itemName: "Margherita Pizza",
    price: 80,
    quantity: 2,
  },
  {
    itemName: "Veggie Burger",
    price: 60,
    quantity: 1,
  },
  {
    itemName: "Paneer Wrap",
    price: 90,
    quantity: 3,
  },
  {
    itemName: "Cheese Garlic Bread",
    price: 50,
    quantity: 4,
  },
];

const Cart = () => {
  const [clearAll, setClearAll] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="max-w-7xl mx-auto p-4 my-10 space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setClearAll(true);
          }}
          variant="link"
          className="text-red-500 hover:text-red-600 transition"
        >
          Clear All
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clearAll
            ? ""
            : mydata.map((item, index) => (
                <TableRow className="hover:bg-muted/40 transition" key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={pizzaImage} alt="Pizza" />
                        <AvatarFallback>PN</AvatarFallback>
                      </Avatar>
                      <span>{item.itemName}</span>
                    </div>
                  </TableCell>

                  <TableCell>{item.price}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-3 border rounded-full px-3 py-1 shadow-sm bg-white w-fit">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1 h-6 w-6"
                      >
                        <Minus className="w-4 h-4 text-[#D19254]" />
                      </Button>
                      <span className="min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-1 h-6 w-6"
                      >
                        <Plus className="w-4 h-4 text-gray-800" />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    {item.price * item.quantity}
                  </TableCell>

                  <TableCell className="text-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-[#D19254] hover:bg-[#b97d3d]"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold text-right">
              Grand Total
            </TableCell>
            <TableCell className="text-right font-bold">
              {clearAll
                ? 0
                : mydata.reduce(
                    (sum, current) => sum + current.price * current.quantity,
                    0
                  )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex justify-end my-10">
        {" "}
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className=""
        >
          Proceed to checkout
        </Button>
      </div>
       <CheckOutPage open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
