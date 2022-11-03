import AppDataSource from "../../database/data-source";
import { Pet } from "../../entities/pet.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import tokenDecoder from "../../utilities/tokenDecoder.utility";

const adoptPetService = async (userToken: string, petId: string) => {
  const userDatabase = AppDataSource.getRepository(User);

  const petDatabase = AppDataSource.getRepository(Pet);

  const pets = await petDatabase.find();

  // console.log("--------------------------", pets);

  const petExist = pets.find((pet) => {
    return pet.id === petId;
  });

  if (!petExist) {
    throw new AppError("Pet not found.");
  }

  const userData: any = tokenDecoder(userToken);

  const user = await userDatabase.findOneBy({ id: userData.user.id });

  if (!user) {
    throw new AppError("User not found.");
  }

  console.log("-------------------userdata------", user.pets);

  // await petDatabase.update(petId, {
  //   is_adoptable: false,
  //   donor_id: user,
  // });

  // const newPets = [...userData.user.pets];

  await userDatabase.update(user.id, {
    pets: [...pets, petExist],
  });

  const newUser = await userDatabase.findOneBy({ id: userData.id });

  return { message: "Pet Adopted", newUser };
};
export default adoptPetService;
