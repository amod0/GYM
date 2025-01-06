import { Router } from "express";
import {
  getMembershipDeatials,
  notifyExpiringMemberships,
  renewMembership,
} from "../controller/membershipController.js";

const router = Router();

router.post("/renew", renewMembership);
router.get("/:id", getMembershipDeatials);
router.get("/notify-expiry", notifyExpiringMemberships);

export default router;
