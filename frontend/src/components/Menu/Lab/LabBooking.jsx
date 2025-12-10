// // 






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const LabBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [previewConsultationId, setPreviewConsultationId] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("labToken");
//         const res = await axios.get("http://localhost:5000/api/labs/bookings/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//         toast.error("Failed to load bookings");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleDownloadPrescription = (consultationId) => {
//     const token = localStorage.getItem("labToken");
//     axios({
//       url: `http://localhost:5000/api/labs/prescription/${consultationId}`,
//       method: "GET",
//       responseType: "blob",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => {
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `prescription-${consultationId}.pdf`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       })
//       .catch((err) => {
//         console.error("Download error:", err);
//         toast.error("Failed to download prescription");
//       });
//   };

//   const handlePreviewPrescription = (consultationId) => {
//     const token = localStorage.getItem("labToken");

//     axios({
//       url: `http://localhost:5000/api/labs/prescription/${consultationId}`,
//       method: "GET",
//       responseType: "blob",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => {
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);
//         setPreviewUrl(url);
//         setPreviewConsultationId(consultationId);
//         setShowPreview(true);
//       })
//       .catch((err) => {
//         console.error("Preview error:", err);
//         toast.error("Failed to load preview");
//       });
//   };

//   const handleClosePreview = () => {
//     setShowPreview(false);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//       setPreviewConsultationId(null);
//     }
//   };

//   if (loading) {
//     return <p>Loading bookings...</p>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl mb-4">Lab Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         bookings.map((b) => (
//           <div key={b._id} className="border p-4 rounded shadow mb-4 bg-white">
//             <p>
//               <strong>Booking ID:</strong> {b._id}
//             </p>
//             <p>
//               <strong>Patient:</strong> {b.patient?.name} ({b.patient?.email})
//             </p>
//             <p>
//               <strong>Status:</strong> {b.status}
//             </p>
//             {b.consultation && (
//               <div className="mt-2">
//                 <p>
//                   <strong>Diagnosis:</strong> {b.consultation.diagnosis?.primary || "-"}
//                 </p>
//                 <p>
//                   <strong>Doctor Notes:</strong> {b.consultation.doctorNotes || "-"}
//                 </p>
//                 <p>
//                   <strong>Tests Advised:</strong>{" "}
//                   {b.consultation.testsAdvised?.map((t) => t.name).join(", ") || "-"}
//                 </p>
//               </div>
//             )}
//             <div className="mt-3 space-x-2">
//               {b.consultation?._id && (
//                 <>
//                   <button
//                     onClick={() => handleDownloadPrescription(b.consultation._id)}
//                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     Download PDF
//                   </button>
//                   <button
//                     onClick={() => handlePreviewPrescription(b.consultation._id)}
//                     className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
//                   >
//                     Preview PDF
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))
//       )}

//       {showPreview && previewUrl && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//           <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative">
//             <h3 className="text-lg font-semibold mb-2">Prescription Preview</h3>
//             <iframe
//               src={previewUrl}
//               title="Prescription Preview"
//               width="100%"
//               height="500px"
//               className="border rounded"
//             />
//             <div className="mt-4 flex justify-between items-center">
//               <button
//                 onClick={() => {
//                   const a = document.createElement("a");
//                   a.href = previewUrl;
//                   a.download = `prescription-${previewConsultationId}.pdf`;
//                   a.click();
//                 }}
//                 className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={handleClosePreview}
//                 className="text-red-600 hover:underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabBookings;

















// finalone

// LabBookings.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const fetchPrescriptions = async (consultationId) => {
//   const token = localStorage.getItem("labToken");

//   const res = await axios.get(
//     `http://localhost:5000/api/labs/consultation/${consultationId}/prescriptions`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return res.data;
// };

// const LabBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewConsultationId, setPreviewConsultationId] = useState(null);

//   const [prescriptionsData, setPrescriptionsData] = useState(null);
//   const [prescriptionLoading, setPrescriptionLoading] = useState(false);
//   const [expandedConsultationId, setExpandedConsultationId] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("labToken");
//         const res = await axios.get("http://localhost:5000/api/labs/bookings/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data);
//       } catch (error) {
//         toast.error("Failed to load bookings");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleDownloadPrescription = async (consultationId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/prescription/${consultationId}`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `prescription-${consultationId}.pdf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       toast.error("Failed to download prescription");
//       console.error(error);
//     }
//   };

//   const handlePreviewPrescription = async (consultationId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/prescription/${consultationId}`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       setPreviewUrl(url);
//       setPreviewConsultationId(consultationId);
//       setShowPreview(true);
//     } catch (error) {
//       toast.error("Failed to preview prescription");
//       console.error(error);
//     }
//   };

//   const handleClosePreview = () => {
//     setShowPreview(false);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//       setPreviewConsultationId(null);
//     }
//   };

//   const handleFetchPrescriptions = async (consultationId) => {
//     setPrescriptionLoading(true);
//     setPrescriptionsData(null);
//     try {
//       const data = await fetchPrescriptions(consultationId);
//       setPrescriptionsData({ ...data, consultationId });
//       setExpandedConsultationId(consultationId);
//     } catch (error) {
//       toast.error("Failed to fetch prescriptions");
//     } finally {
//       setPrescriptionLoading(false);
//     }
//   };

//   if (loading) return <p>Loading bookings...</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Lab Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         bookings.map((b) => (
//           <div key={b._id} className="border p-5 rounded mb-6 shadow">
//             <p><strong>Booking ID:</strong> {b._id}</p>
//             <p><strong>Patient:</strong> {b.patient?.name} ({b.patient?.email})</p>
//             <p><strong>Status:</strong> {b.status}</p>

//             {b.consultation && (
//               <div className="mt-3">
//                 <p><strong>Diagnosis:</strong> {b.consultation.diagnosis?.primary || "-"}</p>
//                 <p><strong>Doctor Notes:</strong> {b.consultation.doctorNotes || "-"}</p>
//                 <p><strong>Tests Advised:</strong>{" "}
//                   {b.consultation.testsAdvised?.map((t) => t.name).join(", ") || "-"}
//                 </p>
//               </div>
//             )}

//             <div className="mt-4 space-x-2">
//               <button
//                 onClick={() => handleDownloadPrescription(b.consultation._id)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Download PDF
//               </button>
//               <button
//                 onClick={() => handlePreviewPrescription(b.consultation._id)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//               >
//                 Preview PDF
//               </button>
//               <button
//                 onClick={() => handleFetchPrescriptions(b.consultation._id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 disabled={prescriptionLoading}
//               >
//                 {prescriptionLoading ? "Loading..." : "View Prescriptions"}
//               </button>
//             </div>

//             {prescriptionsData &&
//               prescriptionsData.consultationId === b.consultation._id &&
//               expandedConsultationId === b.consultation._id && (
//                 <div className="mt-4 bg-gray-50 border rounded p-4">
//                   <h4 className="font-semibold mb-3">Prescriptions</h4>
//                   {prescriptionsData.prescriptions.length === 0 ? (
//                     <p>No prescriptions found.</p>
//                   ) : (
//                     <ul className="list-disc list-inside space-y-2">
//                       {prescriptionsData.prescriptions.map((p, idx) => (
//                         <li key={idx}>
//                           <strong>{p.medicine}</strong> — {p.dosage}, {p.frequency}, {p.duration}
//                           <br />
//                           Instructions: {p.instructions || "None"}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//           </div>
//         ))
//       )}

//       {/* PDF Preview Modal */}
//       {showPreview && previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg relative">
//             <h3 className="text-xl font-bold mb-4">Prescription Preview</h3>
//             <iframe
//               src={previewUrl}
//               title="Prescription"
//               width="100%"
//               height="500px"
//               className="border rounded"
//             ></iframe>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => {
//                   const a = document.createElement("a");
//                   a.href = previewUrl;
//                   a.download = `prescription-${previewConsultationId}.pdf`;
//                   a.click();
//                 }}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={handleClosePreview}
//                 className="text-red-600 underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabBookings;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const fetchPrescriptionsByBookingId = async (bookingId) => {
//   const token = localStorage.getItem("labToken");

//   const res = await axios.get(
//     `http://localhost:5000/api/labs/bookings/${bookingId}/details`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   return res.data;
// };

// const LabBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [prescriptionLoading, setPrescriptionLoading] = useState(false);
//   const [prescriptionsData, setPrescriptionsData] = useState(null);
//   const [expandedBookingId, setExpandedBookingId] = useState(null);

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewBookingId, setPreviewBookingId] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("labToken");
//         const res = await axios.get("http://localhost:5000/api/labs/bookings/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data);
//       } catch (error) {
//         toast.error("Failed to load bookings");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleDownloadPrescription = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `prescription-${bookingId}.pdf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       toast.error("Failed to download prescription");
//       console.error(error);
//     }
//   };

//   const handlePreviewPrescription = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       setPreviewUrl(url);
//       setPreviewBookingId(bookingId);
//       setShowPreview(true);
//     } catch (error) {
//       toast.error("Failed to preview prescription");
//       console.error(error);
//     }
//   };

//   const handleClosePreview = () => {
//     setShowPreview(false);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//       setPreviewBookingId(null);
//     }
//   };

//   const handleFetchPrescriptions = async (bookingId) => {
//     setPrescriptionLoading(true);
//     setPrescriptionsData(null);
//     try {
//       const data = await fetchPrescriptionsByBookingId(bookingId);

//       const prescriptions =
//         data.consultation?.prescriptions ?? data.prescription ?? [];

//       setPrescriptionsData({
//         bookingId,
//         prescriptions: Array.isArray(prescriptions) ? prescriptions : [],
//       });

//       setExpandedBookingId(bookingId);
//     } catch (error) {
//       toast.error("Failed to fetch prescriptions");
//       console.error(error);
//     } finally {
//       setPrescriptionLoading(false);
//     }
//   };

//   if (loading) return <p className="p-4">Loading bookings...</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Lab Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         bookings.map((b) => (
//           <div key={b._id} className="border p-5 rounded mb-6 shadow">
//             <p><strong>Booking ID:</strong> {b._id}</p>
//             <p><strong>Patient:</strong> {b.patient?.name} ({b.patient?.email})</p>
//             <p><strong>Status:</strong> {b.status}</p>

//             {b.consultation && (
//               <div className="mt-3">
//                 <p><strong>Diagnosis:</strong> {b.consultation.diagnosis?.primary || "-"}</p>
//                 <p><strong>Doctor Notes:</strong> {b.consultation.doctorNotes || "-"}</p>
//                 <p><strong>Tests Advised:</strong>{" "}
//                   {Array.isArray(b.consultation.testsAdvised)
//                     ? b.consultation.testsAdvised.map((t) => t.name).join(", ")
//                     : "-"}
//                 </p>
//               </div>
//             )}

//             <div className="mt-4 space-x-2">
//               <button
//                 onClick={() => handleDownloadPrescription(b._id)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Download PDF
//               </button>

//               <button
//                 onClick={() => handlePreviewPrescription(b._id)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//               >
//                 Preview PDF
//               </button>

//               <button
//                 onClick={() => handleFetchPrescriptions(b._id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 disabled={prescriptionLoading}
//               >
//                 {prescriptionLoading ? "Loading..." : "View Prescriptions"}
//               </button>
//             </div>

//             {/* Prescriptions List */}
//             {prescriptionsData &&
//               prescriptionsData.bookingId === b._id &&
//               expandedBookingId === b._id && (
//                 <div className="mt-4 bg-gray-50 border rounded p-4">
//                   <h4 className="font-semibold mb-3">Prescriptions</h4>
//                   {!prescriptionsData.prescriptions ||
//                   prescriptionsData.prescriptions.length === 0 ? (
//                     <p>No prescriptions found.</p>
//                   ) : (
//                     <ul className="list-disc list-inside space-y-2">
//                       {prescriptionsData.prescriptions.map((p, idx) => (
//                         <li key={idx}>
//                           <strong>{p.medicine}</strong> — {p.dosage}, {p.frequency}, {p.duration}
//                           <br />
//                           Instructions: {p.instructions || "None"}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//           </div>
//         ))
//       )}

//       {/* PDF Preview Modal */}
//       {showPreview && previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg relative">
//             <h3 className="text-xl font-bold mb-4">Prescription Preview</h3>
//             <iframe
//               src={previewUrl}
//               title="Prescription"
//               width="100%"
//               height="500px"
//               className="border rounded"
//             ></iframe>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => {
//                   const a = document.createElement("a");
//                   a.href = previewUrl;
//                   a.download = `prescription-${previewBookingId}.pdf`;
//                   a.click();
//                 }}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={handleClosePreview}
//                 className="text-red-600 underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabBookings;
// lasstt

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const fetchPrescriptionsByBookingId = async (bookingId) => {
//   const token = localStorage.getItem("labToken");

//   const res = await axios.get(
//     `http://localhost:5000/api/labs/bookings/${bookingId}/details`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   return res.data;
// };

// const LabBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [prescriptionLoading, setPrescriptionLoading] = useState(false);
//   const [prescriptionsData, setPrescriptionsData] = useState(null);
//   const [expandedBookingId, setExpandedBookingId] = useState(null);

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewBookingId, setPreviewBookingId] = useState(null);

//   const [generatedReports, setGeneratedReports] = useState({});

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("labToken");
//         const res = await axios.get("http://localhost:5000/api/labs/bookings/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data);
//       } catch (error) {
//         toast.error("Failed to load bookings");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleDownloadPrescription = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `prescription-${bookingId}.pdf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       toast.error("Failed to download prescription");
//       console.error(error);
//     }
//   };

//   const handlePreviewPrescription = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       setPreviewUrl(url);
//       setPreviewBookingId(bookingId);
//       setShowPreview(true);
//     } catch (error) {
//       toast.error("Failed to preview prescription");
//       console.error(error);
//     }
//   };

//   const handleClosePreview = () => {
//     setShowPreview(false);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//       setPreviewBookingId(null);
//     }
//   };

//   const handleFetchPrescriptions = async (bookingId) => {
//     setPrescriptionLoading(true);
//     setPrescriptionsData(null);
//     try {
//       const data = await fetchPrescriptionsByBookingId(bookingId);

//       let prescriptions = data.consultation?.prescriptions;
//       if (!Array.isArray(prescriptions) || prescriptions.length === 0) {
//         prescriptions = data.prescription;
//       }

//       setPrescriptionsData({
//         bookingId,
//         prescriptions: Array.isArray(prescriptions) ? prescriptions : [],
//       });

//       setExpandedBookingId(bookingId);
//     } catch (error) {
//       toast.error("Failed to fetch prescriptions");
//       console.error(error);
//     } finally {
//       setPrescriptionLoading(false);
//     }
//   };

//   const handleGenerateReport = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/${bookingId}/generate-report`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Report generated!");

//       setGeneratedReports((prev) => ({
//         ...prev,
//         [bookingId]: res.data.reports || [],
//       }));
//     } catch (error) {
//       toast.error("Failed to generate report");
//       console.error(error);
//     }
//   };

//   if (loading) return <p className="p-4">Loading bookings...</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Lab Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         bookings.map((b) => (
//           <div key={b._id} className="border p-5 rounded mb-6 shadow">
//             <p><strong>Booking ID:</strong> {b._id}</p>
//             <p><strong>Lab Name:</strong> {b.lab?.name || "N/A"}</p>
//             <p><strong>Patient:</strong> {b.patient?.name} ({b.patient?.email})</p>
//             <p><strong>Status:</strong> {b.status}</p>

//             {b.consultation && (
//               <div className="mt-3">
//                 <p><strong>Diagnosis:</strong> {b.consultation.diagnosis?.primary || "-"}</p>
//                 <p><strong>Doctor Notes:</strong> {b.consultation.doctorNotes || "-"}</p>
//                 <p><strong>Tests Advised:</strong>{" "}
//                   {Array.isArray(b.consultation.testsAdvised)
//                     ? b.consultation.testsAdvised.map((t) => t.name).join(", ")
//                     : "-"}
//                 </p>
//               </div>
//             )}

//             <div className="mt-4 space-x-2">
//               <button
//                 onClick={() => handleDownloadPrescription(b._id)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Download PDF
//               </button>

//               <button
//                 onClick={() => handlePreviewPrescription(b._id)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//               >
//                 Preview PDF
//               </button>

//               <button
//                 onClick={() => handleFetchPrescriptions(b._id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 disabled={prescriptionLoading}
//               >
//                 {prescriptionLoading && expandedBookingId === b._id
//                   ? "Loading..."
//                   : "View Prescriptions"}
//               </button>

//               {/* <button
//                 onClick={() => handleGenerateReport(b._id)}
//                 className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//               >
//                 Generate Test Report
//               </button> 
              
              
              
//               */}

//               <button
//   onClick={() => navigate(`/LabtestReport?bookingId=${b._id}`)}
//   className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
// >
//   Generate Test Report
// </button>

//             </div>

//             {/* Prescription List */}
//             {prescriptionsData &&
//               prescriptionsData.bookingId === b._id &&
//               expandedBookingId === b._id && (
//                 <div className="mt-4 bg-gray-50 border rounded p-4">
//                   <h4 className="font-semibold mb-3">Prescriptions</h4>
//                   {!prescriptionsData.prescriptions ||
//                   prescriptionsData.prescriptions.length === 0 ? (
//                     <p>No prescriptions found.</p>
//                   ) : (
//                     <ul className="list-disc list-inside space-y-2">
//                       {prescriptionsData.prescriptions.map((p, idx) => (
//                         <li key={idx}>
//                           <strong>Medicine:</strong> {p.medicine}<br />
//                           <strong>Dosage:</strong> {p.dosage}<br />
//                           <strong>Frequency:</strong> {p.frequency}<br />
//                           <strong>Duration:</strong> {p.duration}<br />
//                           <strong>Instructions:</strong> {p.instructions || "None"}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}

//             {/* Test Report Display */}
//             {generatedReports[b._id] && generatedReports[b._id].length > 0 && (
//               <div className="mt-4 bg-white border rounded p-4">
//                 <h4 className="font-semibold mb-3">Generated Lab Test Report</h4>
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="border px-4 py-2">Test Name</th>
//                       <th className="border px-4 py-2">Result</th>
//                       <th className="border px-4 py-2">Normal Range</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {generatedReports[b._id].map((report, idx) => (
//                       <tr key={idx}>
//                         <td className="border px-4 py-2">{report.testName}</td>
//                         <td className="border px-4 py-2">{report.result}</td>
//                         <td className="border px-4 py-2">{report.normalRange}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         ))
//       )}

//       {/* PDF Preview Modal */}
//       {showPreview && previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg relative">
//             <h3 className="text-xl font-bold mb-4">Prescription Preview</h3>
//             <iframe
//               src={previewUrl}
//               title="Prescription"
//               width="100%"
//               height="500px"
//               className="border rounded"
//             ></iframe>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => {
//                   const a = document.createElement("a");
//                   a.href = previewUrl;
//                   a.download = `prescription-${previewBookingId}.pdf`;
//                   a.click();
//                 }}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={handleClosePreview}
//                 className="text-red-600 underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabBookings;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const fetchPrescriptionsByBookingId = async (bookingId) => {
//   const token = localStorage.getItem("labToken");

//   const res = await axios.get(
//     `http://localhost:5000/api/labs/bookings/${bookingId}/details`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   );

//   return res.data;
// };

// const LabBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [prescriptionLoading, setPrescriptionLoading] = useState(false);
//   const [prescriptionsData, setPrescriptionsData] = useState(null);
//   const [expandedBookingId, setExpandedBookingId] = useState(null);

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewBookingId, setPreviewBookingId] = useState(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("labToken");
//         const res = await axios.get("http://localhost:5000/api/labs/bookings/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data);
//       } catch (error) {
//         toast.error("Failed to load bookings");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   const handleDownloadPrescription = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `prescription-${bookingId}.pdf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       toast.error("Failed to download prescription");
//       console.error(error);
//     }
//   };

//   const handlePreviewPrescription = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("labToken");
//       const response = await axios.get(
//         `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       setPreviewUrl(url);
//       setPreviewBookingId(bookingId);
//       setShowPreview(true);
//     } catch (error) {
//       toast.error("Failed to preview prescription");
//       console.error(error);
//     }
//   };

//   const handleClosePreview = () => {
//     setShowPreview(false);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//       setPreviewBookingId(null);
//     }
//   };

//   const handleFetchPrescriptions = async (bookingId) => {
//     setPrescriptionLoading(true);
//     setPrescriptionsData(null);
//     try {
//       const data = await fetchPrescriptionsByBookingId(bookingId);

//       // Prioritize prescriptions inside consultation, fallback to booking.prescription
//       let prescriptions = data.consultation?.prescriptions;
//       if (!Array.isArray(prescriptions) || prescriptions.length === 0) {
//         prescriptions = data.prescription;
//       }

//       setPrescriptionsData({
//         bookingId,
//         prescriptions: Array.isArray(prescriptions) ? prescriptions : [],
//       });

//       setExpandedBookingId(bookingId);
//     } catch (error) {
//       toast.error("Failed to fetch prescriptions");
//       console.error(error);
//     } finally {
//       setPrescriptionLoading(false);
//     }
//   };

//   if (loading) return <p className="p-4">Loading bookings...</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Lab Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         bookings.map((b) => (
//           <div key={b._id} className="border p-5 rounded mb-6 shadow">
//             <p><strong>Booking ID:</strong> {b._id}</p>
//             <p><strong>Lab Name:</strong> {b.lab?.name || "N/A"}</p>

//             <p><strong>Patient:</strong> {b.patient?.name} ({b.patient?.email})</p>
//             <p><strong>Status:</strong> {b.status}</p>

//             {b.consultation && (
//               <div className="mt-3">
//                 <p><strong>Diagnosis:</strong> {b.consultation.diagnosis?.primary || "-"}</p>
//                 <p><strong>Doctor Notes:</strong> {b.consultation.doctorNotes || "-"}</p>
//                 <p><strong>Tests Advised:</strong>{" "}
//                   {Array.isArray(b.consultation.testsAdvised)
//                     ? b.consultation.testsAdvised.map((t) => t.name).join(", ")
//                     : "-"}
//                 </p>
//               </div>
//             )}

//             <div className="mt-4 space-x-2">
//               <button
//                 onClick={() => handleDownloadPrescription(b._id)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Download PDF
//               </button>

//               <button
//                 onClick={() => handlePreviewPrescription(b._id)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//               >
//                 Preview PDF
//               </button>

//               <button
//                 onClick={() => handleFetchPrescriptions(b._id)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 disabled={prescriptionLoading}
//               >
//                 {prescriptionLoading && expandedBookingId === b._id
//                   ? "Loading..."
//                   : "View Prescriptions"}
//               </button>
//             </div>

//             {/* Prescriptions List */}
//             {prescriptionsData &&
//               prescriptionsData.bookingId === b._id &&
//               expandedBookingId === b._id && (
//                 <div className="mt-4 bg-gray-50 border rounded p-4">
//                   <h4 className="font-semibold mb-3">Prescriptions</h4>
//                   {!prescriptionsData.prescriptions ||
//                   prescriptionsData.prescriptions.length === 0 ? (
//                     <p>No prescriptions found.</p>
//                   ) : (
//                     <ul className="list-disc list-inside space-y-2">
//                       {prescriptionsData.prescriptions.map((p, idx) => (
//                         <li key={idx}>
//                           <strong>Medicine:</strong> {p.medicine}<br />
//                           <strong>Dosage:</strong> {p.dosage}<br />
//                           <strong>Frequency:</strong> {p.frequency}<br />
//                           <strong>Duration:</strong> {p.duration}<br />
//                           <strong>Instructions:</strong> {p.instructions || "None"}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//           </div>
//         ))
//       )}

//       {/* PDF Preview Modal */}
//       {showPreview && previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg relative">
//             <h3 className="text-xl font-bold mb-4">Prescription Preview</h3>
//             <iframe
//               src={previewUrl}
//               title="Prescription"
//               width="100%"
//               height="500px"
//               className="border rounded"
//             ></iframe>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => {
//                   const a = document.createElement("a");
//                   a.href = previewUrl;
//                   a.download = `prescription-${previewBookingId}.pdf`;
//                   a.click();
//                 }}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={handleClosePreview}
//                 className="text-red-600 underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabBookings;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/labs",
// });

// // Attach Authorization header to every request automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("labToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// const LabBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [error, setError] = useState(null);

//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [detailsError, setDetailsError] = useState(null);

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);

//   // Fetch all bookings on mount
//   useEffect(() => {
//     async function fetchBookings() {
//       try {
//         setLoadingBookings(true);
//         const res = await api.get("/bookings/my");
//         setBookings(res.data);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load bookings");
//         toast.error("Failed to load bookings");
//       } finally {
//         setLoadingBookings(false);
//       }
//     }
//     fetchBookings();
//   }, []);

//   // Fetch details when a booking is selected
//   useEffect(() => {
//     if (!selectedBookingId) {
//       setBookingDetails(null);
//       return;
//     }

//     async function fetchBookingDetails() {
//       try {
//         setLoadingDetails(true);
//         setDetailsError(null);
//         const res = await api.get(`/bookings/${selectedBookingId}/details`);
//         setBookingDetails(res.data);
//       } catch (err) {
//         setDetailsError("Failed to load booking details");
//         toast.error("Failed to load booking details");
//       } finally {
//         setLoadingDetails(false);
//       }
//     }

//     fetchBookingDetails();
//   }, [selectedBookingId]);

//   const handleSelectBooking = (id) => {
//     if (selectedBookingId === id) {
//       setSelectedBookingId(null); // Deselect if same clicked
//     } else {
//       setSelectedBookingId(id);
//     }
//   };

//   // Download PDF report for selected booking
//   const handleDownloadPdf = async () => {
//     if (!selectedBookingId) return;
//     try {
//       const response = await api.get(`/bookings/${selectedBookingId}/pdf`, {
//         responseType: "blob",
//       });
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `booking-${selectedBookingId}.pdf`;
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       toast.error("Failed to download PDF");
//       console.error(error);
//     }
//   };

//   // Preview PDF report for selected booking
//   const handlePreviewPdf = async () => {
//     if (!selectedBookingId) return;
//     try {
//       const response = await api.get(`/bookings/${selectedBookingId}/pdf`, {
//         responseType: "blob",
//       });
//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       setPreviewUrl(url);
//       setShowPreview(true);
//     } catch (error) {
//       toast.error("Failed to preview PDF");
//       console.error(error);
//     }
//   };

//   const closePreview = () => {
//     setShowPreview(false);
//     if (previewUrl) {
//       window.URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Lab Bookings</h2>

//       {loadingBookings ? (
//         <p>Loading bookings...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="flex gap-8">
//           {/* Booking list */}
//           <div className="w-1/3 border rounded p-4 overflow-auto max-h-[600px]">
//             <table className="table-auto w-full border-collapse">
//               <thead>
//                 <tr>
//                   <th className="border px-2 py-1">Booking ID</th>
//                   <th className="border px-2 py-1">Patient</th>
//                   <th className="border px-2 py-1">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((b) => (
//                   <tr
//                     key={b._id}
//                     onClick={() => handleSelectBooking(b._id)}
//                     className={`cursor-pointer ${
//                       selectedBookingId === b._id ? "bg-blue-100" : ""
//                     }`}
//                   >
//                     <td className="border px-2 py-1">{b._id}</td>
//                     <td className="border px-2 py-1">{b.patient?.name || "N/A"}</td>
//                     <td className="border px-2 py-1">{b.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Booking details */}
//           <div className="flex-1 border rounded p-4 max-h-[600px] overflow-auto">
//             {loadingDetails ? (
//               <p>Loading booking details...</p>
//             ) : detailsError ? (
//               <p className="text-red-600">{detailsError}</p>
//             ) : bookingDetails ? (
//               <>
//                 <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
//                 <p><strong>Booking ID:</strong> {bookingDetails.bookingId}</p>
//                 <p><strong>Status:</strong> {bookingDetails.status}</p>
//                 <p>
//                   <strong>Lab:</strong> {bookingDetails.lab?.name} ({bookingDetails.lab?.email})
//                 </p>
//                 <p>
//                   <strong>Patient:</strong> {bookingDetails.patient?.name} ({bookingDetails.patient?.email})
//                 </p>
//                 <p>
//                   <strong>Created At:</strong>{" "}
//                   {new Date(bookingDetails.createdAt).toLocaleString()}
//                 </p>
//                 <p>
//                   <strong>Updated At:</strong>{" "}
//                   {new Date(bookingDetails.updatedAt).toLocaleString()}
//                 </p>

//                 <h4 className="mt-4 font-semibold">Consultation</h4>
//                 {bookingDetails.consultation ? (
//                   <>
//                     <p>
//                       <strong>Doctor:</strong> {bookingDetails.consultation.doctor?.name} (
//                       {bookingDetails.consultation.doctor?.specialization})
//                     </p>
//                     <p>
//                       <strong>Date:</strong>{" "}
//                       {new Date(bookingDetails.consultation.consultationDate).toLocaleString()}
//                     </p>
//                     <p>
//                       <strong>Diagnosis:</strong>{" "}
//                       {bookingDetails.consultation.diagnosis || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Doctor Notes:</strong>{" "}
//                       {bookingDetails.consultation.doctorNotes || "N/A"}
//                     </p>
//                     <p>
//                       <strong>Tests Advised:</strong>
//                       <ul className="list-disc list-inside">
//                         {(bookingDetails.consultation.testsAdvised || []).map((t, i) => (
//                           <li key={i}>{t}</li>
//                         ))}
//                       </ul>
//                     </p>
//                     <p>
//                       <strong>Prescriptions:</strong>
//                       <ul className="list-disc list-inside">
//                         {(bookingDetails.consultation.prescriptions || []).length === 0 ? (
//                           <li>None</li>
//                         ) : (
//                           bookingDetails.consultation.prescriptions.map((p, i) => (
//                             <li key={i}>
//                               {p.medicine} — {p.dosage}, {p.frequency}, {p.duration}
//                               {p.instructions ? ` (Instructions: ${p.instructions})` : ""}
//                             </li>
//                           ))
//                         )}
//                       </ul>
//                     </p>
//                   </>
//                 ) : (
//                   <p>No consultation info available.</p>
//                 )}

//                 <h4 className="mt-4 font-semibold">Selected Tests</h4>
//                 {bookingDetails.selectedTests?.length > 0 ? (
//                   <ul className="list-disc list-inside">
//                     {bookingDetails.selectedTests.map((t, i) => (
//                       <li key={i}>{t}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>None</p>
//                 )}

//                 <h4 className="mt-4 font-semibold">Prescriptions</h4>
//                 {bookingDetails.prescription?.length > 0 ? (
//                   <ul className="list-disc list-inside">
//                     {bookingDetails.prescription.map((p, i) => (
//                       <li key={i}>
//                         {p.medicine} — {p.dosage}, {p.frequency}, {p.duration}
//                         {p.instructions ? ` (Instructions: ${p.instructions})` : ""}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>None</p>
//                 )}

//                 {/* PDF Buttons */}
//                 <div className="mt-6 space-x-3">
//                   <button
//                     onClick={handleDownloadPdf}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                   >
//                     Download PDF Report
//                   </button>
//                   <button
//                     onClick={handlePreviewPdf}
//                     className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
//                   >
//                     Preview PDF Report
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <p>Select a booking to see details here.</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* PDF Preview Modal */}
//       {showPreview && previewUrl && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg relative">
//             <h3 className="text-xl font-bold mb-4">PDF Report Preview</h3>
//             <iframe
//               src={previewUrl}
//               title="PDF Report"
//               width="100%"
//               height="600px"
//               className="border rounded"
//             ></iframe>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={() => {
//                   const a = document.createElement("a");
//                   a.href = previewUrl;
//                   a.download = `booking-${selectedBookingId}.pdf`;
//                   a.click();
//                 }}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={closePreview}
//                 className="text-red-600 underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabBookings;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// // Fetch prescription JSON data for a consultation
// const fetchPrescriptions = async (consultationId) => {
//   try {
//     const token = localStorage.getItem("labToken");
//     const res = await axios.get(
//       `http://localhost:5000/api/labs/consultation/${consultationId}/prescriptions`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return res.data; // { prescriptions: [...], consultation: {...} }
//   } catch (error) {
//     console.error("Failed to fetch prescriptions:", error);
//     throw error;
//   }
// };

// const LabBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [previewConsultationId, setPreviewConsultationId] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const [prescriptionsData, setPrescriptionsData] = useState(null);
//   const [prescriptionLoading, setPrescriptionLoading] = useState(false);

//   // Fetch bookings on mount
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("labToken");
//         const res = await axios.get("http://localhost:5000/api/labs/bookings/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBookings(res.data);
//       } catch (err) {
//         console.error("Error fetching bookings:", err);
//         toast.error("Failed to load bookings");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   // Download prescription PDF
//   const handleDownloadPrescription = (consultationId) => {
//     const token = localStorage.getItem("labToken");
//     axios({
//       url: `http://localhost:5000/api/labs/prescription/${consultationId}`,
//       method: "GET",
//       responseType: "blob",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => {
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `prescription-${consultationId}.pdf`;
//         a.click();
//         window.URL.revokeObjectURL(url);
//       })
//       .catch((err) => {
//         console.error("Download error:", err);
//         toast.error("Failed to download prescription");
//       });
//   };

//   // Preview prescription PDF in modal
//   const handlePreviewPrescription = (consultationId) => {
//     const token = localStorage.getItem("labToken");

//     axios({
//       url: `http://localhost:5000/api/labs/prescription/${consultationId}`,
//       method: "GET",
//       responseType: "blob",
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => {
//         const blob = new Blob([response.data], { type: "application/pdf" });
//         const url = window.URL.createObjectURL(blob);
//         setPreviewUrl(url);
//         setPreviewConsultationId(consultationId);
//         setShowPreview(true);
//       })
//       .catch((err) => {
//         console.error("Preview error:", err);
//         toast.error("Failed to load preview");
//       });
//   };

//   // Close preview modal and clean URL object
//   const handleClosePreview = () => {
//     setShowPreview(false);
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//       setPreviewConsultationId(null);
//     }
//   };

//   // Fetch prescription JSON and display details
//   const handleFetchPrescriptions = async (consultationId) => {
//     setPrescriptionLoading(true);
//     try {
//       const data = await fetchPrescriptions(consultationId);
//       // Attach consultationId for UI tracking
//       setPrescriptionsData({ ...data, consultationId });
//       toast.success("Prescriptions fetched successfully");
//     } catch {
//       toast.error("Failed to fetch prescriptions");
//       setPrescriptionsData(null);
//     } finally {
//       setPrescriptionLoading(false);
//     }
//   };

//   if (loading) {
//     return <p>Loading bookings...</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6">Lab Bookings</h2>

//       {bookings.length === 0 ? (
//         <p className="text-gray-600">No bookings found.</p>
//       ) : (
//         bookings.map((b) => (
//           <div
//             key={b._id}
//             className="border rounded shadow p-5 mb-6 bg-white hover:shadow-lg transition"
//           >
//             <p>
//               <strong>Booking ID:</strong> {b._id}
//             </p>
//             <p>
//               <strong>Patient:</strong> {b.patient?.name || "-"} (
//               {b.patient?.email || "-"})
//             </p>
//             <p>
//               <strong>Status:</strong> {b.status}
//             </p>

//             {b.consultation && (
//               <div className="mt-3">
//                 <p>
//                   <strong>Diagnosis:</strong>{" "}
//                   {b.consultation.diagnosis?.primary || "-"}
//                 </p>
//                 <p>
//                   <strong>Doctor Notes:</strong>{" "}
//                   {b.consultation.doctorNotes || "-"}
//                 </p>
//                 <p>
//                   <strong>Tests Advised:</strong>{" "}
//                   {b.consultation.testsAdvised?.map((t) => t.name).join(", ") ||
//                     "-"}
//                 </p>
//               </div>
//             )}

//             <div className="mt-4 space-x-3">
//               {b.consultation?._id && (
//                 <>
//                   <button
//                     onClick={() =>
//                       handleDownloadPrescription(b.consultation._id)
//                     }
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                   >
//                     Download PDF
//                   </button>
//                   <button
//                     onClick={() =>
//                       handlePreviewPrescription(b.consultation._id)
//                     }
//                     className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
//                   >
//                     Preview PDF
//                   </button>
//                   <button
//                     onClick={() => handleFetchPrescriptions(b.consultation._id)}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//                     disabled={prescriptionLoading}
//                   >
//                     {prescriptionLoading ? "Loading..." : "View Prescriptions"}
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Show prescription JSON details for the selected consultation */}
//             {prescriptionsData &&
//               prescriptionsData.consultationId === b.consultation?._id && (
//                 <div className="mt-5 bg-gray-50 border rounded p-4 text-gray-700">
//                   <h4 className="font-semibold mb-3 text-lg">
//                     Prescriptions Details
//                   </h4>
//                   {prescriptionsData.prescriptions.length === 0 ? (
//                     <p>No prescriptions found.</p>
//                   ) : (
//                     <ul className="list-disc list-inside space-y-2">
//                       {prescriptionsData.prescriptions.map((p, idx) => (
//                         <li key={idx}>
//                           <span className="font-semibold">{p.medicine}</span>{" "}
//                           — Dosage: {p.dosage}, Frequency: {p.frequency},{" "}
//                           Duration: {p.duration}
//                           <br />
//                           Instructions: {p.instructions || "-"}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               )}
//           </div>
//         ))
//       )}

//       {/* PDF Preview Modal */}
//       {showPreview && previewUrl && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
//           <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full relative p-6">
//             <h3 className="text-xl font-semibold mb-4">Prescription Preview</h3>

//             <iframe
//               src={previewUrl}
//               title="Prescription Preview"
//               width="100%"
//               height="500px"
//               className="border rounded"
//             />

//             <div className="mt-5 flex justify-between items-center">
//               <button
//                 onClick={() => {
//                   const a = document.createElement("a");
//                   a.href = previewUrl;
//                   a.download = `prescription-${previewConsultationId}.pdf`;
//                   a.click();
//                 }}
//                 className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//               >
//                 Download
//               </button>
//               <button
//                 onClick={handleClosePreview}
//                 className="text-red-600 underline hover:text-red-800"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabBookings;
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // ✅ Step 1: Import useNavigate

const fetchPrescriptionsByBookingId = async (bookingId) => {
  const token = localStorage.getItem("labToken");

  const res = await axios.get(
    `http://localhost:5000/api/labs/bookings/${bookingId}/details`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};

const LabBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prescriptionLoading, setPrescriptionLoading] = useState(false);
  const [prescriptionsData, setPrescriptionsData] = useState(null);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewBookingId, setPreviewBookingId] = useState(null);

  const navigate = useNavigate(); // ✅ Step 2: Use navigate

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("labToken");
        const res = await axios.get("http://localhost:5000/api/labs/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (error) {
        toast.error("Failed to load bookings");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleDownloadPrescription = async (bookingId) => {
    try {
      const token = localStorage.getItem("labToken");
      const response = await axios.get(
        `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prescription-${bookingId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download prescription");
      console.error(error);
    }
  };

  const handlePreviewPrescription = async (bookingId) => {
    try {
      const token = localStorage.getItem("labToken");
      const response = await axios.get(
        `http://localhost:5000/api/labs/bookings/${bookingId}/pdf`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
      setPreviewBookingId(bookingId);
      setShowPreview(true);
    } catch (error) {
      toast.error("Failed to preview prescription");
      console.error(error);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setPreviewBookingId(null);
    }
  };

  const handleFetchPrescriptions = async (bookingId) => {
    setPrescriptionLoading(true);
    setPrescriptionsData(null);
    try {
      const data = await fetchPrescriptionsByBookingId(bookingId);

      let prescriptions = data.consultation?.prescriptions;
      if (!Array.isArray(prescriptions) || prescriptions.length === 0) {
        prescriptions = data.prescription;
      }

      setPrescriptionsData({
        bookingId,
        prescriptions: Array.isArray(prescriptions) ? prescriptions : [],
      });

      setExpandedBookingId(bookingId);
    } catch (error) {
      toast.error("Failed to fetch prescriptions");
      console.error(error);
    } finally {
      setPrescriptionLoading(false);
    }
  };

  if (loading) return <p className="p-4">Loading bookings...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Lab Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="border p-5 rounded mb-6 shadow">
            <p><strong>Booking ID:</strong> {b._id}</p>
            <p><strong>Lab Name:</strong> {b.lab?.name || "N/A"}</p>
            <p><strong>Patient:</strong> {b.patient?.name} ({b.patient?.email})</p>
            <p><strong>Status:</strong> {b.status}</p>

            {b.consultation && (
              <div className="mt-3">
                <p><strong>Diagnosis:</strong> {b.consultation.diagnosis?.primary || "-"}</p>
                <p><strong>Doctor Notes:</strong> {b.consultation.doctorNotes || "-"}</p>
                <p><strong>Tests Advised:</strong>{" "}
                  {Array.isArray(b.consultation.testsAdvised)
                    ? b.consultation.testsAdvised.map((t) => t.name).join(", ")
                    : "-"}
                </p>
              </div>
            )}

            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleDownloadPrescription(b._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download PDF
              </button>

              <button
                onClick={() => handlePreviewPrescription(b._id)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Preview PDF
              </button>

              <button
                onClick={() => handleFetchPrescriptions(b._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={prescriptionLoading}
              >
                {prescriptionLoading && expandedBookingId === b._id
                  ? "Loading..."
                  : "View Prescriptions"}
              </button>

              <button
                onClick={() => navigate(`/LabtestReport?bookingId=${b._id}`)} // ✅ Navigate to report page
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Generate Test Report
              </button>
            </div>

            {/* Prescriptions Section */}
            {prescriptionsData &&
              prescriptionsData.bookingId === b._id &&
              expandedBookingId === b._id && (
                <div className="mt-4 bg-gray-50 border rounded p-4">
                  <h4 className="font-semibold mb-3">Prescriptions</h4>
                  {!prescriptionsData.prescriptions ||
                  prescriptionsData.prescriptions.length === 0 ? (
                    <p>No prescriptions found.</p>
                  ) : (
                    <ul className="list-disc list-inside space-y-2">
                      {prescriptionsData.prescriptions.map((p, idx) => (
                        <li key={idx}>
                          <strong>Medicine:</strong> {p.medicine}<br />
                          <strong>Dosage:</strong> {p.dosage}<br />
                          <strong>Frequency:</strong> {p.frequency}<br />
                          <strong>Duration:</strong> {p.duration}<br />
                          <strong>Instructions:</strong> {p.instructions || "None"}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
          </div>
        ))
      )}

      {/* PDF Preview Modal */}
      {showPreview && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Prescription Preview</h3>
            <iframe
              src={previewUrl}
              title="Prescription"
              width="100%"
              height="500px"
              className="border rounded"
            ></iframe>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = previewUrl;
                  a.download = `prescription-${previewBookingId}.pdf`;
                  a.click();
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download
              </button>
              <button
                onClick={handleClosePreview}
                className="text-red-600 underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabBookings;
