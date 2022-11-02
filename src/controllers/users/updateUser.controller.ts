import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/user";
import { updateUserService } from "../../services/users/updateUser.service";


export async function updateUserController(req: Request, res: Response) {
    const user: IUserUpdate = req.body
    const id: string = req.params.id

    const updatedUser = await updateUserService(user, id)

    return res.status(200).json({
        message: "User updated!",
        updatedUser: instanceToPlain(updatedUser)
    })

}