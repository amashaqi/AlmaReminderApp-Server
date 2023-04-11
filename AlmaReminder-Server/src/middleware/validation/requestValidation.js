import { ServiceError } from "../../models/error/ServiceError.js";
import { users } from "../../mock/users/usersCredentials.js";
import bcrypt from "bcrypt";

export const vaildateRequestBody = (req, res, next) => {
  try {
    if (
      !req.body.medicineName ||
      !req.body.timesADay ||
      !req.body.numberOfPills ||
      !req.body.description ||
      !req.body.initialDose ||
      !req.body.customReminders
    ) {
      throw new ServiceError("Invalid Request", 401);
    } else if (isNaN(req.body.timesADay)) {
      throw new ServiceError(
        "Invalid Request: timesADay should be number",
        401
      );
    } else if (isNaN(req.body.numberOfPills)) {
      throw new ServiceError(
        "Invalid Request: numberOfPills should be number",
        401
      );
    } else if (req.body.initialDose.length > 5) {
      throw new ServiceError(
        "Invalid Request: initialDose time is not correct",
        401
      );
    }
  } catch (error) {
    next(error);
  }
  next();
};

export const vaildateUserRequestBody = (req, res, next) => {
  try {
    if (!req.body.email || !req.body.userName || !req.body.password) {
      throw new ServiceError("Invalid Request", 401);
    } else if (users.find((element) => element.email === req.body.email)) {
      throw new ServiceError("Invalid Request: User Already Signed Up", 401);
    }
  } catch (error) {
    next(error);
  }
  next();
};

export const vaildateAuth = async (req, res, next) => {
  let user = await users.find((u) => u.email === req.body.email);
  try {
    if (!user) {
      throw new ServiceError("Invalide email or password.", 401);
    } else {
      const valid = await bcrypt.compare(req.body.password, user.password);

      if (!valid) {
        throw new ServiceError("Invalide email or password.", 401);
      }
    }
  } catch (error) {
    next(error);
  }
  next();
};
