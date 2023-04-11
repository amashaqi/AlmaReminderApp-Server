const admin = (req, res, next) => {
  try {
    if (!req.user.roles.includes("admin")) {
      throw new ServiceError("Access denied.", 401);
    }
  } catch (error) {
    next(error);
  }
  next();
};

const editor = (req, res, next) => {
  try {
    if (!req.user.roles.includes("editor")) {
      throw new ServiceError("Access denied.", 401);
    }
  } catch (error) {
    next(error);
  }
  next();
};

const viewer = (req, res, next) => {
  try {
    if (!req.user.roles.includes("viewer")) {
      throw new ServiceError("Access denied.", 401);
    }
  } catch (error) {
    next(error);
  }
  next();
};

export { admin, editor, viewer };
