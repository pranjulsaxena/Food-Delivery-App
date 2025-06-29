import {NextFunction, Request,Response} from "express";
import jwt from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

export const isAuthenticated=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const token = req.cookies.token;
        
        const decoded_info = jwt.verify(token,process.env.secrety_key!);
        if(!decoded_info){
             res.json(401).json({message:"Authentication failed", success:false}) as jwt.JwtPayload
             return
        }
        req.userId = decoded_info.userId;

        next();

    }catch(error){
        console.log(error)
    }
}