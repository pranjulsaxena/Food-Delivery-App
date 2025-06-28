import express from "express";
import { IUserDocument, User } from "../models/usermodel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Request, Response } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import cloudinary from "../utils/cloudinary";
import { generateVerificationToken } from "../utils/generateVerificationToken";
import { generateToken } from "../utils/generateToken";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} from "../mailtrap/email";

const app = express();

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, contact, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();

    user = await User.create({
      fullName,
      email,
      contact: Number(contact),
      password: hashedPassword,
      verificationToken,
      verificationExpiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    generateToken(res, user);
    await sendVerificationEmail(email, verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Sever Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist. Kindly signup",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials!!" });
    }
    generateToken(res, user);
    user.lastlogin = new Date();
    await user.save();

    // send user without password
    const userWithoutPassword = await User.findOne({ email });
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationToken } = req.body;
    const user = await User.findOne({
      verificationToken,
      verificationExpiredAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiredAt = undefined;
    await user.save();

    // send welcome email
    await sendWelcomeEmail(user.email, user.fullName);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

