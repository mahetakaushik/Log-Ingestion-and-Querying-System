import { Router } from "express";
import { addLog, getLogs } from "../controllers/log.controller";

const router = Router();

router.post("/", addLog);
router.get("/",getLogs)

export default router;
