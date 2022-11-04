import deletePetsService from "../../services/pets/deletePetsServices";

import { Request, Response } from "express";

export const deletePetControler = async (req: Request, res: Response) => {
  const { id } = req.params;
 
  const deletePet = await deletePetsService(id);
   console.log(deletePet)
  return res.status(200).json({ message: "pet Deleted" });
};
