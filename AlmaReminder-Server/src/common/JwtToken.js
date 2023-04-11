import jwt from "jsonwebtoken";

export const JwtToken = jwt.sign(
  {
    id: "sara@gmail.com",
    roles: ["editor", "viewer"],
    password: "123456",
  },
  "jwtPrivateKey",
  { expiresIn: "20m" }
);
