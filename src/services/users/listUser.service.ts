import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";

const listUserService = async () => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const usersActive = users.filter((user) => user.is_active === true);

  return usersActive;
};

export default listUserService;
