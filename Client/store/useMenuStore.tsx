import type { menuStoreType } from "@/Types/menuTypes";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

axios.defaults.withCredentials = true;
const API_ENDPOINT = "https://instafood-99o4.onrender.com/api/v1/menu/";



export const useMenuStore = create<menuStoreType>()(
  persist(
    (set) => ({
      loading: false,
      menu: [],

      createMenu: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            // set({loading:false,menu:response.data.menu});\
            set((state:menuStoreType) => ({
              loading: false,
              menu: [...state.menu, response.data.data],
            }));
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },

      editMenu: async (menuId: string, formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_ENDPOINT}${menuId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.data.success) {
            set((state:menuStoreType) => ({
              loading: false,
              menu: [...state.menu, response.data.data],
            }));
            toast.success(response.data.message);
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "menu-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
