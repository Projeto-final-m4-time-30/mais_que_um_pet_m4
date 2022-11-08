import { Request, Response } from "express";
import adoptPetService from "../../services/pets/adoptPet.service";
import tokenDecoder from "../../utilities/tokenDecoder.utility";

const adoptPetController = async (req: Request, res: Response) => {
  const userToken = req.headers.authorization;

  if (!userToken) {
    return res.status(400).json({ message: "Missing authorizathion token." });
  }

  const petId = req.params.id;
  const user_register = tokenDecoder(userToken).user.id;
  const adopt = await adoptPetService(userToken, petId, user_register);

  return res.status(200).json(adopt);
};

export default adoptPetController;
