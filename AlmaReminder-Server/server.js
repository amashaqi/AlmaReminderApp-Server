import express from "express";
import { router as patientsRoutes } from "./src/routes/medicines.js";
import { router as authRoutes } from "./src/routes/auth.js";
import { handleError } from "./src/middleware/errorHandling.js";
import { createServer } from "./src/common/utils/createServer.js";

const port = 3000;

const app = createServer();

app.listen(port, () => console.log("Server Started"));
app.use(handleError);
