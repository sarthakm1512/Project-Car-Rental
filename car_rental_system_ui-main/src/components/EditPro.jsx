import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "../components/adminNavbar.css"

const EditPro = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // Fetch current user data (mocked as an example)
    const fetchUserData = async () => {
      // Ideally, fetch this data from an API, for example:
      // const response = await fetch("/api/user/profile");
      // const data = await response.json();

      setUserData({
        name: "adarsh",
        email: "adarsh@example.com",
        password: "", // Empty password for user to input
      });
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update (send data to API)
    console.log("Updated User Data:", userData);
    // Redirect or show a success message
  };

  return (
    <div className="profile-update-container">
      <div className="profile-update-form">
        <h2>Update Profile</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditPro;
