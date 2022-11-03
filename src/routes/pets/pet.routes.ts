import { Router } from "express";
import adoptPetController from "../../controllers/pets/adoptPet.controller";
import { createPetsController } from "../../controllers/pets/createPets.controller";
import { readAdoptablePetsController } from "../../controllers/pets/readAdoptablePets.controller";
import { readAllPetsController } from "../../controllers/pets/readAllPets.controllers";
import verifyUserAuthenticationMiddleware from "../../middlewares/verifyUserAuthentication.middleware";

const routes = Router();

export const petRoutes = () => {
  routes.post("/pet", createPetsController);
  routes.get("/pet", readAllPetsController);
  routes.get("/pet/adoptable", readAdoptablePetsController);
  // routes.patch(
  //   "/pet/adopt/:id",
  //   verifyUserAuthenticationMiddleware,
  //   adoptPetController
  // );

  return routes;
};
