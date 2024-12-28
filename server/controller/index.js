import * as member_auth from "./member_auth.js";
import * as staff_auth from "./staff_auth.js";

export const notFound = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

export const errors = (err, req, res, next) => {
  res.status(err.status || 400).json({
    message: err.message || "Something went Wrong",
  });
};

export default {
  ...member_auth,
  notFound,
  errors,
};
