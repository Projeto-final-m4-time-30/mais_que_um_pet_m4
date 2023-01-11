import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
("../errors/appError");

const deleteUserService = async (id: string) => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new AppError("User not found.");
  }

  if (!user.is_active) {
    throw new AppError("User is not active.", 401);
  }

  await database.update(id, {
    is_active: false,
  });

  return "user deleted";
};
export default deleteUserService;
