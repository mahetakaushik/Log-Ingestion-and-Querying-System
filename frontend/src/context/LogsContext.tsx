import { createContext, useState, useContext, type ReactNode } from "react";
import { fetchLogs} from "../api/logService";
import type { LogEntry, LogFilters, LogsResponse } from "../types/types";

export type LogsContextType = {
  logs: LogEntry[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalLogs: number;
  fetchAndSetLogs: (filters?: LogFilters, pageNum?: number, pageSizeNum?: number) => Promise<void>;
  changePage: (newPage: number) => void;
};

const LogsContext = createContext<LogsContextType | undefined>(undefined);

export const LogsProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalLogs, setTotalLogs] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchAndSetLogs = async (filters?: LogFilters, pageNum?: number, pageSizeNum?: number) => {
    try {
      setLoading(true);
      const response: LogsResponse = await fetchLogs(filters, pageNum || page, pageSizeNum || pageSize);
      setLogs(response.data);
      setTotalLogs(response.total);
      setPage(response.page);
      setPageSize(response.limit);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching logs:", error);
      setLogs([]);
      setTotalLogs(0);
    }
  };

  const changePage = (newPage: number) => {
    setPage(newPage);
    fetchAndSetLogs(undefined, newPage);
  };

  return (
    <LogsContext.Provider value={{ logs, loading, page, pageSize, totalLogs, fetchAndSetLogs, changePage }}>
      {children}
    </LogsContext.Provider>
  );
};

export const useLogs = () => {
  const context = useContext(LogsContext);
  if (!context) throw new Error("useLogs must be used within LogsProvider");
  return context;
};
