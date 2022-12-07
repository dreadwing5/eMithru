import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/login/Login";
import DashBoard from "./pages/dashboard/Dashboard";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route exact path="/" element={user ? <DashBoard /> : <Login />} />
      <Route path="/login" element={user ? <DashBoard /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/messenger"
        element={!user ? <Navigate replace to="/" /> : <Messenger />}
      />
    </Routes>
  );
}

export default App;
