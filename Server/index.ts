import express, { response, Response } from "express";
import "dotenv/config";
import connectDB from "./db/connectDB";
import userRoute from "./routes/user.routes";
import restaurantRoute from "./routes/restaurant.routes";
import menuRoute from "./routes/menu.routes";
import orderRoute from "./routes/order.routes";
import swagger from "./utils/swagger";
import cookieParser from "cookie-parser";
import cors from "cors";
import { stripeWebhook } from "./controller/order.controller";
import path from "path";

const app = express(); 
const PORT = Number(process.env.PORT) || 8000;
const DIRNAME = path.resolve();

app.post("/api/v1/order/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://instafood-99o4.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));


app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute); 
app.use("/api-docs",swagger);


app.use(express.static(path.join(DIRNAME,"/Client/dist")));
app.use(/.*/,(_,res:Response)=>{
    res.sendFile(path.resolve(DIRNAME, "Client","dist","index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on ${PORT}`);
});
