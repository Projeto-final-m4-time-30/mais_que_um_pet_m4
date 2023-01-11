import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserNoPassword } from "../../interfaces/user";

const listUserService = async () => {
  const database = AppDataSource.getRepository(User);

  const users = await database.find();

  const usersNoPassword = users.map((user) => {
    const uNoPassword: IUserNoPassword = user;
    delete uNoPassword.password;

    return uNoPassword;
  });

  return usersNoPassword;
};

export default listUserService;
