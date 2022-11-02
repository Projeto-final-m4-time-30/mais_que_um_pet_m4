import { Router } from "express";
import { createUserController } from "../../controllers/users/createUser.controller";
import { loginUserController } from "../../controllers/users/loginUser.controller";
import { updateUserController } from "../../controllers/users/updateUser.controller";
import { userCreateScheama } from "../../schemas";
import { createUserSerializer } from "../../serializers/createUser.serializer";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "/users",
    createUserSerializer(userCreateScheama),
    createUserController
  );
  routes.patch("/users/:id", updateUserController)

  routes.post("/login", loginUserController);

  return routes;
};
