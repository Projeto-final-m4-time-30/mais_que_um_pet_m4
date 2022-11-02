import { Router } from "express";
import { createPetsController } from "../../controllers/pets/createPets.controller";
import { readAdoptablePetsController } from "../../controllers/pets/readAdoptablePets.controller";
import { readAllPetsController } from "../../controllers/pets/readAllPets.controllers";

const routes = Router();

export const petRoutes = () => {
  routes.post("/pet", createPetsController);
  routes.get("/pet", readAllPetsController)
  routes.get("/pet/adoptable", readAdoptablePetsController)
  

  return routes;
};
