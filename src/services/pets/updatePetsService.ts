import AppDataSource from "../../database/data-source";
import { IUpdatePet } from "../../interfaces/pet";
import { Pet } from "../../entities/pet.entity";
import { Info_pet } from "../../entities/info_pet.entity";
import { AppError } from "../../errors/appError";

const updatePetsServices = async ({name,
    size,
    pet_image ,
    color ,
    species ,
    descripition,
    vaccine} :IUpdatePet, id:string, info_pet_id:string ) =>{
const petsRepository = AppDataSource.getRepository(Pet)
const infoRepository = AppDataSource.getRepository(Info_pet)

const findPet = await petsRepository.findOneBy({
    id : id
})


if (!findPet){
    throw new AppError("Pet not find",404)
}

const findInfo = await infoRepository.findOneBy({
    id : info_pet_id
})
if (!findInfo){
    throw new AppError("infoPets not find",404)
}

await petsRepository.update(
    id,
    
 {
  name:name ? name :findPet!.name, 
 }



)
await infoRepository.update(
    info_pet_id,
    {
        size:size ? size : findInfo.size,
        pet_image:pet_image ? pet_image : findInfo.pet_image,
        color:color ? color: findInfo.color,
        species:species ? species: findInfo.species,
        description:descripition ?  descripition :findInfo.description,
        vaccine:vaccine ? vaccine :findInfo.vaccine



    }
)


const pet= await petsRepository.findOne({
   where:{id}
 })

 return pet!
}



export default updatePetsServices