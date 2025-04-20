import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import Loader from "../../components/loader/Loader";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success">
      {isLoading ? (
        <Loader text="Processing your payment..." />
      ) : error ? (
        <div className="error">Error processing payment: {error.message}</div>
      ) : (
        <div>
          Payment successful. You are being redirected to the orders page. Please do
          not close the page
        </div>
      )}
    </div>
  );
};

export default Success;
