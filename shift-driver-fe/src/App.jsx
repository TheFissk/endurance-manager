import { TextField, Switch, FormControlLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import * as React from "react";
import "./App.css";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <form>
          <TextField id="session_name" label="Session Name" />
          <br />
          <TextField type="number" label="Duration" />
          <Lap_Duration_Switch />
          <br />
          <DateTimePicker label="Real Time Session Start" size="small" />
          <br />
          <DateTimePicker label="Game Time Session Start:" size="small" />
        </form>
      </div>
    </LocalizationProvider>
  );
};
const Lap_Duration_Switch = () => {
  const [duration_label, set_duration_label] = React.useState({
    text: "Time",
  });
  return (
    <FormControlLabel
      label={duration_label.text}
      control={<Switch />}
      onChange={(e) => (e.target.checked ? set_duration_label({ text: "Laps" }) : set_duration_label({ text: "Time" }))}
    />
  );
};

export default App;
