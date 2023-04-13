import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";
import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <SettingsProvider>
          <Router>
            <App />
          </Router>
        </SettingsProvider>
      </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
