// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PaidLabReports({ patientId }) {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/patients/${patientId}/lab-reports`);
//         setReports(reports.data.reports.filter(r => r.paymentStatus === "Paid"));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchReports();
//   }, [patientId]);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-3">Paid Lab Reports</h2>
//       {reports.length === 0 ? (
//         <p className="text-gray-500">No paid reports yet.</p>
//       ) : (
//         <ul className="space-y-2">
//           {reports.map((r) => (
//             <li key={r._id} className="p-3 border rounded-lg flex justify-between">
//               <div>
//                 <p className="font-semibold">{r.testName}</p>
//                 <p className="text-sm text-gray-600">Result: {r.result}</p>
//               </div>
//               <span className="text-sm text-gray-400">
//                 {new Date(r.uploadedAt).toLocaleDateString()}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PaidLabReports() {
  // const { patientId } = useParams(); // ✅ Get patientId from route
  const patientId=localStorage.getItem("patientId")
  const [reports, setReports] = useState([]);


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("patientToken"); // ✅ Get patient token

        const res = await axios.get(
          `http://localhost:5000/api/patients/${patientId}/lab-reports`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("reports",res)
        // ✅ Filter reports where paymentStatus === "paid"
        const paidReports = res.data.reports.filter(
          (r) => r.paymentStatus?.toLowerCase() === "paid"
        );

        setReports(paidReports);
      } catch (err) {
        console.error("Error fetching lab reports:", err);
      }
    };

    if (patientId) fetchReports();
  }, [patientId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Paid Lab Reports</h2>
      {reports.length === 0 ? (
        <p className="text-gray-500">No paid reports yet.</p>
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => (
            <li key={r._id} className="p-3 border rounded-lg flex justify-between">
              <div>
                <p className="font-semibold text-blue-700">{r.testName}</p>
                <p className="text-sm text-gray-700">
                  <strong>Result:</strong> {r.result}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Normal Range:</strong> {r.normalRange}
                </p>
                <p
                  className={`text-sm font-medium ${
                    r.status === "Completed" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  Status: {r.status}
                </p>
              </div>
              <span className="text-sm text-gray-400">
                {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
