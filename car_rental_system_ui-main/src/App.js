import React, { useEffect, useState } from "react";
import "../src/dist/styles.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import Models from "./Pages/Models";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import LoginForm from "./Pages/Login";
import RegisterForm from "./Pages/Register";
import User_Dashboard from "./Pages/User_Dashboard";
import LoginNav from "./components/LoginNav";
import AdminDashboard from "./Pages/Admin_Dashboard";
import DashboardOverview from "./components/DashboardOverview";
import ManageCars from "./components/ManageCars";
import ManageReservations from "./components/ManageReservations";
import ManagePayments from "./components/ManagePayments";
import ManageUsers from "./components/ManageUsers";
import AdminNavbar from "./components/AdminNavbar";
import PaymentPage from "./Pages/payment-page";
import YourReservation from "./components/YourReservation";
import PaymentHistory from "./components/PaymentHistory";
import ProfileUpdate from "./components/EditPro";
import EditPro from "./components/EditPro";

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("authToken"));
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("authToken")
  );

  // Listen for changes to the token in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setUserToken(localStorage.getItem("authToken"));
      setAdminToken(localStorage.getItem("authToken"));
    };

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      {!userToken ? <Navbar /> : <LoginNav />}

      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="models" element={<Models />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="Login" element={<LoginForm />} />
        <Route path="Register" element={<RegisterForm />} />
        <Route path="user_DashBoard" element={<User_Dashboard />} />
        <Route path="admin_Dashboard" element={<AdminDashboard />} />
        <Route path="dashboardOverview " element={<DashboardOverview />} />
        <Route path="manageCars" element={<ManageCars />} />
        <Route path="manageReservations" element={<ManageReservations />} />
        <Route path="managePayments" element={<ManagePayments />} />
        <Route path="manageUsers" element={<ManageUsers />} />
        <Route path="payment-page" element={<PaymentPage />} />
        <Route path="YourReservation" element={<YourReservation />} />
        <Route path="PaymentHistory" element={<PaymentHistory />} />
    <Route path="EditPro" element={<EditPro/>} />
      </Routes>
    </>
  );
}

export default App;
