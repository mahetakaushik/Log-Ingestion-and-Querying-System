import { Router } from "express";
import { addLog } from "../controllers/log.controller";

const router = Router();

router.post("/", addLog);

export default router;
