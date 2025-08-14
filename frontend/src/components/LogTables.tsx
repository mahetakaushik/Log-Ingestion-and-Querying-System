
import { useLogs } from "../context/LogsContext";
import LogSpinner from "./LogSpinner";

const levelBorderClass: Record<string, string> = {
  error: "border-danger",
  warn: "border-warning",
  info: "border-primary",
  debug: "border-secondary",
};

export const LogTables = () => {
  const { logs, loading, page, pageSize, totalLogs, changePage } = useLogs();
  const totalPages = Math.ceil(totalLogs / pageSize);

  return (
    <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
      <table className="table table-hover table-bordered align-middle mb-0">
        <thead className="table-dark sticky-top">
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
            <th>Resource ID</th>
            <th>Trace ID</th>
            <th>Span ID</th>
            <th>Commit</th>
          </tr>
        </thead>
        {loading? (
            <tr>
              <td colSpan={7} className="text-center py-3">
                <LogSpinner />
              </td>
            </tr>
          ):(<tbody>
          {logs.map((log) => (
            <tr
              key={log.id}
              className={`border ${
                levelBorderClass[log.level] || "border-secondary"
              }`}
            >
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td className="text-uppercase">{log.level}</td>
              <td>{log.message}</td>
              <td>{log.resourceId}</td>
              <td>{log.traceId}</td>
              <td>{log.spanId}</td>
              <td>{log.commit}</td>
            </tr>
          ))}
          {!loading && logs.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-3">
                No logs found.
              </td>
            </tr>
          )}
        </tbody>)}
        
      </table>

      {/* Pagination */}
      <nav aria-label="Page navigation justify-content-between">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="btn btn-primary"
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
            >
              Previous
            </button>
          </li>
          <li className="page-item">
            <span>
              Page {page} of {totalPages}
            </span>
          </li>

          <li className="page-item">
            <button
              className="btn btn-primary"
              disabled={page === totalPages}
              onClick={() => changePage(page + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* <div className="d-flex justify-content-between align-items-center mt-2">
        <button className="btn btn-primary" disabled={page === 1} onClick={() => changePage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button className="btn btn-primary" disabled={page === totalPages} onClick={() => changePage(page + 1)}>
          Next
        </button>
      </div> */}
    </div>
  );
};
