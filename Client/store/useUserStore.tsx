import type {
  LoginInputState,
  SignupInputState,
} from "../src/schema/userSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import type { userState } from "../src/Types/userTypes";

export const API_ENDPOINT = `http://localhost:5000/api/v1/user`;


export const useUserStore = create<userState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,

      // signup api implementation
      signup: async (input: SignupInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/signup`,
            {
              fullName: input.name,
              contact: input.phone,
              password: input.password,
              email: input.email,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response.data.success) {
            toast.success(`${response.data.message}`);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      login: async (input: LoginInputState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      verifyEmail: async (input: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/verify-email`,
            { verificationToken: input },
            { headers: { "Content-Type": "application/json" } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      checkAuth: async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/check-auth`, {
            withCredentials: true,
          });

          if (response.data.success) {
            set({
              isCheckingAuth: false,
              isAuthenticated: true,
              user: response.data.user,
            });
          }
        } catch (error: any) {
          console.log(error.message);
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },
      logOut: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/logout`, null, {
            withCredentials: true,
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      forgotPasswordapi: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/forgot-password`, {
            email: email,
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      resetpassword: async (newPassword: string, token: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/reset-password/${token}`,
            { newPassword }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      updatedetails: async (input: any) => {
        try {
          set({ loading: true });
          const response = await axios.put(
            `${API_ENDPOINT}/profile/update`,
            input,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "UserDetails",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
