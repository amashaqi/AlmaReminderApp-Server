import jwt from "jsonwebtoken";
import express from "express";
import { vaildateAuth } from "../middleware/validation/requestValidation.js";
import { users } from "../mock/users/usersCredentials.js";

const router = express.Router();

router.post("/v1/patient/auth", [vaildateAuth], async (req, res, next) => {
  try {
    let user = users.find((u) => u.email === req.body.email);
    const token = jwt.sign(
      {
        id: user._id,
        roles: user.roles,
      },
      "jwtPrivateKey",
      { expiresIn: "1d" }
    );

    res.send({ ok: true, token: token });
  } catch (error) {
    next(error);
  }
});
export { router };
