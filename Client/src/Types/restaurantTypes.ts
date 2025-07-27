import type { Menu } from "./menuTypes";
import type { Orders } from "./orderTypes";

export type Restaurant = {
  restaurantName: string;
  city: string;
  cuisines: [];
  country: string;
  deliveryTime: number;
  imageUrl: undefined;
  menus: Menu[];
  _id: string;
};

export type useRestaurantType = {
  loading: boolean;
  restaurant: null | Restaurant;
  searchedrestaurant: Restaurant[];
  filteredCuisines: string[];
  singleRestaurant: any;
  restaurantOrders: Orders[];
  setfilteredCuisines: (data: string[]) => void;
  createRestaurant: (formdata: FormData) => Promise<void>;
  getrestaurant: () => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchQuery: string,
    searchText: string,
    selectedCuisines: any
  ) => Promise<void>;
  getSingleRestaurant: (id: string) => Promise<void>;
  getRestaurantOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
};