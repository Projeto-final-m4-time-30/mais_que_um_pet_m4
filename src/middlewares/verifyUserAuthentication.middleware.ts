import { Response, Request, NextFunction } from "express";
import AppDataSource from "../database/data-source";
import { User } from "../entities/user.entity";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

const verifyUserAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError("missing authorization token.");
  }

  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const token = authorization.split(" ")[1];

  const payload: any = jwt.verify(
    token,
    String(process.env.JWT_SECRET),
    (err, decoded) => {
      if (!decoded) {
        return res.status(401).json({ message: "User invalid." });
      }
      return decoded;
    }
  );

  const exists = users.find((user) => user.email === payload.email);

  if (!exists) {
    return res.status(404).json({ message: "User invalid." });
  }

  return next();
};

export default verifyUserAuthenticationMiddleware;
