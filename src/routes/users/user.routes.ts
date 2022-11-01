import { Router } from "express";

const routes = Router();

export const userRoutes = () => {
  routes.get("/users");

  return routes;
};
