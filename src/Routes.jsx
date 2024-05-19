import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRouteWrapper from "./ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import MeetingCalendar from "./pages/Meeting/MeetingCalendar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import User from "./pages/Users/User";
import StudentProfile from "./pages/Student/StudentProfile";

import MentorAllocation from "./pages/MentorAllocation/MentorAllocation";
import CampusBuddy from "./pages/CampusBuddy/CampusBuddy";
import Academic from "./pages/Student/Academic";
import AdmissionDetailsPage from "./pages/Student/AdmissionDetailsPage";
import Placement from "./pages/Student/Placement";
import Ptm from "./pages/ParentsTeacherMeeting/Ptm";
import Attendance from "./pages/Student/Attendance";
import Thread from "./pages/Thread/Thread";
import ThreadWindow from "./pages/Thread/ThreadWindow";
import Report from "./pages/Report/Report";

export const RouteComponent = () => {
	const { user } = useContext(AuthContext);

	return (
		<Routes>
			<Route
				path="/login"
				element={
					user ? (
						<Navigate
							replace
							to="/"
						/>
					) : (
						<Login />
					)
				}
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
				<Route
					path="/student/academic"
					element={
						<ProtectedRouteWrapper>
							<Academic />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/student/admission"
					element={
						<ProtectedRouteWrapper>
							<AdmissionDetailsPage />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/student/placement"
					element={
						<ProtectedRouteWrapper>
							<Placement />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/mentor"
					element={
						<ProtectedRouteWrapper>
							<MentorAllocation />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/student/ptm"
					element={
						<ProtectedRouteWrapper>
							<Ptm />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/campus-buddy"
					element={
						<ProtectedRouteWrapper>
							<CampusBuddy />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/student/attendance"
					element={
						<ProtectedRouteWrapper>
							<Attendance />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/threads"
					element={
						<ProtectedRouteWrapper>
							<Thread />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/threads/:threadId"
					element={
						<ProtectedRouteWrapper>
							<ThreadWindow />
						</ProtectedRouteWrapper>
					}
				/>
				<Route
					path="/report"
					element={
						<ProtectedRouteWrapper>
							<Report />
						</ProtectedRouteWrapper>
					}
				/>
			</Route>
		</Routes>
	);
};
