import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

const Member = sequelize.define(
  "Member",
  {
    member_id: {
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
        len: [8, 16], // length of the password between 8 to 16.
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
        len: [7, 15], //Minmum 7, Maxmum 15 characters
      },
    },
    membership_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isIn: [["1 Month", " 3 month", "6 month", "1 Year"]], // Define allowed membership types
      },
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Active", // defualt value of status
      validate: {
        isIn: [["Active", "Expired", "Pending"]],
      },
    },
  },
  {
    tableName: "members", //Explicitly name the table
    timestamps: true, // Automatically adds createdAt and updatedAt.
  }
);

Member.beforeCreate(async (member, option) => {
  if (member.changed("password")) {
    const hashed = await bcrypt.hash(member.password, 10);
    member.password = hashed;
  }
});

Member.prototype.comparePassword = async function (attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

export default Member;
