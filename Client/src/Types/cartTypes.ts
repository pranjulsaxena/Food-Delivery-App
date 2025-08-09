import type { Menu } from "./menuTypes";

export type cartState = {
  cartItem: Menu[];
  setCartItems: (newItem: Menu) => void;
  clearCartItems: () => void;
  removeCartItems: (id: string) => void;
  increaseQuantity:(id:string)=>void;
  decreaseQuantity:(id:string)=>void;
};

