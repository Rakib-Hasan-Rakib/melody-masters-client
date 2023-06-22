import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import ErrorAlert from "../../../Components/Alerts/ErrorAlert";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import SuccessAlert from "../../../Components/Alerts/SuccessAlert";

const CheckOutForm = ({ price, selectedClass }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const [proccessing, setProccessing] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    console.log(card);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      ErrorAlert(error?.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    setProccessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    setProccessing(false);
    if (paymentIntent?.status === "succeeded") {
      SuccessAlert(
        `Transaction completed. Transaction id : ${paymentIntent.id}`
      );
      const payment = {
        class: selectedClass?.className,
        classPhoto: selectedClass?.photoUrl,
        classId:selectedClass?.classId,
        studentEmail: user?.email,
        instractorEmail: selectedClass?.instractorEmail,
        instractorName:selectedClass?.instractorName,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        // if (res.data.result.insertedId) {
        //   // display confirm
        // }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary m-4"
          type="submit"
          disabled={!stripe || !clientSecret || proccessing}
        >
          Pay
        </button>
      </form>
    </>
  );
};

export default CheckOutForm;
