import axios from "axios";
import type { LogFilters, LogsResponse } from "../types/types";




export const fetchLogs = async (
  filters: LogFilters = {},
  page?: number,
  limit?: number
): Promise<LogsResponse> => {
  const queryParams = {
    ...filters,
    ...(page !== undefined ? { page } : {}),
    ...(limit !== undefined ? { limit } : {}),
  };
  const query = new URLSearchParams(queryParams as Record<string, string>).toString();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const res = await axios.get(`${baseUrl}/api/logs?${query}`);
  console.log(res);
  const data = res.data;

  if (!res.status) throw new Error(data.error || "Failed to fetch logs");
  return data as LogsResponse;
};
