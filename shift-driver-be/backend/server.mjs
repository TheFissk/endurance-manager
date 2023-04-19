import * as dotenv from "dotenv/config";
import express from "express";
import driverRoutes from "./routes/driverRoutes.mjs";
import sessionRoutes from "./routes/sessionRoutes.mjs"
import { cockroachPool } from "./database/db.mjs";
const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/drivers", driverRoutes);
app.use("/api/:session_id/session", sessionRoutes)

//example custom error handling
// app.use(errorHandler);

app.listen(port, () => console.info(`Server started at port ${port}`));

app.on("close", () => {
  console.info("Server Stopping");
  cockroachPool.end();
});