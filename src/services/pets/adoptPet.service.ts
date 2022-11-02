import AppDataSource from "../../database/data-source";
import { Pet } from "../../entities/pet.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import tokenDecoder from "../../utilities/tokenDecoder.utility";

const adoptPetService = async (userToken: string, petId: string) => {
  const userDatabase = AppDataSource.getRepository(User);

  const petDatabase = AppDataSource.getRepository(Pet);

  const pets = await petDatabase.find();

  const petExist = pets.filter((pet) => {
    pet.id === petId;
  });

  if (!petExist) {
    throw new AppError("Pet not found.");
  }

  const userData = tokenDecoder(userToken);

  await petDatabase.update(petId, {
    is_adoptable: false,
    donor_id: userData.id,
  });

  const newPets = [...userData.pets];

  await userDatabase.update(userData.id, {
    pets: [...newPets, petExist],
  });

  const newUser = await userDatabase.findBy({ id: userData.id });

  return { message: "Pet Adopted", newUser };
};
export default adoptPetService;
