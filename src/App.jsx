import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, useMode } from "./context/ThemeContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LogIn from "./scenes/login/Login";
import DashBoard from "./scenes/dashboard/Dashboard";
import { AuthContext } from "./context/AuthContext";

import Layout from "./scenes/layout/Layout";

function App() {
  const [theme, colorMode] = useMode();
  const { user } = useContext(AuthContext);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route element={Layout}>
                <Route path="/" element={DashBoard} />
              </Route>
              <Route
                path="/login"
                element={user ? <Navigate replace to="/" /> : <Login />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
