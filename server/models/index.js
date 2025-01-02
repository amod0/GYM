import sequelize from "../config/database.js";
import Member from "./member.js";
import MembershipPlan from "./membershipPlan.js";

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Add model to sequelize
const db = {};
db.sequelize = sequelize;
db.Member = Member; //Register the Member model
db.MembershipPlan = MembershipPlan; //Register the MembershipPlan model

// Define associations
Member.belongsTo(MembershipPlan,{
  foreignKey: "membership_plan_id",
  as: "membershipPlan",
});

MembershipPlan.hasMany(Member,{
  foreignKey: "membership_plan_id",
  as: "members",
})

// Sync models with the database
sequelize
  .sync({ alter: true }) // Use `force: true` for a clean slate (drops existing tables)
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.error("Error syncing database:", err));

export default db;
