import type { LoginInputState, SignupInputState } from "@/schema/userSchema";

export type User = {
  fullName: string;
  email: string;
  contact: number;
  address: string;
  country: string;
  city: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};
export type userState = {
  user: null | User;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  login: (input: LoginInputState) => Promise<void>;
  signup: (input: SignupInputState) => Promise<void>;
  checkAuth: () => Promise<void>;
  logOut: () => Promise<void>;
  forgotPasswordapi: (email: string) => Promise<void>;
  resetpassword: (newPassword: string, token: string) => Promise<void>;
  updatedetails: (input: any) => Promise<void>;
};