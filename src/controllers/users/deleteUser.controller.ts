import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const userDeleteController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const message = await deleteUserService(id);

  return res.status(204).json({ message });
};

export default userDeleteController;
