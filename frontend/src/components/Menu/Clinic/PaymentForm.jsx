// import React from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PaymentForm = ({ clientSecret, clinicId, patientId, onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: { card: elements.getElement(CardElement) },
//     });

//     if (error) return toast.error(error.message);

//     if (paymentIntent.status === "succeeded") {
//       await axios.post("http://localhost:5000/api/clinics/confirm-registration", {
//         clinicId,
//         patientId,
//         paymentId: paymentIntent.id,
//       });
//       toast.success("Registration successful!");
//       onSuccess();
//     }
//   };

//   return (
//     <form onSubmit={handlePayment} className="max-w-md mx-auto p-4 bg-white rounded shadow">
//       <CardElement />
//       <button
//         type="submit"
//         disabled={!stripe}
//         className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//       >
//         Pay Now
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;


import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const PaymentForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clinicId, patientId } = useParams(); // ✅ Get from URL params

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) return toast.error(error.message);

      if (paymentIntent.status === "succeeded") {
        await axios.post("http://localhost:5000/api/clinics/confirm-registration", {
          clinicId,
          patientId,
          paymentId: paymentIntent.id,
        });

        toast.success("Registration successful!");
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
