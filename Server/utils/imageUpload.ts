import cloudinary from "./cloudinary";

export const uploadImageCloudinary = async (file: Express.Multer.File) => {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURL = `data:${file.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary.uploader.upload(dataURL);
    return uploadResponse.secure_url;
}

export default uploadImageCloudinary;
