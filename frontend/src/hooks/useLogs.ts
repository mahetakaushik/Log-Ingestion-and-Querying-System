import { useState, useEffect } from "react";
import { fetchLogs, type LogEntry, type LogFilters } from "../api/logService";

export const useLogs = (filters: LogFilters) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLogs(filters);
        setLogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getLogs();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return { logs, loading, error };
};
