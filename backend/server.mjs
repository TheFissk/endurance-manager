import * as dotenv from "dotenv/config";
import express from "express";
import driverRoutes from "./routes/driverRoutes.mjs";
import { errorHandler } from "./middleware/errorMiddleware.mjs";
const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/drivers", driverRoutes);

app.use(errorHandler);

app.listen(port, () => console.info(`Server started at port ${port}`));
