import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_ENDPOINT = "http://localhost:5000/api/v1/restaurant";

axios.defaults.withCredentials = true; // jwt token will be sent in request header for each request

type Menu = {
    Name:string;
    Description:string;
    Price:number;
    MenuImage:undefined;
}

type Restaurant={
  restaurantName:string,
  city:string,
  cuisines:[],
  country:string,
  deliveryTime:number,
  imageUrl:undefined;
  menus:Menu[];
  _id:string;
}

type useRestaurantType = {
  loading:boolean;
  restaurant:null | Restaurant;
  searchedrestaurant:Restaurant[];
  filteredCuisines:string[];
  singleRestaurant:any;
  setfilteredCuisines:(data:string[])=>void;
  createRestaurant:(formdata:FormData)=>Promise<void>;
  getrestaurant:()=>Promise<void>;
  updateRestaurant:(formData:FormData)=>Promise<void>;
  searchRestaurant:(searchQuery:string,searchText:string,selectedCuisines:any)=>Promise<void>;
}

export const useRestaurantOrder = create<useRestaurantType>()(
  persist(
    (set) => ({
      restaurant: null,
      loading: false,
      singleRestaurant:null,
      searchedrestaurant:[],
      filteredCuisines:[],
      

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
      searchRestaurant:async(searchText:string,searchQuery:string,selectedCuisines:any)=>{
        try{
          set({loading:true});
          const params =new URLSearchParams();
          params.set("searchQuery",searchQuery);
          console.log(searchText);
          params.set("selectedCuisines",selectedCuisines);
          console.log(selectedCuisines);
          // const response = await axios.post(`${API_ENDPOINT}/${searchText}?searchQuery=${searchQuery}&selectedCuisines=${selectedCuisines}`);
          const response = await axios.get(`${API_ENDPOINT}/search/${searchText}?${params.toString()}`);
          console.log(selectedCuisines);

          if(response.data.success){
            set({loading:false,searchedrestaurant:response.data.data});

          }
        }catch(error:any){
          set({loading:false});
          toast.error(error.response.data.message);

        }
      },
      setfilteredCuisines:(data:string[])=>{
        set({ filteredCuisines: data })
      },
      
    }),
    {
      name: "restaurant-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
