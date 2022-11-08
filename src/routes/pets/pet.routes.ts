import { Router } from "express";
import adoptPetController from "../../controllers/pets/adoptPet.controller";
import { createPetsController } from "../../controllers/pets/createPets.controller";
import { deletePetControler } from "../../controllers/pets/deletePetsControler";
import { readAdoptablePetsController } from "../../controllers/pets/readAdoptablePets.controller";
import { readAllPetsController } from "../../controllers/pets/readAllPets.controllers";
import { updatePetsControler } from "../../controllers/pets/updatePetsControler";
import verifyUserAuthenticationMiddleware from "../../middlewares/verifyUserAuthentication.middleware";
import { petUpdateSchema } from "../../schemas";
import { validateSerializer } from "../../serializers/validate.serializer";

const routes = Router();

export const petRoutes = () => {
  routes.post("/pet", verifyUserAuthenticationMiddleware, createPetsController);
  routes.get("/pet", readAllPetsController);
  routes.get("/pet/adoptable", readAdoptablePetsController);
  routes.patch(
    "/pet/adopt/:id",
    verifyUserAuthenticationMiddleware,
    adoptPetController
  );
  routes.patch(
    "/pet/:id",
    verifyUserAuthenticationMiddleware,
    validateSerializer(petUpdateSchema),
    updatePetsControler
  );
  routes.delete(
    "/pet/:id",
    verifyUserAuthenticationMiddleware,
    deletePetControler
  );

  return routes;
};
