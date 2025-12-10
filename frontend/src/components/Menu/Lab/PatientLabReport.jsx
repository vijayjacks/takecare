// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji");
// const BASE_URL = "http://localhost:5000";

// const PatientLabReport = () => {
//   const { patientId, labId } = useParams();

//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState("Unpaid");
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/patient/${patientId}/labReports/${labId}`, {
//           withCredentials: true,
//         });

//         setReport(res.data.report);
//         setPaymentStatus(res.data.report?.paymentStatus || "Unpaid");
//         setPdfUrl(res.data.report?.pdfUrl || null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch lab report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [patientId, labId]);

//   const handlePayment = async (bookingId, cost) => {
//     try {
//       const stripe = await stripePromise;

//       const res = await axios.post(
//         `${BASE_URL}/api/lab/reports/${bookingId}/create-payment-intent`,
//         {},
//         { withCredentials: true }
//       );

//       const clientSecret = res.data.clientSecret;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: {
//             // Stripe Elements integration needed for live use
//           },
//         },
//       });

//       if (result.error) {
//         alert("Payment failed: " + result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         await axios.post(
//           `${BASE_URL}/api/lab/reports/${bookingId}/confirm-payment`,
//           { paymentIntentId: result.paymentIntent.id },
//           { withCredentials: true }
//         );

//         alert("Payment successful!");
//         setPaymentStatus("Paid");
//         // Optional: Refetch report to update PDF URL
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment process failed.");
//     }
//   };

//   const handleDownload = async (bookingId) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/lab/reports/${bookingId}/download`, {
//         responseType: "blob",
//         withCredentials: true,
//       });

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "lab-report.pdf";
//       a.click();
//     } catch (err) {
//       console.error("Download failed:", err);
//       alert("Unable to download report.");
//     }
//   };

//   if (loading) return <p>Loading report...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!report) return <p>No report found.</p>;

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial" }}>
//       <h2>Lab Report Details</h2>

//       <section style={{ marginBottom: "20px" }}>
//         <h4>🧍‍♂️ Patient Info</h4>
//         <p><strong>Name:</strong> {report.patient?.name}</p>
//         <p><strong>Gender:</strong> {report.patient?.gender}</p>
//         <p><strong>Age:</strong> {report.patient?.age}</p>
//         <p><strong>Email:</strong> {report.patient?.email}</p>
//         <p><strong>Contact:</strong> {report.patient?.contact?.type}</p>
//       </section>

//       <section style={{ marginBottom: "20px" }}>
//         <h4>🏥 Lab Info</h4>
//         <p><strong>Name:</strong> {report.lab?.name}</p>
//         <p><strong>Email:</strong> {report.lab?.email}</p>
//         <p><strong>Phone:</strong> {report.lab?.phone}</p>
//         <p><strong>Address:</strong> {report.lab?.address}</p>
//       </section>

//       <section style={{ marginBottom: "20px" }}>
//         <h4>🧪 Test Info</h4>
//         <p><strong>Test Name:</strong> {report.testName}</p>
//         <p><strong>Result:</strong> {report.result}</p>
//         <p><strong>Normal Range:</strong> {report.normalRange}</p>
//         <p><strong>Booking ID:</strong> {report.bookingId}</p>
//         <p><strong>Uploaded:</strong> {new Date(report.uploadedAt).toLocaleString()}</p>
//         <p><strong>Cost:</strong> ₹{report.cost}</p>
//       </section>

//       <section>
//         <h4>💳 Payment & Report</h4>
//         <p><strong>Status:</strong> {paymentStatus}</p>
//         {paymentStatus === "Paid" && pdfUrl ? (
//           <button onClick={() => handleDownload(report.bookingId)}>Download PDF</button>
//         ) : (
//           <button onClick={() => handlePayment(report.bookingId, report.cost)}>
//             Pay ₹{report.cost}
//           </button>
//         )}
//       </section>
//     </div>
//   );
// };

// export default PatientLabReport;


















// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji");
// const BASE_URL = "http://localhost:5000";

// const PatientLabReport = () => {
//   const { patientId, reportId } = useParams();

//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState("Unpaid");
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/api/labs/patient/labReport/${reportId}`, {
//           withCredentials: true
//         });

//         setReport(res.data.report);
//         setPaymentStatus(res.data.report?.paymentStatus || "Unpaid");
//         setPdfUrl(res.data.report?.pdfUrl || null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch lab report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [patientId, reportId]);

//   const handlePayment = async (bookingId, cost) => {
//     try {
//       const stripe = await stripePromise;

//       const res = await axios.post(
//         `${BASE_URL}/api/lab/reports/${bookingId}/create-payment-intent`,
//         {},
//         { withCredentials: true }
//       );

//       const clientSecret = res.data.clientSecret;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: {
//             // Stripe Elements card integration needed
//           }
//         }
//       });

//       if (result.error) {
//         alert("Payment failed: " + result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         await axios.post(
//           `${BASE_URL}/api/lab/reports/${bookingId}/confirm-payment`,
//           { paymentIntentId: result.paymentIntent.id },
//           { withCredentials: true }
//         );

//         alert("Payment successful!");
//         setPaymentStatus("Paid");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment process failed.");
//     }
//   };

//   const handleDownload = async (bookingId) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/lab/reports/${bookingId}/download`, {
//         responseType: "blob",
//         withCredentials: true
//       });

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "lab-report.pdf";
//       a.click();
//     } catch (err) {
//       console.error("Download failed:", err);
//       alert("Unable to download report.");
//     }
//   };

//   if (loading) return <p>Loading report...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!report) return <p>No report found.</p>;

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial" }}>
//       <h2>Lab Report Details</h2>

//       <section style={{ marginBottom: "20px" }}>
//         <h4>🧍‍♂️ Patient Info</h4>
//         <p><strong>Name:</strong> {report.patient?.name}</p>
//         <p><strong>Gender:</strong> {report.patient?.gender}</p>
//         <p><strong>Age:</strong> {report.patient?.age}</p>
//         <p><strong>Email:</strong> {report.patient?.email}</p>
//         <p><strong>Contact:</strong> {report.patient?.contact?.type}</p>
//       </section>

//       <section style={{ marginBottom: "20px" }}>
//         <h4>🏥 Lab Info</h4>
//         <p><strong>Name:</strong> {report.lab?.name}</p>
//         <p><strong>Email:</strong> {report.lab?.email}</p>
//         <p><strong>Phone:</strong> {report.lab?.phone}</p>
//         <p><strong>Address:</strong> {report.lab?.address}</p>
//       </section>

//       <section style={{ marginBottom: "20px" }}>
//         <h4>🧪 Test Info</h4>
//         <p><strong>Test Name:</strong> {report.testName}</p>
//         <p><strong>Result:</strong> {report.result}</p>
//         <p><strong>Normal Range:</strong> {report.normalRange}</p>
//         <p><strong>Booking ID:</strong> {report.bookingId}</p>
//         <p><strong>Uploaded:</strong> {new Date(report.uploadedAt).toLocaleString()}</p>
//         <p><strong>Cost:</strong> ₹{report.cost}</p>
//       </section>

//       <section>
//         <h4>💳 Payment & Report</h4>
//         <p><strong>Status:</strong> {paymentStatus}</p>
//         {paymentStatus === "Paid" && pdfUrl ? (
//           <button onClick={() => handleDownload(report.bookingId)}>Download PDF</button>
//         ) : (
//           <button onClick={() => handlePayment(report.bookingId, report.cost)}>
//             Pay ₹{report.cost}
//           </button>
//         )}
//       </section>
//     </div>
//   );
// };

// export default PatientLabReport;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji");
// const BASE_URL = "http://localhost:5000";

// const PatientLabReport = () => {
//   const { patientId, reportId } = useParams();

//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState("Unpaid");
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [error, setError] = useState("");

//   // ✅ Get token from localStorage
//   const token = localStorage.getItem("patientToken");

//   // ✅ Reusable Axios headers with token
//   const axiosConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     },
//     withCredentials: true
//   };

//   // ✅ Fetch report by ID
//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/labs/patient/labReport/${reportId}`,
//           axiosConfig
//         );

//         setReport(res.data.report);
//         setPaymentStatus(res.data.report?.paymentStatus || "Unpaid");
//         setPdfUrl(res.data.report?.pdfUrl || null);
//       } catch (err) {
//         console.error(err);
//         setError("❌ Failed to fetch lab report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [reportId]);

//   // ✅ Handle payment
//   const handlePayment = async (bookingId, cost) => {
//     try {
//       const stripe = await stripePromise;

//       const res = await axios.post(
//         `${BASE_URL}/api/lab/reports/${bookingId}/create-payment-intent`,
//         {},
//         axiosConfig
//       );

//       const clientSecret = res.data.clientSecret;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: {
//             // ⚠️ You still need to implement Stripe Elements in the UI
//           }
//         }
//       });

//       if (result.error) {
//         alert("Payment failed: " + result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         await axios.post(
//           `${BASE_URL}/api/lab/reports/${bookingId}/confirm-payment`,
//           { paymentIntentId: result.paymentIntent.id },
//           axiosConfig
//         );

//         alert("✅ Payment successful!");
//         setPaymentStatus("Paid");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment process failed.");
//     }
//   };

//   // ✅ Handle report download
//   const handleDownload = async (bookingId) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/lab/reports/${bookingId}/download`,
//         {
//           ...axiosConfig,
//           responseType: "blob"
//         }
//       );

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "lab-report.pdf";
//       a.click();
//     } catch (err) {
//       console.error("Download failed:", err);
//       alert("Unable to download report.");
//     }
//   };

//   // ✅ UI Rendering
//   if (loading) return <p>Loading report...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!report) return <p>No report found.</p>;

//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial" }}>
//       <h2>🧾 Lab Report Details</h2>

//       {/* Patient Info */}
//       <section style={{ marginBottom: "20px", padding: "10px", background: "#f0f9ff", borderRadius: "8px" }}>
//         <h4>🧍 Patient Info</h4>
//         <p><strong>Name:</strong> {report.patient?.name || "N/A"}</p>
//         <p><strong>Gender:</strong> {report.patient?.gender || "N/A"}</p>
//         <p><strong>Age:</strong> {report.patient?.age || "N/A"}</p>
//         <p><strong>Email:</strong> {report.patient?.email || "N/A"}</p>
//         <p><strong>Contact:</strong> {report.patient?.contact?.phone || "N/A"}</p>
//       </section>

//       {/* Lab Info */}
//       <section style={{ marginBottom: "20px", padding: "10px", background: "#f3fff0", borderRadius: "8px" }}>
//         <h4>🏥 Lab Info</h4>
//         <p><strong>Name:</strong> {report.lab?.name || "N/A"}</p>
//         <p><strong>Email:</strong> {report.lab?.email || "N/A"}</p>
//         <p><strong>Phone:</strong> {report.lab?.phone || "N/A"}</p>
//         <p><strong>Address:</strong> {report.lab?.address || "N/A"}</p>
//       </section>

//       {/* Test Info */}
//       <section style={{ marginBottom: "20px", padding: "10px", background: "#fff9f3", borderRadius: "8px" }}>
//         <h4>🧪 Test Info</h4>
//         <p><strong>Test Name:</strong> {report.testName}</p>
//         <p><strong>Result:</strong> {report.result}</p>
//         <p><strong>Normal Range:</strong> {report.normalRange}</p>
//         <p><strong>Booking ID:</strong> {report.bookingId}</p>
//         <p><strong>Uploaded:</strong> {new Date(report.createdAt).toLocaleString()}</p>
//         <p><strong>Cost:</strong> ₹{report.cost}</p>
//       </section>

//       {/* Payment + Download */}
//       <section style={{ padding: "10px", background: "#f5f5f5", borderRadius: "8px" }}>
//         <h4>💳 Payment & Report</h4>
//         <p><strong>Status:</strong> {paymentStatus}</p>
//         {paymentStatus === "Paid" && pdfUrl ? (
//           <button
//             onClick={() => handleDownload(report.bookingId)}
//             style={{ padding: "10px 20px", marginTop: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "5px" }}
//           >
//             Download PDF
//           </button>
//         ) : (
//           <button
//             onClick={() => handlePayment(report.bookingId, report.cost)}
//             style={{ padding: "10px 20px", marginTop: "10px", background: "#10b981", color: "white", border: "none", borderRadius: "5px" }}
//           >
//             Pay ₹{report.cost}
//           </button>
//         )}
//       </section>
//     </div>
//   );
// };











// // export default PatientLabReport;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji");
// const BASE_URL = "http://localhost:5000";

// // ✅ Stripe Payment Form Component
// const StripePaymentForm = ({ bookingId, cost, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const token = localStorage.getItem("patientToken");

//   const axiosConfig = {
//     headers: { Authorization: `Bearer ${token}` },
//     withCredentials: true,
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     try {
//       // 1. Create payment intent
//       const res = await axios.post(
//         `${BASE_URL}/api/labs/reports/${bookingId}/create-payment-intent`,
//         {},
//         axiosConfig
//       );

//       const clientSecret = res.data.clientSecret;

//       // 2. Confirm payment with card element
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         alert("❌ Payment failed: " + result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         // 3. Confirm payment in backend
//         await axios.post(
//           `${BASE_URL}/api/labs/reports/${bookingId}/confirm-payment`,
//           { paymentIntentId: result.paymentIntent.id },
//           axiosConfig
//         );

//         alert("✅ Payment successful!");
//         onPaymentSuccess();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment process failed.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement options={{ hidePostalCode: true }} />
//       <button
//         type="submit"
//         disabled={!stripe}
//         style={{
//           marginTop: "10px",
//           padding: "10px 20px",
//           background: "#10b981",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         Pay ₹{cost}
//       </button>
//     </form>
//   );
// };

// const PatientLabReport = () => {
//   const { reportId } = useParams();

//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState("Unpaid");
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [error, setError] = useState("");

//   const patientId = localStorage.getItem("patientId");
//   const token = localStorage.getItem("patientToken");

//   const axiosConfig = {
//     headers: { Authorization: `Bearer ${token}` },
//     withCredentials: true,
//   };

//   useEffect(() => {
//     if (!patientId) {
//       setError("❌ Patient ID not found. Please login again.");
//       setLoading(false);
//       return;
//     }

//     const fetchReport = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/labs/patient/labReport/${reportId}`,
//           axiosConfig
//         );

//         setReport(res.data.report);
//         setPaymentStatus(res.data.report?.paymentStatus || "Unpaid");
//         setPdfUrl(res.data.report?.pdfUrl || null);
//       } catch (err) {
//         console.error(err);
//         setError("❌ Failed to fetch lab report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [reportId, patientId]);

//   const handleDownload = async (bookingId) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/labs/reports/${bookingId}/download`,
//         {
//           ...axiosConfig,
//           responseType: "blob",
//         }
//       );

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "lab-report.pdf";
//       a.click();
//     } catch (err) {
//       console.error("Download failed:", err);
//       alert("Unable to download report.");
//     }
//   };

//   if (loading) return <p>Loading report...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!report) return <p>No report found.</p>;

//   return (
//     <div
//       style={{
//         padding: "20px",
//         maxWidth: "800px",
//         margin: "auto",
//         fontFamily: "Arial",
//       }}
//     >
//       <h2>🧾 Lab Report Details</h2>

//       {/* Patient Info */}
//       <section
//         style={{
//           marginBottom: "20px",
//           padding: "10px",
//           background: "#f0f9ff",
//           borderRadius: "8px",
//         }}
//       >
//         <h4>🧍 Patient Info</h4>
//         <p><strong>Name:</strong> {report.patient?.name || "N/A"}</p>
//         <p><strong>Gender:</strong> {report.patient?.gender || "N/A"}</p>
//         <p><strong>Age:</strong> {report.patient?.age || "N/A"}</p>
//         <p><strong>Email:</strong> {report.patient?.email || "N/A"}</p>
//         <p><strong>Contact:</strong> {report.patient?.contact?.phone || "N/A"}</p>
//       </section>

//       {/* Lab Info */}
//       <section
//         style={{
//           marginBottom: "20px",
//           padding: "10px",
//           background: "#f3fff0",
//           borderRadius: "8px",
//         }}
//       >
//         <h4>🏥 Lab Info</h4>
//         <p><strong>Name:</strong> {report.lab?.name || "N/A"}</p>
//         <p><strong>Email:</strong> {report.lab?.email || "N/A"}</p>
//         <p><strong>Phone:</strong> {report.lab?.phone || "N/A"}</p>
//         <p><strong>Address:</strong> {report.lab?.address || "N/A"}</p>
//       </section>

//       {/* Test Info */}
//       <section
//         style={{
//           marginBottom: "20px",
//           padding: "10px",
//           background: "#fff9f3",
//           borderRadius: "8px",
//         }}
//       >
//         <h4>🧪 Test Info</h4>
//         <p><strong>Test Name:</strong> {report.testName}</p>
//         <p><strong>Result:</strong> {report.result}</p>
//         <p><strong>Normal Range:</strong> {report.normalRange}</p>
//         <p><strong>Booking ID:</strong> {report.bookingId}</p>
//         <p><strong>Uploaded:</strong> {new Date(report.createdAt).toLocaleString()}</p>
//         <p><strong>Cost:</strong> ₹{report.cost}</p>
//       </section>

//       {/* Payment Section */}
//       <section
//         style={{
//           padding: "10px",
//           background: "#f5f5f5",
//           borderRadius: "8px",
//         }}
//       >
//         <h4>💳 Payment & Report</h4>
//         <p><strong>Status:</strong> {paymentStatus}</p>

//         {paymentStatus === "Paid" && pdfUrl ? (
//           <button
//             onClick={() => handleDownload(report.bookingId)}
//             style={{
//               padding: "10px 20px",
//               marginTop: "10px",
//               background: "#0070f3",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Download PDF
//           </button>
//         ) : (
//           <Elements stripe={stripePromise}>
//             <StripePaymentForm
//               bookingId={report.bookingId}
//               cost={report.cost}
//               onPaymentSuccess={() => setPaymentStatus("Paid")}
//             />
//           </Elements>
//         )}
//       </section>
//     </div>
//   );
// };

// export default PatientLabReport;




















// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// // Stripe public key
// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji");

// // Backend base URL
// const BASE_URL = "http://localhost:5000";

// // 🔹 Stripe Payment Form
// const StripePaymentForm = ({ reportId, cost, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const token = localStorage.getItem("patientToken");

//   const axiosConfig = {
//     headers: { Authorization: `Bearer ${token}` },
//     withCredentials: true,
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) return;

//     try {
//       // 1. Create PaymentIntent
//       const res = await axios.post(
//         `${BASE_URL}/api/labs/reports/${reportId}/create-payment-intent`,
//         {},
//         axiosConfig
//       );

//       const clientSecret = res.data.clientSecret;
// console.log('clientSecret',clientSecret);

//       // 2. Confirm Payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         alert("❌ Payment failed: " + result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         // 3. Notify backend
//         await axios.post(
//           `${BASE_URL}/api/labs/reports/${reportId}/confirm-payment`,
//           { paymentIntentId: result.paymentIntent.id },
//           axiosConfig
//         );

//         alert("✅ Payment successful!");
//         onPaymentSuccess();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment processing failed.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement options={{ hidePostalCode: true }} />
//       <button
//         type="submit"
//         disabled={!stripe}
//         style={{
//           marginTop: "10px",
//           padding: "10px 20px",
//           background: "#10b981",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         Pay ₹{cost}
//       </button>
//     </form>
//   );
// };

// // 🔹 Main Component
// const PatientLabReport = () => {
//   const { reportId } = useParams();

//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState("Unpaid");
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("patientToken");
//   const patientId = localStorage.getItem("patientId");

//   const axiosConfig = {
//     headers: { Authorization: `Bearer ${token}` },
//     withCredentials: true,
//   };

//   useEffect(() => {
//     if (!patientId) {
//       setError("❌ Patient ID not found. Please login again.");
//       setLoading(false);
//       return;
//     }

//     const fetchReport = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/labs/patient/labReport/${reportId}`,
//           axiosConfig
//         );

//         const reportData = res.data.report;
//         setReport(reportData);
//         setPaymentStatus(reportData?.paymentStatus || "Unpaid");
//         setPdfUrl(reportData?.pdfUrl || null);
//       } catch (err) {
//         console.error(err);
//         setError("❌ Failed to fetch lab report");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [reportId, patientId]);

//   const handleDownload = async () => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/labs/reports/${reportId}/download`,
//         {
//           ...axiosConfig,
//           responseType: "blob",
//         }
//       );

//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "lab-report.pdf";
//       a.click();
//     } catch (err) {
//       console.error("Download failed:", err);
//       alert("Unable to download report.");
//     }
//   };

//   if (loading) return <p>Loading report...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!report) return <p>No report found.</p>;

//   return (
//     <div
//       style={{
//         padding: "20px",
//         maxWidth: "800px",
//         margin: "auto",
//         fontFamily: "Arial",
//       }}
//     >
//       <h2>🧾 Lab Report Details</h2>

//       {/* Patient Info */}
//       <section style={sectionStyle("#f0f9ff")}>
//         <h4>🧍 Patient Info</h4>
//         <p><strong>Name:</strong> {report.patient?.name || "N/A"}</p>
//         <p><strong>Gender:</strong> {report.patient?.gender || "N/A"}</p>
//         <p><strong>Age:</strong> {report.patient?.age || "N/A"}</p>
//         <p><strong>Email:</strong> {report.patient?.email || "N/A"}</p>
//         <p><strong>Contact:</strong> {report.patient?.contact?.phone || "N/A"}</p>
//       </section>

//       {/* Lab Info */}
//       <section style={sectionStyle("#f3fff0")}>
//         <h4>🏥 Lab Info</h4>
//         <p><strong>Name:</strong> {report.lab?.name || "N/A"}</p>
//         <p><strong>Email:</strong> {report.lab?.email || "N/A"}</p>
//         <p><strong>Phone:</strong> {report.lab?.phone || "N/A"}</p>
//         <p><strong>Address:</strong> {report.lab?.address || "N/A"}</p>
//       </section>

//       {/* Test Info */}
//       <section style={sectionStyle("#fff9f3")}>
//         <h4>🧪 Test Info</h4>
//         <p><strong>Test Name:</strong> {report.testName}</p>
//         <p><strong>Result:</strong> {report.result}</p>
//         <p><strong>Normal Range:</strong> {report.normalRange}</p>
//         <p><strong>Uploaded:</strong> {new Date(report.createdAt).toLocaleString()}</p>
//         <p><strong>Cost:</strong> ₹{report.cost}</p>
//       </section>

//       {/* Payment Section */}
//       <section style={sectionStyle("#f5f5f5")}>
//         <h4>💳 Payment & Report</h4>
//         <p><strong>Status:</strong> {paymentStatus}</p>

//         {paymentStatus === "Paid" && pdfUrl ? (
//           <button
//             onClick={handleDownload}
//             style={buttonStyle("#0070f3")}
//           >
//             📄 Download PDF
//           </button>
//         ) : (
//           <Elements stripe={stripePromise}>
//             <StripePaymentForm
//               reportId={report._id}
//               cost={report.cost}
//               onPaymentSuccess={() => setPaymentStatus("Paid")}
//             />
//           </Elements>
//         )}
//       </section>
//     </div>
//   );
// };

// // 🔹 Reusable Styles
// const sectionStyle = (bgColor) => ({
//   marginBottom: "20px",
//   padding: "10px",
//   background: bgColor,
//   borderRadius: "8px",
// });

// const buttonStyle = (bg) => ({
//   padding: "10px 20px",
//   marginTop: "10px",
//   background: bg,
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
// });

// export default PatientLabReport;
