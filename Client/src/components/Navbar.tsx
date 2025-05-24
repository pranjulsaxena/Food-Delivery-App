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

function Navbar() {
  const Loading = false;
  const admin = true;

  return (
    <div className="max-w-7xl mx-auto">
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
            <Link to="/home">Order</Link>
            {admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent className="bg-slate-100 px-2 py-2">
                    <Link to="/admin/restaurants">
                      <MenubarItem>Restaurants</MenubarItem>
                    </Link>
                    <Link to="/admin/menu">
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
              13
            </Button>
          </Link>

          <Avatar>
            <AvatarImage />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            {Loading ? (
              <Button
                disabled={true}
                className="w-full bg-[#D19254] hover:bg-[#d18c47] disabled:cursor-not-allowed"
              >
                <Loader2 className="animate-spin mr-2 w-4 h-4" />Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#D19254] hover:bg-[#d18c47]"
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
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
