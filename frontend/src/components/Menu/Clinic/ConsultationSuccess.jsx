import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ConsultationSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const sessionId = params.get("session_id");
  const paymentId = params.get("payment_id");
  const clinicId = params.get("clinicId");
  const patientId = params.get("patientId");
  const doctorId = params.get("doctorId");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/consultation/confirm-payment", {
          sessionId,
          paymentId,
          clinicId,
          patientId,
          doctorId,
        });
        toast.success("Consultation payment successful!");

        setTimeout(() => {
          navigate("/patientbooking", {
            state: { doctorId, clinicId, patientId },
          });
        }, 2000);
      } catch (error) {
        console.error(error);
        toast.error("Error confirming payment");
      }
    };
    if (sessionId && paymentId) confirmPayment();
  }, [sessionId, paymentId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-gray-600 mt-2">Redirecting to appointment booking...</p>
    </div>
  );
};

export default ConsultationSuccess;
