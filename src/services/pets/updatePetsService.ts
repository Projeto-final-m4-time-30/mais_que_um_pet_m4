import AppDataSource from "../../database/data-source";
import { IUpdatePet } from "../../interfaces";
import { IInfoPet } from "../../interfaces"
import { Pet } from "../../entities/pet.entity";
import { Info_pet } from "../../entities/info_pet.entity";
import { AppError } from "../../errors/appError";

const updatePetsServices = async ({name}: IUpdatePet , {size, pet_image, color ,especie ,descripition,vaccine} :IInfoPet, id:string,info_pet_id:string )=>{
const petsRepository = AppDataSource.getRepository(Pet)
const infoRepository = AppDataSource.getRepository(Info_pet)

const findPet = await petsRepository.findOneBy({
    id
})


if (!findPet){
    throw new AppError(404,"Category not find")
}

const findInfo = await infoRepository.findOneBy({
    id
})


await petsRepository.update(
    id,
    
 {
  name:name ? name :findPet!.name, 
 }



)
await infoRepository.update(
    info_pet_id,
    {
        size:size ? size : 
    }
)


}

export default updatePetsServices