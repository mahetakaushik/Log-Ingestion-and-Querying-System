export interface LogEntry {
  id: string;
  level: string;
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata?: Record<string, any>;
}
export const levelBorderClass: Record<string, string> = {
    error: "border-danger", 
    warn: "border-warning",
    info: "border-primary",
    debug: "border-secondary"
  };

export type Filters = {
  level: string;
  resourceId: string;
  traceId: string;
  spanId: string;
  commit: string;
  timestamp_start: string;
  timestamp_end: string;
  search: string;
};

export type LogsContextType = {
  logs: LogEntry[];
  fetchAndSetLogs: (filters?: Record<string, any>) => Promise<void>;
  loading: boolean;
};
export interface LogFilters {
  level?: string;
  search?: string;
  resourceId?: string;
  traceId?: string;
  spanId?: string;
  commit?: string;
  timestamp_start?: string;
  timestamp_end?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

// API response with pagination
export interface LogsResponse {
  data: LogEntry[];
  total: number;
  page: number;
  limit: number;
}