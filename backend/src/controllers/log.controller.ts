import { Request, Response } from "express";
import * as logService from "../services/log.service";
import { validateLogEntry } from "../validators/log.validator";
import { successResponse, errorResponse } from "../utils/response.util";
import { LogEntry} from "../types/log.types";
import { ALLOWED_LOG_LEVELS } from "../utils/constants.util";


export const addLog = (req: Request, res: Response) => {
  try {
    const validation = validateLogEntry(req.body);

  if (!validation.valid) {
    return errorResponse(res, validation.errors, 400);
  }
  
  const savedLog = logService.addLog(req.body as LogEntry);
  return successResponse(res, { message: "The log object was successfully created and stored" }, 201);
  } catch (error) {
    return errorResponse(res, {message: "Internal server error" }, 500);
  }
  
};

export const getLogs = (req: Request, res: Response) => {

  try {
    const {
      sortBy = "timestamp",
      order = "desc",
      page = "1",
      limit = "5",
      search = "",
      ...filters
    } = req.query;
    
    const {level} = filters;
    
    if (level && !ALLOWED_LOG_LEVELS.some(l => l.toLowerCase() === level?.toString()?.toLowerCase())) {
      return errorResponse(
        res,
        {message:`Invalid level. Allowed: ${ALLOWED_LOG_LEVELS.join(", ")}`},
        400
      );
    }
    const pageNum = Math.max(parseInt(page as string, 10), 1);
    const limitNum = Math.max(parseInt(limit as string, 10), 1);
    
    // Filtering
    let filteredLogs = logService.filterLogs(filters,search as string) ?? [];

    // Sorting
    filteredLogs = logService.sortLogs(filteredLogs, sortBy as string, order as "asc" | "desc");

    // Pagination
    const total = filteredLogs.length;
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + limitNum);
    if (paginatedLogs.length === 0) {
      return errorResponse(res, {message: "No logs found for the given filters"}, 404);
    }
    return successResponse(res, {
      total,
      page: pageNum,
      limit: limitNum,
      data: paginatedLogs,
    });
  } catch (error) {
    return errorResponse(res, {message: "Internal server error"}, 500);
  }
};