import { Router } from "express";
import userDeleteController from "../../controllers/userDelete.controller";
import userListController from "../../controllers/userList.controller";
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
  routes.get("/users", userListController);
  routes.delete("/users/:id", userDeleteController);

  return routes;
};
