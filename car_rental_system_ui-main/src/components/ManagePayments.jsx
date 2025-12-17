import React, { useEffect, useState } from "react";
import "../components/adminNavbar.css"

const ManagePayments = () => {
  const [payments, setPayments] = useState([]); // Holds payment data
  const [error, setError] = useState(""); // Holds error messages

  // Fetch payment data when the component mounts
  useEffect(() => {
    fetchPayments();
  }, []);

  // Fetch payments from the API
  const fetchPayments = async () => {
    try {
      const response = await fetch("https://localhost:7257/api/Payment");
      if (!response.ok) throw new Error("Failed to fetch payments");
      const data = await response.json();
      console.log(data); // Log the data structure to verify
      setPayments(data); // Update the state with the fetched payment data
    } catch (err) {
      setError(err.message); // Set error message on failure
    }
  };

  // Refund a payment by PaymentId
  const refundPayment = async (paymentId) => {
    try {
      const response = await fetch(
        "https://localhost:7257/api/Payment/refund", // Assuming refund endpoint is correct
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentId }), // Body format matches the backend expectation
        }
      );
      if (!response.ok) throw new Error("Failed to refund payment");
      alert("Payment refunded successfully");
      fetchPayments(); // Refresh the payment list after refund
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Manage Payments</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>{payment.amount}</td>
              <td>{payment.paymentStatus}</td>
              <td>
                {payment.paymentStatus === "Completed" && (
                  <button
                    onClick={() => refundPayment(payment.paymentId)}
                    className="refund-btn"
                  >
                    Refund
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePayments;
