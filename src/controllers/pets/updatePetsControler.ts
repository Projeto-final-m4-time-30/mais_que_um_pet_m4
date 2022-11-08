import updatePetsServices from "../../services/pets/updatePets.service";
import { Request, Response } from "express";
import tokenDecoder from "../../utilities/tokenDecoder.utility";
import { IUpdatePet } from "../../interfaces/pet";

export const updatePetsControler = async (req: Request, res: Response) => {
  const body_req: IUpdatePet = req.validatedBody;
  const user_token_id = tokenDecoder(req.headers.authorization!).user.id;
  const { id: id_pet_update } = req.params;

  const pet_update = await updatePetsServices(
    body_req,
    user_token_id,
    id_pet_update
  );

  return res.status(200).json({ pet_update, message: "Pet updated" });
};
