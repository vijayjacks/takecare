

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { useLocation } from 'react-router-dom';

// export default function PatientBooking() {
//   const { clinicId, doctorId } = useLocation().state || {};
//   const [date, setDate] = useState('');
//   const [isOnline, setIsOnline] = useState(true);
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedSubSlotIndex, setSelectedSubSlotIndex] = useState(null);
//   const [reason, setReason] = useState('');
//   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//   const token = localStorage.getItem('patientToken');
//   const patientId = localStorage.getItem('patientId');
//   const headers = { Authorization: `Bearer ${token}` };

//   const today = new Date().toISOString().split('T')[0];
//   const isToday = date === today;

//   useEffect(() => {
//     if (date && doctorId) {
//       fetchSlots();
//     }
//   }, [date, isOnline]);

//   const fetchSlots = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/doctors/${doctorId}/available-slots`,
//         { date, isOnline },
//         { headers }
//       );
//       setSlots(res.data.slots || []);
//       setSelectedSlot(null);
//       setSelectedSubSlotIndex(null);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to fetch slots');
//     }
//   };

//   const isPast = (timeStr) => {
//     if (!isToday) return false;
//     const [h, m] = timeStr.split(':').map(Number);
//     const slotTime = new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
//     return slotTime < new Date();
//   };

//   const handleBooking = async () => {
//     if (selectedSubSlotIndex === null || !selectedSlot) {
//       return toast.error('Please select a sub-slot');
//     }

//     const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (selectedSubSlotIndex + 1);
//     const selectedTime = selectedSlot.subSlots[selectedSubSlotIndex].time;

//     try {
//       console.log("Sending isOnline value:", isOnline); // ✅ Debug log

//       await axios.post(
//         'http://localhost:5000/api/appointments/bookAppointment',
//         {
//           clinicId,
//           doctorId,
//           patientId,
//           date,
//           slot: selectedSlot.slot,
//           time: selectedTime,
//           subTokenNumber,
//           reason,
//           timezone,
//           isOnline,
//         },
//         { headers }
//       );

//       toast.success('✅ Appointment booked!');
//       fetchSlots();
//       resetForm();
//     } catch (err) {
//       toast.error(err.response?.data?.message || '❌ Booking failed');
//       fetchSlots();
//     }
//   };

//   const resetForm = () => {
//     setSelectedSlot(null);
//     setSelectedSubSlotIndex(null);
//     setReason('');
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

//       {/* Date Picker */}
//       <input
//         type="date"
//         min={today}
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="w-full border p-2 mb-4 rounded"
//       />

//       <p className="text-sm mb-2 text-gray-500">Timezone: {timezone}</p>

//       {/* Online/Offline Toggle */}
//       <div className="flex items-center gap-4 mb-4">
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             value="online"
//             checked={isOnline === true}
//             onChange={() => setIsOnline(true)}
//           />
//           <span>Online</span>
//         </label>
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             value="offline"
//             checked={isOnline === false}
//             onChange={() => setIsOnline(false)}
//           />
//           <span>Offline</span>
//         </label>
//       </div>

//       {/* Slots */}
//       {slots.length > 0 ? (
//         <div className="grid grid-cols-2 gap-2 mb-4">
//           {slots.map((slot) => (
//             <button
//               key={slot.slot}
//               disabled={slot.status === 'booked'}
//               onClick={() => {
//                 setSelectedSlot(slot);
//                 setSelectedSubSlotIndex(null);
//               }}
//               className={`p-2 rounded border text-sm transition ${
//                 slot.status === 'booked'
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : selectedSlot?.slot === slot.slot
//                   ? 'bg-green-600 text-white'
//                   : 'bg-blue-100 hover:bg-blue-200'
//               }`}
//             >
//               Slot {slot.slot} <br />
//               {slot.from} - {slot.to} <br />
//               <span className="text-xs font-medium text-gray-600">({slot.type})</span>
//             </button>
//           ))}
//         </div>
//       ) : (
//         date && <p className="text-red-500 text-sm mb-4">No {isOnline ? 'online' : 'offline'} slots available</p>
//       )}

//       {/* Sub-Slots */}
//       {selectedSlot?.subSlots?.length > 0 && (
//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Sub-slot:</p>
//           <div className="grid grid-cols-2 gap-2">
//             {selectedSlot.subSlots.map((sub, idx) => {
//               const disabled = sub.status === 'booked' || isPast(sub.time);
//               const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (idx + 1);

//               return (
//                 <button
//                   key={idx}
//                   disabled={disabled}
//                   onClick={() => setSelectedSubSlotIndex(idx)}
//                   className={`p-2 rounded border text-sm transition ${
//                     disabled
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       : selectedSubSlotIndex === idx
//                       ? 'bg-green-600 text-white'
//                       : 'bg-blue-50 hover:bg-blue-100'
//                   }`}
//                 >
//                   Token {subTokenNumber} - {sub.time}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Reason for Visit */}
//       <textarea
//         className="w-full border p-2 mb-4 rounded"
//         placeholder="Reason for visit (optional)"
//         value={reason}
//         onChange={(e) => setReason(e.target.value)}
//       ></textarea>

//       {/* Confirm Button */}
//       <button
//         onClick={handleBooking}
//         disabled={selectedSubSlotIndex === null}
//         className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Confirm Booking
//       </button>
//     </div>
//   );
// }



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { useLocation } from 'react-router-dom';

// export default function PatientBooking() {
//   const { clinicId, doctorId } = useLocation().state || {};
//   const [date, setDate] = useState('');
//   const [isOnline, setIsOnline] = useState(true);
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedSubSlotIndex, setSelectedSubSlotIndex] = useState(null);
//   const [reason, setReason] = useState('');
//   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//   const token = localStorage.getItem('patientToken');
//   const patientId = localStorage.getItem('patientId');
//   const headers = { Authorization: `Bearer ${token}` };

//   const today = new Date().toISOString().split('T')[0];
//   const isToday = date === today;

//   useEffect(() => {
//     if (date && doctorId) {
//       fetchSlots();
//     }
//   }, [date, isOnline]);

//   const fetchSlots = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/doctors/${doctorId}/available-slots`,
//         { date, isOnline },
//         { headers }
//       );
//       setSlots(res.data.slots || []);
//       setSelectedSlot(null);
//       setSelectedSubSlotIndex(null);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to fetch slots');
//     }
//   };

//   const isPast = (timeStr) => {
//     if (!isToday) return false;
//     const [h, m] = timeStr.split(':').map(Number);
//     const slotTime = new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
//     return slotTime < new Date();
//   };

//   const handleBooking = async () => {
//     if (selectedSubSlotIndex === null || !selectedSlot) {
//       return toast.error('Please select a sub-slot');
//     }

//     const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (selectedSubSlotIndex + 1);
//     const selectedTime = selectedSlot.subSlots[selectedSubSlotIndex].time;

//     try {
//       await axios.post(
//         'http://localhost:5000/api/appointments/bookAppointment',
//         {
//           clinicId,
//           doctorId,
//           patientId,
//           date,
//           slot: selectedSlot.slot,
//           time: selectedTime,
//           subTokenNumber,
//           reason,
//           timezone,
//           isOnline,
//         },
//         { headers }
//       );

//       toast.success('✅ Appointment booked!');
//       fetchSlots();
//       resetForm();
//     } catch (err) {
//       toast.error(err.response?.data?.message || '❌ Booking failed');
//       fetchSlots();
//     }
//   };

//   const resetForm = () => {
//     setSelectedSlot(null);
//     setSelectedSubSlotIndex(null);
//     setReason('');
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

//       {/* Date Picker */}
//       <input
//         type="date"
//         min={today}
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="w-full border p-2 mb-4 rounded"
//       />

//       <p className="text-sm mb-2 text-gray-500">Timezone: {timezone}</p>

//       {/* Online/Offline Toggle */}
//       <div className="flex items-center gap-4 mb-4">
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             checked={isOnline}
//             onChange={() => setIsOnline(true)}
//           />
//           <span>Online</span>
//         </label>
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             checked={!isOnline}
//             onChange={() => setIsOnline(false)}
//           />
//           <span>Offline</span>
//         </label>
//       </div>

//       {/* Slots */}
//       {slots.length > 0 ? (
//         <div className="grid grid-cols-2 gap-2 mb-4">
//           {slots.map((slot) => (
//             <button
//               key={slot.slot}
//               disabled={slot.status === 'booked'}
//               onClick={() => {
//                 setSelectedSlot(slot);
//                 setSelectedSubSlotIndex(null);
//               }}
//               className={`p-2 rounded border text-sm transition ${
//                 slot.status === 'booked'
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : selectedSlot?.slot === slot.slot
//                   ? 'bg-green-600 text-white'
//                   : 'bg-blue-100 hover:bg-blue-200'
//               }`}
//             >
//               Slot {slot.slot} <br />
//               {slot.from} - {slot.to} <br />
//               <span className="text-xs font-medium text-gray-600">({slot.type})</span>
//             </button>
//           ))}
//         </div>
//       ) : (
//         date && <p className="text-red-500 text-sm mb-4">No {isOnline ? 'online' : 'offline'} slots available</p>
//       )}

//       {/* Sub-Slots */}
//       {selectedSlot?.subSlots?.length > 0 && (
//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Sub-slot:</p>
//           <div className="grid grid-cols-2 gap-2">
//             {selectedSlot.subSlots.map((sub, idx) => {
//               const disabled = sub.status === 'booked' || isPast(sub.time);
//               const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (idx + 1);

//               return (
//                 <button
//                   key={idx}
//                   disabled={disabled}
//                   onClick={() => setSelectedSubSlotIndex(idx)}
//                   className={`p-2 rounded border text-sm transition ${
//                     disabled
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       : selectedSubSlotIndex === idx
//                       ? 'bg-green-600 text-white'
//                       : 'bg-blue-50 hover:bg-blue-100'
//                   }`}
//                 >
//                   Token {subTokenNumber} - {sub.time}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Reason for Visit */}
//       <textarea
//         className="w-full border p-2 mb-4 rounded"
//         placeholder="Reason for visit (optional)"
//         value={reason}
//         onChange={(e) => setReason(e.target.value)}
//       ></textarea>

//       {/* Confirm Button */}
//       <button
//         onClick={handleBooking}
//         disabled={selectedSubSlotIndex === null}
//         className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Confirm Booking
//       </button>
//     </div>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function PatientBooking() {
//   const { clinicId, doctorId } = useLocation().state || {};
//   const navigate = useNavigate();

//   const [date, setDate] = useState('');
//   const [isOnline, setIsOnline] = useState(true);
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedSubSlotIndex, setSelectedSubSlotIndex] = useState(null);
//   const [reason, setReason] = useState('');
//   const [amount, setAmount] = useState(50); // Default consultation fee
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('patientToken');
//   const patientId = localStorage.getItem('patientId');
//   const headers = { Authorization: `Bearer ${token}` };
//   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//   const today = new Date().toISOString().split('T')[0];
//   const isToday = date === today;

//   useEffect(() => {
//     if (date && doctorId) fetchSlots();
//   }, [date, isOnline]);

//   const fetchSlots = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/doctors/${doctorId}/available-slots`,
//         { date, isOnline },
//         { headers }
//       );
//       setSlots(res.data.slots || []);
//       setSelectedSlot(null);
//       setSelectedSubSlotIndex(null);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to fetch slots');
//     }
//   };

//   const isPast = (timeStr) => {
//     if (!isToday) return false;
//     const [h, m] = timeStr.split(':').map(Number);
//     const slotTime = new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
//     return slotTime < new Date();
//   };

//   const handleBooking = async () => {
//     if (selectedSubSlotIndex === null || !selectedSlot) {
//       return toast.error('Please select a sub-slot');
//     }

//     const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (selectedSubSlotIndex + 1);
//     const selectedTime = selectedSlot.subSlots[selectedSubSlotIndex].time;

//     try {
//       setLoading(true);

//       // 1️⃣ Book appointment
//       const bookingRes = await axios.post(
//         'http://localhost:5000/api/appointments/bookAppointment',
//         {
//           clinicId,
//           doctorId,
//           patientId,
//           date,
//           slot: selectedSlot.slot,
//           time: selectedTime,
//           subTokenNumber,
//           reason,
//           timezone,
//           isOnline,
//           amount, // send fee for payment
//         },
//         { headers }
//       );

//       const appointmentId = bookingRes.data.appointment._id;

//       // 2️⃣ Create Stripe checkout
//       const checkoutRes = await axios.post(
//         'http://localhost:5000/api/payments/create-checkout',
//         { appointmentId, amount },
//         { headers }
//       );

//       const { url } = checkoutRes.data;

//       // 3️⃣ Redirect to Stripe Checkout
//       window.location.href = url;
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Booking/payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setSelectedSlot(null);
//     setSelectedSubSlotIndex(null);
//     setReason('');
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

//       {/* Date Picker */}
//       <input
//         type="date"
//         min={today}
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="w-full border p-2 mb-4 rounded"
//       />

//       <p className="text-sm mb-2 text-gray-500">Timezone: {timezone}</p>

//       {/* Online/Offline Toggle */}
//       <div className="flex items-center gap-4 mb-4">
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             value="online"
//             checked={isOnline === true}
//             onChange={() => setIsOnline(true)}
//           />
//           <span>Online</span>
//         </label>
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             value="offline"
//             checked={isOnline === false}
//             onChange={() => setIsOnline(false)}
//           />
//           <span>Offline</span>
//         </label>
//       </div>

//       {/* Slots */}
//       {slots.length > 0 ? (
//         <div className="grid grid-cols-2 gap-2 mb-4">
//           {slots.map((slot) => (
//             <button
//               key={slot.slot}
//               disabled={slot.status === 'booked'}
//               onClick={() => {
//                 setSelectedSlot(slot);
//                 setSelectedSubSlotIndex(null);
//               }}
//               className={`p-2 rounded border text-sm transition ${
//                 slot.status === 'booked'
//                   ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   : selectedSlot?.slot === slot.slot
//                   ? 'bg-green-600 text-white'
//                   : 'bg-blue-100 hover:bg-blue-200'
//               }`}
//             >
//               Slot {slot.slot} <br />
//               {slot.from} - {slot.to} <br />
//               <span className="text-xs font-medium text-gray-600">({slot.type})</span>
//             </button>
//           ))}
//         </div>
//       ) : (
//         date && <p className="text-red-500 text-sm mb-4">No {isOnline ? 'online' : 'offline'} slots available</p>
//       )}

//       {/* Sub-Slots */}
//       {selectedSlot?.subSlots?.length > 0 && (
//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Sub-slot:</p>
//           <div className="grid grid-cols-2 gap-2">
//             {selectedSlot.subSlots.map((sub, idx) => {
//               const disabled = sub.status === 'booked' || isPast(sub.time);
//               const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (idx + 1);

//               return (
//                 <button
//                   key={idx}
//                   disabled={disabled}
//                   onClick={() => setSelectedSubSlotIndex(idx)}
//                   className={`p-2 rounded border text-sm transition ${
//                     disabled
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       : selectedSubSlotIndex === idx
//                       ? 'bg-green-600 text-white'
//                       : 'bg-blue-50 hover:bg-blue-100'
//                   }`}
//                 >
//                   Token {subTokenNumber} - {sub.time}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Reason for Visit */}
//       <textarea
//         className="w-full border p-2 mb-4 rounded"
//         placeholder="Reason for visit (optional)"
//         value={reason}
//         onChange={(e) => setReason(e.target.value)}
//       ></textarea>

//       {/* Confirm Button */}
//       <button
//         onClick={handleBooking}
//         disabled={selectedSubSlotIndex === null || loading}
//         className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {loading ? 'Processing...' : 'Confirm & Pay'}
//       </button>
//     </div>
//   );
// }






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function PatientBooking() {
//   const { clinicId, doctorId } = useLocation().state || {};
//   const navigate = useNavigate();

//   const [date, setDate] = useState("");
//   const [isOnline, setIsOnline] = useState(true);
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedSubSlotIndex, setSelectedSubSlotIndex] = useState(null);
//   const [reason, setReason] = useState("");

//   // const stripePromise = loadStripe(
//   //   "pk_test_51SKVa90LgPK6mflxUUrLcPWTUcWraUFYUgPqkV8RzJm0jK9DTBIJ3Cq4wXujEVwuEtXX6JGVf47i1oTjGiJHEa0S00eEqom7Ji"
//   // );
  
//   const token = localStorage.getItem("patientToken");
//   const patientId = localStorage.getItem("patientId");
//   const headers = { Authorization: `Bearer ${token}` };

//   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const today = new Date().toISOString().split("T")[0];
//   const isToday = date === today;

//   useEffect(() => {
//     if (date && doctorId) fetchSlots();
//   }, [date, isOnline]);

//   const fetchSlots = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/doctors/${doctorId}/available-slots`,
//         { date, isOnline },
//         { headers }
//       );
//       setSlots(res.data.slots || []);
//       setSelectedSlot(null);
//       setSelectedSubSlotIndex(null);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch slots");
//     }
//   };

//   const isPast = (timeStr) => {
//     if (!isToday) return false;
//     const [h, m] = timeStr.split(":").map(Number);
//     const slotTime = new Date(`${date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
//     return slotTime < new Date();
//   };

//   const handleBooking = async () => {
//     if (selectedSubSlotIndex === null || !selectedSlot) {
//       return toast.error("Please select a sub-slot");
//     }

//     const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (selectedSubSlotIndex + 1);
//     const selectedTime = selectedSlot.subSlots[selectedSubSlotIndex].time;

//     try {
//       // 1️⃣ Book the appointment
//       const res = await axios.post(
//         "http://localhost:5000/api/appointments/bookAppointment",
//         {
//           clinicId,
//           doctorId,
//           patientId,
//           date,
//           slot: selectedSlot.slot,
//           time: selectedTime,
//           subTokenNumber,
//           reason,
//           timezone,
//           isOnline,
//         },
//         { headers }
//       );

//       const appointmentId = res.data.appointment?._id;
//       const amount = 500; // Example consultation fee in USD; adjust as needed

//       if (!appointmentId) throw new Error("Appointment not created");

//       // 2️⃣ Create Stripe checkout
//       const checkoutRes = await axios.post(
//         "http://localhost:5000/api/appointments/create-checkout",
//         { appointmentId, amount },
//         { headers }
//       );
//       console.log("checkoutRes", checkoutRes)

//       const { url } = checkoutRes.data;
//       if (!url) throw new Error("Failed to create checkout session");

//       // 3️⃣ Redirect to Stripe payment
//       window.location.href = url;

//     } catch (err) {
//       toast.error(err.response?.data?.message || err.message || "Booking failed");
//       fetchSlots();
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

//       {/* Date Picker */}
//       <input
//         type="date"
//         min={today}
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="w-full border p-2 mb-4 rounded"
//       />

//       <p className="text-sm mb-2 text-gray-500">Timezone: {timezone}</p>

//       {/* Online/Offline Toggle */}
//       <div className="flex items-center gap-4 mb-4">
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             value="online"
//             checked={isOnline === true}
//             onChange={() => setIsOnline(true)}
//           />
//           <span>Online</span>
//         </label>
//         <label className="flex items-center gap-2">
//           <input
//             type="radio"
//             name="mode"
//             value="offline"
//             checked={isOnline === false}
//             onChange={() => setIsOnline(false)}
//           />
//           <span>Offline</span>
//         </label>
//       </div>

//       {/* Slots */}
//       {slots.length > 0 ? (
//         <div className="grid grid-cols-2 gap-2 mb-4">
//           {slots.map((slot) => (
//             <button
//               key={slot.slot}
//               disabled={slot.status === "booked"}
//               onClick={() => {
//                 setSelectedSlot(slot);
//                 setSelectedSubSlotIndex(null);
//               }}
//               className={`p-2 rounded border text-sm transition ${slot.status === "booked"
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : selectedSlot?.slot === slot.slot
//                     ? "bg-green-600 text-white"
//                     : "bg-blue-100 hover:bg-blue-200"
//                 }`}
//             >
//               Slot {slot.slot} <br />
//               {slot.from} - {slot.to} <br />
//               <span className="text-xs font-medium text-gray-600">({slot.type})</span>
//             </button>
//           ))}
//         </div>
//       ) : (
//         date && <p className="text-red-500 text-sm mb-4">No {isOnline ? "online" : "offline"} slots available</p>
//       )}

//       {/* Sub-Slots */}
//       {selectedSlot?.subSlots?.length > 0 && (
//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Sub-slot:</p>
//           <div className="grid grid-cols-2 gap-2">
//             {selectedSlot.subSlots.map((sub, idx) => {
//               const disabled = sub.status === "booked" || isPast(sub.time);
//               return (
//                 <button
//                   key={idx}
//                   disabled={disabled}
//                   onClick={() => setSelectedSubSlotIndex(idx)}
//                   className={`p-2 rounded border text-sm transition ${disabled
//                       ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       : selectedSubSlotIndex === idx
//                         ? "bg-green-600 text-white"
//                         : "bg-blue-50 hover:bg-blue-100"
//                     }`}
//                 >
//                   Token {(selectedSlot.slot - 1) * selectedSlot.subSlots.length + (idx + 1)} - {sub.time}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Reason for Visit */}
//       <textarea
//         className="w-full border p-2 mb-4 rounded"
//         placeholder="Reason for visit (optional)"
//         value={reason}
//         onChange={(e) => setReason(e.target.value)}
//       ></textarea>

//       {/* Confirm Button */}
//       <button
//         onClick={handleBooking}
//         disabled={selectedSubSlotIndex === null}
//         className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         Confirm Booking & Pay
//       </button>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function PatientBooking() {
  const { clinicId, doctorId } = useLocation().state || {};

  const [date, setDate] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSubSlotIndex, setSelectedSubSlotIndex] = useState(null);
  const [reason, setReason] = useState("");
  const [paymentValid, setPaymentValid] = useState(false);
  const [appointmentInfo, setAppointmentInfo] = useState(null);

  const token = localStorage.getItem("patientToken");
  const patientId = localStorage.getItem("patientId");
  const headers = { Authorization: `Bearer ${token}` };

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = new Date().toISOString().split("T")[0];
  const isToday = date === today;

  // Fetch available slots
  useEffect(() => {
    if (date && doctorId) fetchSlots();
  }, [date, isOnline]);

  // Fetch existing appointment/payment info to check 7-day validity
  useEffect(() => {
    if (date && doctorId) fetchAppointmentInfo();
  }, [date, doctorId]);

  const fetchSlots = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/doctors/${doctorId}/available-slots`,
        { date, isOnline },
        { headers }
      );
      setSlots(res.data.slots || []);
      setSelectedSlot(null);
      setSelectedSubSlotIndex(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch slots");
    }
  };

  const fetchAppointmentInfo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/appointments/patient/${patientId}/appointment-on-date`,
        { params: { date, doctorId }, headers }
      );
      const appointment = res.data.appointment;
      if (appointment && appointment.payment?.paymentStatus === "paid") {
        const expiresAt = new Date(appointment.payment.expiresAt);
        const now = new Date();
        setPaymentValid(now <= expiresAt); // true if within 7-day validity
        setAppointmentInfo(appointment);
      } else {
        setPaymentValid(false);
        setAppointmentInfo(null);
      }
    } catch (err) {
      console.error("Failed to fetch appointment info", err);
      setPaymentValid(false);
    }
  };

  // Check if sub-slot time is past for today
  const isPast = (timeStr) => {
    if (!isToday) return false;
    const [h, m] = timeStr.split(":").map(Number);
    const slotTime = new Date(`${date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
    return slotTime < new Date();
  };

  const handleBooking = async () => {
    if (selectedSubSlotIndex === null || !selectedSlot) {
      return toast.error("Please select a sub-slot");
    }

    const subTokenNumber = (selectedSlot.slot - 1) * selectedSlot.subSlots.length + (selectedSubSlotIndex + 1);
    const selectedTime = selectedSlot.subSlots[selectedSubSlotIndex].time;

    try {
      // 1️⃣ Book the appointment
      const res = await axios.post(
        "http://localhost:5000/api/appointments/bookAppointment",
        {
          clinicId,
          doctorId,
          patientId,
          date,
          slot: selectedSlot.slot,
          time: selectedTime,
          subTokenNumber,
          reason,
          timezone,
          isOnline,
        },
        { headers }
      );

      const appointmentId = res.data.appointment?._id;
      if (!appointmentId) throw new Error("Appointment not created");

      // 2️⃣ If payment already valid, skip Stripe
      if (paymentValid) {
        
        toast.success("Booking confirmed! Payment already valid for this slot.");
        return;
      }

      // 3️⃣ Create Stripe checkout only if payment expired
      const amount = 500; // example consultation fee
      const checkoutRes = await axios.post(
        "http://localhost:5000/api/appointments/create-checkout",
        { appointmentId, amount },
        { headers }
      );

      const { url } = checkoutRes.data;
      if (!url) throw new Error("Failed to create checkout session");

      // 4️⃣ Redirect to Stripe payment
      window.location.href = url;

    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Booking failed");
      fetchSlots();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      {/* Date Picker */}
      <input
        type="date"
        min={today}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />

      <p className="text-sm mb-2 text-gray-500">Timezone: {timezone}</p>

      {/* Online/Offline Toggle */}
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            value="online"
            checked={isOnline === true}
            onChange={() => setIsOnline(true)}
          />
          <span>Online</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="mode"
            value="offline"
            checked={isOnline === false}
            onChange={() => setIsOnline(false)}
          />
          <span>Offline</span>
        </label>
      </div>

      {/* Slots */}
      {slots.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {slots.map((slot) => (
            <button
              key={slot.slot}
              disabled={slot.status === "booked"}
              onClick={() => {
                setSelectedSlot(slot);
                setSelectedSubSlotIndex(null);
              }}
              className={`p-2 rounded border text-sm transition ${
                slot.status === "booked"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : selectedSlot?.slot === slot.slot
                  ? "bg-green-600 text-white"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            >
              Slot {slot.slot} <br />
              {slot.from} - {slot.to} <br />
              <span className="text-xs font-medium text-gray-600">({slot.type})</span>
            </button>
          ))}
        </div>
      ) : (
        date && <p className="text-red-500 text-sm mb-4">No {isOnline ? "online" : "offline"} slots available</p>
      )}

      {/* Sub-Slots */}
      {selectedSlot?.subSlots?.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold mb-2">Select Sub-slot:</p>
          <div className="grid grid-cols-2 gap-2">
            {selectedSlot.subSlots.map((sub, idx) => {
              const disabled = sub.status === "booked" || isPast(sub.time);
              return (
                <button
                  key={idx}
                  disabled={disabled}
                  onClick={() => setSelectedSubSlotIndex(idx)}
                  className={`p-2 rounded border text-sm transition ${
                    disabled
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selectedSubSlotIndex === idx
                      ? "bg-green-600 text-white"
                      : "bg-blue-50 hover:bg-blue-100"
                  }`}
                >
                  Token {(selectedSlot.slot - 1) * selectedSlot.subSlots.length + (idx + 1)} - {sub.time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reason for Visit */}
      <textarea
        className="w-full border p-2 mb-4 rounded"
        placeholder="Reason for visit (optional)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      ></textarea>

      {/* Confirm Button */}
      <button
        onClick={handleBooking}
        disabled={selectedSubSlotIndex === null}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {paymentValid ? "Confirm" : "Confirm Booking & Pay"}
      </button>
    </div>
  );
}
