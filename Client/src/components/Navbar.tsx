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
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

function Navbar() {
  const admin = true;
  return (
    <div className="max-w-7xl  mx-auto">
      <div className="flex justify-between items-center h-14">
        <Link to="/">
          <h1 className=" font-bold text-xl md:font-extrabold md:text-2xl">
            InstaFood
          </h1>
        </Link>
        <div className="md:flex justify-center items-center gap-5 hidden">
          <div className="flex gap-2">
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
          <div className="flex justify-center items-center gap-2">
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
