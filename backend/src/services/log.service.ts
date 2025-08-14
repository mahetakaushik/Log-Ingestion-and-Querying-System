import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { LogEntry } from "../types/log.types";

const LOG_FILE_PATH = path.join(__dirname, "../../data/database.json");

const readLogs = (): LogEntry[] => {
  if (!fs.existsSync(LOG_FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(LOG_FILE_PATH, "utf-8");
  return JSON.parse(data);
};

const writeLogs = (logs: LogEntry[]) => {
  if (!fs.existsSync(LOG_FILE_PATH)) {
    fs.mkdirSync(path.dirname(LOG_FILE_PATH), { recursive: true });
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([], null, 2));
  }
  fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
};

export const addLog = (log: LogEntry) => {
  const logs = readLogs();
  // log with unique id 
  const logWithId = {
    id: uuidv4(),
    ...log,
  };
  // add log to array of logs
  logs.push(logWithId)
  writeLogs(logs);
  return log;
};

export const filterLogs = (filters: Record<string, any>,search:string) => {
  let logs = readLogs();
  return logs.filter(log => {
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // skip empty filters
      if (key === "timestamp_start") return new Date(log.timestamp) >= new Date(value);
      if (key === "timestamp_end") return new Date(log.timestamp) <= new Date(value);
      return log[key]?.toString().toLowerCase().includes(value.toString().toLowerCase());
    });

    // Apply search on message field if search term exists
    const matchesSearch = search
      ? log.message?.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesFilters && matchesSearch;
  });
};

export const sortLogs = (
  logs: any[],
  sortBy: string,
  order: "asc" | "desc"
) => {
  return logs.sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
};