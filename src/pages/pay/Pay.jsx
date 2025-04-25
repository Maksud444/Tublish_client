import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm.jsx";
import Loader from "../../components/loader/Loader";
import { FaLock, FaCreditCard, FaShieldAlt } from "react-icons/fa";

const stripePromise = loadStripe(
  // "pk_test_51RAgPeFbP8hXZtbWd45AzlRahcWRPeFzHQ4JZJNmssUnBWOQhWww3zsUatH6TYq7FZxNLtM1VbD2RzHwU2iYYhvF00Oymwf3w9"
  "pk_live_51MTUazLXefz9hVI791oWU0OUZel0MCgWrjOP2WJCc3CjUiAolEnJN6K3PLMl2T4YURMKgiaPijpDaA7rkQBNNlre00zwMOMOee"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#1dbf73',
      colorBackground: '#ffffff',
      colorText: '#333333',
      colorDanger: '#df1b41',
      fontFamily: 'Montserrat, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };
  
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay-container">
      <div className="pay-wrapper">
        {isLoading ? (
          <div className="loader-container">
            <Loader text="Preparing your payment..." />
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-message">
              <h2>Payment Error</h2>
              <p>{error.response?.data?.message || error.message || "Something went wrong"}</p>
              <button onClick={() => window.history.back()} className="back-button">
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="payment-header">
              <h1>Complete Your Payment</h1>
              <div className="secure-badge">
                <FaLock /> Secure Payment
              </div>
            </div>
            
            <div className="payment-form-container">
              {clientSecret && (
                <>
                  <h2>Payment Details</h2>
                  <p className="payment-instruction">
                    Please enter your card details below to complete your purchase.
                  </p>
                  <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm orderId={id} />
                  </Elements>
                </>
              )}
            </div>
            
            <div className="payment-footer">
              <div className="security-info">
                <div className="security-item">
                  <FaShieldAlt />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="security-item">
                  <FaCreditCard />
                  <span>Trusted Payment Methods</span>
                </div>
              </div>
              <p className="terms-note">
                By completing this payment, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Pay;
