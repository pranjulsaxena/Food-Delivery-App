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
import { Minus, Plus } from "lucide-react";
import CheckOutPage from "./CheckOutPage";
import { useCartStore } from "../../store/useCartStore";



const Cart = () => {
  const {cartItem,clearCartItems,removeCartItems} = useCartStore();
  const [clearAll, setClearAll] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="max-w-7xl mx-auto p-4 my-10 space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setClearAll(true);
            clearCartItems();
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
          { cartItem.map((item, index) => (
                <TableRow className="hover:bg-muted/40 transition" key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={item.imageUrl} alt="Pizza" />
                        <AvatarFallback>PN</AvatarFallback>
                      </Avatar>
                      <span>{item.name}</span>
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
                    {item.total}
                  </TableCell>

                  <TableCell className="text-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-[#D19254] hover:bg-[#b97d3d]"
                      onClick={()=>{removeCartItems(item._id)}}
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
                : cartItem.reduce(
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
