import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SessionData from "./components/SessionData.jsx";
import * as React from "react";
import "./App.css";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SessionData />
    </LocalizationProvider>
  );
};

export default App;
