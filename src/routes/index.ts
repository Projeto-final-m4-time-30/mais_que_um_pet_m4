import { Express } from "express";
import { petRoutes } from "./pets/pet.routes";
import { userRoutes } from "./users/user.routes";

export const AppRoutes = (app: Express) => {
  app.use(userRoutes());
  app.use(petRoutes());
};
