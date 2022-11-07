import updatePetsServices from "../../services/pets/updatePetsService";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer"

export const updatePetsControler = async (request: Request, response: Response) => {

  const { name, size, pet_image, color, species, descripition, vaccine } =
    request.body;
  const { id } = request.params;

  const { info_pet_id } = request.body;
  const updatedPet = await updatePetsServices(
    { name,
      size,
      pet_image,
      color,
      species,
      descripition,
      vaccine
    }, id, info_pet_id
  );
  return response.status(200).json({
    message: "upadated",
    upadated: instanceToPlain(updatedPet)

  })

};

