import express from "express";
import { router as patientsRoutes } from "../../routes/medicines.js";
import { router as authRoutes } from "../../routes/auth.js";
import { router as usersRoutes } from "../../routes/users.js";

export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(patientsRoutes);
  app.use(authRoutes);
  app.use(usersRoutes);
  return app;
};
