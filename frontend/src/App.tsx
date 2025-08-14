import { LogFilter } from "./components/LogFilters";
import { LogTables } from "./components/LogTables";
import { LogsProvider } from "./context/LogsContext";

function App() {
  return (
    <LogsProvider>
      <div className="container py-4">
        <h2 className="mb-4 text-center">Log Ingestion and Querying System</h2>

        {/* Filters Section */}
        <div className="card mb-2 shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Filters</h5>
            <LogFilter />
          </div>
        </div>

        {/* Logs Table Section */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">Logs</h5>
            <LogTables />
          </div>
        </div>
      </div>
    </LogsProvider>
  );
}

export default App;
