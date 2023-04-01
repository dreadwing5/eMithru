import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";
import { CollapseDrawerProvider } from "./context/CollapseDrawerContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CollapseDrawerProvider>
        <SettingsProvider>
          <Router>
            <App />
          </Router>
        </SettingsProvider>
      </CollapseDrawerProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
