import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce"; // assume you have a debounce hook
import { useLogs } from "../context/LogsContext";
import type { LogFilters } from "../types/types";

export const LogFilter = () => {
  const { fetchAndSetLogs } = useLogs();

  const [filters, setFilters] = useState<LogFilters>({
    level: "",
    search: "",
    resourceId: "",
    traceId: "",
    spanId: "",
    commit: "",
    timestamp_start: "",
    timestamp_end: "",
  });

  const debouncedFilters = useDebounce(filters, 500);

  useEffect(() => {
    fetchAndSetLogs(debouncedFilters);
  }, [debouncedFilters]);

  const handleChange = (field: keyof LogFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    const reset: LogFilters = {
      level: "",
      search: "",
      resourceId: "",
      traceId: "",
      spanId: "",
      commit: "",
      timestamp_start: "",
      timestamp_end: "",
    };
    setFilters(reset);
    fetchAndSetLogs(reset);
  };

  return (
    <div className="container-fluid mb-3">
      {/* Row 1: Search + Timestamp */}
      <div className="row mb-2">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Search"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="datetime-local"
            value={filters.timestamp_start}
            onChange={(e) => handleChange("timestamp_start", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-2">
          <input
            type="datetime-local"
            value={filters.timestamp_end}
            onChange={(e) => handleChange("timestamp_end", e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      {/* Row 2: Level + IDs + Commit + Clear */}
      <div className="row mb-2 align-items-end">
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={filters.level}
            onChange={(e) => handleChange("level", e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warn</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            placeholder="Resource ID"
            value={filters.resourceId}
            onChange={(e) => handleChange("resourceId", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            placeholder="Trace ID"
            value={filters.traceId}
            onChange={(e) => handleChange("traceId", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            placeholder="Span ID"
            value={filters.spanId}
            onChange={(e) => handleChange("spanId", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            placeholder="Commit"
            value={filters.commit}
            onChange={(e) => handleChange("commit", e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-2 mb-2">
          {(filters.level ||
            filters.search ||
            filters.timestamp_start ||
            filters.timestamp_end ||
            filters.resourceId ||
            filters.traceId ||
            filters.spanId ||
            filters.commit) && (
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
