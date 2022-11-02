import { Request, Response } from "express"
import { readAllPetsService } from "../../services/pets/readAllPets.service"

export const readAllPetsController = async (req: Request, res: Response) => {
    const allPets = await readAllPetsService()
    return res.json(allPets)
    
}
