import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import DashboardOverview from "../components/DashboardOverview";
import ManageCars from "../components/ManageCars";
import ManageReservations from "../components/ManageReservations";
import ManagePayments from "../components/ManagePayments";
import ManageUsers from "../components/ManageUsers";



const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <DashboardOverview />
      <ManageCars />
      <ManageReservations />
      <ManagePayments/>
      <ManageUsers/>
      
      
    </>
  );
};

export default AdminDashboard;
