import { Router } from "express";
import { createUserController } from "../../controllers/users/createUser.controller";
import userDeleteController from "../../controllers/users/deleteUser.controller";
import userListController from "../../controllers/users/listUser.controller";
import listUserByIdController from "../../controllers/users/listUserById.controller";
import { loginUserController } from "../../controllers/users/loginUser.controller";
import { updateUserController } from "../../controllers/users/updateUser.controller";
import verifyUserAuthenticationMiddleware from "../../middlewares/verifyUserAuthentication.middleware";
import { userCreateScheama } from "../../schemas";
import { validateSerializer } from "../../serializers/validate.serializer";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/users",
    validateSerializer(userCreateScheama),
    createUserController
  );
  routes.patch(
    "/users/:id",
    verifyUserAuthenticationMiddleware,
    updateUserController
  );

  routes.post("/login", loginUserController);
  routes.get("/users", userListController);

  routes.get(
    "/user",
    verifyUserAuthenticationMiddleware,
    listUserByIdController
  );
  routes.delete(
    "/users/:id",
    verifyUserAuthenticationMiddleware,
    userDeleteController
  );

  return routes;
};
