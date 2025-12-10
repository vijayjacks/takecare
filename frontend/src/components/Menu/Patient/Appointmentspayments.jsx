
// import axios from "axios";
// import { useSearchParams } from "react-router-dom";
// import { useEffect } from "react";

// export default function Appointmentspayments() {
//   const [params] = useSearchParams();
//   const session_id = params.get("session_id");

//   useEffect(() => {
//     axios
//       .post("http://localhost:5000/api/appointments/confirm-payment", { session_id })
//       .then(() => alert("Payment Confirmed & Appointment Booked!"));
//   }, []);

//   return <h2>Payment Successful!</h2>;
// }




import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointmentspayments = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAppointmentPayment = async () => {
      const session_id = searchParams.get("session_id");

      if (!session_id) {
        toast.error("Missing payment session information.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/appointments/confirm-payment",
          { session_id }
        );

        toast.success(response.data?.message || "Payment Confirmed! Appointment Booked 🎉");

        // Redirect to home page after 2.5 seconds
        setTimeout(() => {
          navigate("/");
        }, 2500);

      } catch (err) {
        console.error("Payment confirmation error:", err.response?.data || err.message);

        if (err.response) {
          toast.error(err.response.data?.message || "Payment confirmation failed!");
        } else {
          toast.error("Network error. Please try again.");
        }

        // Redirect to home page after error
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    };

    confirmAppointmentPayment();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-green-700 mb-3">
        Processing Payment...
      </h1>
      <p className="text-gray-600">Please wait while we confirm your appointment.</p>
    </div>
  );
};

export default Appointmentspayments;
















