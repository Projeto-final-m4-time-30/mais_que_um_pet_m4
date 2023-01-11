import AppDataSource from "../../data-source";
import { Pet } from "../../entities/pet.entity";
import { IPet } from "../../interfaces/pet";

export const readAdoptablePetsService = (): Promise<IPet[]> => {
  const petRepository = AppDataSource.getRepository(Pet);

  const adoptablePets = petRepository.find({
    where: { is_adoptable: true },
  });

  return adoptablePets;
};
