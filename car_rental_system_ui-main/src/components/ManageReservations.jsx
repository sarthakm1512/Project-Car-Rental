import React, { useEffect, useState } from "react";
import "../components/adminNavbar.css"

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
      if (!token) throw new Error("Authorization token is missing");

      const response = await fetch(
        "https://localhost:7257/api/Reservation/history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch reservations");
      const data = await response.json();
      console.log(data, "data");

      setReservations(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteReservation = async (id) => {
    try {
      const token = localStorage.getItem("authToken"); // Include token for secured API
      const response = await fetch(
        `https://localhost:7257/api/Reservation/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete reservation");
      setReservations((prev) => prev.filter((res) => res.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="manage-reservations-container">
      <h1>Manage Reservations</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.userId}</td>
       
              <td>{reservation.status}</td>
              <td>
                <button
                  onClick={() => deleteReservation(reservation.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReservations;
