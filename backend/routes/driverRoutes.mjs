import express from "express";
import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../controller/driverController.mjs";

const router = express.Router();

router.route("/").get(getDrivers).post(addDriver);
router.route("/:id").put(updateDriver).delete(deleteDriver);

export default router;
