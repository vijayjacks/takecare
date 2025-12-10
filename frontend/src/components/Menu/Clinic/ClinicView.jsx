


// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const ClinicView = () => {
// //   const { id } = useParams();
// //   const [clinic, setClinic] = useState(null);
// //   const [doctors, setDoctors] = useState([]);
// //   const [filteredDoctors, setFilteredDoctors] = useState([]);
// //   const [selectedSpec, setSelectedSpec] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [doctorLoading, setDoctorLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const doctorsPerPage = 6;

// //   const navigate = useNavigate();

// //   // Pagination indices
// //   const indexOfLast = currentPage * doctorsPerPage;
// //   const indexOfFirst = indexOfLast - doctorsPerPage;
// //   const currentDoctors = filteredDoctors.slice(indexOfFirst, indexOfLast);

// //   const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

// //   // Unique specializations from all doctors
// //   const specializations = [...new Set(doctors.map(doc => doc.specialization))];

// //   // Fetch clinic details
// //   useEffect(() => {
// //     const fetchClinic = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:5000/api/clinics/${id}`);
// //         setClinic(res.data);
// //       } catch (err) {
// //         setError('Failed to load clinic details');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchClinic();
// //   }, [id]);

// //   // Fetch all doctors once
// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         setDoctorLoading(true);
// //         const res = await axios.get(`http://localhost:5000/api/clinics/${id}/doctors`);
// //         setDoctors(res.data);
// //       } catch (err) {
// //         console.error(err);
// //         setError('Failed to load doctors');
// //       } finally {
// //         setDoctorLoading(false);
// //       }
// //     };
// //     fetchDoctors();
// //   }, [id]);

// //   // Apply filtering when selected specialization or doctor list changes
// //   useEffect(() => {
// //     if (selectedSpec) {
// //       setFilteredDoctors(doctors.filter(doc => doc.specialization === selectedSpec));
// //     } else {
// //       setFilteredDoctors(doctors);
// //     }
// //     setCurrentPage(1);
// //   }, [selectedSpec, doctors]);

// //   // Handle specialization filter change
// //   const handleSpecializationChange = (e) => {
// //     setSelectedSpec(e.target.value);
// //   };

// //   // Navigate to doctors dashboard with optional filter query param
// //   const handleNavigateToDashboard = () => {
// //     const query = selectedSpec ? `?specialization=${encodeURIComponent(selectedSpec)}` : '';
// //     navigate(`/doctors/dashboard${query}`);
// //   };

// //   // Loading and error states
// //   if (loading) return <div className="text-center py-10 text-blue-500">Loading clinic details...</div>;
// //   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
// //   if (!clinic) return null;

// //   return (
// //     <div className="min-h-screen bg-gray-100 px-4 py-8">
// //       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-lg">
// //         <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{clinic.name}</h2>
// //         <p className="text-gray-600 mt-1">{clinic.description || 'No description available.'}</p>

// //         <div className="mt-4 text-sm text-gray-500 space-y-1">
// //           <p><strong>Address:</strong> {clinic.address}</p>
// //           <p><strong>Phone:</strong> {clinic.phone}</p>
// //           <p><strong>Email:</strong> {clinic.email}</p>
// //           <p><strong>Location:</strong> {clinic?.location?.city}, {clinic?.location?.state}, {clinic?.location?.country}</p>
// //         </div>

// //         <button
// //           onClick={handleNavigateToDashboard}
// //           className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
// //         >
// //           Go to All Doctors Dashboard
// //         </button>

// //         <div className="mt-6">
// //           <label className="block mb-1 font-medium text-gray-700">Filter by Specialization:</label>
// //           <select
// //             value={selectedSpec}
// //             onChange={handleSpecializationChange}
// //             className="w-full border px-3 py-2 rounded"
// //           >
// //             <option value="">-- All Specializations --</option>
// //             {specializations.map((selectedSpec, idx) => (
// //               <option key={idx} value={selectedSpec}>{selectedSpec}</option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="mt-8">
// //           <h3 className="text-xl font-semibold text-gray-700 mb-2">Available Doctors</h3>

// //           {doctorLoading ? (
// //             <p className="text-blue-500">Loading doctors...</p>
// //           ) : filteredDoctors.length > 0 ? (
// //             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //               {currentDoctors.map(doc => (
// //                 <div key={doc._id} className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:shadow-md transition">
// //                   <h4 className="text-lg font-bold text-blue-700">Dr. {doc.name}</h4>
// //                   <p className="text-gray-600">Specialization: {doc.specialization}</p>
// //                   <p className="text-gray-500">Email: {doc.email}</p>
// //                   <p className="text-gray-500">Phone: {doc.phone}</p>
// //                   <p className="text-sm text-green-600 mt-1">
// //                     Availability: {doc.availability?.from || 'N/A'} - {doc.availability?.to || 'N/A'}
// //                   </p>
// //                   <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
// //                     Book Appointment
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p className="text-gray-500 mt-2">No doctors available.</p>
// //           )}

// //           {filteredDoctors.length > doctorsPerPage && (
// //             <div className="flex justify-center mt-6 space-x-2">
// //               {Array.from({ length: totalPages }, (_, idx) => (
// //                 <button
// //                   key={idx}
// //                   onClick={() => setCurrentPage(idx + 1)}
// //                   className={`px-3 py-1 border rounded text-sm ${
// //                     currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
// //                   }`}
// //                 >
// //                   {idx + 1}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClinicView;











// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ClinicView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [clinic, setClinic] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/clinics/${id}`);
//         setClinic(res.data);
//       } catch (err) {
//         setError('Failed to load clinic details');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchClinic();
//   }, [id]);





// const ClinicDoctors = ({ clinicId }) => {
//   const [doctors, setDoctors] = useState([]);
//   const [specialization, setSpecialization] = useState('');
//   // const [loading, setLoading] = useState(true);

//   const fetchDoctors = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}/doctors`, {
//         params: { specialization } // This gets added as ?specialization=Cardiology, etc.
//       });
//       setDoctors(res.data);
//     } catch (error) {
//       console.error('Failed to fetch doctors:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, [clinicId, specialization]);

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-3">Doctors</h3>

//       <label className="block mb-2">
//         Filter by Specialization:
//         <select
//           className="border px-2 py-1 rounded ml-2"
//           value={specialization}
//           onChange={(e) => setSpecialization(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Cardiology">Cardiology</option>
//           <option value="ENT">ENT</option>
//           <option value="Dermatology">Dermatology</option>
//           {/* Add more as needed */}
//         </select>
//       </label>

//       {loading ? (
//         <p className="text-blue-500">Loading doctors...</p>
//       ) : doctors.length > 0 ? (
//         <ul className="space-y-4">
//           {doctors.map((doc) => (
//             <li key={doc._id} className="p-4 border rounded shadow-sm bg-gray-50">
//               <p><strong>Dr. {doc.name}</strong></p>
//               <p>Specialization: {doc.specialization}</p>
//               <p>Email: {doc.email}</p>
//               <p>Phone: {doc.phone}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No doctors found.</p>
//       )}
//     </div>
//   );
// };

// // export default ClinicDoctors;

























//   const handleNavigateToDashboard = () => {
//     navigate(`/doctors/dashboard`);
//   };

//   if (loading) return <div className="text-center py-10 text-blue-500">Loading clinic details...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (!clinic) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-lg">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{clinic.name}</h2>
//         <p className="text-gray-600 mt-1">{clinic.description || 'No description available.'}</p>

//         <div className="mt-4 text-sm text-gray-500 space-y-1">
//           <p><strong>Address:</strong> {clinic.address}</p>
//           <p><strong>Phone:</strong> {clinic.phone}</p>
//           <p><strong>Email:</strong> {clinic.email}</p>
//           <p><strong>Location:</strong> {clinic?.location?.city}, {clinic?.location?.state}, {clinic?.location?.country}</p>
//         </div>

//         <button
//           onClick={handleNavigateToDashboard}
//           className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
//         >
//           Go to All Doctors Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClinicView;




// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // ✅ Component: Doctors list with optional specialization filter
// const ClinicDoctors = ({ clinicId }) => {
//   const [doctors, setDoctors] = useState([]);
//   const [specialization, setSpecialization] = useState('');
//   const [loading, setLoading] = useState(true);

//   const fetchDoctors = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}/doctors`, {
//         params: { specialization },
//       });
//       setDoctors(res.data);
//     } catch (error) {
//       console.error('Failed to fetch doctors:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, [clinicId, specialization]);

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-3">Doctors</h3>

//       <label className="block mb-2">
//         Filter by Specialization:
//         <select
//           className="border px-2 py-1 rounded ml-2"
//           value={specialization}
//           onChange={(e) => setSpecialization(e.target.value)}
//         >
//           <option value="">All</option>
//           <option value="Cardiology">Cardiology</option>
//           <option value="ENT">ENT</option>
//           <option value="Dermatology">Dermatology</option>
//           {/* Add more dynamically if needed */}
//         </select>
//       </label>

//       {loading ? (
//         <p className="text-blue-500">Loading doctors...</p>
//       ) : doctors.length > 0 ? (
//         <ul className="space-y-4">
//           {doctors.map((doc) => (
//             <li key={doc._id} className="p-4 border rounded shadow-sm bg-gray-50">
//               <p><strong>Dr. {doc.name}</strong></p>
//               <p>Specialization: {doc.specialization}</p>
//               <p>Email: {doc.email}</p>
//               <p>Phone: {doc.phone}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No doctors found.</p>
//       )}
//     </div>
//   );
// };

// // ✅ Component: Clinic View
// const ClinicView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [clinic, setClinic] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/clinics/${id}`);
//         setClinic(res.data);
//       } catch (err) {
//         setError('Failed to load clinic details');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchClinic();
//   }, [id]);

//   const handleNavigateToDashboard = () => {
//     navigate(`/doctors/dashboard`);
//   };

//   if (loading) return <div className="text-center py-10 text-blue-500">Loading clinic details...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (!clinic) return null;

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-lg">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{clinic.name}</h2>
//         <p className="text-gray-600 mt-1">{clinic.description || 'No description available.'}</p>

//         <div className="mt-4 text-sm text-gray-500 space-y-1">
//           <p><strong>Address:</strong> {clinic.address}</p>
//           <p><strong>Phone:</strong> {clinic.phone}</p>
//           <p><strong>Email:</strong> {clinic.email}</p>
//           <p><strong>Location:</strong> {clinic?.location?.city}, {clinic?.location?.state}, {clinic?.location?.country}</p>
//         </div>

//         <button
//           onClick={handleNavigateToDashboard}
//           className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
//         >
//           Go to All Doctors Dashboard
//         </button>

//         {/* ✅ Render ClinicDoctors */}
//         <ClinicDoctors clinicId={id} />
//       </div>
//     </div>
//   );
// };

// export default ClinicView;











// FINAL ONE WORKING
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ClinicView = () => {
//   const { id: clinicId } = useParams();
//   const navigate = useNavigate();

//   const [clinic, setClinic] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [specialization, setSpecialization] = useState('');
//   const [loadingClinic, setLoadingClinic] = useState(true);
//   const [loadingDoctors, setLoadingDoctors] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch clinic info
//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}`);
//         setClinic(res.data);
//       } catch (err) {
//         setError('Failed to load clinic details');
//       } finally {
//         setLoadingClinic(false);
//       }
//     };

//     fetchClinic();
//   }, [clinicId]);
//   console.log(specialization);

//   // Fetch doctors (optionally filtered by specialization)
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         setLoadingDoctors(true);
//         const res = await axios.post(`http://localhost:5000/api/clinics/${clinicId}/doctors`, {
//           specialization

//         });
//         setDoctors(res.data);
//       } catch (err) {
//         setError('Failed to load doctors');
//       } finally {
//         setLoadingDoctors(false);
//       }
//     };

//     fetchDoctors();
//   }, [clinicId, specialization]);

//   const handleNavigateToDashboard = () => {
//     navigate('/doctors/dashboard');
//   };

//   if (loadingClinic) return <div className="text-center py-10 text-blue-500">Loading clinic...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
//   if (!clinic) return null;
//    function handleNavigate(id){
//     navigate("/patientbooking",{
//       state:{
//         doctorId:id,
//         clinicId  //this id get from axious request
       
//       }
//     })
//    }

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-lg">
//         {/* Clinic Info */}
//         <h2 className="text-2xl font-bold text-gray-800">{clinic.name}</h2>
//         <p className="text-gray-600">{clinic.description || 'No description provided.'}</p>

//         <div className="mt-4 text-sm text-gray-500">
//           <p><strong>Address:</strong> {clinic.address}</p>
//           <p><strong>Phone:</strong> {clinic.phone}</p>
//           <p><strong>Email:</strong> {clinic.email}</p>
//           <p><strong>Location:</strong> {clinic?.location?.city}, {clinic?.location?.state}, {clinic?.location?.country}</p>
//         </div>

//         <button
//           onClick={handleNavigateToDashboard}
//           className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
//         >
//           Go to All Doctors Dashboard
//         </button>

//         {/* Specialization Filter */}
//         <div className="mt-6">
//           <label className="block text-sm font-medium mb-1">Filter by Specialization:</label>
//           <select
//             value={specialization}
//             onChange={(e) => setSpecialization(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//   <option value="">Select Specialization</option>                                                               
//   <option value="Cardiologist">Cardiologist</option>
//   <option value="Dermatologist">Dermatologist</option>
//   <option value="General Physician">General Physician</option>
//   <option value="Gynecologist">Gynecologist</option>
//   <option value="Neurologist">Neurologist</option>
//   <option value="Orthopedic">Orthopedic</option>
//   <option value="Pediatrician">Pediatrician</option>
//   <option value="Psychiatrist">Psychiatrist</option>
//   <option value="ENT">ENT Specialist</option>
//   <option value="Oncologist">Oncologist</option>
//   <option value="Urologist">Urologist</option>

//             {/* Add more or fetch dynamically */}
//           </select>
//         </div>

//         {/* Doctors List */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Available Doctors</h3>
//           {loadingDoctors ? (
//             <p className="text-blue-500">Loading doctors...</p>
//           ) : doctors.length > 0 ? (
//             // <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//             //   {doctors.map((doc) => (
//             //     <li key={doc._id} className="p-4 border rounded bg-gray-50 shadow-sm">
//             //       <p className="font-bold text-blue-700">Dr. {doc.name}</p>
//             //       <p>Specialization: {doc.specialization}</p>
//             //       <p>Email: {doc.email}</p>
//             //       <p>Phone: {doc.phone}</p>
                  

//             //     </li>
//             //   ))}
//             // </ul>
//             <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//   {doctors.map((doc) => (
//     <li key={doc._id} className="p-4 border rounded bg-gray-50 shadow-sm">
//       <p className="font-bold text-blue-700">Dr. {doc.name}</p>
//       <p>Specialization: {doc.specialization}</p>
//       <p>Email: {doc.email}</p>
//       <p>Phone: {doc.phone}</p>

//       <button
//         onClick={()=> handleNavigate(doc._id)}
//         className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm"
//       >
//         Book Appointment
//       </button>
//     </li>
//   ))}
// </ul>


//           ) : (
//             <p className="text-gray-500">No doctors found for selected specialization.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClinicView;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import PaymentForm from "./PaymentForm";


// const stripePromise = loadStripe("pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji");

// const ClinicView = () => {
//   const { clinicId, patientId } = useParams(); // ✅ Now both come from the route
//   const navigate = useNavigate();

//   const [clinic, setClinic] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [specialization, setSpecialization] = useState("");
//   const [loadingClinic, setLoadingClinic] = useState(true);
//   const [loadingDoctors, setLoadingDoctors] = useState(true);
//   const [error, setError] = useState("");
//   const [registered, setRegistered] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");

//   // ✅ Fetch clinic info
//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}`);
//         setClinic(res.data);
//       } catch {
//         setError("Failed to load clinic details");
//       } finally {
//         setLoadingClinic(false);
//       }
//     };
//     fetchClinic();
//   }, [clinicId]);

//   // ✅ Check registration status
//   useEffect(() => {
//     const checkRegistration = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/clinics/${clinicId}/registration/${patientId}`
//         );
//         setRegistered(res.data.registered);
//       } catch (err) {
//         console.error("Error checking registration:", err);
//       }
//     };
//     if (patientId) checkRegistration();
//   }, [clinicId, patientId]);

//   // ✅ Fetch doctors (only if registered)
//   useEffect(() => {
//     if (!registered) return;
//     const fetchDoctors = async () => {
//       try {
//         setLoadingDoctors(true);
//         const res = await axios.post(
//           `http://localhost:5000/api/clinics/${clinicId}/doctors`,
//           { specialization }
//         );
//         setDoctors(res.data);
//       } catch {
//         setError("Failed to load doctors");
//       } finally {
//         setLoadingDoctors(false);
//       }
//     };
//     fetchDoctors();
//   }, [clinicId, specialization, registered]);

//   // ✅ Start Stripe payment
//   // const handleStartPayment = async () => {
//   //   try {
//   //     const res = await axios.post("http://localhost:5000/api/clinics/register", {
//   //       clinicId,
//   //       patientId,
//   //     });
//   //     setClientSecret(res.data.clientSecret);
//   //   } catch {
//   //     toast.error("Error starting payment");
//   //   }
//   // };

// // const handleStartPayment = async () => {
// //   try {
// //     console.log("Sending payment request:", { clinicId, patientId });
// //     const res = await axios.post("http://localhost:5000/api/clinics/registerationfee", {
// //       clinicId,
// //       patientId,
// //     });
// //     console.log(res)
// //     window.location.href=res.data.url
// //     setClientSecret(res.data.clientSecret);
// //   } catch (err) {
// //     console.error(err.response?.data || err.message);
// //     if(err.response && err.response.status===400){
// //      return toast.error("Already registered! You can book appointments in this clinic")
// //     }
// //     toast.error("Error starting payment");
// //   }
// // };


// const handleStartPayment = async () => {
//   try {
//     const res = await axios.post("http://localhost:5000/api/clinics/registerationfee", {
//       clinicId,
//       patientId,
//     });
//     if (res.data.url) {
//       window.location.href = res.data.url; // ✅ Redirect to Stripe Checkout
//     } else {
//       toast.error("Failed to initiate payment");
//     }
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     toast.error("Error starting payment");
//   }
// };



//   // ✅ Navigate to doctor booking
//   const handleNavigate = (doctorId) => {
//     navigate("/patientbooking", { state: { doctorId, clinicId, patientId } });
//   };

//   const handleNavigateToDashboard = () => navigate("/doctors/dashboard");

//   if (loadingClinic)
//     return <div className="text-center py-10 text-blue-500">Loading clinic...</div>;
//   if (error)
//     return <div className="text-center py-10 text-red-500">{error}</div>;

//   // STEP 1 — Not registered yet
//   if (!registered && !clientSecret) {
//     return (
//       <div className="text-center py-10">
//         <ToastContainer />
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Please register to access this clinic
//         </h2>
//         <button
//           onClick={handleStartPayment}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Pay ₹500 Registration Fee
//         </button>
//       </div>
//     );
//   }

//   // STEP 2 — Payment in progress
//   if (clientSecret && !registered) {
//     return (
//       <Elements stripe={stripePromise} options={{ clientSecret }}>
//         <ToastContainer />
//         <PaymentForm
//           clientSecret={clientSecret}
//           clinicId={clinicId}
//           patientId={patientId}
//           onSuccess={() => setRegistered(true)}
//         />
//       </Elements>
//     );
//   }

//   // STEP 3 — Registered: show clinic and doctors
//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <ToastContainer />
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-lg">
//         <h2 className="text-2xl font-bold text-gray-800">{clinic.name}</h2>
//         <p className="text-gray-600">{clinic.description || "No description provided."}</p>

//         <div className="mt-4 text-sm text-gray-500">
//           <p><strong>Address:</strong> {clinic.address}</p>
//           <p><strong>Phone:</strong> {clinic.phone}</p>
//           <p><strong>Email:</strong> {clinic.email}</p>
//           <p>
//             <strong>Location:</strong>{" "}
//             {clinic?.location?.city}, {clinic?.location?.state},{" "}
//             {clinic?.location?.country}
//           </p>
//         </div>

//         <button
//           onClick={handleNavigateToDashboard}
//           className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
//         >
//           Go to All Doctors Dashboard
//         </button>

//         {/* Filter */}
//         <div className="mt-6">
//           <label className="block text-sm font-medium mb-1">
//             Filter by Specialization:
//           </label>
//           <select
//             value={specialization}
//             onChange={(e) => setSpecialization(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="">Select Specialization</option>
//             <option value="Cardiologist">Cardiologist</option>
//             <option value="Dermatologist">Dermatologist</option>
//             <option value="General Physician">General Physician</option>
//             <option value="Gynecologist">Gynecologist</option>
//             <option value="Neurologist">Neurologist</option>
//             <option value="Orthopedic">Orthopedic</option>
//             <option value="Pediatrician">Pediatrician</option>
//             <option value="Psychiatrist">Psychiatrist</option>
//             <option value="ENT">ENT Specialist</option>
//             <option value="Oncologist">Oncologist</option>
//             <option value="Urologist">Urologist</option>
//           </select>
//         </div>

//         {/* Doctors */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Available Doctors</h3>
//           {loadingDoctors ? (
//             <p className="text-blue-500">Loading doctors...</p>
//           ) : doctors.length > 0 ? (
//             <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {doctors.map((doc) => (
//                 <li key={doc._id} className="p-4 border rounded bg-gray-50 shadow-sm">
//                   <p className="font-bold text-blue-700">Dr. {doc.name}</p>
//                   <p>Specialization: {doc.specialization}</p>
//                   <p>Email: {doc.email}</p>
//                   <p>Phone: {doc.phone}</p>
//                   <button
//                     onClick={() => handleNavigate(doc._id)}
//                     className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm"
//                   >
//                     Book Appointment
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No doctors found for selected specialization.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClinicView;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji"
);

const ClinicView = () => {
  const { clinicId, patientId } = useParams();
  const navigate = useNavigate();

  const [clinic, setClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [loadingClinic, setLoadingClinic] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // ✅ Fetch clinic info
  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}`);
        setClinic(res.data);
      } catch {
        setError("Failed to load clinic details");
      } finally {
        setLoadingClinic(false);
      }
    };
    fetchClinic();
  }, [clinicId]);

  // ✅ Check registration status
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/clinics/${clinicId}/registration/${patientId}`
        );
        setRegistered(res.data.registered);
      } catch (err) {
        console.error("Error checking registration:", err);
      }
    };
    if (patientId) checkRegistration();
  }, [clinicId, patientId]);

  // ✅ Fetch doctors (only if registered)
  useEffect(() => {
    if (!registered) return;
    const fetchDoctors = async () => {
      try {
        setLoadingDoctors(true);
        const res = await axios.post(
          `http://localhost:5000/api/clinics/${clinicId}/doctors`,
          { specialization }
        );
        setDoctors(res.data);
      } catch {
        setError("Failed to load doctors");
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, [clinicId, specialization, registered]);

  // ✅ Start Stripe payment
  const handleStartPayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/clinics/registerationfee", {
        clinicId,
        patientId,
      });
      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to Stripe Checkout
      } else if (res.data.clientSecret) {
        setClientSecret(res.data.clientSecret); // Client secret flow (optional)
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Error starting payment");
    }
  };

  // ✅ Navigation
  const handleNavigate = (doctorId) => {
    navigate("/patientbooking", { state: { doctorId, clinicId, patientId } });
  };

  const handleNavigateToDashboard = () => navigate("/doctors/dashboard");

  // ✅ Loading/Error States
  if (loadingClinic)
    return <div className="text-center py-10 text-blue-500">Loading clinic...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  // STEP 1 — Not registered yet
  if (!registered && !clientSecret) {
    return (
      <div className="text-center py-10">
        <ToastContainer />
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Please register to access this clinic
        </h2>
        <button
          onClick={handleStartPayment}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Pay ₹500 Registration Fee
        </button>
      </div>
    );
  }

  // STEP 2 — Payment in progress
  if (clientSecret && !registered) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <ToastContainer />
        <PaymentForm
          clientSecret={clientSecret}
          clinicId={clinicId}
          patientId={patientId}
          onSuccess={() => setRegistered(true)}
        />
      </Elements>
    );
  }

  // STEP 3 — Registered: show clinic and doctors
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <ToastContainer />
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">{clinic.name}</h2>
        <p className="text-gray-600">{clinic.description || "No description provided."}</p>

        <div className="mt-4 text-sm text-gray-500">
          <p><strong>Address:</strong> {clinic.address}</p>
          <p><strong>Phone:</strong> {clinic.phone}</p>
          <p><strong>Email:</strong> {clinic.email}</p>
          <p>
            <strong>Location:</strong>{" "}
            {clinic?.location?.city}, {clinic?.location?.state},{" "}
            {clinic?.location?.country}
          </p>
        </div>

        <button
          onClick={handleNavigateToDashboard}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
        >
          Go to All Doctors Dashboard
        </button>

        {/* Filter */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">
            Filter by Specialization:
          </label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="ENT">ENT Specialist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Urologist">Urologist</option>
          </select>
        </div>

        {/* Doctors */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Available Doctors</h3>
          {loadingDoctors ? (
            <p className="text-blue-500">Loading doctors...</p>
          ) : doctors.length > 0 ? (
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {doctors.map((doc) => (
                <li key={doc._id} className="p-4 border rounded bg-gray-50 shadow-sm">
                  <p className="font-bold text-blue-700">Dr. {doc.name}</p>
                  <p>Specialization: {doc.specialization}</p>
                  <p>Email: {doc.email}</p>
                  <p>Phone: {doc.phone}</p>
                  <button
                    onClick={() => handleNavigate(doc._id)}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm"
                  >
                    Book Appointment
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No doctors found for selected specialization.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicView;






















































// // payment implemented

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ClinicView = () => {
//   const { clinicId, patientId } = useParams();
//   const navigate = useNavigate();

//   const [clinic, setClinic] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [specialization, setSpecialization] = useState("");
//   const [loadingClinic, setLoadingClinic] = useState(true);
//   const [loadingDoctors, setLoadingDoctors] = useState(false);
//   const [error, setError] = useState("");
//   const [registered, setRegistered] = useState(false);

//   // ✅ Fetch clinic info
//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}`);
//         setClinic(res.data);
//       } catch {
//         setError("Failed to load clinic details");
//       } finally {
//         setLoadingClinic(false);
//       }
//     };
//     fetchClinic();
//   }, [clinicId]);

//   // ✅ Check if the patient is registered in the clinic
//   useEffect(() => {
//     const checkRegistration = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/clinics/${clinicId}/registration/${patientId}`
//         );
//         setRegistered(res.data.registered);
//       } catch (err) {
//         console.error("Error checking registration:", err);
//       }
//     };
//     if (patientId) checkRegistration();
//   }, [clinicId, patientId]);

//   // ✅ Fetch doctors only if registered
//   useEffect(() => {
//     if (!registered) return;
//     const fetchDoctors = async () => {
//       try {
//         setLoadingDoctors(true);
//         const res = await axios.post(
//           `http://localhost:5000/api/clinics/${clinicId}/doctors`,
//           { specialization }
//         );
//         setDoctors(res.data);
//       } catch {
//         setError("Failed to load doctors");
//       } finally {
//         setLoadingDoctors(false);
//       }
//     };
//     fetchDoctors();
//   }, [clinicId, specialization, registered]);

//   // ✅ Pay consultation fee or redirect if valid within 7 days
//   const handleNavigate = async (doctorId) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/consultation/create-checkout", {
//         clinicId,
//         patientId,
//         doctorId,
//       });

//       if (res.data.alreadyPaid) {
//         toast.info("✅ Consultation fee already paid within the last 7 days. Redirecting...");
//         setTimeout(() => {
//           navigate("/patientbooking", { state: { doctorId, clinicId, patientId } });
//         }, 1000);
//         return;
//       }

//       if (res.data.url) {
//         // Redirect to Stripe Checkout
//         window.location.href = res.data.url;
//       } else {
//         toast.error("Failed to start consultation payment");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error starting consultation payment");
//     }
//   };

//   const handleNavigateToDashboard = () => navigate("/doctors/dashboard");

//   // ✅ Loading / Error States
//   if (loadingClinic)
//     return <div className="text-center py-10 text-blue-500">Loading clinic...</div>;
//   if (error)
//     return <div className="text-center py-10 text-red-500">{error}</div>;

//   // ✅ Not registered yet
//   if (!registered) {
//     return (
//       <div className="text-center py-10">
//         <ToastContainer />
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Please register to access this clinic
//         </h2>
//         <p className="text-gray-500 mb-4">
//           Pay ₹500 registration fee to access doctors in this clinic.
//         </p>
//         <button
//           onClick={() => toast.info("Redirect to registration payment flow")}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Pay ₹500 Registration Fee
//         </button>
//       </div>
//     );
//   }

//   // ✅ Registered: Show Clinic and Doctors
//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <ToastContainer />
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-lg">
//         <h2 className="text-2xl font-bold text-gray-800">{clinic.name}</h2>
//         <p className="text-gray-600">{clinic.description || "No description provided."}</p>

//         <div className="mt-4 text-sm text-gray-500">
//           <p><strong>Address:</strong> {clinic.address}</p>
//           <p><strong>Phone:</strong> {clinic.phone}</p>
//           <p><strong>Email:</strong> {clinic.email}</p>
//           <p>
//             <strong>Location:</strong>{" "}
//             {clinic?.location?.city}, {clinic?.location?.state},{" "}
//             {clinic?.location?.country}
//           </p>
//         </div>

//         <button
//           onClick={handleNavigateToDashboard}
//           className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
//         >
//           Go to All Doctors Dashboard
//         </button>

//         {/* Filter */}
//         <div className="mt-6">
//           <label className="block text-sm font-medium mb-1">
//             Filter by Specialization:
//           </label>
//           <select
//             value={specialization}
//             onChange={(e) => setSpecialization(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="">Select Specialization</option>
//             <option value="Cardiologist">Cardiologist</option>
//             <option value="Dermatologist">Dermatologist</option>
//             <option value="General Physician">General Physician</option>
//             <option value="Gynecologist">Gynecologist</option>
//             <option value="Neurologist">Neurologist</option>
//             <option value="Orthopedic">Orthopedic</option>
//             <option value="Pediatrician">Pediatrician</option>
//             <option value="Psychiatrist">Psychiatrist</option>
//             <option value="ENT">ENT Specialist</option>
//             <option value="Oncologist">Oncologist</option>
//             <option value="Urologist">Urologist</option>
//           </select>
//         </div>

//         {/* Doctors */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-2">Available Doctors</h3>
//           {loadingDoctors ? (
//             <p className="text-blue-500">Loading doctors...</p>
//           ) : doctors.length > 0 ? (
//             <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {doctors.map((doc) => (
//                 <li key={doc._id} className="p-4 border rounded bg-gray-50 shadow-sm">
//                   <p className="font-bold text-blue-700">Dr. {doc.name}</p>
//                   <p>Specialization: {doc.specialization}</p>
//                   <p>Email: {doc.email}</p>
//                   <p>Phone: {doc.phone}</p>
//                   <button
//                     onClick={() => handleNavigate(doc._id)}
//                     className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm"
//                   >
//                     Book Appointment
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No doctors found for selected specialization.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClinicView;
