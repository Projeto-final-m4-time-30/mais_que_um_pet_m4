import { Request, Response } from "express";
import adoptPetService from "../../services/pets/adoptPet.service";

const adoptPetController = async (req: Request, res: Response) => {
  const userToken = req.headers.authorization;

  if (!userToken) {
    return res.status(400).json({ message: "Missing authorizathion token." });
  }

  const petId = req.params.id;
  console.log("------------------------", petId);
  const adopt = await adoptPetService(userToken, petId);

  return res.status(200).json(adopt);
};

export default adoptPetController;
