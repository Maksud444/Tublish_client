import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import Loader from "../../components/loader/Loader";
import "./Success.scss";
import { FaCheckCircle, FaExclamationTriangle, FaArrowRight } from "react-icons/fa";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        
        // Start countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate("/orders");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    makeRequest();
  }, [payment_intent, navigate]);

  const handleManualRedirect = () => {
    navigate("/orders");
  };

  return (
    <div className="success-page">
      <div className="success-container">
        {isLoading ? (
          <div className="loading-state">
            <Loader text="Processing your payment..." />
            <p className="processing-message">
              Please wait while we confirm your payment and set up your order.
            </p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            <h1>Payment Processing Error</h1>
            <p className="error-message">
              {error.response?.data?.message || error.message || "Something went wrong while processing your payment."}
            </p>
            <p className="help-text">
              Please contact our support team for assistance or try again later.
            </p>
            <div className="action-buttons">
              <button onClick={() => navigate("/support")} className="support-button">
                Contact Support
              </button>
              <button onClick={() => navigate("/orders")} className="orders-button">
                Go to Orders
              </button>
            </div>
          </div>
        ) : (
          <div className="success-state">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h1>Payment Successful!</h1>
            <p className="success-message">
              Thank you for your purchase. Your order has been confirmed and is being processed.
            </p>
            <div className="order-info">
              <p>Payment ID: <span className="highlight">{payment_intent}</span></p>
              <p>A confirmation email has been sent to your registered email address.</p>
            </div>
            <div className="redirect-info">
              <p>
                You will be redirected to your orders in <span className="countdown">{countdown}</span> seconds
              </p>
              <button onClick={handleManualRedirect} className="redirect-button">
                Go to Orders Now <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
