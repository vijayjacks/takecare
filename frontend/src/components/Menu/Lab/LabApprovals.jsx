// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// export default function LabApprovals() {
//   const [labs, setLabs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch all labs
//   const fetchLabs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/labs/all"); // Replace with actual endpoint
//       setLabs(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load labs");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLabs();
//   }, []);

//   // ✅ Approve by clinic
//   const handleClinicApproval = async (labId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/labs/${labId}/approve-clinic`);
//       toast.success("Approved by clinic");
//       fetchLabs(); // Refresh
//     } catch (err) {
//       console.error(err);
//       toast.error("Clinic approval failed");
//     }
//   };

//   // ✅ Approve by admin
//   const handleAdminApproval = async (labId) => {
//     try {
//       await axios.put(`http://localhost:5000/api/labs/${labId}/approve-admin`);
//       toast.success("Approved by admin");
//       fetchLabs(); // Refresh
//     } catch (err) {
//       console.error(err);
//       toast.error("Admin approval failed");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4 text-center">Lab Approval Panel</h2>

//       {loading ? (
//         <p>Loading labs...</p>
//       ) : labs.length === 0 ? (
//         <p>No labs found.</p>
//       ) : (
//         <div className="space-y-4">
//           {labs.map((lab) => (
//             <div key={lab._id} className="p-4 border rounded shadow flex justify-between items-center">
//               <div>
//                 <h3 className="font-bold text-lg">{lab.name}</h3>
//                 <p className="text-sm text-gray-700">Email: {lab.email}</p>
//                 <p className="text-sm">Phone: {lab.phone}</p>
//                 <p className="text-sm">Address: {lab.address}</p>
//                 <p className="text-sm">
//                   Clinic Approved:{" "}
//                   <span className={lab.clinicApproved ? "text-green-600" : "text-red-600"}>
//                     {lab.clinicApproved ? "Yes" : "No"}
//                   </span>
//                 </p>
//                 <p className="text-sm">
//                   Admin Approved:{" "}
//                   <span className={lab.adminApproved ? "text-green-600" : "text-red-600"}>
//                     {lab.adminApproved ? "Yes" : "No"}
//                   </span>
//                 </p>
//               </div>

//               <div className="flex flex-col space-y-2">
//                 {!lab.clinicApproved && (
//                   <button
//                     onClick={() => handleClinicApproval(lab._id)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
//                   >
//                     Approve Clinic
//                   </button>
//                 )}
//                 {!lab.adminApproved && (
//                   <button
//                     onClick={() => handleAdminApproval(lab._id)}
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
//                   >
//                     Approve Admin
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }












import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LabApproval() {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState({});

  // ✅ Get token (for protected routes)
  const token = localStorage.getItem("token");

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ✅ Fetch labs
  const fetchLabs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/labs/all", authHeaders);
      setLabs(res.data);
    } catch (err) {
      toast.error("Error loading labs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  // ✅ Approve lab
  const approveLab = async (labId, type) => {
    const key = `${labId}_${type}`;
    setApproving((prev) => ({ ...prev, [key]: true }));

    const endpoint =
      type === "clinic"
        ? `/api/labs/approve-lab/${labId}`
        : `/api/labs/${labId}/approve-admin`;

    try {
      await axios.put(`http://localhost:5000${endpoint}`, {}, authHeaders);
      toast.success(`${type === "clinic" ? "Clinic" : "Admin"} approval successful`);
      fetchLabs(); // refresh labs
    } catch (err) {
      toast.error(`${type} approval failed`);
    } finally {
      setApproving((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-center mb-6">Lab Approval Panel</h1>

      {loading ? (
        <p className="text-center">Loading labs...</p>
      ) : labs.length === 0 ? (
        <p className="text-center">No labs found</p>
      ) : (
        <div className="space-y-4">
          {labs.map((lab) => {
            const isClinicApproving = approving[`${lab._id}_clinic`];
            const isAdminApproving = approving[`${lab._id}_admin`];

            return (
              <div
                key={lab._id}
                className="p-4 border shadow rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{lab.name}</h3>
                  <p>Email: {lab.email}</p>
                  <p>Phone: {lab.phone}</p>
                  <p>Address: {lab.address}</p>
                  <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
                  <p>
                    Clinic Approved:{" "}
                    <span
                      className={lab.clinicApproved ? "text-green-600" : "text-red-600"}
                    >
                      {lab.clinicApproved ? "Yes" : "No"}
                    </span>
                  </p>
                  <p>
                    Admin Approved:{" "}
                    <span
                      className={lab.adminApproved ? "text-green-600" : "text-red-600"}
                    >
                      {lab.adminApproved ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  {!lab.clinicApproved && (
                    <button
                      onClick={() => approveLab(lab._id, "clinic")}
                      disabled={isClinicApproving}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded disabled:opacity-50"
                    >
                      {isClinicApproving ? "Approving..." : "Approve Clinic"}
                    </button>
                  )}
                  {!lab.adminApproved && (
                    <button
                      onClick={() => approveLab(lab._id, "admin")}
                      disabled={isAdminApproving}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded disabled:opacity-50"
                    >
                      {isAdminApproving ? "Approving..." : "Approve Admin"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
