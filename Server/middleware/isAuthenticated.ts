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
        console.log(req.cookies);
        if (!token) {
       res.status(401).json({ message: "No token", success: false });
       return;
    }

        
        const decoded_info = jwt.verify(token,process.env.SECRET_KEY!) as jwt.JwtPayload;
        if(!decoded_info?.userId){
             res.status(401).json({ message: "Invalid token", success: false })
             return
        }
        console.log(decoded_info.userId);
        req.userId = decoded_info.userId;

        next();

    }catch(error){
         res.status(401).json({ message: "Unauthorized", success: false });
         return;
    }
}