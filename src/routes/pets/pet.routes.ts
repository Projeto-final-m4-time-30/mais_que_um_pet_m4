import { Router } from "express";
import { createPetsController } from "../../controllers/pets/createPets.controller";
import { readAdoptablePetsController } from "../../controllers/pets/readAdoptablePets.controller";
import { readAllPetsController } from "../../controllers/pets/readAllPets.controllers";
import {updatePetsControler } from "../../controllers/pets/updatePetsControler";
import {deletePetControler} from "../../controllers/pets/deletePetsControler";
import verifyUserAuthenticationMiddleware from "../../middlewares/verifyUserAuthentication.middleware";

const routes = Router();

export const petRoutes = () => {
  routes.post("/pet", verifyUserAuthenticationMiddleware, createPetsController);
  routes.get("/pet", readAllPetsController)
  routes.get("/pet/adoptable", readAdoptablePetsController)
  routes.patch("/pet/:id/info_pet",updatePetsControler)
  routes.delete("/pet/:id",deletePetControler)

  return routes;
};
