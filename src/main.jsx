import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";
import "./public/css/style.css";
import "./public/css/customizer.css";

import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
