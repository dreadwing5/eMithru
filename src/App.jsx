import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext, useMode } from "./context/ThemeContext";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Layout from "./scenes/layout/Layout";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Layout />
            <Routes></Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
