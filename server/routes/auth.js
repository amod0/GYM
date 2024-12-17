import { Router } from "express";
import * as contoller from "../controller/index";

const router = Router();

router.post("/register", contoller.register);
router.post("/login", contoller.login);

export default router;
