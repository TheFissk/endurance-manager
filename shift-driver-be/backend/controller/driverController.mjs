import ah from "express-async-handler";

// @desc get drivers
// @route GET api/drivers
// @access private
export const getDrivers = ah(async (req, res) => {
  console.info(`recieved GET request from: ${req.hostname}`);
  res.status(200).json({ Drivers: ["Timothy Fiss", "Matthew Alvis"] });
});

// @desc add a new driver
// @route POST api/drivers
// @access private
export const addDriver = ah(async (req, res) => {
  if (!req.body.Name) {
    res.status(400);
    throw new Error("Please add a driver name");
  }
  console.info(`recieved POST request from: ${req.hostname}`);
  res.status(200).json({ message: "Added New Driver" });
});

// @desc update a drivers
// @route PUT api/drivers/:id
// @access private
export const updateDriver = ah(async (req, res) => {
  console.info(`recieved PUT request from: ${req.hostname}`);
  res.status(200).json({ message: `Update Driver with id ${req.params.id}` });
});

// @desc remove a driver
// @route DELETE api/drivers/:id
// @access private
export const deleteDriver = ah(async (req, res) => {
  console.info(`recieved DELETE request from: ${req.hostname}`);
  res.status(200).json({ message: `Delete Driver with id ${req.params.id}` });
});
