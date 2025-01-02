import { DataTypes, STRING } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

const Staff = sequelize.define(
  "Staff",
  {
    staff_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8, 16],
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        len: [7, 15],
      },
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["Admin", "Trainer", "Manager", "Cleaner"]],
      },
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
  },
  {
    tableName: "staff",
    timestamps: true,
  }
);

Staff.beforeCreate(async (staff, option) => {
  if (staff.changed("password")) {
    const hashed = await bcrypt.hash(staff.password, 10);
    staff.password = hashed;
  }
});

Staff.prototype.comparePassword = async function (attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};
