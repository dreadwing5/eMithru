import { Navigate, useRoutes, useLocation } from "react-router-dom";

//Route File

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },

    // Dashboard Routes
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "user",
          children: [
            {
              element: <Navigate to="/dashboard/user/profile" replace />,
              index: true,
            },
            { path: "profile", element: <UserProfile /> },
            { path: "new", element: <UserCreate /> },
            { path: ":name/edit", element: <UserCreate /> },
            { path: "account", element: <UserAccount /> },
          ],
        },

        {
          path: "chat",
          children: [{ element: <Chat />, index: true }],
        },
        { path: "calendar", element: <Calendar /> },
      ],
    },
  ]);
}
