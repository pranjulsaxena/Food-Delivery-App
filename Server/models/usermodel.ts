import mongoose, { Document, mongo } from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  contact: number;
  password: string;
  address: string;
  country: string;
  city: string;
  profilePicture: string;
  admin: boolean;
  lastlogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: String;
  resetPasswordTokenExpiredAt?: Date;
  verificationToken?: String;
  verificationExpiredAt?: Date;
}
export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, default: "Update your address" },
    city: { type: String, default: "Update your city" },
    country: { type: String, default: "Update your country" },
    profilePicture: { type: String, default: "" },
    admin: { type: Boolean, default: false },
    lastlogin: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordTokenExpiredAt: Date,
    verificationToken: String,
    verificationExpiredAt: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
