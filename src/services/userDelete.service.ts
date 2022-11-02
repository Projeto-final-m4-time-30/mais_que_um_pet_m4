import AppDataSource from "../database/data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
("../errors/appError");

const userDeleteService = async (id: string) => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new AppError("User not found.");
  }

  if (user.is_active === false) {
    return { status: 400, message: "User not found." };
  }

  await database.update(id, {
    is_active: false,
  });

  //   await database.softDelete(id);

  return { message: "User deleted." };
};
export default userDeleteService;
