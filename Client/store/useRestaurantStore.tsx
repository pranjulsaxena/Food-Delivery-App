import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_ENDPOINT = "http://localhost:5000/api/v1/restaurant";

axios.defaults.withCredentials = true; // jwt token will be sent in request header for each request

type Restaurant={
  restaurantName:string,
  city:string,
  cuisines:[],
  country:string,
  deliveryTime:number,
  imageUrl:undefined;
}

type useRestaurantType = {
  loading:boolean;
  restaurant:null | Restaurant;
  createRestaurant:(formdata:FormData)=>Promise<void>;
  getrestaurant:()=>Promise<void>;
  updateRestaurant:(formData:FormData)=>Promise<void>;
}

export const useRestaurantOrder = create<useRestaurantType>()(
  persist(
    (set) => ({
      restaurant: null,
      loading: false,
      

      createRestaurant: async (FormData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/`, FormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.success) {
            set({ loading: false,restaurant:response.data.Restaurant });
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
    }),
    {
      name: "restaurant-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
