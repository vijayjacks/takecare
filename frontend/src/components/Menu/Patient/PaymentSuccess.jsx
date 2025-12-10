// // 


// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import axios from "axios";

// export default function PaymentSuccess() {
//   const { patientId } = useParams();
//   const [searchParams] = useSearchParams();
//   const [status, setStatus] = useState("Verifying your payment...");

//   const sessionId = searchParams.get("session_id");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/payments/verify-session/${sessionId}`);
//         if (res.data.success) {
//           setStatus("✅ Payment successful! Your lab report has been marked as paid.");
//         } else {
//           setStatus("⚠️ Payment not completed yet.");
//         }
//       } catch (err) {
//         console.error(err);
//         setStatus("❌ Error verifying payment. Please contact support.");
//       }
//     };

//     if (sessionId) verifyPayment();
//   }, [sessionId]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-3">Payment Status</h1>
//       <p className="text-gray-700">{status}</p>
//       <a
//         href={`/patient/lab-reports`}
//         className="mt-4 text-blue-600 underline"
//       >
//         Go to My Reports
//       </a>
//     </div>
//   );
// }





// import React, { useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function PaymentSuccess() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updatePayment = async () => {
//       const sessionId = params.get('session_id'); // from Stripe redirect
//       if (!sessionId) return;

//       try {
//         const token = localStorage.getItem('patientToken');
//         await axios.post('http://localhost:5000/api/payments/success', { sessionId }, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         alert('✅ Payment successful!');
//         navigate(-1); // go back to reports page
//       } catch (err) {
//         console.error(err);
//         alert('⚠️ Payment update failed.');
//       }
//     };

//     updatePayment();
//   }, []);

//   return (
//     <div className="p-8 text-center">
//       <h1 className="text-2xl font-bold text-green-600">Processing Payment...</h1>
//     </div>
//   );
// }




// import React, { useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function PaymentSuccess() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updatePayment = async () => {
//       const sessionId = params.get('session_id');
//       if (!sessionId) return;

//       try {
//         const token = localStorage.getItem('patientToken');
//         const res = await axios.post(
//           'http://localhost:5000/api/payments/success',
//           { sessionId },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const { payment } = res.data;
//         if (payment?.reportId && payment?.patientId) {
//           alert('✅ Payment successful!');
//           // Navigate directly to that report
//           navigate(`/patients/${payment.patientId}/labreports/${payment.reportId}`);
//         } else {
//           alert('✅ Payment successful! Redirecting to reports...');
//           navigate('/patient-dashboard');
//         }
//       } catch (err) {
//         console.error(err);
//         alert('⚠️ Payment update failed.');
//       }
//     };

//     updatePayment();
//   }, []);

//   return (
//     <div className="p-8 text-center">
//       <h1 className="text-2xl font-bold text-green-600">Processing Payment...</h1>
//     </div>
//   );
// }



import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const { patientId, reportId } = useParams(); // ✅ get both IDs from URL
  const navigate = useNavigate();

  useEffect(() => {
    const updatePayment = async () => {
      const sessionId = params.get('session_id');
      if (!sessionId) return;

      try {
        const token = localStorage.getItem('patientToken');
        const res = await axios.post(
          'http://localhost:5000/api/payments/success',
          { sessionId, reportId }, // optional: send reportId for linking
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { payment } = res.data;

        alert('✅ Payment successful!');
        // ✅ After payment success, go directly to lab report details
        navigate(`/patients/${patientId}/labreports/${reportId}`);
      } catch (err) {
        console.error('⚠️ Payment update failed:', err);
        alert('⚠️ Payment update failed.');
        navigate(`/patients/${patientId}/labreports`);
      }
    };

    updatePayment();
  }, [params, navigate, patientId, reportId]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-green-600">
        Processing Payment...
      </h1>
    </div>
  );
}
