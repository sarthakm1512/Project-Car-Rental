import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://localhost:7257/api/User/all");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data); // Ensure this matches the response structure
    } catch (err) {
      setError(err.message);
    }
  };

  const deactivateUser = async (userId) => {
    try {
      const response = await fetch(
        `https://localhost:7257/api/User/deactivate/${userId}`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Failed to deactivate user");
      setUsers((prev) => prev.filter((user) => user.userId !== userId)); // Adjust to match your API
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Manage Users</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => deactivateUser(user.userId)}
                  className="me-2 btn btn-danger"
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
