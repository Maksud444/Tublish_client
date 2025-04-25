import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FaLock, FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import "./CheckoutForm.scss";

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success', 'error', or 'info'
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded! You will be redirected to your orders.");
          setMessageType("success");
          break;
        case "processing":
          setMessage("Your payment is processing. Please wait a moment.");
          setMessageType("info");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setMessageType("error");
          break;
        default:
          setMessage("Something went wrong with your payment.");
          setMessageType("error");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://tupublish.com/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      setMessageType("error");
    } else {
      setMessage("An unexpected error occurred. Please try again.");
      setMessageType("error");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="section-title">Your Email</h3>
        <p className="section-description">
          We'll send your receipt to this email address.
        </p>
        <LinkAuthenticationElement
          id="link-authentication-element"
          onChange={(e) => setEmail(e.target.value)}
          className="authentication-element"
        />
      </div>
      
      <div className="form-section">
        <h3 className="section-title">Payment Method</h3>
        <p className="section-description">
          All transactions are secure and encrypted.
        </p>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>
      
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className={`pay-button ${isLoading ? 'processing' : ''}`}
      >
        {isLoading ? (
          <>
            <FaSpinner className="spinner-icon" />
            Processing...
          </>
        ) : (
          <>
            <FaLock />
            Pay Now
          </>
        )}
      </button>
      
      {message && (
        <div id="payment-message" className={`message ${messageType}`}>
          {messageType === "success" && <FaCheckCircle className="message-icon" />}
          {messageType === "error" && <FaExclamationTriangle className="message-icon" />}
          {messageType === "info" && <FaSpinner className="spinner-icon message-icon" />}
          {message}
        </div>
      )}
      
      <div className="secure-payment-note">
        <FaLock className="lock-icon" />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </form>
  );
};

export default CheckoutForm;
