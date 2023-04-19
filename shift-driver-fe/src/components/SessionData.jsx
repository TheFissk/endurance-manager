import * as React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  TextField,
  Switch,
  FormControlLabel,
  InputAdornment,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

const SessionData = () => {
  return (
    <div id="SessionData">
      <Accordion>
        <AccordionSummary>
          Session Information
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="session_name" label="Session Name" />
          <br />
          <DateTimePicker label="Real Time Session Start" />
          <br />
          <DateTimePicker label="Game Time Session Start:" />
          <br />
          <TextField type="number" label="Race Duration" />
          <Lap_Duration_Switch />
          <br />
          <TextField
            type="number"
            label="Qualifying Duration"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">minutes</InputAdornment>
              ),
            }}
          />
          <br />
          <TextField
            type="number"
            label="Practice Duration"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">minutes</InputAdornment>
              ),
            }}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const Lap_Duration_Switch = () => {
  const [duration_label, set_duration_label] = React.useState({
    text: "Minutes",
  });
  return (
    <FormControlLabel
      label={duration_label.text}
      control={<Switch />}
      onChange={(e) =>
        e.target.checked
          ? set_duration_label({ text: "Laps" })
          : set_duration_label({ text: "Minutes" })
      }
    />
  );
};

export default SessionData;
