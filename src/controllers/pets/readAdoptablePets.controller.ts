import { Request, Response } from "express"
import { readAdoptablePetsService } from "../../services/pets/readAdoptablePets.service"

export const readAdoptablePetsController = async (req: Request, res: Response) => {

    const adoptablePets = await readAdoptablePetsService()
    return res.json(adoptablePets)
    
}
