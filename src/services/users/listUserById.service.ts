import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const listUserByIdService = async (id: string) => {
  const database = AppDataSource.getRepository(User);

  const user = await database.findOne({
    where: {
      id,
    },
  });
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;
};

export default listUserByIdService;
