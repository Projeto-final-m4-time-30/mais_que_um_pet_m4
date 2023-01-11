import AppDataSource from "../../data-source"
import { Pet } from "../../entities/pet.entity"

export const readAllPetsService = async (): Promise<Pet[]> =>{
    const petRepository = AppDataSource.getRepository(Pet)
    const pets = await petRepository.find()

    return pets
}