// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [search, setSearch] = useState('');
//   const [clinicFilter, setClinicFilter] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         const token = localStorage.getItem("patientToken") ||
//                       localStorage.getItem("doctorToken") 
                     

//         if (!token) {
//           setError("Unauthorized access.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load labs.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLabs();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     const filtered = labs.filter(lab =>
//       (lab.name.toLowerCase().includes(search.toLowerCase()) ||
//        lab.email.toLowerCase().includes(search.toLowerCase())) &&
//       (clinicFilter ? lab.clinicId?.name === clinicFilter : true)
//     );

//     setFilteredLabs(filtered);
//   }, [search, clinicFilter, labs]);

//   const clinicOptions = [...new Set(labs.map(l => l.clinicId?.name).filter(Boolean))];

//   const handleTestSelection = (testName) => {
//     setSelectedTests(prev =>
//       prev.includes(testName)
//         ? prev.filter(name => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter(test => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   if (loading) return <div className="text-center py-10 text-blue-500">Loading labs...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">All Registered Labs</h2>

//       {/* 🔍 Search and Filter */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search labs by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded"
//         />
//         <select
//           value={clinicFilter}
//           onChange={(e) => setClinicFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="">All Clinics</option>
//           {clinicOptions.map((clinic) => (
//             <option key={clinic} value={clinic}>{clinic}</option>
//           ))}
//         </select>
//       </div>

//       {/* 🧪 Labs List */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredLabs.map((lab) => (
//           <div key={lab._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
//             <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//             <p>Email: {lab.email}</p>
//             <p>Phone: {lab.phone}</p>
//             <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
//             <button
//               className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//               onClick={() => {
//                 setSelectedLab(lab);
//                 setSelectedTests([]);
//               }}
//             >
//               View Tests
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* 📋 Selected Lab's Tests */}
//       {selectedLab && (
//         <div className="mt-10 bg-white p-6 rounded shadow-lg">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Available Tests at {selectedLab.name}
//           </h3>
//           {selectedLab.availableTests.length === 0 ? (
//             <p className="text-gray-500">No tests available.</p>
//           ) : (
//             <div className="space-y-3">
//               {selectedLab.availableTests.map(test => (
//                 <label key={test.name} className="flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 cursor-pointer">
//                   <div>
//                     <strong>{test.name}</strong> ({test.department})<br />
//                     <span className="text-sm text-gray-500">{test.description}</span>
//                   </div>
//                   <div className="text-right">
//                     <span className="block font-medium text-green-700">₹{test.cost}</span>
//                     <input
//                       type="checkbox"
//                       checked={selectedTests.includes(test.name)}
//                       onChange={() => handleTestSelection(test.name)}
//                     />
//                   </div>
//                 </label>
//               ))}
//               <div className="mt-4 font-bold text-lg text-right">
//                 Total: ₹{calculateTotal()}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;















// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const LabsPerPage = 6;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);

//   const [search, setSearch] = useState('');
//   const [clinicFilter, setClinicFilter] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         const token =
//           localStorage.getItem("patientToken") ||
//           localStorage.getItem("doctorToken");

//         if (!token) {
//           setError("Unauthorized access.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load labs.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLabs();
//   }, []);

//   const clinicOptions = [...new Set(labs.map(l => l.clinicId?.name).filter(Boolean))];

//   // 🔍 Filter logic
//   useEffect(() => {
//     const filtered = labs.filter(lab =>
//       (lab.name?.toLowerCase().includes(search.toLowerCase()) ||
//         lab.email?.toLowerCase().includes(search.toLowerCase())) &&
//       (clinicFilter ? lab.clinicId?.name === clinicFilter : true)
//     );

//     setFilteredLabs(filtered);
//     setCurrentPage(1); // reset to page 1 on filter
//   }, [search, clinicFilter, labs]);

//   const handleTestSelection = (testName) => {
//     setSelectedTests(prev =>
//       prev.includes(testName)
//         ? prev.filter(name => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter(test => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   const handleBooking = async () => {
//     try {
//       const token = localStorage.getItem("patientToken");
//       const userId = localStorage.getItem("userId"); // You should set this when logging in

//       if (!token || !userId) {
//         setError("Unauthorized. Please log in.");
//         return;
//       }

//       if (selectedTests.length === 0) {
//         setError("Please select at least one test.");
//         return;
//       }

//       await axios.post(`http://localhost:5000/api/labs/${selectedLab._id}/book`, {
//         patientId: userId,
//         selectedTests
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setSuccess("Booking confirmed successfully!");
//       setError('');
//       setSelectedTests([]);
//       setSelectedLab(null);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Booking failed.");
//       setSuccess('');
//     }
//   };

//   // 🔢 Pagination logic
//   const indexOfLastLab = currentPage * LabsPerPage;
//   const indexOfFirstLab = indexOfLastLab - LabsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
//   const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

//   if (loading) return <div className="text-center py-10 text-blue-500">Loading labs...</div>;
//   if (error && !selectedLab) return <div className="text-center py-10 text-red-500">{error}</div>;

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">All Registered Labs</h2>

//       {/* 🔍 Search & Filter */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search labs by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded"
//         />
//         <select
//           value={clinicFilter}
//           onChange={(e) => setClinicFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="">All Clinics</option>
//           {clinicOptions.map((clinic) => (
//             <option key={clinic} value={clinic}>{clinic}</option>
//           ))}
//         </select>
//       </div>

//       {/* ✅ Success/Error messages */}
//       {success && <div className="text-green-600 font-semibold mb-4">{success}</div>}
//       {error && selectedLab && <div className="text-red-600 font-semibold mb-4">{error}</div>}

//       {/* 🧪 Labs List */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentLabs.map((lab) => (
//           <div key={lab._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
//             <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//             <p>Email: {lab.email}</p>
//             <p>Phone: {lab.phone}</p>
//             <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
//             <button
//               className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//               onClick={() => {
//                 setSelectedLab(lab);
//                 setSelectedTests([]);
//                 setError('');
//                 setSuccess('');
//               }}
//             >
//               View Tests
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* 🔘 Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex justify-center space-x-2">
//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               className={`px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white border"}`}
//               onClick={() => setCurrentPage(idx + 1)}
//             >
//               {idx + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* 📋 Selected Lab's Tests */}
//       {selectedLab && (
//         <div className="mt-10 bg-white p-6 rounded shadow-lg">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Available Tests at {selectedLab.name}
//           </h3>
//           {selectedLab.availableTests.length === 0 ? (
//             <p className="text-gray-500">No tests available.</p>
//           ) : (
//             <div className="space-y-3">
//               {selectedLab.availableTests.map(test => (
//                 <label key={test.name} className="flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 cursor-pointer">
//                   <div>
//                     <strong>{test.name}</strong> ({test.department})<br />
//                     <span className="text-sm text-gray-500">{test.description}</span>
//                   </div>
//                   <div className="text-right">
//                     <span className="block font-medium text-green-700">₹{test.cost}</span>
//                     <input
//                       type="checkbox"
//                       checked={selectedTests.includes(test.name)}
//                       onChange={() => handleTestSelection(test.name)}
//                     />
//                   </div>
//                 </label>
//               ))}
//               <div className="mt-4 font-bold text-lg text-right">
//                 Total: ₹{calculateTotal()}
//               </div>

//               <div className="flex justify-end space-x-4 mt-4">
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                   onClick={() => setSelectedLab(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   onClick={handleBooking}
//                 >
//                   Confirm Booking
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;












// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const LabsPerPage = 6;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [search, setSearch] = useState("");
//   const [clinicFilter, setClinicFilter] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch all labs using ONLY patient token
//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) {
//           setError("Unauthorized access. Please log in as a patient.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//         setError("");
//       } catch (err) {
//         setError("Failed to load labs.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLabs();
//   }, []);

//   // Prepare unique clinic filter options
//   const clinicOptions = [
//     ...new Set(labs.map((l) => l.clinicId?.name).filter(Boolean)),
//   ];

//   // Filter labs based on search and clinic filter
//   useEffect(() => {
//     setError("");
//     setSuccess("");
//     const filtered = labs.filter(
//       (lab) =>
//         (lab.name?.toLowerCase().includes(search.toLowerCase()) ||
//           lab.email?.toLowerCase().includes(search.toLowerCase())) &&
//         (clinicFilter ? lab.clinicId?.name === clinicFilter : true)
//     );
//     setFilteredLabs(filtered);
//     setCurrentPage(1);
//   }, [search, clinicFilter, labs]);

//   // Toggle test selection
//   const handleTestSelection = (testName) => {
//     setSelectedTests((prev) =>
//       prev.includes(testName)
//         ? prev.filter((name) => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   // Calculate total cost of selected tests
//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter((test) => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   // Handle booking lab tests
//   const handleBooking = async () => {
//     setError("");
//     setSuccess("");
//     if (!selectedLab) return;

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("patientToken");


//       if (!token) {
//         setError("Unauthorized. Please log in as a patient.");
//         setBookingLoading(false);
//         return;
//       }

//       if (selectedTests.length === 0) {
//         setError("Please select at least one test.");
//         setBookingLoading(false);
//         return;
//       }

//       await axios.post(
//         `http://localhost:5000/api/labs/${selectedLab._id}/book`,
//         {
          
//           selectedTests,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("✅ Lab test booking confirmed!", {
//         duration: 4000,
//         position: "top-center",
//         style: {
//           border: "1px solid #4ade80",
//           padding: "16px",
//           color: "#166534",
//         },
//         icon: "🧪",
//       });

//       setSuccess("Booking confirmed successfully!");
//       setSelectedTests([]);
//       setSelectedLab(null);
//     } catch (err) {
//       console.error(err);
//       const msg = err.response?.data?.message || "Booking failed.";
//       toast.error(msg, { position: "top-center" });
//       setError(msg);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   // Pagination calculations
//   const indexOfLastLab = currentPage * LabsPerPage;
//   const indexOfFirstLab = indexOfLastLab - LabsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
//   const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

//   if (loading)
//     return (
//       <div className="text-center py-10 text-blue-500">Loading labs...</div>
//     );

//   if (error && !selectedLab)
//     return <div className="text-center py-10 text-red-500">{error}</div>;

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <Toaster position="top-center" reverseOrder={false} />

//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         All Registered Labs
//       </h2>

//       {/* Search & Filter */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search labs by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded"
//         />
//         <select
//           value={clinicFilter}
//           onChange={(e) => setClinicFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="">All Clinics</option>
//           {clinicOptions.map((clinic) => (
//             <option key={clinic} value={clinic}>
//               {clinic}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Success/Error Messages */}
//       {success && (
//         <div className="text-green-600 font-semibold mb-4">{success}</div>
//       )}
//       {error && selectedLab && (
//         <div className="text-red-600 font-semibold mb-4">{error}</div>
//       )}

//       {/* Labs List */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentLabs.map((lab) => (
//           <div
//             key={lab._id}
//             className="bg-white p-4 rounded shadow hover:shadow-lg transition"
//           >
//             <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//             <p>Email: {lab.email}</p>
//             <p>Phone: {lab.phone}</p>
//             <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
//             <button
//               className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//               onClick={() => {
//                 setSelectedLab(lab);
//                 setSelectedTests([]);
//                 setError("");
//                 setSuccess("");
//               }}
//             >
//               View Tests
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex justify-center space-x-2">
//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               className={`px-3 py-1 rounded ${
//                 currentPage === idx + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//               onClick={() => setCurrentPage(idx + 1)}
//             >
//               {idx + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Selected Lab Tests & Booking */}
//       {selectedLab && (
//         <div className="mt-10 bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Available Tests at {selectedLab.name}
//           </h3>
//           {selectedLab.availableTests.length === 0 ? (
//             <p className="text-gray-500">No tests available.</p>
//           ) : (
//             <div className="space-y-3">
//               {selectedLab.availableTests.map((test) => (
//                 <label
//                   key={test.name}
//                   className="flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 cursor-pointer"
//                 >
//                   <div>
//                     <strong>{test.name}</strong> ({test.department})
//                     <br />
//                     <span className="text-sm text-gray-500">
//                       {test.description}
//                     </span>
//                   </div>
//                   <div className="text-right">
//                     <span className="block font-medium text-green-700">
//                       ₹{test.cost}
//                     </span>
//                     <input
//                       type="checkbox"
//                       checked={selectedTests.includes(test.name)}
//                       onChange={() => handleTestSelection(test.name)}
//                     />
//                   </div>
//                 </label>
//               ))}
//               <div className="mt-4 font-bold text-lg text-right">
//                 Total: ₹{calculateTotal()}
//               </div>

//               <div className="flex justify-end space-x-4 mt-4">
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                   onClick={() => setSelectedLab(null)}
//                   disabled={bookingLoading}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={`px-4 py-2 rounded text-white ${
//                     bookingLoading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//                   onClick={handleBooking}
//                   disabled={bookingLoading}
//                 >
//                   {bookingLoading ? "Booking..." : "Confirm Booking"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;








// LabDashboard.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const LabsPerPage = 6;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [search, setSearch] = useState("");
//   const [clinicFilter, setClinicFilter] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch labs
//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) {
//           setError("Unauthorized access. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//       } catch (err) {
//         setError("Failed to load labs.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLabs();
//   }, []);

//   // Filter logic
//   useEffect(() => {
//     const filtered = labs.filter(
//       (lab) =>
//         (lab.name?.toLowerCase().includes(search.toLowerCase()) ||
//           lab.email?.toLowerCase().includes(search.toLowerCase())) &&
//         (clinicFilter ? lab.clinicId?.name === clinicFilter : true)
//     );
//     setFilteredLabs(filtered);
//     setCurrentPage(1);
//   }, [search, clinicFilter, labs]);

//   const handleTestSelection = (testName) => {
//     setSelectedTests((prev) =>
//       prev.includes(testName)
//         ? prev.filter((name) => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter((test) => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   const handleBooking = async () => {
//     setError("");
//     setSuccess("");

//     if (!selectedLab || selectedTests.length === 0) {
//       setError("Please select at least one test.");
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("patientToken");
//       if (!token) {
//         setError("Unauthorized. Please log in.");
//         return;
//       }

//       await axios.post(
//         `http://localhost:5000/api/labs/${selectedLab._id}/book`,
//         { selectedTests },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("✅ Lab test booking confirmed!", {
//         duration: 4000,
//         position: "top-center",
//       });

//       setSuccess("Booking confirmed successfully!");
//       setSelectedTests([]);
//       setSelectedLab(null);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Booking failed.";
//       toast.error(msg, { position: "top-center" });
//       setError(msg);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   // Pagination
//   const indexOfLastLab = currentPage * LabsPerPage;
//   const indexOfFirstLab = indexOfLastLab - LabsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
//   const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

//   const clinicOptions = [
//     ...new Set(labs.map((l) => l.clinicId?.name).filter(Boolean)),
//   ];

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">All Registered Labs</h2>

//       {/* Search and Filter */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search labs by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded"
//         />
//         <select
//           value={clinicFilter}
//           onChange={(e) => setClinicFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="">All Clinics</option>
//           {clinicOptions.map((clinic) => (
//             <option key={clinic} value={clinic}>
//               {clinic}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Labs List */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentLabs.map((lab) => (
//           <div
//             key={lab._id}
//             className="bg-white p-4 rounded shadow hover:shadow-lg transition"
//           >
//             <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//             <p>Email: {lab.email}</p>
//             <p>Phone: {lab.phone}</p>
//             <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
//             <button
//               className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//               onClick={() => {
//                 setSelectedLab(lab);
//                 setSelectedTests([]);
//                 setError("");
//                 setSuccess("");
//               }}
//             >
//               View Tests
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex justify-center space-x-2">
//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               className={`px-3 py-1 rounded ${
//                 currentPage === idx + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//               onClick={() => setCurrentPage(idx + 1)}
//             >
//               {idx + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Selected Lab Test List */}
//       {selectedLab && (
//         <div className="mt-10 bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Available Tests at {selectedLab.name}
//           </h3>
//           {selectedLab.availableTests.length === 0 ? (
//             <p>No tests available.</p>
//           ) : (
//             <div className="space-y-3">
//               {selectedLab.availableTests.map((test) => (
//                 <label
//                   key={test.name}
//                   className="flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50"
//                 >
//                   <div>
//                     <strong>{test.name}</strong> ({test.department})<br />
//                     <span className="text-sm text-gray-500">{test.description}</span>
//                   </div>
//                   <div className="text-right">
//                     ₹{test.cost}
//                     <br />
//                     <input
//                       type="checkbox"
//                       checked={selectedTests.includes(test.name)}
//                       onChange={() => handleTestSelection(test.name)}
//                     />
//                   </div>
//                 </label>
//               ))}
//               <div className="mt-4 font-bold text-lg text-right">
//                 Total: ₹{calculateTotal()}
//               </div>
//               <div className="flex justify-end gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={() => setSelectedLab(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={`px-4 py-2 text-white rounded ${
//                     bookingLoading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//                   onClick={handleBooking}
//                   disabled={bookingLoading}
//                 >
//                   {bookingLoading ? "Booking..." : "Confirm Booking"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;








// final

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const LabsPerPage = 6;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [prescribedLabsTests, setPrescribedLabsTests] = useState({});
//   const [search, setSearch] = useState("");
//   const [clinicFilter, setClinicFilter] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch all labs
//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) {
//           setError("Unauthorized access. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//       } catch (err) {
//         setError("Failed to load labs.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLabs();
//   }, []);

//   // Fetch prescribed labs + tests
//   useEffect(() => {
//     const fetchPrescribedLabs = async () => {
//       try {
//         const token = localStorage.getItem("patientToken");
//         if (!token) return;

//        const res = await axios.get(
//   "http://localhost:5000/api/patient/suggestedLabs",
//   {
//     headers: { Authorization: `Bearer ${token}` },
//   }
// );

//         // Format response into { labId: [test1, test2] }
//         const labTestsMap = {};
//         res.data.forEach(({ labId, tests }) => {
//           labTestsMap[labId] = tests;
//         });

//         setPrescribedLabsTests(labTestsMap);
//       } catch (err) {
//         // Optionally handle errors here
//       }
//     };

//     fetchPrescribedLabs();
//   }, []);

//   // Filter labs on search or clinic filter
//   useEffect(() => {
//     const filtered = labs.filter(
//       (lab) =>
//         (lab.name?.toLowerCase().includes(search.toLowerCase()) ||
//           lab.email?.toLowerCase().includes(search.toLowerCase())) &&
//         (clinicFilter ? lab.clinicId?.name === clinicFilter : true)
//     );
//     setFilteredLabs(filtered);
//     setCurrentPage(1);
//   }, [search, clinicFilter, labs]);

//   const handleTestSelection = (testName) => {
//     setSelectedTests((prev) =>
//       prev.includes(testName)
//         ? prev.filter((name) => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter((test) => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   const handleBooking = async () => {
//     setError("");
//     setSuccess("");

//     if (!selectedLab || selectedTests.length === 0) {
//       setError("Please select at least one test.");
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("patientToken");
//       if (!token) {
//         setError("Unauthorized. Please log in.");
//         return;
//       }

//       await axios.post(
//         `http://localhost:5000/api/labs/${selectedLab._id}/book`,
//         { selectedTests },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("✅ Lab test booking confirmed!", {
//         duration: 4000,
//         position: "top-center",
//       });

//       setSuccess("Booking confirmed successfully!");
//       setSelectedTests([]);
//       setSelectedLab(null);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Booking failed.";
//       toast.error(msg, { position: "top-center" });
//       setError(msg);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   // Pagination
//   const indexOfLastLab = currentPage * LabsPerPage;
//   const indexOfFirstLab = indexOfLastLab - LabsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
//   const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

//   const clinicOptions = [
//     ...new Set(labs.map((l) => l.clinicId?.name).filter(Boolean)),
//   ];

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">All Registered Labs</h2>

//       {/* Search and Filter */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search labs by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded"
//         />
//         <select
//           value={clinicFilter}
//           onChange={(e) => setClinicFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="">All Clinics</option>
//           {clinicOptions.map((clinic) => (
//             <option key={clinic} value={clinic}>
//               {clinic}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Labs List */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentLabs.map((lab) => {
//           const isPrescribed = prescribedLabsTests.hasOwnProperty(lab._id);

//           return (
//             <div
//               key={lab._id}
//               className={`bg-white p-4 rounded shadow hover:shadow-lg transition ${
//                 isPrescribed ? "border-4 border-green-500" : ""
//               }`}
//             >
//               <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//               <p>Email: {lab.email}</p>
//               <p>Phone: {lab.phone}</p>
//               <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
//               {isPrescribed && (
//                 <p className="text-green-600 font-semibold mt-1">Prescribed Lab</p>
//               )}
//               <button
//                 className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//                 onClick={() => {
//                   setSelectedLab(lab);
//                   // Pre-select prescribed tests if any
//                   setSelectedTests(prescribedLabsTests[lab._id] || []);
//                   setError("");
//                   setSuccess("");
//                 }}
//               >
//                 View Tests
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex justify-center space-x-2">
//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               className={`px-3 py-1 rounded ${
//                 currentPage === idx + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//               onClick={() => setCurrentPage(idx + 1)}
//             >
//               {idx + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Selected Lab Test List */}
//       {selectedLab && (
//         <div className="mt-10 bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Available Tests at {selectedLab.name}
//           </h3>
//           {selectedLab.availableTests.length === 0 ? (
//             <p>No tests available.</p>
//           ) : (
//             <div className="space-y-3">
//               {selectedLab.availableTests.map((test) => {
//                 const isPrescribedTest =
//                   prescribedLabsTests[selectedLab._id]?.includes(test.name);
//                 return (
//                   <label
//                     key={test.name}
//                     className={`flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 ${
//                       isPrescribedTest ? "bg-green-100" : ""
//                     }`}
//                   >
//                     <div>
//                       <strong>{test.name}</strong> ({test.department})
//                       <br />
//                       <span className="text-sm text-gray-500">
//                         {test.description}
//                       </span>
//                     </div>
//                     <div className="text-right">
//                       ₹{test.cost}
//                       <br />
//                       <input
//                         type="checkbox"
//                         checked={selectedTests.includes(test.name)}
//                         onChange={() => handleTestSelection(test.name)}
//                       />
//                     </div>
//                   </label>
//                 );
//               })}
//               <div className="mt-4 font-bold text-lg text-right">
//                 Total: ₹{calculateTotal()}
//               </div>
//               <div className="flex justify-end gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={() => setSelectedLab(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={`px-4 py-2 text-white rounded ${
//                     bookingLoading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//                   onClick={handleBooking}
//                   disabled={bookingLoading}
//                 >
//                   {bookingLoading ? "Booking..." : "Confirm Booking"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const LabsPerPage = 6;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [prescribedLabsTests, setPrescribedLabsTests] = useState({});
//   const [search, setSearch] = useState("");
//   const [clinicFilter, setClinicFilter] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // ✅ Fetch all labs
//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) throw new Error("Unauthorized access");

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//       } catch (err) {
//         toast.error("Failed to load labs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLabs();
//   }, []);

//   // ✅ Fetch suggested labs + tests
//   useEffect(() => {
//     const fetchPrescribedLabs = async () => {
//       try {
//         const token = localStorage.getItem("patientToken");
//         if (!token) return;

//         const res = await axios.get(
//           "http://localhost:5000/api/patient/suggestedLabs",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const labTestsMap = {};
//         res.data.forEach(({ labId, tests }) => {
//           labTestsMap[labId] = tests;
//         });

//         setPrescribedLabsTests(labTestsMap);
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching suggested labs");
//       }
//     };

//     fetchPrescribedLabs();
//   }, []);

//   // ✅ Search & filter
//   useEffect(() => {
//     const filtered = labs.filter(
//       (lab) =>
//         (lab.name?.toLowerCase().includes(search.toLowerCase()) ||
//           lab.email?.toLowerCase().includes(search.toLowerCase())) &&
//         (clinicFilter ? lab.clinicId?.name === clinicFilter : true)
//     );
//     setFilteredLabs(filtered);
//     setCurrentPage(1);
//   }, [search, clinicFilter, labs]);

//   const handleTestSelection = (testName) => {
//     setSelectedTests((prev) =>
//       prev.includes(testName)
//         ? prev.filter((name) => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter((test) => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   const handleBooking = async () => {
//     setError("");
//     setSuccess("");

//     if (!selectedLab || selectedTests.length === 0) {
//       setError("Please select at least one test.");
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("patientToken");
//       if (!token) throw new Error("Unauthorized");

//       await axios.post(
//         `http://localhost:5000/api/labs/${selectedLab._id}/book`,
//         { selectedTests },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("✅ Booking confirmed!");
//       setSuccess("Booking confirmed successfully!");
//       setSelectedTests([]);
//       setSelectedLab(null);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Booking failed.";
//       toast.error(msg);
//       setError(msg);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const indexOfLastLab = currentPage * LabsPerPage;
//   const indexOfFirstLab = indexOfLastLab - LabsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
//   const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

//   const clinicOptions = [
//     ...new Set(labs.map((l) => l.clinicId?.name).filter(Boolean)),
//   ];

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">All Registered Labs</h2>

//       {/* Search and Filter */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search labs by name or email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border rounded"
//         />
//         <select
//           value={clinicFilter}
//           onChange={(e) => setClinicFilter(e.target.value)}
//           className="px-4 py-2 border rounded"
//         >
//           <option value="">All Clinics</option>
//           {clinicOptions.map((clinic) => (
//             <option key={clinic} value={clinic}>
//               {clinic}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Lab Cards */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {currentLabs.map((lab) => {
//           const labIdStr = lab._id?.toString();
//           const isPrescribed = prescribedLabsTests.hasOwnProperty(labIdStr);

//           return (
//             <div
//               key={lab._id}
//               className={`bg-white p-4 rounded shadow hover:shadow-lg transition ${
//                 isPrescribed ? "border-4 border-green-500" : ""
//               }`}
//             >
//               <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//               <p>Email: {lab.email}</p>
//               <p>Phone: {lab.phone}</p>
//               <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
//               {isPrescribed && (
//                 <p className="text-green-600 font-semibold mt-1">Prescribed Lab</p>
//               )}
//               <button
//                 className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//                 onClick={() => {
//                   setSelectedLab(lab);
//                   setSelectedTests(prescribedLabsTests[labIdStr] || []);
//                   setError("");
//                   setSuccess("");
//                 }}
//               >
//                 View Tests
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6 flex justify-center space-x-2">
//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               className={`px-3 py-1 rounded ${
//                 currentPage === idx + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-white border"
//               }`}
//               onClick={() => setCurrentPage(idx + 1)}
//             >
//               {idx + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Selected Lab Modal */}
//       {selectedLab && (
//         <div className="mt-10 bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Available Tests at {selectedLab.name}
//           </h3>
//           {selectedLab.availableTests.length === 0 ? (
//             <p>No tests available.</p>
//           ) : (
//             <div className="space-y-3">
//               {selectedLab.availableTests.map((test) => {
//                 const isPrescribedTest =
//                   prescribedLabsTests[selectedLab._id?.toString()]?.includes(test.name);
//                 return (
//                   <label
//                     key={test.name}
//                     className={`flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 ${
//                       isPrescribedTest ? "bg-green-100" : ""
//                     }`}
//                   >
//                     <div>
//                       <strong>{test.name}</strong> ({test.department})
//                       <br />
//                       <span className="text-sm text-gray-500">
//                         {test.description}
//                       </span>
//                     </div>
//                     <div className="text-right">
//                       ₹{test.cost}
//                       <br />
//                       <input
//                         type="checkbox"
//                         checked={selectedTests.includes(test.name)}
//                         onChange={() => handleTestSelection(test.name)}
//                       />
//                     </div>
//                   </label>
//                 );
//               })}
//               <div className="mt-4 font-bold text-lg text-right">
//                 Total: ₹{calculateTotal()}
//               </div>
//               <div className="flex justify-end gap-4 mt-4">
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded"
//                   onClick={() => setSelectedLab(null)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className={`px-4 py-2 text-white rounded ${
//                     bookingLoading
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//                   onClick={handleBooking}
//                   disabled={bookingLoading}
//                 >
//                   {bookingLoading ? "Booking..." : "Confirm Booking"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;









// fnnnall

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const LabsPerPage = 6;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [prescribedLabsTests, setPrescribedLabsTests] = useState({});
//   const [search, setSearch] = useState("");
//   const [clinicFilter, setClinicFilter] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loadingLabs, setLoadingLabs] = useState(true);
//   const [loadingSuggestedLabs, setLoadingSuggestedLabs] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch all labs
//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         setLoadingLabs(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) throw new Error("Unauthorized access");

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//       } catch (err) {
//         toast.error("Failed to load labs");
//       } finally {
//         setLoadingLabs(false);
//       }
//     };

//     fetchLabs();
//   }, []);

//   // Fetch suggested labs + tests
//   useEffect(() => {
//     const fetchPrescribedLabs = async () => {
//       try {
//         setLoadingSuggestedLabs(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) throw new Error("Unauthorized");

//         const res = await axios.get(
//           "http://localhost:5000/api/patients/suggestedLabs",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const labTestsMap = {};
//         res.data.forEach(({ labId, tests }) => {
//           labTestsMap[labId] = tests;
//         });

//         setPrescribedLabsTests(labTestsMap);
//       } catch (err) {
//         console.error(err);
//         toast.error("Error fetching suggested labs");
//       } finally {
//         setLoadingSuggestedLabs(false);
//       }
//     };

//     fetchPrescribedLabs();
//   }, []);

//   // Search & filter labs
//   useEffect(() => {
//     const filtered = labs.filter(
//       (lab) =>
//         (lab.name?.toLowerCase().includes(search.toLowerCase()) ||
//           lab.email?.toLowerCase().includes(search.toLowerCase())) &&
//         (clinicFilter ? lab.clinicId?.name === clinicFilter : true)
//     );
//     setFilteredLabs(filtered);
//     setCurrentPage(1);
//   }, [search, clinicFilter, labs]);

//   const handleTestSelection = (testName) => {
//     setSelectedTests((prev) =>
//       prev.includes(testName)
//         ? prev.filter((name) => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter((test) => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   const handleBooking = async () => {
//     setError("");
//     setSuccess("");

//     if (!selectedLab || selectedTests.length === 0) {
//       setError("Please select at least one test.");
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("patientToken");
//       if (!token) throw new Error("Unauthorized");

//       await axios.post(
//         `http://localhost:5000/api/labs/${selectedLab._id}/book`,
//         { selectedTests },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("✅ Booking confirmed!");
//       setSuccess("Booking confirmed successfully!");
//       setSelectedTests([]);
//       setSelectedLab(null);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Booking failed.";
//       toast.error(msg);
//       setError(msg);
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const indexOfLastLab = currentPage * LabsPerPage;
//   const indexOfFirstLab = indexOfLastLab - LabsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
//   const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

//   const clinicOptions = [
//     ...new Set(labs.map((l) => l.clinicId?.name).filter(Boolean)),
//   ];

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">All Registered Labs</h2>

//       {(loadingLabs || loadingSuggestedLabs) ? (
//         <p>Loading labs and suggested labs...</p>
//       ) : (
//         <>
//           {/* Search and Filter */}
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
//             <input
//               type="text"
//               placeholder="Search labs by name or email"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="px-4 py-2 border rounded"
//             />
//             <select
//               value={clinicFilter}
//               onChange={(e) => setClinicFilter(e.target.value)}
//               className="px-4 py-2 border rounded"
//             >
//               <option value="">All Clinics</option>
//               {clinicOptions.map((clinic) => (
//                 <option key={clinic} value={clinic}>
//                   {clinic}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Lab Cards */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentLabs.length === 0 && <p>No labs found.</p>}
//             {currentLabs.map((lab) => {
//               const labIdStr = lab._id?.toString();
//               const isPrescribed = prescribedLabsTests.hasOwnProperty(labIdStr);

//               return (
//                 <div
//                   key={lab._id}
//                   className={`bg-white p-4 rounded shadow hover:shadow-lg transition ${
//                     isPrescribed ? "border-4 border-green-500" : ""
//                   }`}
//                 >
//                   <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//                   <p>Email: {lab.email}</p>
//                   <p>Phone: {lab.phone}</p>
//                   <p>Clinic: {lab.clinicId?.name || "N/A"}</p>
//                   {isPrescribed && (
//                     <p className="text-green-600 font-semibold mt-1">Prescribed Lab</p>
//                   )}
//                   <button
//                     className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//                     onClick={() => {
//                       setSelectedLab(lab);
//                       setSelectedTests(prescribedLabsTests[labIdStr] || []);
//                       setError("");
//                       setSuccess("");
//                     }}
//                   >
//                     View Tests
//                   </button>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex justify-center space-x-2">
//               {[...Array(totalPages)].map((_, idx) => (
//                 <button
//                   key={idx}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === idx + 1
//                       ? "bg-blue-600 text-white"
//                       : "bg-white border"
//                   }`}
//                   onClick={() => setCurrentPage(idx + 1)}
//                 >
//                   {idx + 1}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Selected Lab Modal */}
//           {selectedLab && (
//             <div className="mt-10 bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Available Tests at {selectedLab.name}
//               </h3>
//               {selectedLab.availableTests.length === 0 ? (
//                 <p>No tests available.</p>
//               ) : (
//                 <>
//                   <div className="space-y-3">
//                     {selectedLab.availableTests.map((test) => {
//                       const isPrescribedTest =
//                         prescribedLabsTests[selectedLab._id?.toString()]?.includes(
//                           test.name
//                         );
//                       return (
//                         <label
//                           key={test.name}
//                           className={`flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 ${
//                             isPrescribedTest ? "bg-green-100" : ""
//                           }`}
//                         >
//                           <div>
//                             <strong>{test.name}</strong> ({test.department})
//                             <br />
//                             <span className="text-sm text-gray-500">
//                               {test.description}
//                             </span>
//                           </div>
//                           <div className="text-right">
//                             ₹{test.cost}
//                             <br />
//                             <input
//                               type="checkbox"
//                               checked={selectedTests.includes(test.name)}
//                               onChange={() => handleTestSelection(test.name)}
//                             />
//                           </div>
//                         </label>
//                       );
//                     })}
//                   </div>
//                   <div className="mt-4 font-bold text-lg text-right">
//                     Total: ₹{calculateTotal()}
//                   </div>
//                   {error && <p className="text-red-600 mt-2">{error}</p>}
//                   {success && <p className="text-green-600 mt-2">{success}</p>}
//                   <div className="flex justify-end gap-4 mt-4">
//                     <button
//                       className="px-4 py-2 bg-gray-300 rounded"
//                       onClick={() => setSelectedLab(null)}
//                       disabled={bookingLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className={`px-4 py-2 text-white rounded ${
//                         bookingLoading
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-green-600 hover:bg-green-700"
//                       }`}
//                       onClick={handleBooking}
//                       disabled={bookingLoading}
//                     >
//                       {bookingLoading ? "Booking..." : "Confirm Booking"}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const LabsPerPage = 6;

// const LabDashboard = () => {
//   const [labs, setLabs] = useState([]);
//   const [filteredLabs, setFilteredLabs] = useState([]);
//   const [prescribedLabsTests, setPrescribedLabsTests] = useState({});
//   const [selectedLab, setSelectedLab] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [search, setSearch] = useState("");
//   const [clinicFilter, setClinicFilter] = useState("");
//   const [showSuggestedOnly, setShowSuggestedOnly] = useState(false);
//   const [loadingLabs, setLoadingLabs] = useState(true);
//   const [loadingSuggestedLabs, setLoadingSuggestedLabs] = useState(true);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Fetch All Labs
//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         setLoadingLabs(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) throw new Error("Unauthorized");

//         const res = await axios.get("http://localhost:5000/api/labs/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setLabs(res.data);
//         setFilteredLabs(res.data);
//       } catch (err) {
//         toast.error("Failed to load labs");
//       } finally {
//         setLoadingLabs(false);
//       }
//     };

//     fetchLabs();
//   }, []);

//   // Fetch Suggested Labs + Tests
//   useEffect(() => {
//     const fetchSuggestedLabs = async () => {
//       try {
//         setLoadingSuggestedLabs(true);
//         const token = localStorage.getItem("patientToken");
//         if (!token) throw new Error("Unauthorized");

//         const res = await axios.get(
//           "http://localhost:5000/api/patients/suggestedLabs",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const suggestions = {};
//         res.data.forEach(({ labName, tests }) => {
//           suggestions[labName] = tests;
//         });

//         setPrescribedLabsTests(suggestions);
//       } catch (err) {
//         toast.error("Error fetching suggested labs");
//       } finally {
//         setLoadingSuggestedLabs(false);
//       }
//     };

//     fetchSuggestedLabs();
//   }, []);

//   // Filter Labs based on search/filter/toggle
//   useEffect(() => {
//     const result = labs.filter((lab) => {
//       const matchesSearch =
//         lab.name.toLowerCase().includes(search.toLowerCase()) ||
//         lab.email.toLowerCase().includes(search.toLowerCase());

//       const matchesClinic = clinicFilter
//         ? lab.clinicId?.name === clinicFilter
//         : true;

//       const isSuggested = prescribedLabsTests.hasOwnProperty(lab.name);

//       return (
//         matchesSearch &&
//         matchesClinic &&
//         (showSuggestedOnly ? isSuggested : true)
//       );
//     });

//     setFilteredLabs(result);
//     setCurrentPage(1);
//   }, [search, clinicFilter, showSuggestedOnly, labs, prescribedLabsTests]);

//   const handleTestSelection = (testName) => {
//     setSelectedTests((prev) =>
//       prev.includes(testName)
//         ? prev.filter((name) => name !== testName)
//         : [...prev, testName]
//     );
//   };

//   const calculateTotal = () => {
//     if (!selectedLab) return 0;
//     return selectedLab.availableTests
//       .filter((test) => selectedTests.includes(test.name))
//       .reduce((sum, test) => sum + (test.cost || 0), 0);
//   };

//   const handleBooking = async () => {
//     setError("");
//     setSuccess("");

//     if (!selectedLab || selectedTests.length === 0) {
//       setError("Please select at least one test.");
//       return;
//     }

//     try {
//       setBookingLoading(true);
//       const token = localStorage.getItem("patientToken");

//       await axios.post(
//         `http://localhost:5000/api/labs/${selectedLab._id}/book`,
//         { selectedTests },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Booking confirmed!");
//       setSelectedTests([]);
//       setSelectedLab(null);
//     } catch (err) {
//       toast.error("Booking failed");
//       setError("Booking failed");
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   const indexOfLastLab = currentPage * LabsPerPage;
//   const indexOfFirstLab = indexOfLastLab - LabsPerPage;
//   const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
//   const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

//   const clinicOptions = [
//     ...new Set(labs.map((lab) => lab.clinicId?.name).filter(Boolean)),
//   ];

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-screen">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Lab Dashboard</h2>

//       {(loadingLabs || loadingSuggestedLabs) ? (
//         <p>Loading labs...</p>
//       ) : (
//         <>
//           {/* Filter Section */}
//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search labs by name or email"
//               className="px-4 py-2 border rounded"
//             />

//             <select
//               value={clinicFilter}
//               onChange={(e) => setClinicFilter(e.target.value)}
//               className="px-4 py-2 border rounded"
//             >
//               <option value="">All Clinics</option>
//               {clinicOptions.map((clinic) => (
//                 <option key={clinic} value={clinic}>
//                   {clinic}
//                 </option>
//               ))}
//             </select>

//             <label className="flex items-center space-x-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={showSuggestedOnly}
//                 onChange={() => setShowSuggestedOnly(!showSuggestedOnly)}
//               />
//               <span>Show Suggested Labs Only</span>
//             </label>
//           </div>

//           {/* Lab Cards */}
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {currentLabs.length === 0 ? (
//               <p>No labs found.</p>
//             ) : (
//               currentLabs.map((lab) => {
//                 const isSuggested = prescribedLabsTests.hasOwnProperty(lab.name);

//                 return (
//                   <div
//                     key={lab._id}
//                     className={`bg-white p-4 rounded shadow hover:shadow-lg transition ${
//                       isSuggested ? "border-4 border-green-500" : ""
//                     }`}
//                   >
//                     <h4 className="font-bold text-blue-700 text-lg">{lab.name}</h4>
//                     <p>Email: {lab.email}</p>
//                     <p>Phone: {lab.phone}</p>
//                     <p>Clinic: {lab.clinicId?.name || "N/A"}</p>

//                     {isSuggested && (
//                       <p className="text-green-600 font-semibold mt-1">
//                         Prescribed Lab
//                       </p>
//                     )}

//                     <button
//                       onClick={() => {
//                         setSelectedLab(lab);
//                         setSelectedTests(prescribedLabsTests[lab.name] || []);
//                       }}
//                       className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
//                     >
//                       View Tests
//                     </button>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex justify-center space-x-2">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-3 py-1 rounded ${
//                     currentPage === i + 1
//                       ? "bg-blue-600 text-white"
//                       : "bg-white border"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Test Selection Modal */}
//           {selectedLab && (
//             <div className="mt-10 bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 Available Tests at {selectedLab.name}
//               </h3>

//               {selectedLab.availableTests.length === 0 ? (
//                 <p>No tests available.</p>
//               ) : (
//                 <>
//                   <div className="space-y-3">
//                     {selectedLab.availableTests.map((test) => {
//                       const isPrescribed =
//                         prescribedLabsTests[selectedLab.name]?.includes(test.name);
//                       return (
//                         <label
//                           key={test.name}
//                           className={`flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 ${
//                             isPrescribed ? "bg-green-100" : ""
//                           }`}
//                         >
//                           <div>
//                             <strong>{test.name}</strong> ({test.department})
//                             <br />
//                             <span className="text-sm text-gray-500">
//                               {test.description}
//                             </span>
//                           </div>
//                           <div className="text-right">
//                             ₹{test.cost}
//                             <br />
//                             <input
//                               type="checkbox"
//                               checked={selectedTests.includes(test.name)}
//                               onChange={() => handleTestSelection(test.name)}
//                             />
//                           </div>
//                         </label>
//                       );
//                     })}
//                   </div>

//                   <div className="mt-4 font-bold text-lg text-right">
//                     Total: ₹{calculateTotal()}
//                   </div>

//                   {error && <p className="text-red-600 mt-2">{error}</p>}
//                   {success && <p className="text-green-600 mt-2">{success}</p>}

//                   <div className="flex justify-end gap-4 mt-4">
//                     <button
//                       className="px-4 py-2 bg-gray-300 rounded"
//                       onClick={() => setSelectedLab(null)}
//                       disabled={bookingLoading}
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className={`px-4 py-2 text-white rounded ${
//                         bookingLoading
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-green-600 hover:bg-green-700"
//                       }`}
//                       onClick={handleBooking}
//                       disabled={bookingLoading}
//                     >
//                       {bookingLoading ? "Booking..." : "Confirm Booking"}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default LabDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LabsPerPage = 6;

const LabDashboard = () => {
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [prescribedLabsTests, setPrescribedLabsTests] = useState({});
  const [selectedLab, setSelectedLab] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [search, setSearch] = useState("");
  const [clinicFilter, setClinicFilter] = useState("");
  const [showSuggestedOnly, setShowSuggestedOnly] = useState(false);
  const [loadingLabs, setLoadingLabs] = useState(true);
  const [loadingSuggestedLabs, setLoadingSuggestedLabs] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultationId, setSelectedConsultationId] = useState("");

  // Fetch Labs
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        setLoadingLabs(true);
        const token = localStorage.getItem("patientToken");
        if (!token) throw new Error("Unauthorized");

        const res = await axios.get("http://localhost:5000/api/labs/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLabs(res.data);
        setFilteredLabs(res.data);
      } catch {
        toast.error("Failed to load labs please login");
      } finally {
        setLoadingLabs(false);
      }
    };

    fetchLabs();
  }, []);

  // Fetch Suggested Labs + Tests
  useEffect(() => {
    const fetchSuggestedLabs = async () => {
      try {
        setLoadingSuggestedLabs(true);
        const token = localStorage.getItem("patientToken");

        const res = await axios.get(
          "http://localhost:5000/api/patients/suggestedLabs",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const suggestions = {};
        res.data.forEach(({ labName, tests }) => {
          suggestions[labName] = tests;
        });

        setPrescribedLabsTests(suggestions);
      } catch {
        toast.error("Error fetching suggested labs  please login first");
      } finally {
        setLoadingSuggestedLabs(false);
      }
    };

    fetchSuggestedLabs();
  }, []);

  // Filter Labs
  useEffect(() => {
    const result = labs.filter((lab) => {
      const matchesSearch =
        lab.name.toLowerCase().includes(search.toLowerCase()) ||
        lab.email.toLowerCase().includes(search.toLowerCase());

      const matchesClinic = clinicFilter
        ? lab.clinicId?.name === clinicFilter
        : true;

      const isSuggested = prescribedLabsTests.hasOwnProperty(lab.name);

      return (
        matchesSearch &&
        matchesClinic &&
        (showSuggestedOnly ? isSuggested : true)
      );
    });

    setFilteredLabs(result);
    setCurrentPage(1);
  }, [search, clinicFilter, showSuggestedOnly, labs, prescribedLabsTests]);

  const handleTestSelection = (testName) => {
    setSelectedTests((prev) =>
      prev.includes(testName)
        ? prev.filter((name) => name !== testName)
        : [...prev, testName]
    );
  };

  const calculateTotal = () => {
    if (!selectedLab) return 0;
    return selectedLab.availableTests
      .filter((test) => selectedTests.includes(test.name))
      .reduce((sum, test) => sum + (test.cost || 0), 0);
  };

  const fetchConsultations = async () => {
    try {
      const token = localStorage.getItem("patientToken");
      const res = await axios.get(
        "http://localhost:5000/api/patients/my-consultations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const withPrescriptions = res.data.filter(
        (c) => c.prescriptions && c.prescriptions.length > 0
      );
      setConsultations(withPrescriptions);
    } catch {
      toast.error("Failed to load consultations.");
    }
  };

  const handleBooking = async () => {
    setError("");
    if (!selectedLab || selectedTests.length === 0) {
      setError("Please select at least one test.");
      return;
    }

    await fetchConsultations();
  };

  const handleFinalBooking = async () => {
    setError("");
    if (!selectedConsultationId) {
      setError("Please select a consultation.");
      return;
    }

    try {
      setBookingLoading(true);
      const token = localStorage.getItem("patientToken");

      const consultation = consultations.find(
        (c) => c._id === selectedConsultationId
      );
console.log('consultation',consultation);

      await axios.post(
        `http://localhost:5000/api/labs/${selectedLab._id}/book`,
        {
          selectedTests,
          consultationId: selectedConsultationId,
          prescription: consultation.prescriptions,
        },
        
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Booking confirmed!");
      setSelectedLab(null);
      setSelectedTests([]);
      setSelectedConsultationId("");
      setConsultations([]);
    } catch {
      setError("Booking failed.");
      toast.error("Booking failed.");
    } finally {
      setBookingLoading(false);
    }
  };

  const indexOfLastLab = currentPage * LabsPerPage;
  const indexOfFirstLab = indexOfLastLab - LabsPerPage;
  const currentLabs = filteredLabs.slice(indexOfFirstLab, indexOfLastLab);
  const totalPages = Math.ceil(filteredLabs.length / LabsPerPage);

  const clinicOptions = [
    ...new Set(labs.map((lab) => lab.clinicId?.name).filter(Boolean)),
  ];

  return (
    <div className="px-6 py-8 bg-gray-100 min-h-screen">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Lab Dashboard</h2>

      {(loadingLabs || loadingSuggestedLabs) ? (
        <p>Loading labs...</p>
      ) : (
        <>
          {/* Filters */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search labs by name or email"
              className="px-4 py-2 border rounded"
            />

            <select
              value={clinicFilter}
              onChange={(e) => setClinicFilter(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="">All Clinics</option>
              {clinicOptions.map((clinic) => (
                <option key={clinic} value={clinic}>
                  {clinic}
                </option>
              ))}
            </select>

            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={showSuggestedOnly}
                onChange={() => setShowSuggestedOnly(!showSuggestedOnly)}
              />
              <span>Show Suggested Labs Only</span>
            </label>
          </div>

          {/* Labs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLabs.length === 0 ? (
              <p>No labs found.</p>
            ) : (
              currentLabs.map((lab) => {
                const isSuggested = prescribedLabsTests.hasOwnProperty(
                  lab.name
                );

                return (
                  <div
                    key={lab._id}
                    className={`bg-white p-4 rounded shadow hover:shadow-lg transition ${
                      isSuggested ? "border-4 border-green-500" : ""
                    }`}
                  >
                    <h4 className="font-bold text-blue-700 text-lg">
                      {lab.name}
                    </h4>
                    <p>Email: {lab.email}</p>
                    <p>Phone: {lab.phone}</p>
                    <p>Clinic: {lab.clinicId?.name || "N/A"}</p>

                    {isSuggested && (
                      <p className="text-green-600 font-semibold mt-1">
                        Prescribed Lab
                      </p>
                    )}

                    <button
                      onClick={() => {
                        setSelectedLab(lab);
                        setSelectedTests(prescribedLabsTests[lab.name] || []);
                        setConsultations([]);
                        setSelectedConsultationId("");
                      }}
                      className="mt-3 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      View Tests
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Test Modal */}
          {selectedLab && (
            <div className="mt-10 bg-white p-6 rounded shadow-lg max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Available Tests at {selectedLab.name}
              </h3>

              {selectedLab.availableTests.length === 0 ? (
                <p>No tests available.</p>
              ) : (
                <>
                  <div className="space-y-3">
                    {selectedLab.availableTests.map((test) => {
                      const isPrescribed =
                        prescribedLabsTests[selectedLab.name]?.includes(
                          test.name
                        );
                      return (
                        <label
                          key={test.name}
                          className={`flex justify-between items-center border px-4 py-2 rounded hover:bg-gray-50 ${
                            isPrescribed ? "bg-green-100" : ""
                          }`}
                        >
                          <div>
                            <strong>{test.name}</strong> ({test.department})
                            <br />
                            <span className="text-sm text-gray-500">
                              {test.description}
                            </span>
                          </div>
                          <div className="text-right">
                            ₹{test.cost}
                            <br />
                            <input
                              type="checkbox"
                              checked={selectedTests.includes(test.name)}
                              onChange={() => handleTestSelection(test.name)}
                            />
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-4 font-bold text-lg text-right">
                    Total: ₹{calculateTotal()}
                  </div>

                  {/* Consultation Selection */}
                  {consultations.length > 0 && (
                    <div className="mt-4">
                      <label className="block font-semibold mb-2">
                        Select Consultation:
                      </label>
                      <select
                        value={selectedConsultationId}
                        onChange={(e) =>
                          setSelectedConsultationId(e.target.value)
                        }
                        className="border rounded px-4 py-2 w-full"
                      >
                        <option value="">-- Select --</option>
                        {consultations.map((c) => (
                          <option key={c._id} value={c._id}>
                            {new Date(
                              c.consultationDate
                            ).toLocaleDateString()}{" "}
                            - Dr. {c.doctor?.name || "Doctor"}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {error && <p className="text-red-600 mt-2">{error}</p>}

                  {/* Booking Buttons */}
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded"
                      onClick={() => {
                        setSelectedLab(null);
                        setConsultations([]);
                      }}
                    >
                      Cancel
                    </button>

                    {consultations.length > 0 ? (
                      <button
                        onClick={handleFinalBooking}
                        disabled={bookingLoading}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        {bookingLoading ? "Booking..." : "Save Booking"}
                      </button>
                    ) : (
                      <button
                        onClick={handleBooking}
                        disabled={bookingLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {bookingLoading ? "Loading..." : "Confirm Booking"}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LabDashboard;
