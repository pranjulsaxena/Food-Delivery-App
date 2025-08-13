import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CheckOutSessionRequest, OrderState } from "../src/Types/orderTypes";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT: string = "https://instafood-99o4.onrender.com/api/v1/order";

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      createCheckOutSession: async (
        CheckOutSessionRequest: CheckOutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/checkout/create-checkout-session`,
            CheckOutSessionRequest,
            { headers: { "Content-Type": "application/json" } }
          );
          window.location.href = response.data.session.url;
          set({loading:false});
        } catch (error) {
          set({ loading: false });
          console.log(error);
        }
      },
      getOrderDetails: async () => {
        try{
          set({loading:true});
          const response = await axios.get(`${API_ENDPOINT}`);
          if(response.data.success){
            set({loading:false,orders:response.data.Orders});

          }
        }catch(error){
          set({loading:false});
          console.log(error);
        }
      },
    }),
    {
      name: "ordeDetails",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
