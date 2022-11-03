import { Router } from "express";
import adoptPetController from "../../controllers/pets/adoptPet.controller";
import { createPetsController } from "../../controllers/pets/createPets.controller";
import { readAdoptablePetsController } from "../../controllers/pets/readAdoptablePets.controller";
import { readAllPetsController } from "../../controllers/pets/readAllPets.controllers";
<<<<<<< HEAD
import {updatePetsControler } from "../../controllers/pets/updatePetsControler";
import {deletePetControler} from "../../controllers/pets/deletePetsControler";
=======
>>>>>>> 3773625ed1f2306816a93269562e8c879e3f4bae
import verifyUserAuthenticationMiddleware from "../../middlewares/verifyUserAuthentication.middleware";

const routes = Router();

export const petRoutes = () => {
<<<<<<< HEAD
  routes.post("/pet", verifyUserAuthenticationMiddleware, createPetsController);
  routes.get("/pet", readAllPetsController)
  routes.get("/pet/adoptable", readAdoptablePetsController)
  routes.patch("/pet/:id/info_pet",updatePetsControler)
  routes.delete("/pet/:id",deletePetControler)
=======
  routes.post("/pet", createPetsController);
  routes.get("/pet", readAllPetsController);
  routes.get("/pet/adoptable", readAdoptablePetsController);
  routes.patch(
    "/pet/adopt/:id",
    verifyUserAuthenticationMiddleware,
    adoptPetController
  );
>>>>>>> 3773625ed1f2306816a93269562e8c879e3f4bae

  return routes;
};
