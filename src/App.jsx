import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import ThemeProvider from "./theme";
// import LogIn from "./scenes/login/Login";
// import DashBoard from "./scenes/dashboard/Dashboard";

import Dashboard from "./pages/Dashboard";

import DashboardLayout from "./layouts/DashBoardLayout";
import MeetingCalendar from "./pages/MeetingCalendar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import UserForm from "./pages/Users/UserForm";
// import Calendar from "./scenes/calendar/Calendar";
// import UserCreate from "./scenes/UserCreate";
// import UserProfile from "./scenes/UserProfile";
// import Chat from "./components/chat/Chat";
// import UserAccount from "./scenes/dashboard/UserAccount";

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
                  <Route path="/users" element={<UserForm />} />
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
