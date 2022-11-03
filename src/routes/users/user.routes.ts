import { Router } from "express";
import { createUserController } from "../../controllers/users/createUser.controller";
import userDeleteController from "../../controllers/users/deleteUser.controller";
import userListController from "../../controllers/users/listUser.controller";
import { loginUserController } from "../../controllers/users/loginUser.controller";
import { updateUserController } from "../../controllers/users/updateUser.controller";
import verifyUserAuthenticationMiddleware from "../../middlewares/verifyUserAuthentication.middleware";
import { userCreateScheama } from "../../schemas";
import { createUserSerializer } from "../../serializers/createUser.serializer";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/users",
    createUserSerializer(userCreateScheama),
    createUserController
  );
  routes.patch(
    "/users/:id",
    verifyUserAuthenticationMiddleware,
    updateUserController
  );

  routes.post("/login", loginUserController);
  routes.get("/users", userListController);
  routes.delete(
    "/users/:id",
    verifyUserAuthenticationMiddleware,
    userDeleteController
  );

  return routes;
};
