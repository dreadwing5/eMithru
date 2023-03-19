import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, useMode } from "./context/ThemeContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LogIn from "./scenes/login/Login";
import DashBoard from "./scenes/dashboard/Dashboard";
import { AuthContext } from "./context/AuthContext";
import Layout from "./scenes/layout/Layout";
import Messenger from "./scenes/messenger/Messenger";
import CreateAccount from "./scenes/profile/CreateAccount";
import Calendar from "./scenes/calendar/Calendar";

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
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    user ? <DashBoard /> : <Navigate replace to="/login" />
                  }
                />
                <Route
                  path="/messenger"
                  element={!user ? <Navigate replace to="/" /> : <Messenger />}
                />
                <Route
                  path="/create-account"
                  element={
                    user ? <CreateAccount /> : <Navigate replace to="/login" />
                  }
                />
                <Route path="/calendar" element={<Calendar />} />
              </Route>
              <Route
                path="/login"
                element={user ? <Navigate replace to="/" /> : <LogIn />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
