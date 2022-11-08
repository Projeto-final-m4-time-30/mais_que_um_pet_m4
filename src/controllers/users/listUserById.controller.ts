import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listUserByIdService from "../../services/users/listUserById.service";
import tokenDecoder from "../../utilities/tokenDecoder.utility";

const listUserByIdController = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  const id = tokenDecoder(token!).user.id;

  const user = await listUserByIdService(id);

  return res.status(200).json(instanceToPlain(user));
};

export default listUserByIdController;
