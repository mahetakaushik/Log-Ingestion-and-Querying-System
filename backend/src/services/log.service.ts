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
