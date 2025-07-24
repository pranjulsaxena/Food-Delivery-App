import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CheckOutSessionRequest, OrderState } from "../src/Types/orderTypes";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_ENDPOINT: string = "http://localhost:5000/api/v1/order";

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
      getOrderDetails: async () => {},
    }),
    {
      name: "ordeDetails",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
