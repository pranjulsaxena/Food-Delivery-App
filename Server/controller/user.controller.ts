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

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Account doesn't exist", success: false });
    }
    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiredAt = resetTokenExpiresAt;
    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { nePassword: newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiredAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }
    // update Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiredAt = undefined;
    await user.save();

    // send success reset email
    await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { fullName, email, address, city, country, profilePicture } =
      req.body;
    // upload image on cloudinary
    let cloudResponse: any;
    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = { fullName, email, address, city, country };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
      message: "Profile Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
