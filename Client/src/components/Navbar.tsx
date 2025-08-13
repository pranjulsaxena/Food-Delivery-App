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
  Menu as MenuIcon,
  Moon,
  ShoppingCart,
  Sun,
  Loader2,
  User,
  HandPlatter,
  SquareMenu,
  UtensilsCrossed,
  PackageCheck,
  ChefHat,
  Settings,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
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
import { useCartStore } from "../../store/useCartStore";
import { useThemeStore } from "../../store/useThemeStore";
import type { Menu } from "@/Types/menuTypes";

function Navbar() {
  const { loading, user, logOut } = useUserStore();
  const { setTheme } = useThemeStore();
  const admin = user?.admin;
  const { cartItem } = useCartStore();

  const totalCartItems = cartItem.reduce(
    (total:number, item:Menu) => (total + item.quantity),
    0
  );

  return (
    <div className="sticky top-0  w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 via-transparent to-amber-50/50 dark:from-gray-900/50 dark:via-transparent dark:to-gray-800/50"></div>

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              InstaFood
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/Profile"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 relative group"
              >
                Profile
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/orders/status"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 relative group"
              >
                Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {admin && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 cursor-pointer flex items-center gap-1">
                      Dashboard
                      <Sparkles className="w-3 h-3" />
                    </MenubarTrigger>
                    <MenubarContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-2 min-w-[180px]">
                      <Link to="/admin/restaurants">
                        <MenubarItem className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer transition-colors">
                          <UtensilsCrossed className="w-4 h-4 text-orange-500" />
                          Restaurants
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/menus">
                        <MenubarItem className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer transition-colors">
                          <SquareMenu className="w-4 h-4 text-orange-500" />
                          Menu
                        </MenubarItem>
                      </Link>
                      <Link to="/admin/orders">
                        <MenubarItem className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer transition-colors">
                          <PackageCheck className="w-4 h-4 text-orange-500" />
                          Orders
                        </MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )}
            </nav>
          </div>

          
          <div className="hidden md:flex items-center gap-4">
            {/* Theme */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative overflow-hidden border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-colors"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-2"
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center  p-2"
                >
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center p-2"
                >
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center  p-2">
                  <Settings className="w-4 h-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/cart" className="relative group">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
              >
                <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Button>
              {totalCartItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {totalCartItems > 99 ? "99+" : totalCartItems}
                </div>
              )}
            </Link>

            <Avatar className="ring-2 ring-gray-200 dark:ring-gray-700 hover:ring-orange-300 dark:hover:ring-orange-600 transition-all duration-200">
              <AvatarImage
                src={user?.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold">
                {user?.fullName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            {loading ? (
              <Button disabled className="bg-gray-400 cursor-not-allowed px-6">
                <Loader2 className="animate-spin mr-2 w-4 h-4" />
                Loading...
              </Button>
            ) : (
              <Button
                onClick={() => {
                  try {
                    logOut();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 text-white font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Logout
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

const MobileMenu = () => {
  const { user, logOut } = useUserStore();
  const { setTheme } = useThemeStore();
  const { cartItem } = useCartStore();
  const totalCartItems = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600"
        >
          <MenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700">
        <SheetHeader className="flex flex-row justify-between items-center pt-6 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-white" />
            </div>
            <SheetTitle className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
              InstaFood
            </SheetTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 dark:border-gray-700"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
            >
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

        <SheetDescription className="flex flex-col space-y-2">
          <Link
            to="/profile"
            className="flex gap-3 items-center px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 group"
          >
            <User className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Profile</span>
          </Link>

          <Link
            to="/orders/status"
            className="flex gap-3 items-center px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 group"
          >
            <HandPlatter className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Orders</span>
          </Link>

          <Link
            to="/Cart"
            className="flex gap-3 items-center px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 group relative"
          >
            <ShoppingCart className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Cart</span>
            {totalCartItems > 0 && (
              <div className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems > 9 ? "9+" : totalCartItems}
              </div>
            )}
          </Link>

          {user?.admin && (
            <>
              <Separator className="my-2 bg-gray-200 dark:bg-gray-700" />
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Admin Panel
                </p>
              </div>

              <Link
                to="/admin/menus"
                className="flex gap-3 items-center px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 group"
              >
                <SquareMenu className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Menu</span>
              </Link>

              <Link
                to="/admin/restaurants"
                className="flex gap-3 items-center px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 group"
              >
                <UtensilsCrossed className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Restaurant</span>
              </Link>

              <Link
                to="/admin/orders"
                className="flex gap-3 items-center px-4 py-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 group"
              >
                <PackageCheck className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        <SheetFooter className="mt-auto pt-6">
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-orange-200 dark:border-gray-600">
              <Avatar className="ring-2 ring-orange-300 dark:ring-orange-600">
                <AvatarImage
                  src={user?.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold w-12 h-12">
                  {user?.fullName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {user?.fullName || "Guest User"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.admin ? "Administrator" : "Customer"}
                </p>
              </div>
            </div>

            <SheetClose asChild>
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
