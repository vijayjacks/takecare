import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentPage() {
  const { labId } = useParams();
  const [params] = useSearchParams();
  const patientId = params.get("patient");

  useEffect(() => {
    const createSession = async () => {
      const { data } = await axios.post("http://localhost:5000/api/create-checkout-session", {
        amount: 5000, // ₹50
        successUrl: `http://localhost:5173/lab-report/${labId}?patient=${patientId}&payment=success`,
        cancelUrl: `http://localhost:5173/payment-cancel`,
      });

      window.location.href = data.url; // Redirect to Stripe
    };

    createSession();
  }, [labId, patientId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-gray-700">Redirecting to secure payment...</p>
    </div>
  );
}
