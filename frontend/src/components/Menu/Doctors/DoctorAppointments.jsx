// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function DoctorAppointments() {
//   const doctorId = JSON.parse(localStorage.getItem("doctorData"))._id
//   const token = localStorage.getItem('doctorToken');

//   console.log("appDocId",doctorId)
//   const [appointments, setAppointments] = useState([]);

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/appointments/DoctorAppointments/${doctorId}`,
//         { headers }
//       );
//       console.log("appointments",res.data)
//       setAppointments(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch appointments");
//     }
//   };

//   const respondToAppointment = async (id, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/appointments/respondToAppointment/${id}`,
//         { status },
//         { headers }
//       );
//       toast.success(`Appointment ${status}`);
//       fetchAppointments(); // refresh
//     } catch (err) {
//       toast.error("Failed to update appointment");
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Doctor Appointments</h1>
//       {appointments.length === 0 ? (
//         <p>No appointments found</p>
//       ) : (
//         appointments.map((appt) => (
//             <div key={appt._id} className="border rounded p-4 mb-4 shadow-sm bg-white">
//               <p><strong>Patient:</strong> {appt.patientId?.name}</p>
//               <p><strong>Clinic:</strong> {appt.clinicId?.name}</p>
//               <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
//               <p><strong>Time:</strong> {appt.timeSlot?.from} - {appt.timeSlot?.to}</p>
//               <p><strong>Status:</strong> <span className="text-blue-600">{appt.status}</span></p>
//               {appt.status === 'pending' && (
//                 <div className="mt-3 flex gap-2">
//                   <button
//                     onClick={() => respondToAppointment(appt._id, 'confirmed')}
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Confirm
//                   </button>
//                   <button
//                     onClick={() => respondToAppointment(appt._id, 'rejected')}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//         ))
//       )}
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// export default function DoctorAppointments() {
//   const doctorId = JSON.parse(localStorage.getItem("doctorData"))._id;
//   const token = localStorage.getItem('doctorToken');
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/appointments/DoctorAppointments/${doctorId}`,
//         { headers }
//       );
//       setAppointments(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch appointments");
//     }
//   };

//   const respondToAppointment = async (id, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/appointments/respondToAppointment/${id}`,
//         { status },
//         { headers }
//       );
//       toast.success(`Appointment ${status}`);
//       fetchAppointments(); // refresh
//     } catch (err) {
//       toast.error("Failed to update appointment");
//     }
//   };

//   const handleCardClick = (appId,patientId,clinicId,doctorId) => {
//     navigate(`/consultation/${appId}/${doctorId}/${patientId}/${clinicId}`);
//   };

//   const stopPropagation = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Doctor Appointments</h1>
//       {appointments.length === 0 ? (
//         <p>No appointments found</p>
//       ) : (
//         appointments.map((appt) => (
//           <div
//             key={appt._id}
//             onClick={() => handleCardClick(appt._id,appt.patientId._id,appt.clinicId._id,appt.doctorId._id)}
//             className="border rounded p-4 mb-4 shadow-sm bg-white cursor-pointer hover:bg-gray-50"
//           >
//             <p><strong>Patient:</strong> {appt.patientId?.name}</p>
//             <p><strong>Clinic:</strong> {appt.clinicId?.name}</p>
//             <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
//             <p><strong>Time:</strong> {appt.timeSlot?.from} - {appt.timeSlot?.to}</p>
//             <p><strong>Status:</strong> <span className="text-blue-600">{appt.status}</span></p>

//             {appt.status === 'pending' && (
//               <div className="mt-3 flex gap-2" onClick={stopPropagation}>
//                 <button
//                   onClick={() => respondToAppointment(appt._id, 'confirmed')}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() => respondToAppointment(appt._id, 'rejected')}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// export default function DoctorAppointments() {
//   const doctorId = JSON.parse(localStorage.getItem("doctorData"))._id;
//     const [doctor, setDoctor] = useState(null);
  
//   const token = localStorage.getItem('doctorToken');
//   const [appointments, setAppointments] = useState([]);

//   const [form, setForm] = useState({});
//   const [sending, setSending] = useState(false);

//   const [editingLink, setEditingLink] = useState({}); // key: appointmentId, value: meetLink
//   const navigate = useNavigate();

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/appointments/DoctorAppointments/${doctorId}`,
//         { headers }
//       );
//       setAppointments(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch appointments");
//     }
//   };

//   const respondToAppointment = async (id, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/appointments/respondToAppointment/${id}`,
//         { status },
//         { headers }
//       );
//       toast.success(`Appointment ${status}`);
//       fetchAppointments();
//     } catch (err) {
//       toast.error("Failed to update appointment");
//     }
//   };

//   // const updateMeetLink = async (appointmentId) => {
//   //   const meetLink = editingLink[appointmentId];
//   //   if (!meetLink) return toast.error("Meet link cannot be empty");

//   //   try {
//   //     await axios.patch(
//   //       `http://localhost:5000/api/appointments/updateMeetLink/${appointmentId}`,
//   //       { meetLink },
//   //       { headers }
//   //     );
//   //     toast.success("Meet link updated");
//   //     setEditingLink((prev) => ({ ...prev, [appointmentId]: '' }));
//   //     fetchAppointments();
//   //   } catch (err) {
//   //     toast.error("Failed to update meet link");
//   //   }
//   // };
  
//   const handleCardClick = (appId, patientId, clinicId, doctorId) => {
//     console.log('appId',appId);

//     navigate(`/consultation/${appId}/${doctorId}/${patientId}/${clinicId}`);
    
//   };

//   const stopPropagation = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Doctor Appointments</h1>
//       {appointments.length === 0 ? (
//         <p>No appointments found</p>
//       ) : (
//         appointments.map((appt) => (
//           <div
//             key={appt._id}
//             onClick={() => handleCardClick(appt._id, appt.patientId._id, appt.clinicId._id, appt.doctorId._id)}
//             className="border rounded p-4 mb-4 shadow-sm bg-white cursor-pointer hover:bg-gray-50"
//           >
//             <p><strong>Patient:</strong> {appt.patientId?.name}</p>
//             <p><strong>Clinic:</strong> {appt.clinicId?.name}</p>
//             <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
//             <p><strong>Time:</strong> {appt.timeSlot?.from} - {appt.timeSlot?.to}</p>
//             <p><strong>Status:</strong> <span className="text-blue-600">{appt.status}</span></p>
//             <p><strong>Type:</strong> {appt.type}</p>
//             <p><strong>Slot No:</strong> {appt.slot}</p>
//             <p><strong>Sub Token No:</strong> {appt.subTokenNumber}</p>
//             <p><strong>Reason:</strong> {appt.reason}</p>

//             {appt.status === 'pending' && (
//               <div className="mt-3 flex gap-2" onClick={stopPropagation}>
//                 <button
//                   onClick={() => respondToAppointment(appt._id, 'confirmed')}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() => respondToAppointment(appt._id, 'rejected')}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}

//             {/* ✅ Meet Link Input Section for Online Appointments */}
//             {appt.type === 'online' && appt.status === 'confirmed' && (
//               <div className="mt-4" onClick={stopPropagation}>
//                 <p className="font-medium mb-1">Google Meet Link:</p>
//                 {appt.meetLink ? (
//                   <p className="text-blue-600 mb-2">
//                     <a href={appt.meetLink} target="_blank" rel="noopener noreferrer">
//                       {appt.meetLink}
//                     </a>
//                   </p>
//                 ) : (
//                   <p className="text-sm text-gray-500 mb-2">No link added yet</p>
//                 )}

//                 {/* <input
//                   type="text"
//                   placeholder="Enter Google Meet link"
//                   className="w-full border px-3 py-2 rounded mb-2"
//                   value={editingLink[appt._id] || ''}
//                   onChange={(e) =>
//                     setEditingLink((prev) => ({
//                       ...prev,
//                       [appt._id]: e.target.value
//                     }))
//                   }
//                 /> */}
                
//                 {/* <button
//                   onClick={() => updateMeetLink(appt._id)}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Save Link
//                 </button> */}



//                 <div className="mt-10">
//                   <h2 className="text-lg font-semibold mb-2">Send Google Meet Link</h2>
//                   <input
//                     type="text"
//                     placeholder="Enter Google Meet link"
//                     value={form.meetLink || ''}
//                     onChange={(e) => setForm({ ...form, meetLink: e.target.value })}
//                     className="w-full p-2 border rounded mb-2"
//                   />
                
//                   <button
//                     disabled={sending}
//                     className={`bg-blue-600 text-white px-4 py-2 rounded transition duration-200 ${
//                       sending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//                     }`}
//                     onClick={async () => {
//                       const meetLink = form.meetLink?.trim();
                
//                       // Validate input
//                       if (!meetLink) {
//                         alert("Please enter a Google Meet link.");
//                         return;
//                       }
                
//                       const isValidMeetLink = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/.test(meetLink);
//                       if (!isValidMeetLink) {
//                         alert("Please enter a valid Google Meet link (e.g. https://meet.google.com/xyz-abcd-efg)");
//                         return;
//                       }
                
//                       setSending(true);
//                       try {
//                         await axios.post(
//                           'http://localhost:5000/api/doctors/send-meetlink-whatsapp',
//                           { doctorId, meetLink,patientId:appt.patientId._id },
//                           { headers }
//                         );
//                         alert("Meet link sent successfully to the patient via WhatsApp.");
//                         setForm({ ...form, meetLink: '' }); // Clear input
//                       } catch (error) {
//                         console.error(error);
//                         alert("Failed to send meet link. Please try again.");
//                       } finally {
//                         setSending(false);
//                       }
//                     }}
//                   >
//                     {sending ? 'Sending...' : 'Send Link'}
//                   </button>
//                 </div>
                
//               </div>




//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// export default function DoctorAppointments({doctorId}) {
//   // const doctorId = JSON.parse(localStorage.getItem("doctorData"))._id;
//   const token = localStorage.getItem('doctorToken');

//   const [appointments, setAppointments] = useState([]);
//   const [form, setForm] = useState({}); // { appointmentId: meetLink }
//   const [sendingId, setSendingId] = useState(null);
//   const navigate = useNavigate();

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/appointments/DoctorAppointments/${doctorId}`,
//         { headers }
//       );
//       setAppointments(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch appointments");
//     }
//   };

//   const respondToAppointment = async (id, status) => {
//     try {
//       await axios.patch(
//         `http://localhost:5000/api/appointments/respondToAppointment/${id}`,
//         { status },
//         { headers }
//       );
//       toast.success(`Appointment ${status}`);
//       fetchAppointments();
//     } catch (err) {
//       toast.error("Failed to update appointment");
//     }
//   };

//   const handleCardClick = (appId, patientId, clinicId, doctorId) => {
//     navigate(`/consultation/${appId}/${doctorId}/${patientId}/${clinicId}`);
//   };

//   const stopPropagation = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Doctor Appointments</h1>
//       {appointments.length === 0 ? (
//         <p>No appointments found</p>
//       ) : (
//         appointments.map((appt) => (
//           <div
//             key={appt._id}
//             onClick={() => handleCardClick(appt._id, appt.patientId._id, appt.clinicId._id, appt.doctorId._id)}
//             className="border rounded p-4 mb-4 shadow-sm bg-white cursor-pointer hover:bg-gray-50"
//           >
//             <p><strong>Patient:</strong> {appt.patientId?.name}</p>
//             <p><strong>Clinic:</strong> {appt.clinicId?.name}</p>
//             <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
//             <p><strong>Time:</strong> {appt.timeSlot?.from} - {appt.timeSlot?.to}</p>
//             <p><strong>Status:</strong> <span className="text-blue-600">{appt.status}</span></p>
//             <p><strong>Type:</strong> {appt.type}</p>
//             <p><strong>Slot No:</strong> {appt.slot}</p>
//             <p><strong>Sub Token No:</strong> {appt.subTokenNumber}</p>
//             <p><strong>Reason:</strong> {appt.reason}</p>

//             {appt.status === 'pending' && (
//               <div className="mt-3 flex gap-2" onClick={stopPropagation}>
//                 <button
//                   onClick={() => respondToAppointment(appt._id, 'confirmed')}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() => respondToAppointment(appt._id, 'rejected')}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}

//             {appt.type === 'online' && appt.status === 'confirmed' && (
//               <div className="mt-4" onClick={stopPropagation}>
//                 <p className="font-medium mb-1">Google Meet Link:</p>
//                 {appt.meetLink ? (
//                   <p className="text-blue-600 mb-2">
//                     <a href={appt.meetLink} target="_blank" rel="noopener noreferrer">
//                       {appt.meetLink}
//                     </a>
//                   </p>
//                 ) : (
//                   <p className="text-sm text-gray-500 mb-2">No link added yet</p>
//                 )}

//                 <input
//                   type="text"
//                   placeholder="Enter Google Meet link"
//                   value={form[appt._id] || ''}
//                   onChange={(e) =>
//                     setForm((prev) => ({ ...prev, [appt._id]: e.target.value }))
//                   }
//                   className="w-full p-2 border rounded mb-2"
//                 />

//                 <button
//                   disabled={sendingId === appt._id}
//                   className={`bg-blue-600 text-white px-4 py-2 rounded transition duration-200 ${
//                     sendingId === appt._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//                   }`}
//                   onClick={async () => {
//                     const meetLink = form[appt._id]?.trim();
//                     if (!meetLink) {
//                       toast.error("Please enter a Google Meet link.");
//                       return;
//                     }

//                     const isValidMeetLink = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/.test(meetLink);
//                     if (!isValidMeetLink) {
//                       toast.error("Invalid Google Meet link format.");
//                       return;
//                     }

//                     setSendingId(appt._id);
//                     try {
//                       await axios.post(
//                         'http://localhost:5000/api/doctors/send-meetlink-whatsapp',
//                         {
//                           doctorId,
//                           meetLink,
//                           patientId: appt.patientId._id
//                         },
//                         { headers }
//                       );
//                       toast.success("Meet link sent via WhatsApp");
//                       setForm((prev) => ({ ...prev, [appt._id]: '' }));
//                     } catch (error) {
//                       console.error(error);
//                       toast.error("Failed to send meet link.");
//                     } finally {
//                       setSendingId(null);
//                     }
//                   }}
//                 >
//                   {sendingId === appt._id ? 'Sending...' : 'Send Meet Link'}
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function DoctorAppointments({ doctorId }) {
  const token = localStorage.getItem('doctorToken');

  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({}); // { appointmentId: meetLink }
  const [sendingId, setSendingId] = useState(null);
  const navigate = useNavigate();

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/appointments/DoctorAppointments/${doctorId}`,
        { headers }
      );
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch appointments");
    }
  };

  const respondToAppointment = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/appointments/respondToAppointment/${id}`,
        { status },
        { headers }
      );
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update appointment");
    }
  };

  const handleCardClick = (appId, patientId, clinicId, doctorId) => {
    navigate(`/consultation/${appId}/${doctorId}/${patientId}/${clinicId}`);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const sendMeetLink = async (appointmentId) => {
    const meetLink = form[appointmentId]?.trim();
    if (!meetLink) {
      toast.error("Please enter a Google Meet link.");
      return;
    }
    
    const isValidMeetLink = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/.test(meetLink);
    if (!isValidMeetLink) {
      toast.error("Invalid Google Meet link format.");
      return;
    }
    
    setSendingId(appointmentId);
    console.log("appointment",appointmentId)
    try {
      const res = await axios.post(
        'http://localhost:5000/api/doctors/send-meetlink-whatsapp',
        { appointmentId, meetLink },
        { headers }
      );

      toast.success("Meet link sent via WhatsApp");

      // Optional: open WhatsApp automatically
      window.open(res.data.whatsappUrl, "_blank");

      // Clear input
      setForm((prev) => ({ ...prev, [appointmentId]: '' }));

      // Update appointment locally
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, meetLink } : appt
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to send meet link.");
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Doctor Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        appointments.map((appt) => (
          <div
            key={appt._id}
            onClick={() =>
              handleCardClick(
                appt._id,
                appt.patientId._id,
                appt.clinicId._id,
                appt.doctorId._id
              )
            }
            className="border rounded p-4 mb-4 shadow-sm bg-white cursor-pointer hover:bg-gray-50"
          >
            <p><strong>Patient:</strong> {appt.patientId?.name}</p>
            <p><strong>Clinic:</strong> {appt.clinicId?.name}</p>
            <p><strong>Date:</strong> {new Date(appt.date).toDateString()}</p>
            <p><strong>Time:</strong> {appt.timeSlot?.from} - {appt.timeSlot?.to}</p>
            <p><strong>Status:</strong> <span className="text-blue-600">{appt.status}</span></p>
            <p><strong>Type:</strong> {appt.type}</p>
            <p><strong>Slot No:</strong> {appt.slot}</p>
            <p><strong>Sub Token No:</strong> {appt.subTokenNumber}</p>
            <p><strong>Reason:</strong> {appt.reason}</p>

            {/* Respond buttons */}
            {appt.status === 'pending' && (
              <div className="mt-3 flex gap-2" onClick={stopPropagation}>
                <button
                  onClick={() => respondToAppointment(appt._id, 'confirmed')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => respondToAppointment(appt._id, 'rejected')}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            )}

            {/* Online consultation: add Meet link */}
            {appt.type === 'online' && appt.status === 'confirmed' && (
              <div className="mt-4" onClick={stopPropagation}>
                <p className="font-medium mb-1">Google Meet Link:</p>
                {appt.meetLink ? (
                  <p className="text-blue-600 mb-2">
                    <a href={appt.meetLink} target="_blank" rel="noopener noreferrer">
                      {appt.meetLink}
                    </a>
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mb-2">No link added yet</p>
                )}

                <input
                  type="text"
                  placeholder="Enter Google Meet link"
                  value={form[appt._id] || ''}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [appt._id]: e.target.value }))
                  }
                  className="w-full p-2 border rounded mb-2"
                />

                <button
                  disabled={sendingId === appt._id}
                  className={`bg-blue-600 text-white px-4 py-2 rounded transition duration-200 ${
                    sendingId === appt._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  onClick={() => sendMeetLink(appt._id)}
                >
                  {sendingId === appt._id ? 'Sending...' : 'Send Meet Link'}
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
