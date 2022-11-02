import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

const verifyUserAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let authorization = req.headers.authorization

  if(!authorization){
    throw new AppError("missing authorization token.");
  }

  const token = authorization.split(" ")[1];
  
  token.split(" ")[1]
  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) =>{
      if(error){
          return res.status(403).json({
              message: 'Invalid token'
          })
      }
      if(decoded){
          req.body.user = {
             isActive: decoded.isActive,
             id: decoded.sub
          }
      }
      return next()
  })
};

export default verifyUserAuthenticationMiddleware;
