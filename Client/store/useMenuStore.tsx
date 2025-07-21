import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

axios.defaults.withCredentials = true;
const API_ENDPOINT = "http://localhost:5000/api/v1/menu/";

type menuStoreType = {
  loading: boolean;
  menu: Menu[];
  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};
type Menu = {
  name: string;
  description: string;
  price: number;
  image: undefined;
};

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
            set((state) => ({
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
            set((state) => ({
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
