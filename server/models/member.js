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
    membership_plan_id: {
      type: DataTypes.UUID,
      allowNull: true, // Allow null value if the member is not subscribed to any plan
      references: {
        model: "MembershipPlans",
        key: "plan_id",
      },
    },
    membership_expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '30 DAY'"),
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

// Sequelize hooks: Before creating a new member, hash the password
Member.beforeCreate(async (member, option) => {
  if (member.changed("password")) {
    const hashed = await bcrypt.hash(member.password, 10);
    member.password = hashed;
  }
});

// Compare the password of the member
Member.prototype.comparePassword = async function (attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

export default Member;
