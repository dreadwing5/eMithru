import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import ThemeProvider from "./theme";

import Dashboard from "./pages/Dashboard";
import ProtectedRouteWrapper from "./ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
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
import Attendance from "./pages/Student/Attendance";
import Thread from "./pages/Thread/Thread";
import ThreadWindow from "./pages/Thread/ThreadWindow";
import Report from "./pages/Report/Report";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ThemeProvider>
      <NotistackProvider>
        <MotionLazyContainer>
          <div className="app">
            <main className="content">
              <Routes>
                <Route
                  path="/login"
                  element={user ? <Navigate replace to="/" /> : <Login />}
                />

                <Route element={<DashboardLayout />}>
                  <Route
                    path="/"
                    element={
                      <ProtectedRouteWrapper>
                        <Dashboard />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/chat"
                    element={
                      <ProtectedRouteWrapper>
                        <Chat />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/meetings"
                    element={
                      <ProtectedRouteWrapper>
                        <MeetingCalendar />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRouteWrapper>
                        <User />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/student/profile"
                    element={
                      <ProtectedRouteWrapper>
                        <StudentProfile />
                      </ProtectedRouteWrapper>
                    }
                  />
                  {/* <ProtectedRoute path="/" element={<Dashboard />} />
                  <ProtectedRoute path="/chat" element={<Chat />} />
                  <ProtectedRoute
                    path="/meetings"
                    element={<MeetingCalendar />}
                  />
                  <ProtectedRoute path="/users" element={<User />} />
                  <ProtectedRoute
                    path="/student/profile"
                    element={<StudentProfile />}
                  />
                  <ProtectedRoute
                    path="/student/academic"
                    element={<Academic />}
                  />
                  <ProtectedRoute
                    path="/student/admission"
                    element={<AdmissionDetailsPage />}
                  />
                  <ProtectedRoute
                    path="/student/placement"
                    element={<Placement />}
                  />
                  <ProtectedRoute
                    path="/mentor"
                    element={<MentorAllocation />}
                  />
                  <ProtectedRoute path="/ptm" element={<Ptm />} />
                  <ProtectedRoute
                    path="/campus-buddy"
                    element={<CampusBuddy />}
                  />
                  <ProtectedRoute
                    path="/student/attendance"
                    element={<Attendance />}
                  />
                  <ProtectedRoute path="/threads" element={<Thread />} />
                  <ProtectedRoute
                    path="/threads/:threadId"
                    element={<ThreadWindow />}
                  />
                  <ProtectedRoute path="/report" element={<Report />} /> */}
                </Route>
              </Routes>
            </main>
          </div>
        </MotionLazyContainer>
      </NotistackProvider>
    </ThemeProvider>
  );
}

export default App;
