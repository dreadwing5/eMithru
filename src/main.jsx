import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

import "simplebar-react/dist/simplebar.min.css";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SettingsProvider>
        <Router>
          <App />
        </Router>
      </SettingsProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
