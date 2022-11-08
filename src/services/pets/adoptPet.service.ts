import AppDataSource from "../../database/data-source";
import { Pet } from "../../entities/pet.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const adoptPetService = async (
  reqEmail: string,
  petId: string,
  userRegister: string
) => {
  const userDatabase = AppDataSource.getRepository(User);

  const petDatabase = AppDataSource.getRepository(Pet);

  const newOwner = await userDatabase.findOneBy({ email: reqEmail });

  const pet = await petDatabase.findOneBy({
    user_register: userRegister,
    id: petId,
  });

  //Validações
  if (!newOwner) {
    throw new AppError("user not found.", 404);
  }
  if (newOwner.id === userRegister) {
    throw new AppError("Can't adopt own pet.", 401);
  }
  if (!pet) {
    throw new AppError("Pet not found.", 404);
  }
  if (!pet.is_adoptable || !pet.is_active) {
    throw new AppError("Can't adopt this pet.", 401);
  }

  await petDatabase.update(petId, {
    is_adoptable: false,
    user: newOwner,
  });

  const updatedUser = await userDatabase.findOneBy({ id: newOwner.id });

  return {
    message: "Pet Adopted",
    user: {
      name: updatedUser!.user_name,
      id: updatedUser!.id,
      pets: updatedUser!.pets,
    },
  };
};
export default adoptPetService;
