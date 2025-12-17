import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./YourReservation";
import "./PaymentHistory";
import "./EditPro";

const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Remove authentication token
    localStorage.removeItem("authToken");

    // 2. Redirect user to the login or homepage
    navigate("/"); // Make sure the "/" route exists in your app
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <img
          src="profile.jpg"
          alt="User Profile"
          className="rounded-circle"
          width="40"
          height="40"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleNavigation("/EditPro")}>
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleNavigation("/YourReservation")}>
          Your Reservations
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleNavigation("/PaymentHistory")}>
          Payment History
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
