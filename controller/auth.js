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
    if (err.name === "SequelizeUniqueConstraintError") {
      err.message = "Sorry, This Email is aready exist";
    }
    next(err);
  }
};

export const login = async (req, res) => {
  try {
    const member = await db.Member.findOne({
      where: { email: req.body.email },
    });
    if (!member) {
      return res.status(404).json({
        message: "Invalide Email or Password",
      });
    }

    const valid = await member.comparePassword(req.body.password);
    if (!valid) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    // If both email and password are valid, destructure details
    const { member_id, email, name } = member;

    const token = JWT.sign({ member_id, email, name }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.json({
      member_id,
      email,
      name,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};
