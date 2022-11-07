import { Request, Response } from "express";
import { IPet } from "../../interfaces/pet";
import { createPetService } from "../../services/pets/createPets.service";
import tokenDecoder from "../../utilities/tokenDecoder.utility";

export const createPetsController = async (req: Request, res: Response) => {
  const pet: IPet = req.body;
  const token = req.headers.authorization!;

  const id = tokenDecoder(token);

  const newPet = await createPetService(pet, id.user.id);

  return res.status(201).json(newPet);
};
