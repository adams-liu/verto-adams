import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {EmployeeProvider} from "./context/EmployeeContext";

ReactDOM.render(
  <EmployeeProvider>
    <App />
  </EmployeeProvider>,
  document.getElementById("root")
);
