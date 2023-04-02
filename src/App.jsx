import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import ThemeProvider from "./theme";
import LogIn from "./scenes/login/Login";
import DashBoard from "./scenes/dashboard/Dashboard";

import DashboardLayout from "./layouts/DashBoardLayout";
import Messenger from "./scenes/messenger/Messenger";
import Calendar from "./scenes/calendar/Calendar";
import UserCreate from "./scenes/UserCreate";
import UserProfile from "./scenes/UserProfile";
import Chat from "./components/chat/Chat";

import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import NotistackProvider from "./components/NotistackProvider";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ThemeProvider>
      <NotistackProvider>
        <MotionLazyContainer>
          <div className="app">
            <main className="content">
              <Routes>
                <Route element={<DashboardLayout />}>
                  <Route
                    path="/"
                    element={
                      user ? <DashBoard /> : <Navigate replace to="/login" />
                    }
                  />
                  <Route
                    path="/messenger"
                    element={!user ? <Navigate replace to="/" /> : <Chat />}
                  />
                  <Route
                    path="/create-user"
                    element={
                      user ? <UserCreate /> : <Navigate replace to="/login" />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      user ? <UserProfile /> : <Navigate replace to="/login" />
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
        </MotionLazyContainer>
      </NotistackProvider>
    </ThemeProvider>
  );
}

export default App;
