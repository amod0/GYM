import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PGDATABASE, // Database name
  process.env.PGUSER, // Username
  process.env.PGPASSWORD, // Password
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

export default sequelize;
