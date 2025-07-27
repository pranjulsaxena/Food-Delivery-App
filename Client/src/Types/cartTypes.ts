export type cartState = {
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
