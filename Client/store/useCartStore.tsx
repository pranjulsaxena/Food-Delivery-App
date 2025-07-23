import { CardTitle } from "@/components/ui/card";
import type { MenuType } from "@/schema/menuSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type cartState = {
  cartItem: cartItemType[];
  setCartItems: (newItem: cartItemType) => void;
  clearCartItems: () => void;
  removeCartItems: (id: string) => void;
  increaseQuantity:(id:string)=>void;
  decreaseQuantity:(id:string)=>void;
};
export interface cartItemType {
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
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
                _id: newItem._id,
              },
            ];

            return { cartItem: NewcartItem };
          }
        });
      },
      clearCartItems: () => {
        set({ cartItem: [] });
      },
      removeCartItems: (id: string) => {
        set((state) => {
          const updatedCart = state.cartItem.filter((item) => item._id !== id);
          return { cartItem: updatedCart };
        });
      },
      increaseQuantity:(id:string)=>{
        set((state)=>{
            const updatedCartItems = state.cartItem.map((item)=>item._id===id?{...item,quantity:item.quantity+1}:item);
            return {cartItem:updatedCartItems}
        })
      },
      decreaseQuantity:(id:string)=>{
        set((state)=>{
            const updatedCartItems = state.cartItem.filter((item)=>item._id ===id);
            let quantity = updatedCartItems[0].quantity;
            let updatedCart;
            if(quantity===1){
              updatedCart = state.cartItem.filter((item)=>item._id!=id);
            }else{
              updatedCart = state.cartItem.map((item)=>item._id===id ?{...item,quantity:item.quantity-1}:item);
            }
             return {cartItem:updatedCart};
        })
      }
    }),
    {
      name: "Cart-Storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
