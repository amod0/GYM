import sequelize from "../config/database.js";
import Member from "./member.js";

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Error connecting to the database:", err));

// Add model to sequelize
const db = {};
db.sequelize = sequelize;
db.Member = Member; //Register the Member model

// Sync models with the database
sequelize
  .sync({ alter: true }) // Use `force: true` for a clean slate (drops existing tables)
  .then(() => console.log("Database synced successfully!"))
  .catch((err) => console.error("Error syncing database:", err));

export default db;
