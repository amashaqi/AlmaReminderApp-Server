import express from "express";
import { users } from "../mock/users/usersCredentials.js";
import { vaildateUserRequestBody } from "../middleware/validation/requestValidation.js";
import * as Controller from "../common/Controller.js";

const router = express.Router();

router.post(
  "/v1/patient/user",
  [vaildateUserRequestBody],
  async (req, res, next) => {
    try {
      res.status(201);
      res.send(Controller.addUser(users, req));
    } catch (error) {
      next(error);
    }
  }
);

export { router };
