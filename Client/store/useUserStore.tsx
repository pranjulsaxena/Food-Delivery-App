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
type User = {
  fullName:string;
  email:string;
  contact:number;
  address:string;
  country:string;
  city:string;
  profilePicture:string;
  admin:boolean;
  isVerified: boolean;
}
type userState= {
  user:null |User;
  isAuthenticated:boolean;
  isCheckingAuth:boolean;
  loading:boolean;
  login:(input:LoginInputState)=>Promise<void>;
  signup:(input:SignupInputState)=>Promise<void>;
  checkAuth:()=>Promise<void>;
  logOut:()=>Promise<void>;
  forgotPasswordapi:(email:string)=>Promise<void>;
  resetpassword:(newPassword:string,token:string)=>Promise<void>;
  updatedetails:(input:any)=>Promise<void>;
}

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
      checkAuth: async () => {},
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
      resetpassword: async (newPassword:string,token:string) => {
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
      updatedetails:async(input:any)=>{
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_ENDPOINT}/profile/update`,
            {input }

          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          set({ loading: false });
          toast.error(error.response.data.message);
        }
      }
    }),
    {
      name: "UserDetails",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
