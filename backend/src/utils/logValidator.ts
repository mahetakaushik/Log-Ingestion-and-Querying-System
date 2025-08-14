const ALLOWED_LOG_LEVELS = ["error", "warn", "info", "debug"] as const;
export type LogLevel = typeof ALLOWED_LOG_LEVELS[number];

export interface LogEntry {
  level: LogLevel;
  message: string;
  resourceId: string;
  timestamp: string; // ISO 8601
  traceId: string;
  spanId: string;
  commit: string;
  metadata: Record<string, any>;
}

export function validateLogEntry(data: any): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (!ALLOWED_LOG_LEVELS.includes(data.level)) {
    errors.push(`"level" must be one of: ${ALLOWED_LOG_LEVELS.join(", ")}`);
  }

  if (typeof data.message !== "string" || !data.message.trim()) {
    errors.push(`"message" is required and must be a non-empty string`);
  }

  if (typeof data.resourceId !== "string" || !data.resourceId.trim()) {
    errors.push(`"resourceId" is required and must be a non-empty string`);
  }

  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(data.timestamp)) {
    errors.push(`"timestamp" must be a valid ISO 8601 string`);
  }

  if (typeof data.traceId !== "string" || !data.traceId.trim()) {
    errors.push(`"traceId" is required and must be a non-empty string`);
  }

  if (typeof data.spanId !== "string" || !data.spanId.trim()) {
    errors.push(`"spanId" is required and must be a non-empty string`);
  }

  if (typeof data.commit !== "string" || !data.commit.trim()) {
    errors.push(`"commit" is required and must be a non-empty string`);
  }

  if (typeof data.metadata !== "object" || data.metadata === null || Array.isArray(data.metadata)) {
    errors.push(`"metadata" must be a valid JSON object`);
  }

  return { valid: errors.length === 0, errors };
}
