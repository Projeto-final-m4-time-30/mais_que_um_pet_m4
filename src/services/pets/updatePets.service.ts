import AppDataSource from "../../data-source";
import { IUpdatePet } from "../../interfaces/pet";
import { Pet } from "../../entities/pet.entity";
import { Info_pet } from "../../entities/info_pet.entity";
import { AppError } from "../../errors/appError";

const updatePetsServices = async (
  { description, name, pet_image, size, vaccine, age }: IUpdatePet,
  user_token_id: string,
  id_pet_update: string
) => {
  const petsRepository = AppDataSource.getRepository(Pet);
  const infoRepository = AppDataSource.getRepository(Info_pet);

  const findPet = await petsRepository.findOneBy({ id: id_pet_update });

  if (!findPet) {
    throw new AppError("Pet not found", 404);
  }

  if (findPet.user_register !== user_token_id) {
    throw new AppError("Unauthorized", 401);
  }

  const id_info_pet = findPet.info_pet.id;

  const findInfo = await infoRepository.findOneBy({
    id: id_info_pet,
  });

  if (!findInfo) {
    throw new AppError("infoPets not found", 404);
  }

  await petsRepository.update(id_pet_update, {
    name: name ? name : findPet!.name,
    age: age ? age : findPet!.age,
  });

  await infoRepository.update(id_info_pet, {
    size: size ? size : findInfo.size,
    pet_image: pet_image ? pet_image : findInfo.pet_image,
    description: description ? description : findInfo.description,
    vaccine: vaccine ? vaccine : findInfo.vaccine,
  });

  const pet = await petsRepository.findOne({
    where: { id: id_pet_update },
  });

  return pet!;
};

export default updatePetsServices;
