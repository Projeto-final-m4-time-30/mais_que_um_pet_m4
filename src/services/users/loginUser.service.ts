import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/user";

export async function loginUserService({ email, password }: IUserLogin) {
  if (!email || !password) {
    throw new AppError("email/password is required");
  }

  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOne({ where: { email } });

  if (!userExist) {
    throw new AppError("Wrong email/password", 403);
  }

  if (!bcrypt.compareSync(password, userExist!.password)) {
    throw new AppError("Wrong email/password", 403);
  }

  const token = jwt.sign(
    {
      user: {
        id: userExist.id,
      },
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "1d",
    }
  );

  return token;
}
