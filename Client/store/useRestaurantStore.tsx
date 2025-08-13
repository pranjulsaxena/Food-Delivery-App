import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import type { useRestaurantType } from "@/Types/restaurantTypes";

const API_ENDPOINT = "https://instafood-99o4.onrender.com/api/v1/restaurant";

axios.defaults.withCredentials = true; // jwt token will be sent in request header for each request



export const useRestaurantOrder = create<useRestaurantType>()(
  persist(
    (set,get) => ({
      restaurant: null,
      loading: false,
      singleRestaurant: null,
      searchedrestaurant: [],
      filteredCuisines: [],
      restaurantOrders: [],

      createRestaurant: async (FormData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/`, FormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.Restaurant });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          console.log(error);
          toast.error(error.response.data.message);
        }
      },

      getrestaurant: async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/`);
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.Restaurant });
          }
        } catch (error: any) {
          set({ loading: false });
          console.log(error);
          toast.error(error.response.data.message);
        }
      },
      updateRestaurant: async (formdata: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_ENDPOINT}/`, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            set({ loading: false, restaurant: response.data.Restaurant });
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();
          params.set("searchQuery", searchQuery);
          params.set("selectedCuisines", selectedCuisines);
          // const response = await axios.post(`${API_ENDPOINT}/${searchText}?searchQuery=${searchQuery}&selectedCuisines=${selectedCuisines}`);
          const response = await axios.get(
            `${API_ENDPOINT}/search/${searchText}?${params.toString()}`
          );

          if (response.data.success) {
            set({ loading: false, searchedrestaurant: response.data.data });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      setfilteredCuisines: (data: string[]) => {
        set({ filteredCuisines: data });
      },
      getSingleRestaurant: async (id: string) => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/${id}`);
          if (response.data.success) {
            set({ loading: false, singleRestaurant: response.data.Restaurant });
          }
        } catch (error) {
          set({ loading: false });
          console.log(error);
        }
      },
      getRestaurantOrders: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_ENDPOINT}/orders`);
          if (response.data.success) {
            set({ loading: false, restaurantOrders: response.data.orders });
          }
        } catch (error) {
          console.log(error);
        }
      },
      updateOrderStatus: async (orderId: string, status: string) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_ENDPOINT}/orders/${orderId}/status`,
            { status }
          );
          if (response.data.success) {
            set({ loading: false });
           const updatedOrder = get().restaurantOrders.map((order)=>order._id===orderId?{...order,status:response.data.status}:order);
           set({restaurantOrders:updatedOrder});
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
          console.log(error);
        }
      },
    }),
    {
      name: "restaurant-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
