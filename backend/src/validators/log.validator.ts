import { LogEntry, LogLevel } from "../types/log.types";
import { ALLOWED_LOG_LEVELS } from "../utils/constants.util";

export const validateLogEntry = (data: Partial<LogEntry>) => {
  const errors: string[] = [];

  if (!data.level || !ALLOWED_LOG_LEVELS.includes(data.level as LogLevel)) {
    errors.push(`Invalid level. Allowed: ${ALLOWED_LOG_LEVELS.join(", ")}`);
  }
  if (!data.message) errors.push("Message is required");
  if (!data.resourceId) errors.push("resourceId is required");
  if (!data.timestamp || isNaN(Date.parse(data.timestamp))) {
    errors.push("Valid ISO 8601 timestamp is required");
  }
  if (!data.traceId) errors.push("traceId is required");
  if (!data.spanId) errors.push("spanId is required");
  if (!data.commit) errors.push("commit is required");
  if (!data.metadata || typeof data.metadata !== "object") {
    errors.push("metadata must be an object");
  }

  return { valid: errors.length === 0, errors };
};
