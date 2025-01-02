import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./routes/index.js";
import controller from "./controller/index.js";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", routes.auth);
app.use("/api/memberships", routes.renew);

app.use(controller.notFound);
app.use(controller.errors);

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
