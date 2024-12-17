import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import db from "./models/index.js"; // Import the Sequelize models

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

// // Add a POST route to create a Member
app.post("/members", async (req, res) => {
  try {
    const { name, email, phone, membership_type, start_date, end_date } =
      req.body;

    const newMember = await db.Member.create({
      name,
      email,
      password,
      phone,
      membership_type,
      start_date,
      end_date,
    });

    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use("/api/auth");

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
