// // 

// import React, { useEffect } from "react";
// import { useParams, useSearchParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const PaymentSuccessed = () => {
//   const { clinicId, patientId } = useParams();
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confirmPayment = async () => {
//       const sessionId = params.get("session_id");
//       if (!sessionId) return;

//       try {
//         const res = await axios.post("http://localhost:5000/api/clinics/confirm-registration", {
//           sessionId,
//           clinicId,
//           patientId,
//         });

//         // ✅ Only success toast if new registration
//         toast.success("✅ Payment successful! You are now registered.", {
//           autoClose: 2500,
//         });

//         // Navigate after toast
//         setTimeout(() => {
//           navigate(`/clinic/${clinicId}/patient/${patientId}`);
//         }, 2800);
//       } catch (err) {
//         console.error(err);

//         if (err.response && err.response.status === 400) {
//           // ✅ Only show "already registered" toast
//           toast.info("ℹ️ You are already registered in this clinic. You may start booking!", {
//             autoClose: 2000,
//           });

//           setTimeout(() => {
//             navigate(`/clinic/${clinicId}/patient/${patientId}`);
//           }, 2300);
//         } else {
//           // ✅ Handle genuine failure
//           toast.error("⚠️ Payment confirmation failed.", {
//             autoClose: 2500,
//           });

//           setTimeout(() => {
//             navigate(`/clinics/${clinicId}`);
//           }, 2700);
//         }
//       }
//     };

//     confirmPayment();
//   }, [params, clinicId, patientId, navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
//       <ToastContainer position="top-center" />
//       <h1 className="text-3xl font-bold text-green-700 mb-3">
//         Payment Successful ✅
//       </h1>
//       <p className="text-gray-600">Redirecting to your clinic dashboard...</p>
//     </div>
//   );
// };

// export default PaymentSuccessed;











import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccessed = () => {
  const { clinicId, patientId } = useParams(); // Get from route params
  const [searchParams] = useSearchParams(); // Stripe session_id query param
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId || !clinicId || !patientId) {
        toast.error("Missing required payment information.");
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/clinics/confirm-registration",
          { sessionId, clinicId, patientId }
        );

        toast.success(res.data.message || "✅ Payment successful! You are now registered.");

        // Redirect after short delay
        setTimeout(() => {
          navigate(`/clinic/${clinicId}/patient/${patientId}`);
        }, 2500);

      } catch (err) {
        console.error("Payment confirmation error:", err.response?.data || err.message);

        // Handle "already registered" scenario gracefully
        if (err.response?.status === 409 && err.response.data?.message === "Already registered in this clinic") {
          // toast.info("You are already registered in this clinic.");
          setTimeout(() => {
            navigate(`/clinic/${clinicId}/patient/${patientId}`);
          }, 2500);
        } else if (err.response) {
          toast.error(err.response.data?.message || "Payment confirmation failed.");
          setTimeout(() => {
            navigate(`/clinic/${clinicId}`);
          }, 2500);
        } else {
          toast.error("Network error. Please try again later.");
        }
      }
    };

    confirmPayment();
  }, [searchParams, clinicId, patientId, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-green-700 mb-3">
        Processing Payment...
      </h1>
      <p className="text-gray-600">
        Please wait while we confirm your registration.
      </p>
    </div>
  );
};

export default PaymentSuccessed;
