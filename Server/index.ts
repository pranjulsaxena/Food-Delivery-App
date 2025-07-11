import express from "express"
import 'dotenv/config'
import connectDB from "./db/connectDB";
import userRoute from "./routes/user.routes"
import restaurantRoute from "./routes/restaurant.routes"
import menuRoute from "./routes/menu.routes"
import orderRoute from "./routes/order.routes"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
const PORT = process.env.PORT||5000;


// app.use(bodyParser.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
const corsOptions = {
    origin:"https://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("api/v1/restaurant",restaurantRoute);
app.use("/api/v1/menu",menuRoute)
app.use("api/v1/order",orderRoute);

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is listened on ${PORT}`)});


