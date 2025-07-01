import { Request, Response } from "express";
import uploadImageCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const createMenu = async (req: Request, res: Response) => {
  try {
    const Restaurant = await restaurant.findOne({ user: req.userId });
    if (!Restaurant) {
      res.status(404).json({
        success: "false",
        message: "No restaurant found! Create restaurant before adding menu",
      });
      return;
    }
    const file = req.file;
    const { name, description, price } = req.body;

    if (!file) {
      res.status(401).json({ success: false, message: "Image is required" });
      return;
    }
    const imageUrl = await uploadImageCloudinary(file);

    const menu = await Menu.create({ name, description, price, imageUrl });

    (Restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(
      menu._id as mongoose.Schema.Types.ObjectId
    );

    res
      .status(201)
      .json({ success: true, message: "Menu added successfully", menu });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // id of specific menu that needs to be updated
    const { name, description, price } = req.body;
    const file = req.file;

    let menu = await Menu.findById(id);
    if (!menu) {
      return res.status(404).json({ success: false, message: "No menu found" });
    }

    const imageUrl = file ? await uploadImageCloudinary(file) : "";

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      {
        name: name || menu.name,
        price: price || menu.price,
        description: description || menu.description,
        imageUrl: imageUrl || menu.imageUrl,
      },
      { new: true } // return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Menu updated successfully!",
      data: updatedMenu,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
