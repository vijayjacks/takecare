// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";

// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji"); // Your Stripe publishable key

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: "http://localhost:5173/payment-success",
//       },
//     });

//     if (error) setMessage(error.message);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded shadow">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe}
//         className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//       >
//         Pay Now
//       </button>
//       {message && <p className="text-red-500 text-sm mt-2">{message}</p>}
//     </form>
//   );
// };

// export default function ReportPayment() {
//   const { labId } = useParams();
//   const [params] = useSearchParams();
//   const patientId = params.get("patient");
//   const amount = params.get("amount");
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     axios
//       .post("http://localhost:5000/api/payments/create-intent", {
//         patientId,
//         reportId: labId,
//         amount,
//       })
//       .then((res) => setClientSecret(res.data.clientSecret))
//       .catch((err) => console.error(err));
//   }, [patientId, labId, amount]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4 text-center">
//         Pay ₹{amount} for Lab Report
//       </h2>
//       {clientSecret && (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// // const stripePromise = loadStripe("pk_test_************"); // your Stripe publishable key

// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji"); // Your Stripe publishable key

// export default function ReportPayment() {
//   const { labId } = useParams();
//   const [searchParams] = useSearchParams();
//   const patientId = searchParams.get("patient");
//   const amount = searchParams.get("amount");
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("patientToken");

//       // ✅ Create payment session
//       const res = await axios.post(
//         "http://localhost:5000/api/payments/create-intent",
//         {
//           labId,          // ✅ pass lab report id here
//           patientId,      // ✅ pass patient id
//           amount,         // ✅ total to charge
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // ✅ Redirect to Stripe Checkout
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
//     } catch (err) {
//       console.error("Payment Error:", err);
//       alert(err.response?.data?.message || "Payment failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Pay for Lab Report</h1>
//       <p>Lab ID: {labId}</p>
//       <p>Patient ID: {patientId}</p>
//       <p>Amount: ₹{amount}</p>
//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         {loading ? "Processing..." : "Pay with Stripe"}
//       </button>
//     </div>
//   );
// }














import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Your Stripe publishable key
const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji");

export default function ReportPayment() {
  const { reportId } = useParams();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patient");
  // const bookingId = searchParams.get("booking"); // Add bookingId param
  // const testName = searchParams.get("test");     // Add testName param
  const amount = Number(searchParams.get("amount")); // Convert to number
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!reportId || !patientId || !amount) {
      alert("Missing payment details");
      return;
    }
    ///////
    try {
      setLoading(true);

      const token = localStorage.getItem("patientToken");

      // ✅ Create payment session on backend
      const res = await axios.post(
        "http://localhost:5000/api/payments/create-intent",
        {
          reportId,
          patientId,
          cost: amount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Redirect to Stripe Checkout
      // const stripe = await stripePromise;
      // const { error } = await stripe.redirectToCheckout({
      //   sessionId: res.data.sessionId,
      // });


      const { sessionId, url } = res.data; // url if you return session.url from backend
      window.location.href = url;

    } catch (err) {
      console.error("Payment Error:", err);
      alert(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pay for Lab Report</h1>
      <p><strong>reportId:</strong> {reportId}</p>
      <p><strong>Patient ID:</strong> {patientId}</p>
      {/* <p><strong>Booking ID:</strong> {bookingId}</p>
      <p><strong>Test Name:</strong> {testName}</p> */}
      <p><strong>Amount:</strong> ₹{amount}</p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Pay with Stripe"}
      </button>
    </div>
  );
}
