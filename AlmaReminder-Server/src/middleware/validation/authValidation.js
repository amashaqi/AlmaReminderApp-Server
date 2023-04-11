import jwt from "jsonwebtoken";
import { ServiceError } from "../../models/error/ServiceError.js";

export const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new ServiceError("Access denied. No token proviede", 401);
    } else {
      try {
        const decoded = jwt.verify(token, "jwtPrivateKey");
        req.user = decoded;
      } catch (error) {
        next(error);
      }
      next();
    }
  } catch (error) {
    next(error);
  }
};
