import { hash } from "bcrypt";
import AppDataSource from "../../database/data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/user";

export async function updateUserService(
  user: IUserUpdate,
  id: string
): Promise<User> {
  const userRepository = AppDataSource.getRepository(User);

  const userKeys = Object.keys(user);

  if (userKeys.includes("isActive")) {
    throw new AppError("Is not able to update isActive value", 401);
  }

  if (userKeys.includes("id")) {
    throw new AppError("Is not able to update id", 401);
  }

  const findedUser = await userRepository.findOneBy({ id });

  if (!findedUser) {
    throw new AppError("User not found", 404);
  }

  const { user_name, user_image, email, password } = user;
  await userRepository.update(id, {
    user_name: user_name ? user_name : findedUser.user_name,
    user_image: user_image ? user_image : findedUser.user_image,
    email: email ? email : findedUser.email,
    password: password ? await hash(password, 10) : findedUser.password,
  });

  const updatedUser = await userRepository.findOneBy({ id });
  return updatedUser!;
}
