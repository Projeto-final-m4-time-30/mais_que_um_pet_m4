import { Request, Response } from "express"
import { IPet } from "../../interfaces/pet"
import { createPetService } from "../../services/pets/createPets.service"

export const createPetsController = async (req: Request, res: Response) => {

    const pet: IPet = req.body

    const newPet = await createPetService(pet)

    return res.status(201).json(newPet)

}
