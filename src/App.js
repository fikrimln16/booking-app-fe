import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
import UserDashboardEquipment from "./pages/user/UserDashboardEquipment";
import UserDashboardRoom from "./pages/user/UserDashboardRoom";
import AdminDashboardEquipment from "./pages/admin/AdminDashboardEquipment";
import AdminDashboardRoom from "./pages/admin/AdminDashboardRoom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/request-equipment" element={<UserDashboardEquipment />} />
        <Route path="/request-room" element={<UserDashboardRoom />} />
        <Route path="/admin-request-equipment" element={<AdminDashboardEquipment />} />
        <Route path="/admin-request-room" element={<AdminDashboardRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
