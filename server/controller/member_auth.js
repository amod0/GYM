import JWT from "jsonwebtoken";
import db from "../models/index.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, membership_plan_id } = req.body;

    let membership_expiry_date = null;

    if (membership_plan_id) {
      const plan = await db.MembershipPlan.findByPk(membership_plan_id);
      if (!plan) {
        return res.status(404).json({
          message: "Invalid membership Type",
        });
      }

      // Ensure the duration_in_days is a valid number
      if (isNaN(plan.duration_in_days) || plan.duration_in_days <= 0) {
        return res.status(400).json({
          message: "Invalid membership plan duration",
        });
      }

      const currentDate = new Date();
      membership_expiry_date = new Date(
        currentDate.getTime() + plan.duration_in_days * 24 * 60 * 60 * 1000
      );

      // Ensure the date is valid
      if (isNaN(membership_expiry_date.getTime())) {
        return res.status(400).json({
          message: "Invalid membership expiry date",
        });
      }
    }

    // Creating members with calculated expiry date
    const member = await db.Member.create({
      ...req.body,
      membership_expiry_date,
    });
    const { member_id } = member;

    const token = JWT.sign({ member_id, email }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      member_id,
      email,
      token,
      message: "member registered successfully",
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      err.message = "Sorry, This Email is already exist";
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
