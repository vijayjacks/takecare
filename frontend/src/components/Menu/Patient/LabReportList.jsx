// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function LabReportList({ patientId }) {
//   const [labReports, setLabReports] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/patient/${patientId}/labreports`)
//       .then((res) => setLabReports(res.data))
//       .catch((err) => console.error(err));
//   }, [patientId]);

//   const handleView = async (labId) => {
//     navigate(`/payment/${labId}?patient=${patientId}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Patient Lab Reports</h1>
//       <ul className="space-y-3">
//         {labReports.map((report) => (
//           <li
//             key={report.labId}
//             className="flex justify-between items-center border p-3 rounded-md bg-gray-50"
//           >
//             <div>
//               <p className="font-semibold">{report.testName}</p>
//               <p className="text-gray-500 text-sm">
//                 Uploaded: {new Date(report.uploadedAt).toLocaleDateString()}
//               </p>
//             </div>
//             <button
//               onClick={() => handleView(report.labId)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               View Report
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function  LabReportList({ patientId }) {
//   const [labReports, setLabReports] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/patients/${patientId}/labreports`)
//       .then((res) => setLabReports(res.data.labReports || []))
//       .catch((err) => console.error(err));
//   }, [patientId]);

//   const handlePay = (labId, amount) => {
//     navigate(`/payment/${labId}?patient=${patientId}&amount=${amount}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Patient Lab Reports</h1>
//       <ul className="space-y-3">
//         {labReports.map((report) => (
//           <li
//             key={report._id}
//             className="flex justify-between items-center border p-3 rounded-md bg-gray-50"
//           >
//             <div>
//               <p className="font-semibold">{report.testName}</p>
//               <p className="text-gray-500 text-sm">
//                 Uploaded: {new Date(report.uploadedAt).toLocaleDateString()}
//               </p>
//               <p className="text-sm text-gray-600">Result: {report.result}</p>
//             </div>
//             {report.paymentStatus === "success" ? (
//               <button
//                 onClick={() => navigate("/paid-reports")}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Paid
//               </button>
//             ) : (
//               <button
//                 onClick={() => handlePay(report._id, report.amount || 500)} // example ₹500
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Pay Now
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function LabReportList() {
//   const [labReports, setLabReports] = useState([]);
//   const navigate = useNavigate();
//   const { patientId } = useParams(); // ✅ Get patientId from URL params

//   useEffect(() => {
//     const fetchLabReports = async () => {
//       try {
//         const token = localStorage.getItem("patientToken"); // ✅ Get token from localStorage
//         if (!token) {
//           console.error("No token found in localStorage");
//           return;
//         }

//         const res = await axios.get(
//           `http://localhost:5000/api/patients/${patientId}/labreports`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // ✅ Add token to headers
//             },
//           }
//         );
//         console.log(res)
//         setLabReports(res.data || []);
//       } catch (err) {
//         console.error("Error fetching lab reports:", err);
//       }
//     };

//     if (patientId) {
//       fetchLabReports();
//     }
//   }, [patientId]);

//   const handlePay = (labId, amount) => {
//     navigate(`/payment/${labId}?patient=${patientId}&amount=${amount}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Patient Lab Reports</h1>

//       {labReports.length === 0 ? (
//         <p className="text-gray-500">No lab reports found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {labReports.map((report) => (
//             <li
//               key={report._id}
//               className="flex justify-between items-center border p-3 rounded-md bg-gray-50"
//             >
//               <div>
//                 <p className="font-semibold">{report.testName}</p>
//                 <p className="text-gray-500 text-sm">
//                   Uploaded:{" "}
//                   {new Date(report.uploadedAt).toLocaleDateString()}
//                 </p>
//                 {/* <p className="text-sm text-gray-600">Result: {report.result}</p> */}
//               </div>

//               {report.paymentStatus === "success" ? (
//                 <button
//                   onClick={() => navigate("/paid-reports")}
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Paid
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handlePay(report._id, report.amount || 500)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Pay Now
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }




  // import React, { useEffect, useState } from "react";
  // import axios from "axios";
  // import { useNavigate, useParams } from "react-router-dom";

  // export default function LabReportList() {
  //   const [labReports, setLabReports] = useState([]);
  //   const navigate = useNavigate();
  //   const { patientId } = useParams();

  //   useEffect(() => {
  //     const fetchLabReports = async () => {
  //       try {
  //         const token = localStorage.getItem("patientToken");
  //         if (!token) {
  //           console.error("No token found in localStorage");
  //           return;
  //         }

  //         const res = await axios.get(
  //           `http://localhost:5000/api/patients/${patientId}/labreports`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         console.log(res);
  //         setLabReports(res.data || []);
  //       } catch (err) {
  //         console.error("Error fetching lab reports:", err);
  //       }
  //     };

  //     if (patientId) {
  //       fetchLabReports();
  //     }
  //   }, [patientId]);

  //   const handlePay = (labId, amount) => {
  //     navigate(`/payment/${labId}?patient=${patientId}&amount=${amount}`);
  //   };

  //   return (
  //     <div className="p-6">
  //       <h1 className="text-2xl font-bold mb-4">Patient Lab Reports</h1>

  //       {labReports.length === 0 ? (
  //         <p className="text-gray-500">No lab reports found.</p>
  //       ) : (
  //         <ul className="space-y-3">
  //           {labReports.map((report) => (
  //             <li
  //               key={report._id}
  //               className="flex justify-between items-center border p-3 rounded-md bg-gray-50"
  //             >
  //               <div>
  //                 <p className="font-semibold">Testname : {report.testName}</p>
  //                 <p className="text-gray-500 text-sm">
  //                   Booking date: {new Date(report.uploadedAt).toLocaleDateString()}
  //                 </p>

  //                 {/* ✅ Result / Pending condition */}
  //                 <p className="text-sm text-gray-600 mt-1">
  //                   {report.result
  //                     ? `Result: ${report.result}`
  //                     : "Result Pending / Unpaid"}
  //                 </p>
  //               </div>

  //               {/* ✅ Payment Status Condition */}
  //               {report.paymentStatus === "success" ? (
  //                 <button
  //                   onClick={() => navigate("/paid-reports")}
  //                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
  //                 >
  //                   Paid
  //                 </button>
  //               ) : (
  //                 <button
  //                   onClick={() => handlePay(report._id, report.amount || 500)}
  //                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //                 >
  //                   Pay Now
  //                 </button>
  //               )}
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </div>
  //   );
  // }













  // finaqll/
//   import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function LabReportList() {
//   const [labReports, setLabReports] = useState([]);
//   const navigate = useNavigate();
//   const { patientId } = useParams();

//   useEffect(() => {
//     const fetchLabReports = async () => {
//       try {
//         const token = localStorage.getItem("patientToken");
//         if (!token) return;

//         const res = await axios.get(
//           `http://localhost:5000/api/patients/${patientId}/labreports`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("repo",res)
//         setLabReports(res.data);
//       } catch (err) {
//         console.error("Error fetching lab reports:", err);
//       }
//     };

//     if (patientId) fetchLabReports();
//   }, [patientId]);

//   const handlePay = (labId, amount) => {
//     navigate(`/payment/${labId}?patient=${patientId}&amount=${amount}`);
//   };


//   console.log("reports",labReports)
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Patient Lab Reports</h1>

//       {labReports.length === 0 ? (
//         <p className="text-gray-500">No lab reports found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {labReports.map((report) => (
//             <li
//               key={report._id}
//               className="flex justify-between items-center border p-3 rounded-md bg-gray-50"
//             >
//               <div>
//                 <p className="font-semibold">Test: {report.testName}</p>
//                 <p className="text-gray-500 text-sm">
//                   Date: {new Date(report.uploadedAt).toLocaleDateString()}
//                 </p>

//                 {report.paymentStatus === "paid" ? (
//                   <p className="text-sm text-green-700 mt-1">
//                     ✅ Result: {report.result}
//                   </p>
//                 ) : (
//                   <p className="text-sm text-gray-600 mt-1">
//                     🔒 Result locked — please complete payment
//                   </p>
//                 )}
//               </div>

//               {report.paymentStatus === "paid" ? (
//                 <button
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   onClick={() => alert("You already paid for this report!")}
//                 >
//                   Paid
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handlePay(report._id, report?.cost)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Pay Now
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function LabReportList() {
//   const [labReports, setLabReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { patientId } = useParams();
//   const { reportId } = useParams(); 


//   useEffect(() => {
//     const fetchLabReports = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) {
//           setError("Authentication required. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           `http://localhost:5000/api/patients/${patientId}/${reportId}labreports`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setLabReports(res.data || []);
//       } catch (err) {
//         console.error("Error fetching lab reports:", err);
//         setError("Failed to fetch lab reports. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (patientId,reportId) fetchLabReports();
//   }, [patientId,reportId, ]);

//   const handlePay = (reportId, amount) => {
//     navigate(`/payment/${reportId}?patient=${patientId}&amount=${amount}`);
//   };

//   // 🧠 Rendering Section
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-600 animate-pulse">Loading lab reports...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🧪 Patient Lab Reports</h1>

//       {labReports.length === 0 ? (
//         <p className="text-gray-500">No lab reports found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {labReports.map((report) => (
//             <li
//               key={report._id}
//               className="flex justify-between items-center border p-4 rounded-md bg-gray-50 hover:shadow-sm transition"
//             >
//               <div>
//                 <p className="font-semibold text-lg">
//                   Test: {report.testName || "Unnamed Test"}
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                   Date:{" "}
//                   {report.createdAt
//                     ? new Date(report.createdAt).toLocaleDateString()
//                     : "N/A"}
//                 </p>
//                 <p className="text-gray-600 text-sm">
//                   Normal Range: {report.normalRange || "N/A"}
//                 </p>

//                 {report.paymentStatus === "paid" ? (
//                   <p className="text-sm text-green-700 mt-1">
//                     ✅ Result: {report.result || "No result available"}
//                   </p>
//                 ) : (
//                   <p className="text-sm text-gray-600 mt-1">
//                     🔒 Result locked — please complete payment
//                   </p>
//                 )}
//               </div>

//               {report.paymentStatus === "paid" ? (
//                 <button
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-default"
//                   onClick={() =>
//                     alert("✅ You have already paid for this report.")
//                   }
//                 >
//                   Paid
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handlePay(report._id, report?.cost)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Pay Now ₹{report.cost}
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function   LabReportList() {
//   const { patientId, reportId } = useParams(); // Fetch params from URL
//   const [labReports, setLabReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLabReports = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) {
//           setError("Authentication required. Please log in again.");
//           setLoading(false);
//           return;
//         }

//         // Decide URL based on whether reportId exists
//         const url = reportId
//           ? `http://localhost:5000/api/patients/${patientId}/${reportId}/labreports`
//           : `http://localhost:5000/api/patients/${patientId}/labreports`;

//         const res = await axios.get(url, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setLabReports(res.data || []);
//       } catch (err) {
//         console.error("Error fetching lab reports:", err);
//         setError("Failed to fetch lab reports. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (patientId) fetchLabReports();

//   }, [patientId, reportId]);
  
//   // let report=labReports && labReports.find(report=>report._id===reportId)
//   console.log("report",labReports)
//   const handlePay = (reportId, amount) => {
//     navigate(`/payment/${reportId}?patient=${patientId}&amount=${amount}`);
//   };

//   // ------------------- Rendering -------------------
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-600 animate-pulse">Loading lab reports...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-red-500">{error}</p>
//       </div>
//     );
//   }

//   if (labReports.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-gray-500">No lab reports found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🧪 Patient Lab Reports</h1>

//       <ul className="space-y-3">
//         {labReports.map((report) => (
//           <li
//             key={report._id}
//             className="flex justify-between items-center border p-4 rounded-md bg-gray-50 hover:shadow-sm transition"
//           >
//             <div>
//               <p className="font-semibold text-lg">
//                 Test: {report.testName || "Unnamed Test"}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Date: {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "N/A"}
//               </p>
//               <p className="text-gray-600 text-sm">
//                 Normal Range: {report.normalRange || "N/A"}
//               </p>

//               {report.paymentStatus === "paid" ? (
//                 <p className="text-sm text-green-700 mt-1">
//                   ✅ Result: {report.result || "No result available"}
//                 </p>
//               ) : (
//                 <p className="text-sm text-gray-600 mt-1">
//                   🔒 Result locked — please complete payment
//                 </p>
//               )}
//             </div>

//             {report.paymentStatus === "paid" ? (
//               <button
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-default"
//                 onClick={() => alert("✅ You have already paid for this report.")}
//               >
//                 Paid
//               </button>
//             ) : (
//               <button
//                 onClick={() => handlePay(report._id, report?.cost)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Pay Now ₹{report.cost || "0"}
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function LabReportList() {
  const { patientId } = useParams(); // Fetch patientId from URL
  const [labReports, setLabReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("patientToken");
        if (!token) {
          setError("Authentication required. Please log in again.");
          setLoading(false);
          return;
        }

        const url = `http://localhost:5000/api/patients/${patientId}/labreports`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLabReports(res.data || []);
      } catch (err) {
        console.error("Error fetching lab reports:", err);
        setError("Failed to fetch lab reports. Please login!!");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) fetchLabReports();
  }, [patientId]);

  const handlePay = (reportId, amount) => {
    navigate(`/payment/${reportId}?patient=${patientId}&amount=${amount}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 animate-pulse">Loading lab reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (labReports.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No lab reports found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧪 Patient Lab Reports</h1>

      <ul className="space-y-3">
        {labReports.map((report) => (
          <li
            key={report._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded-md bg-gray-50 hover:shadow-sm transition"
          >
            <div className="mb-2 md:mb-0">
              <p className="font-semibold text-lg">
                Test: {report.testName || "Unnamed Test"}
              </p>
              <p className="text-gray-500 text-sm">
                Date: {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                Normal Range: {report.normalRange || "N/A"}
              </p>

              {report.paymentStatus === "paid" ? (
                <p className="text-sm text-green-700 mt-1">
                  ✅ Result: {report.result || "No result available"}
                </p>
              ) : (
                <p className="text-sm text-gray-600 mt-1">
                  🔒 Result locked — please complete payment
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
              {report.paymentStatus === "paid" ? (
                <>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-default"
                  >
                    Paid
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    onClick={() => navigate(`/patients/${patientId}/labreports/${report._id}`)}
                  >
                    View Report
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handlePay(report._id, report?.cost)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Pay Now ₹{report.cost || "0"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
