import { ALLOWED_LOG_LEVELS } from "../utils/constants.util";

export type LogLevel = typeof ALLOWED_LOG_LEVELS[number];

export interface LogEntry {
  level: LogLevel;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: Record<string, unknown>;
}
