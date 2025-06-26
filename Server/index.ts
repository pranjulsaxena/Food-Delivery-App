import express from "express"
import 'dotenv/config'
import connectDB from "./db/connectDB";
const app = express();
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is listened on ${PORT}`)});


