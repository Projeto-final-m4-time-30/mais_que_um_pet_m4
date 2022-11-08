import AppDataSource from "../../database/data-source";
import { Pet } from "../../entities/pet.entity";
import { AppError } from "../../errors/appError";
const deletePetsService = async (id:string)=>{
 
const petRepository = AppDataSource.getRepository(Pet)


 const pet = await petRepository.findOne({
  where:{id}
})


if(!pet){
  throw new AppError("Pet not find",404)
}

await petRepository.delete({id})

return {statusCode:204,message:"pet deleted"}

}
export default deletePetsService