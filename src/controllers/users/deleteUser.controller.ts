import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import deleteUserService from "../../services/users/deleteUser.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deleted = await deleteUserService(id);

    if (deleted.statusCode === 400) {
      return res.status(400).json({ message: deleted.message });
    }

    return res.status(204).json(deleted);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
  }
};

export default userDeleteController;
