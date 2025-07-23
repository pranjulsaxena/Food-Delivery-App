import type { MenuType } from "@/schema/menuSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type cartState = {
  cartItem: cartItemType[];
  setCartItems: (newItem: cartItemType) => void;
};
export interface cartItemType {
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  total: number;
  _id: string;
}

export const useCartStore = create<cartState>()(
  persist(
    (set) => ({
      cartItem: [],
      setCartItems: (newItem: cartItemType) => {
        set((state) => {
          const existingCartItem = state.cartItem.find(
            (cartItem) => cartItem._id === newItem._id
          );
          if (existingCartItem) {
            const updatedCartItem = state.cartItem.map((cartItem) =>
              cartItem._id === newItem._id
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                    total: cartItem.price*cartItem.quantity,
                  }
                : cartItem
            );
            return { cartItem: updatedCartItem };
          } else {
            
               const NewcartItem = [
                ...state.cartItem,
                {
                  name: newItem.name,
                  price: newItem.price,
                  quantity: 1,
                  imageUrl: newItem.imageUrl,
                  total: newItem.price,
                  _id:newItem._id
                },
              ]
            
              return {cartItem:NewcartItem};
          }
        });
      },
      
    }),

    {
      name: "Cart-Storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
