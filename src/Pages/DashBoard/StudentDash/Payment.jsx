import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const location = useLocation();
  const selectedClass = location.state
  const priceString = parseFloat(selectedClass?.price).toFixed(2);
  const price = parseFloat(priceString);
  console.log(selectedClass);

  return (
    <div>
      <h2>This is payment route</h2>
      <Elements stripe={stripePromise}>
        <CheckOutForm price={price} selectedClass={selectedClass} />
      </Elements>
    </div>
  );
};

export default Payment;
