import React, { useState } from "react";
import axios from "axios";
import "../components/adminNavbar.css";

const PaymentPage = () => {
  const [reservationId, setReservationId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePayment = async () => {
    const apiUrl = `https://localhost:7257/api/Payment/make?reservationId=${reservationId}&amount=${amount}`;
    try {
      const response = await axios.post(apiUrl, {
        paymentMethod,
      });

      if (response.status === 200) {
        setPaymentStatus("Completed");
        setIsPaymentSuccessful(true);
      } else {
        setPaymentStatus("Failed");
        setIsPaymentSuccessful(false);
      }
    } catch (error) {
      console.error("Payment failed", error);
      setPaymentStatus("Failed");
      setIsPaymentSuccessful(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="payment-header">Payment Page</h1>
        <div className="form-group">
          <label className="form-label">Reservation ID:</label>
          <input
            type="text"
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
            placeholder="Enter Reservation ID"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="form-select"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button onClick={handlePayment} className="payment-button">
          Make Payment
        </button>
        {paymentStatus === "Completed" && (
          <div className="success-message">
            <span className="checkmark">✔</span> Payment Successful!
          </div>
        )}
        {paymentStatus === "Failed" && (
          <div className="error-message">Payment Failed. Please try again.</div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
