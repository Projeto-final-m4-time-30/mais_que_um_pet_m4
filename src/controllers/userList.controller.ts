import { Request, Response } from "express";
import userListService from "../services/userList.service";

const userListController = async (req: Request, res: Response) => {
  const users = await userListService();

  return res.status(200).json(users);
};

export default userListController;
