import { Request, Response } from "express";
import * as logService from "../services/log.service";
import { validateLogEntry } from "../validators/log.validator";
import { successResponse, errorResponse } from "../utils/response.util";
import { LogEntry} from "../types/log.types";


export const addLog = (req: Request, res: Response) => {
  try {
    const validation = validateLogEntry(req.body);

  if (!validation.valid) {
    return errorResponse(res, validation.errors, 400);
  }
  
  const savedLog = logService.addLog(req.body as LogEntry);
  return successResponse(res, "The log object that was successfully created and stored", 201);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500);
  }
  
};
