import AppDataSource from "../../database/data-source";
import { Pet } from "../../entities/pet.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import tokenDecoder from "../../utilities/tokenDecoder.utility";

const adoptPetService = async (userToken: string, petId: string) => {
  const userDatabase = AppDataSource.getRepository(User);

  const petDatabase = AppDataSource.getRepository(Pet);

  const pets = await petDatabase.find();

  const petExist = pets.find((pet) => {
    return pet.id === petId;
  });

  if (!petExist) {
    throw new AppError("Pet not found.");
  }

  if (!petExist.is_adoptable || !petExist.is_active) {
    throw new AppError("Can't adopt this pet.");
  }

  const userData: any = tokenDecoder(userToken);

  const user = await userDatabase.findOneBy({ id: userData.user.id });

  if (!user) {
    throw new AppError("User not found.");
  }

  await petDatabase.update(petId, {
    is_adoptable: false,
    user: user,
  });

  const newUser = await userDatabase.findOneBy({ id: userData.id });
  const newPet = await petDatabase.findOneBy({ id: petExist.id });

  return {
    message: "Pet Adopted",
    user: newUser!.user_name,
    pet: { name: newPet!.name, is_adoptable: newPet!.is_adoptable },
  };
};
export default adoptPetService;
