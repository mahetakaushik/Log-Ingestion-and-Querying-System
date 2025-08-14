import express from "express";
import cors from "cors";
import logRoutes from "./routes/log.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/logs", logRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
