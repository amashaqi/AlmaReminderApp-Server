import express from "express";
import { userMedicine } from "../mock/patients/patientsMedicines.js";
import { auth } from "../middleware/validation/authValidation.js";
import { viewer } from "../middleware/validation/rolesValidation.js";
import { vaildateRequestBody } from "../middleware/validation/requestValidation.js";
import * as Controller from "../common/Controller.js";

const router = express.Router();

router.get("/v1/patient/medicines", [auth, viewer], async (req, res, next) => {
  try {
    res.send(await Controller.finMedicines(userMedicine, req));
  } catch (error) {
    next(error);
  }
});

router.post(
  "/v1/patient/medicine",
  [auth, viewer, vaildateRequestBody],
  async (req, res, next) => {
    try {
      res.status(201);
      res.send(await Controller.addMedicine(userMedicine, req));
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/v1/patient/medicine/:id",
  [auth, viewer, vaildateRequestBody],
  async (req, res, next) => {
    try {
      res.send(await Controller.editMedicine(userMedicine, req));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/v1/patient/medicine/:id",
  [auth, viewer],
  async (req, res, next) => {
    try {
      res.send(await Controller.deleteMedicine(userMedicine, req));
    } catch (error) {
      next(error);
    }
  }
);

export { router };
