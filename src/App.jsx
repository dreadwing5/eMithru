import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import ThemeProvider from "./theme";

import Dashboard from "./pages/Dashboard";

import DashboardLayout from "./layouts/DashBoardLayout";
import MeetingCalendar from "./pages/MeetingCalendar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import User from "./pages/Users/User";
import StudentProfile from "./pages/Student/StudentProfile";
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
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/meetings" element={<MeetingCalendar />} />
                  <Route path="/users" element={<User />} />
                  <Route path="/student/profile" element={<StudentProfile />} />
                  <Route path="/mentor" element={<User />} />
                </Route>
                <Route
                  path="/login"
                  element={user ? <Navigate replace to="/" /> : <Login />}
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
