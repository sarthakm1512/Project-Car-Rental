import React from "react";
import "../components/adminNavbar.css"

const DashboardOverview = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm dashboard-card">
            <div className="card-body">
              <h4 className="stat-number">9</h4>
              <p className="stat-label">Total Cars</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm dashboard-card">
            <div className="card-body">
              <h4 className="stat-number">120</h4>
              <p className="stat-label">Total Reservations</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm dashboard-card">
            <div className="card-body">
              <h4 className="stat-number">$5000</h4>
              <p className="stat-label">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm dashboard-card">
            <div className="card-body">
              <h4 className="stat-number">10</h4>
              <p className="stat-label">Active Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
