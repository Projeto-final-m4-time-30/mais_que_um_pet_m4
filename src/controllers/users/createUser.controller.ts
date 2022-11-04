import { Request, Response } from "express";
import { IUser } from "../../interfaces/user";

import { createUserService } from "../../services/users/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const reqBody: IUser = req.validatedBody;
  const newUser = await createUserService(reqBody);
  return res.status(201).json(newUser);
};
