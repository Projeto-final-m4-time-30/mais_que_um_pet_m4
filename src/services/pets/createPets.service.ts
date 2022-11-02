import AppDataSource from "../../database/data-source";
import { Info_pet } from "../../entities/info_pet.entity";
import { Pet } from "../../entities/pet.entity";
import { AppError } from "../../errors/appError";
import { IPet } from "../../interfaces/pet";

export const createPetService = async ({
    name,
    is_adoptable,
    info_pet
}: IPet) =>{
   const petRepository = AppDataSource.getRepository(Pet)
   const infoPetsRepository = AppDataSource.getRepository(Info_pet)
   const {pet_image, size, color, species, description, vaccine} = info_pet
   
   const petAlreadyExists = await petRepository.findOne({
    where: {info_pet}
   })

   if(petAlreadyExists){
    throw new AppError(400, "This pet is already registered")
   }

   const newInfo_Pet = new Info_pet()
   newInfo_Pet.pet_image = pet_image ? pet_image : ""
   newInfo_Pet.size = size
   newInfo_Pet.color = color
   newInfo_Pet.species = species
   newInfo_Pet.description = description
   newInfo_Pet.vaccine = vaccine

   infoPetsRepository.create(newInfo_Pet)
   await infoPetsRepository.save(newInfo_Pet)

   const newPet = new Pet
   newPet.name = name
   newPet.is_adoptable = is_adoptable
   newPet.is_active = true
   newPet.info_pet = newInfo_Pet

   petRepository.create(newPet)
   await petRepository.save(newPet)

   return newPet
}