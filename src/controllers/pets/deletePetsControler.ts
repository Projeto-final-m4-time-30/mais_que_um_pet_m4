import deletePetsService from "../../services/pets/deletePets.service";

import { Request, Response } from "express";

export const deletePetControler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletePet = await deletePetsService(id);

  return res.status(204).json({ message: "pet Deleted" });
};
