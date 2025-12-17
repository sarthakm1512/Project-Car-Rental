import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../components/adminNavbar.css"

const AdminNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar">
      <Container>
        <Navbar.Brand href="#" className="fw-bold fs-4">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <NavLink className="nav-link fs-5" to="/admin/overview">
              
            </NavLink>
            <NavLink className="nav-link fs-5">
              Manage Cars
            </NavLink>
            <NavLink className="nav-link fs-5" >
              Manage Reservations
            </NavLink>
            <NavLink className="nav-link fs-5" >
              Manage Payments
            </NavLink>
            <NavLink className="nav-link fs-5" >
              Manage Users
              {/* to="/admin/users" */}
            </NavLink>
            <Button
              variant="outline-danger"
              className="ms-3 fs-5"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
