import "../components/adminNavbar.css"
import React, { useEffect, useState } from "react";


const YourReservation = () => {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch("https://localhost:7257/api/Reservation/6"); // Replace with actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch reservation data.");
        }
        const data = await response.json();
        setReservation(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReservation();
  }, []);

  if (loading) {
    return (
      <div className="reservation-container">
        <div className="reservation-box">
          <h3>Loading Reservation...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reservation-container">
        <div className="reservation-box">
          <h3>Error: {error}</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-container">
      <div className="reservation-box">
        <h3 className="text-center">Your Reservation</h3>
        <p><strong>Reservation ID:</strong> {reservation.id}</p>
        <p><strong>Customer ID:</strong> {reservation.userId}</p>
        
        <p><strong>Pickup Date:</strong> {reservation.reservationDate}</p>
        <p><strong>Drop-off Date:</strong> {reservation.dropoffDate}</p>
        <p><strong>Status:</strong> {reservation.status}</p>
        <p><strong>TotalPrice:</strong> {reservation.totalPrice}</p>
      </div>
    </div>
  );
};

export default YourReservation;
