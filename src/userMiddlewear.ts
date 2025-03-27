import { NextFunction, Request,Response} from "express";
import jwt from "jsonwebtoken"
const JWT_SECRET_KEY='GRGREGREGRG'



export const userMiddlewear=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers["authorization"];

    const decode=jwt.verify(token as string,JWT_SECRET_KEY);

  if(decode){
    //@ts-ignore
    req.userId=decode.id;
    next()
  }
  else{
    res.json({
        message:"wrong credentials"
    })
  }
 
}

