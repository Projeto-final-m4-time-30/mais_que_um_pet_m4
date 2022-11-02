import updatePetsServices from "../../../services/pets/updatePetsService";
import { Request, Response } from "express";



const UpdatePetsControler = async (request: Request, response:Response)=>{
     const {name} = request.body
    const {size, pet_image, color ,especie ,descripition,vaccine} = request.body
    const{id} = request.params
    const {info_pet_id} = request.params
 const updatedPet = updatePetsServices({name},{size, pet_image, color ,especie ,descripition,vaccine},id,info_pet_id )
 return response.status(200).json({ message: "updated", pet : updatePetsServices,})

} 
    