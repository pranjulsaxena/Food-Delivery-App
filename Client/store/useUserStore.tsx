import type {
  LoginInputState,
  SignupInputState,
} from "../src/schema/userSchema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const API_ENDPOINT = `http://localhost:5000/api/v1/user`;

export const useUserStore = create()(
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
            console.log(response.data);
            toast.success(`${response.data.message}`);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
            let navigate = useNavigate();
            navigate("http://localhost:5173/verifypassword");
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      login: async (input: LoginInputState) => {
        console.log("inside login");
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/login`, input, {
            headers: { "Content-Type": "application/json" },
          });
          if (response.data.success) {
            console.log(response.data.user);
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
          let navigate = useNavigate();
          () => {
            let navigate = useNavigate();
            navigate("http://localhost:5173/verifypassword");
          };
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
            console.log(response.data.user);
            toast.success(response.data.message);
            set({ loading: false, user: response.data.user });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      },
      checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_ENDPOINT}/check-auth`);
            if (response.data.success) {
                set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({isAuthenticated: false, isCheckingAuth: false });
        }
    },
      logOut: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_ENDPOINT}/logout`);
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false, user: null, isAuthenticated: false });
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
