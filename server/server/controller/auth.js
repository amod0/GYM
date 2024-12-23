import JWT from "jsonwebtoken";
import db from "../models/index.js";

export const register = async (req, res, next) => {
  try {
    const member = await db.Member.create(req.body);
    const { member_id, email } = member;

    const token = JWT.sign({ member_id, email }, process.env.SECRET);

    res.status(201).json({
      member_id,
      email,
      token,
    });
  } catch (err) {
    if (err.code === 1100) {
      err.message = "sorry, That User is aready exist";
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const member = await db.Member.findOne(req.body.email);
    const { member_id, email } = member;
    const valid = await member.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ member_id, email }, process.env.SECRET, {
        expiresIn: "1h",
      });

      res.json({
        member_id,
        email,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    err.message = "Invalid Username or Password";
    next(err);
  }
};
