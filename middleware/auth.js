import JWT from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        next(new Error("Failed to authenticate token"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(new Error("No token provided"));
  }
};
