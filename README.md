# Log Ingestion and Querying System

This project is a **log ingestion and filtering application** that allows developers to ingest logs via an API and view, search, and filter them through a web-based dashboard.

## 📂 Project Structure

This is a **monorepo** containing both the **frontend** and **backend**:

```
/frontend   # React application for log viewing and filtering
/backend    # Node.js/Express API for log ingestion and retrieval
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone git@github.com:mahetakaushik/Log-Ingestion-and-Querying-System.git
cd logs-system/
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

### 3. Running the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
- Default API URL: `http://localhost:3000`

#### Start Frontend App
```bash
cd ../frontend
npm start
```
- Frontend will run on: `http://localhost:5173`

---

## 📌 API Endpoints

### **Add Logs**
```bash
curl --location 'http://localhost:3000/api/logs' --header 'Content-Type: application/json' --data '{
  "level": "error",
  "message": "process failed",
  "resourceId": "server-0000",
  "timestamp": "2024-04-14T12:05:30Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-9999",
  "commit": "5e53424",
  "metadata": { "parentResourceId": "server-1290" }
}'
```

### **Get Logs**
```bash
curl --location 'http://localhost:3000/api/logs?level=error&page=2&limit=1'
```

---

## 🖥️ Features

- View logs in a **reverse-chronological** table
- **Full-text search** across `message`
- Filter logs by:
  - Level (`error`, `warn`, `info`, `debug`)
  - Date/Time range
  - Resource ID
- Combine multiple filters
- Server-side sorting (timestamp ASC/DESC)
- Pagination support
- API-first design

---

## 🛠️ Design Decisions & Trade-offs

1. **React + Context API**
   - Chosen to manage logs and filters globally without overcomplicating state management with Redux for MVP.
   - Trade-off: Context re-renders could affect performance on very large datasets, but acceptable for current scale.

2. **Server-side Filtering**
   - Instead of fetching all logs and filtering client-side, the frontend sends filter params to the backend.
   - Benefit: Reduces frontend memory usage and improves performance.
   - Trade-off: More frequent API calls, but avoids large payloads.

3. **No Authentication in MVP**
   - Simplifies setup for evaluation.
   - Assumption: This will be integrated in future phases.

4. **Plain Bootstrap + Custom Styles**
   - Chosen for rapid prototyping and consistent responsive UI.
   - Trade-off: Not as flexible as Tailwind, but faster to set up for small projects.

---

## 📌 Assumptions

- Logs are ingested only via the backend API, not directly from the frontend.
- Timestamp field includes both date and time in ISO 8601 format.
- Frontend will always query backend for filtered results (no heavy client-side filtering).