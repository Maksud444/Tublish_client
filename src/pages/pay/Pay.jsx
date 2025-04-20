import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm.jsx";
import Loader from "../../components/loader/Loader";

const stripePromise = loadStripe(
  "pk_test_51RAgPeFbP8hXZtbWd45AzlRahcWRPeFzHQ4JZJNmssUnBWOQhWww3zsUatH6TYq7FZxNLtM1VbD2RzHwU2iYYhvF00Oymwf3w9"
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
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {isLoading ? (
      <Loader text="Loading payment details..." />
    ) : error ? (
      <div className="error">Error loading payment details: {error.message}</div>
    ) : (
      clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )
    )}
  </div>;
};

export default Pay;
