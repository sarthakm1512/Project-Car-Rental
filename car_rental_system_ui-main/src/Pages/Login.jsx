/*import { jwtDecode } from "jwt-decode"; // or "import jwtDecode from 'jwt-decode'" for older versions
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9]+$/i.test(formData.username)) {
      newErrors.username = "Username must be alphanumeric.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const payload = {
        username: formData.username,
        password: formData.password,
      };

      const response = await fetch("https://localhost:7257/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Response Data:", data); // Debug response

      if (response.ok) {
        console.log("JWT Token:", data.token); // Log token to console
        localStorage.setItem("token", data.token);

        const decodedToken = jwtDecode(data.token);

        if (decodedToken.role === "Admin") {
          navigate("/admin-dashboard");
        } else if (decodedToken.role === "User") {
          navigate("/user-dashboard");
        }

        setMessage("Login successful!");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: data.message || "Invalid login credentials",
        }));
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        apiError: "Something went wrong. Please try again later.",
      }));
    }
  }
};


  return (
    <div className="form-div">
      <div className="edit">
        <div className="form-div__text">
          <h2>Welcome Back</h2>
          <p>Please login to access your account.</p>
        </div>

        <form className="form-div__form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          {errors.apiError && <p className="error">{errors.apiError}</p>}
          {message && <p className="success">{message}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;*/
import jwtDecode from "jwt-decode"; // Correct import based on jwt-decode version
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9]+$/i.test(formData.username)) {
      newErrors.username = "Username must be alphanumeric.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const payload = {
          username: formData.username,
          password: formData.password,
        };

        const response = await fetch("https://localhost:7257/api/User/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
          localStorage.setItem("authToken", data.token);

          if (formData.username == "nandu" ) {
            navigate("/Admin_Dashboard")
          }
          else {
          navigate("/User_dashboard");            
          }

          setMessage("Login successful!");
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            apiError: data.message || "Invalid login credentials",
          }));
        }
      } catch (error) {
        console.error("Error during login:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: "Something went wrong. Please try again later.",
        }));
      }
    }
  };

  return (
    <div className="form-div">
      <div className="edit">
        <div className="form-div__text">
          <h2>Welcome Back</h2>
          <p>Please login to access your account.</p>
        </div>

        <form className="form-div__form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          {errors.apiError && <p className="error">{errors.apiError}</p>}
          {message && <p className="success">{message}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
