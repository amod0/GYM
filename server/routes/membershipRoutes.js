import express from "express";
import { renewMembership } from "../controller/membershipController.js";

const router = express.Router();

router.post("/renew", renewMembership);

export default router