import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import ThemeProvider from "./theme";

import Dashboard from "./pages/Dashboard";

import DashboardLayout from "./layouts/DashBoardLayout";
import MeetingCalendar from "./pages/Meeting/MeetingCalendar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import User from "./pages/Users/User";
import StudentProfile from "./pages/Student/StudentProfile";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import NotistackProvider from "./components/NotistackProvider";
import { AuthContext } from "./context/AuthContext";
import MentorAllocation from "./pages/MentorAllocation/MentorAllocation";
import CampusBuddy from "./pages/CampusBuddy/CampusBuddy";
import Academic from "./pages/Student/Academic";
import AdmissionDetails from "./pages/Student/AdmissionDetails";
import AdmissionDetailsPage from "./pages/Student/AdmissionDetailsPage";
import Placement from "./pages/Student/Placement";
import Ptm from "./pages/ParentsTeacherMeeting/Ptm";

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
                  <Route path="/student/academic" element={<Academic />} />
                  <Route path="/student/admission" element={<AdmissionDetailsPage/>} />
                  <Route path="/student/placement" element={<Placement/>} />
                  <Route path="/mentor" element={<MentorAllocation />} />
                  <Route path="/ptm" element={<Ptm />} />
                  <Route path="/campus-buddy" element={<CampusBuddy />} />
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
