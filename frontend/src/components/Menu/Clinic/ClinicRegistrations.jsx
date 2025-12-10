// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // ✅ import useParams

// const ClinicRegistrations = () => {
//   const { clinicId } = useParams(); // ✅ get clinicId from URL
//   const [registrations, setRegistrations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchRegistrations = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}/registrations`);
//         setRegistrations(res.data.registrations);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch registrations");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (clinicId) fetchRegistrations(); // ✅ only fetch if clinicId exists
//   }, [clinicId]);

//   if (loading) return <p>Loading registrations...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h2>Clinic Registrations</h2>
//       <p><strong>Clinic ID:</strong> {clinicId}</p>

//       {registrations.length === 0 ? (
//         <p>No registrations found.</p>
//       ) : (
//         <table border="1" cellPadding="8">
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Payment ID</th>
//               <th>Payment Status</th>
//               <th>Registered At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {registrations.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.patientId?.name || "N/A"}</td>
//                 <td>{r.patientId?.email || "N/A"}</td>
//                 <td>{r.patientId?.phone || "N/A"}</td>
//                 <td>{r.paymentId}</td>
//                 <td>{r.paymentStatus}</td>
//                 <td>{new Date(r.registeredAt).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ClinicRegistrations;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ClinicRegistrations = () => {
    const { clinicId } = useParams();
    const [clinic, setClinic] = useState(null); // Store clinic info
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchClinicRegistrations = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/clinics/${clinicId}/registrations`
                );
                console.log('clinic regisration', res)
                setClinic({
                    name: res.data.clinicDetails.name || "N/A",
                    email: res.data.clinicDetails.email || "N/A",
                    phone: res.data.clinicDetails.phone || "N/A",
                });

                setRegistrations(res.data.registrations || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch registrations");
            } finally {
                setLoading(false);
            }
        };

        if (clinicId) fetchClinicRegistrations();
    }, [clinicId]);

    if (loading) return <p>Loading registrations...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Clinic Registrations</h2>

            {/* Clinic Info */}
            {clinic && (
                <div className="mb-6 p-4 border rounded bg-gray-50">
                    <h3 className="font-semibold text-lg mb-2">Clinic Details</h3>
                    <p><strong>Name:</strong> {clinic.name}</p>
                    <p><strong>Email:</strong> {clinic.email}</p>
                    <p><strong>Phone:</strong> {clinic.phone}</p>
                </div>
            )}

            {/* Registrations Table */}
            {registrations.length === 0 ? (
                <p>No registrations found.</p>
            ) : (
                <table className="min-w-full border border-gray-300 rounded">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Patient Name</th>
                            <th className="border px-4 py-2 text-left">Patient Email</th>
                            <th className="border px-4 py-2 text-left">Patient Phone</th>
                            <th className="border px-4 py-2 text-left">Payment ID</th>
                            <th className="border px-4 py-2 text-left">Payment Status</th>
                            <th className="border px-4 py-2 text-left">Registered At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((r) => (
                            <tr key={r._id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{r.patient?.name || "N/A"}</td>
                                <td className="border px-4 py-2">{r.patient?.email || "N/A"}</td>
                                <td className="border px-4 py-2">{r.patient?.phone || "N/A"}</td>
                                <td className="border px-4 py-2">{r.paymentId}</td>
                                <td className="border px-4 py-2">{r.paymentStatus}</td>
                                <td className="border px-4 py-2">
                                    {new Date(r.registeredAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClinicRegistrations;
