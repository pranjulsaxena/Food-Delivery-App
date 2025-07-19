import express from "express"
import { isAbsolute } from "path";
import { isAuthenticated } from "../middleware/isAuthenticated";
import upload from "../middleware/multer";
import { createMenu, editMenu } from "../controller/menu.controller";

const router = express.Router();

router.route("/").post(isAuthenticated,upload.single("image"),createMenu)

router.route("/:id").put(isAuthenticated,upload.single("image"),editMenu);


export default router;