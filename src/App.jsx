import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import ThemeProvider from "./theme";
import LazyLoadWrapper from "./components/loader/LazyLoadWrapper";

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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddUserForm from "./pages/Admin/AddUserForm";
// TODO : Need to remove routing logic from app component
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
                        <LazyLoadWrapper component={Dashboard} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRouteWrapper allowedRoles={["admin"]}>
                        <LazyLoadWrapper component={AdminDashboard} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/admin/add-user"
                    element={
                      <ProtectedRouteWrapper allowedRoles={["admin"]}>
                        <LazyLoadWrapper component={AddUserForm} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/admin/report"
                    element={
                      <ProtectedRouteWrapper allowedRoles={["admin"]}>
                        <Report />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/chat"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={Chat} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/meetings"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={MeetingCalendar} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={User} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/student/profile"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={StudentProfile} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/student/academic"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={Academic} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/student/admission"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={AdmissionDetailsPage} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/student/placement"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={Placement} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/admin/mentor-assignment"
                    element={
                      <ProtectedRouteWrapper allowedRoles={["admin"]}>
                        <MentorAllocation />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/student/ptm"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={Ptm} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/campus-buddy"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={CampusBuddy} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/student/attendance"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={Attendance} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/threads"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={Thread} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/threads/:threadId"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={ThreadWindow} />
                      </ProtectedRouteWrapper>
                    }
                  />
                  <Route
                    path="/report"
                    element={
                      <ProtectedRouteWrapper>
                        <LazyLoadWrapper component={Report} />
                      </ProtectedRouteWrapper>
                    }
                  />
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
