import React, { useEffect, useState } from "react";
import "../components/adminNavbar.css"

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("https://localhost:7257/api/Payment"); // Replace with actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch payment history.");
        }
        const data = await response.json();
        setPayments(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="reservation-container">
        <div className="reservation-box">
          <h3>Loading Payment History...</h3>
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
        <h3 className="text-center">Payment History</h3>
        {payments.length > 0 ? (
          <ul>
            {payments.map((payment) => (
              <li key={payment.paymentId} style={{ marginBottom: "15px" }}>
                <p><strong>Payment ID:</strong> {payment.paymentId}</p>
                <p><strong>Reservation ID:</strong> {payment.reservationId}</p>
                <p><strong>Amount:</strong> ${payment.amount}</p>
                <p><strong>Payment Date:</strong> {new Date(payment.paymentDate).toLocaleDateString()}</p>
                <p><strong>Payment Status:</strong> {payment.paymentStatus}</p>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No payment history available.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
