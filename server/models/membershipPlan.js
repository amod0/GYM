import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { v4 as uuidv4 } from "uuid";

const MembershipPlan = sequelize.define("MembershipPlan", {
  plan_id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  duration_in_days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default MembershipPlan;
