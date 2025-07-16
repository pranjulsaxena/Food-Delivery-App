import React from "react";
import { Link } from "react-router-dom";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import {
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  Loader2,
  User,
  HandPlatter,
  SquareMenu,
  UtensilsCrossed,
  PackageCheck,
} from "lucide-react";

import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { useUserStore } from "../../store/useUserStore";

function Navbar() {
  const { loading, user, logOut } = useUserStore();
  const admin = user?.admin;

  return (
    <div className="max-w-screen mx-auto shadow-xl bg-white  px-2">
      <div className="flex justify-between items-center h-14">
        <Link to="/">
          <h1 className="font-bold text-xl md:font-extrabold md:text-2xl">
            InstaFood
          </h1>
        </Link>

        <div className="md:flex justify-center items-center gap-5 hidden">
          <div className="flex gap-3">
            <Link to="/home">Home</Link>
            <Link to="/Profile">Profile</Link>
            <Link to="/orders/status">Order</Link>
            {admin && (
              <Menubar className="">
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent className="bg-slate-100 px-2 py-2">
                    <Link to="/admin/restaurants">
                      <MenubarItem>Restaurants</MenubarItem>
                    </Link>
                    <Link to="/admin/menus">
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to="/admin/orders">
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
        </div>

        <div className="md:flex justify-center items-center gap-5 hidden">
          <div className="flex justify-center items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
                <DropdownMenuItem>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link to="/cart" className="relative ">
            <ShoppingCart />
            <Button
              size={"icon"}
              className="w-3 h-3 rounded-full text-[10px] text-center bg-red-500 absolute -top-2 left-2 hover:bg-red-500"
            >
              5
            </Button>
          </Link>

          <Avatar>
            <AvatarImage />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            {loading ? (
              <Button
                disabled={true}
                className="w-full bg-[#D19254] hover:bg-[#d18c47] disabled:cursor-not-allowed"
              >
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#D19254] hover:bg-[#d18c47]"
                onClick={() => {
                  try {
                    logOut();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu inside the same flex container */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}

const MobileMenu = () => {
  const { user, logOut } = useUserStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row justify-between items-center mt-6">
          <SheetTitle className="text-xl font-bold">InstaFood</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Light</DropdownMenuItem>
              <DropdownMenuItem>Dark</DropdownMenuItem>
              <DropdownMenuItem>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-4 h-px bg-gray-300 w-full" />
        <SheetDescription className="flex flex-col">
          <Link
            to="/profile"
            className="flex gap-2  items-center  mx-6 py-2 rounded-lg mb-1  hover:bg-gray-200 hover:text-gray-900"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/orders/status"
            className="flex gap-2  items-center  mx-6 py-2 rounded-lg mb-2  hover:bg-gray-200 hover:text-gray-900"
          >
            <HandPlatter />
            <span>Orders</span>
          </Link>
          <Link
            to="/Cart"
            className="flex gap-2  items-center  mx-6 py-2 rounded-lg mb-2  hover:bg-gray-200 hover:text-gray-900"
          >
            <ShoppingCart />
            <span>Cart</span>
          </Link>
          {user!.admin && (
            <>
              (
              <Link
                to="/admin/menus"
                className="flex gap-2  items-center  mx-6 py-2 rounded-lg mb-2  hover:bg-gray-200 hover:text-gray-900"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurants"
                className="flex gap-2  items-center  mx-6 py-2 rounded-lg mb-2  hover:bg-gray-200 hover:text-gray-900"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex gap-2  items-center  mx-6 py-2 rounded-lg mb-2  hover:bg-gray-200 hover:text-gray-900"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
              )
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col">
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <div className="flex flex-row gap-4 items-center">
              <AvatarFallback className="bg-gray-200 rounded-full p-1">
                PS
              </AvatarFallback>
              <h1 className="text-xl font-bold">Pranjul Saxena</h1>
            </div>
          </Avatar>
          <SheetClose asChild>
            <Button
              className="bg-[#D19254] hover:bg-[#d18c47]"
              onClick={() => {
                try {
                  logOut();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
