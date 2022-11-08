import { Request, Response } from "express";
import adoptPetService from "../../services/pets/adoptPet.service";
import tokenDecoder from "../../utilities/tokenDecoder.utility";

const adoptPetController = async (req: Request, res: Response) => {
  const userToken = req.headers.authorization;
  const reqEmail = req.body;

  if (!userToken) {
    return res.status(400).json({ message: "Missing authorizathion token." });
  }
  if (!reqEmail.email) {
    return res.status(400).json({ message: "Missing Email." });
  }

  const petId = req.params.id;
  const userRegister = tokenDecoder(userToken).user.id;
  const adopt = await adoptPetService(reqEmail.email, petId, userRegister);

  return res.status(200).json(adopt);
};

export default adoptPetController;
