// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Bell, Menu, X } from 'lucide-react';
// import { AnimatePresence, motion } from 'framer-motion';

// const PatientProfilePage = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem('patientToken');
//   const headers = { Authorization: `Bearer ${token}` };

//   const [patient, setPatient] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifs, setShowNotifs] = useState(false);
//   const [image, setImage] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     fetchPatient();
//     fetchNotifications();
//     fetchNotificationCount();
//   }, [id]);

//   const fetchPatient = async () => {
//     const res = await axios.get(`http://localhost:5000/api/patients/profile/${id}`, { headers });
//     setPatient(res.data);
//     setForm(res.data);
//   };

//   const fetchNotifications = async () => {
//     const res = await axios.get(`http://localhost:5000/api/patients/notifications`, { headers });
//     setNotifications(res.data.notifications);
//   };

//   const fetchNotificationCount = async () => {
//     const res = await axios.get(`http://localhost:5000/api/patients/notifications-count`, { headers });
//     setUnreadCount(res.data.count);
//   };

//   const handleImageChange = (e) => setImage(e.target.files[0]);

//   const uploadImage = async () => {
//     if (!image) return;
//     const formData = new FormData();
//     formData.append('image', image);
//     await axios.post(`http://localhost:5000/api/patients/upload-photo`, formData, {
//       headers: {
//         ...headers,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     fetchPatient();
//   };

//   const handleUpdate = async () => {
//     await axios.patch(`http://localhost:5000/api/patients/profile/${id}`, form, { headers });
//     setEditMode(false);
//     fetchPatient();
//   };

//   const markAsRead = async (notifId) => {
//     await axios.patch(`http://localhost:5000/api/patients/notifications/${notifId}/read`, {}, { headers });
//     fetchNotifications();
//     fetchNotificationCount();
//   };

//   if (!patient) return <div className="text-center p-4">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-white shadow sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
//           <div className="text-xl font-bold text-blue-600">PatientPanel</div>

//           <div className="hidden md:flex items-center space-x-4">
//             <span className="text-gray-700 font-medium">{patient.name}</span>
//             <div className="relative">
//               <Bell className="cursor-pointer" onClick={() => setShowNotifs(!showNotifs)} />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
//                   {unreadCount}
//                 </span>
//               )}
//               <AnimatePresence>
//                 {showNotifs && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 w-64 bg-white border shadow-lg z-50 rounded"
//                   >
//                     <div className="p-2 max-h-64 overflow-y-auto">
//                       {notifications.map((n) => (
//                         <div key={n._id} className={`p-2 border-b ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}>
//                           <p>{n.message}</p>
//                           {!n.read && (
//                             <button
//                               className="text-blue-600 text-xs hover:underline"
//                               onClick={() => markAsRead(n._id)}
//                             >
//                               Mark as read
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//             <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
//             <button onClick={() => {
//               localStorage.removeItem('patientToken');
//               window.location.href = '/login';
//             }} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
//           </div>

//           <div className="md:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-white px-4 py-3 space-y-2 shadow"
//           >
//             <div>Welcome, {patient.name}</div>
//             <button onClick={() => setEditMode(true)} className="text-blue-600 hover:underline">Edit</button>
//             <button onClick={() => {
//               localStorage.removeItem('patientToken');
//               window.location.href = '/login';
//             }} className="text-red-600 hover:underline">Logout</button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main */}
//       <main className="max-w-4xl mx-auto p-6">
//         <div className="bg-white shadow rounded-xl p-6">
//           <h1 className="text-2xl font-bold mb-2">{patient.name}</h1>
//           <p>Gender: {patient.gender}</p>
//           <p>Age: {patient.age}</p>
//           <p>Email: {patient.email}</p>
//           <p>Phone: {patient.contact?.phone}</p>
//           <p>Address: {patient.contact?.address}</p>
//           <p>Blood Group: {patient.bloodGroup}</p>
//           <p>Status: {patient.status}</p>
//           <p>Doctor Assigned: {patient.doctorAssigned?.name || 'N/A'}</p>
//           <p>Department: {patient.department || 'N/A'}</p>
//           <p>Diagnosis: {patient.diagnosis || 'N/A'}</p>
//         </div>

//         {editMode && (
//           <div className="bg-gray-100 p-4 mt-6 rounded-xl">
//             <h2 className="text-lg font-semibold mb-2">Edit Patient Info</h2>
//             <input className="w-full p-2 mb-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//             <input className="w-full p-2 mb-2 border" value={form.contact?.phone || ''} onChange={e => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })} />
//             <input className="w-full p-2 mb-2 border" value={form.contact?.address || ''} onChange={e => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })} />
//             <textarea className="w-full p-2 mb-2 border" placeholder="Diagnosis" value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })}></textarea>

//             <div className="mt-4">
//               <label className="block font-medium">Upload New Profile Image</label>
//               <input type="file" onChange={handleImageChange} />
//               <button onClick={uploadImage} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Upload</button>
//             </div>

//             <div className="flex space-x-2 mt-4">
//               <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//               <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//             </div>
//           </div>
//         )}

//         {/* Medical History */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Medical History</h2>
//           {patient.medicalHistory?.length ? (
//             patient.medicalHistory.map((item, i) => (
//               <div key={i} className="border p-2 rounded mb-2 bg-white">
//                 <p><strong>Condition:</strong> {item.condition}</p>
//                 <p><strong>Treatment:</strong> {item.treatment}</p>
//                 <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
//               </div>
//             ))
//           ) : <p className="text-gray-500">No history recorded.</p>}
//         </div>

//         {/* Reports */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Reports</h2>
//           {patient.reports?.length ? (
//             patient.reports.map((r, i) => (
//               <div key={i} className="border p-2 rounded mb-2 bg-white">
//                 <p><strong>Title:</strong> {r.title}</p>
//                 <p>{r.description}</p>
//                 {r.fileUrl && (
//                   <a href={`http://localhost:5000${r.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a>
//                 )}
//               </div>
//             ))
//           ) : <p className="text-gray-500">No reports available.</p>}
//         </div>

//         {/* Payments */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Payments</h2>
//           {patient.payments?.length ? (
//             patient.payments.map((p, i) => (
//               <div key={i} className="border p-2 rounded mb-2 bg-white">
//                 <p><strong>Amount:</strong> ₹{p.amount}</p>
//                 <p><strong>Method:</strong> {p.method}</p>
//                 <p><strong>Status:</strong> {p.status}</p>
//                 <p><strong>Date:</strong> {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : 'N/A'}</p>
//               </div>
//             ))
//           ) : <p className="text-gray-500">No payments made yet.</p>}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PatientProfilePage;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Bell, Menu, X } from 'lucide-react';
// import { AnimatePresence, motion } from 'framer-motion';

// const PatientProfilePage = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem('patientToken');
//   const headers = { Authorization: `Bearer ${token}` };

//   const [patient, setPatient] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifs, setShowNotifs] = useState(false);
//   const [image, setImage] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     fetchPatient();
//     fetchNotifications();
//     fetchNotificationCount();
//   }, [id]);

//   const fetchPatient = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/patients/profile/${id}`, { headers });
//       setPatient(res.data);
//       setForm(res.data);
//     } catch (err) {
//       console.error('Error fetching patient:', err);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/patients/notifications`, { headers });
//       setNotifications(res.data.notifications);
//     } catch (err) {
//       console.error('Error fetching notifications:', err);
//     }
//   };

//   const fetchNotificationCount = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/patients/notifications-count`, { headers });
//       setUnreadCount(res.data.count);
//     } catch (err) {
//       console.error('Error fetching notification count:', err);
//     }
//   };

//   const handleImageChange = (e) => setImage(e.target.files[0]);

//   const uploadImage = async () => {
//     if (!image) return alert('Please select an image');
//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       await axios.post(`http://localhost:5000/api/patients/upload-photo`, formData, {
//         headers: {
//           ...headers,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       fetchPatient();
//       setImage(null);
//       alert('Image uploaded successfully');
//     } catch (err) {
//       console.error('Error uploading image:', err);
//       alert('Failed to upload image');
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.patch(`http://localhost:5000/api/patients/profile/${id}`, form, { headers });
//       setEditMode(false);
//       fetchPatient();
//       alert('Profile updated');
//     } catch (err) {
//       console.error('Error updating profile:', err);
//       alert('Failed to update profile');
//     }
//   };

//   const markAsRead = async (notifId) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/patients/notifications/${notifId}/read`, {}, { headers });
//       fetchNotifications();
//       fetchNotificationCount();
//     } catch (err) {
//       console.error('Error marking notification as read:', err);
//     }
//   };

//   if (!patient) return <div className="text-center p-4">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-white shadow sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
//           <div className="text-xl font-bold text-blue-600">PatientPanel</div>

//           <div className="hidden md:flex items-center space-x-4">
//             <span className="text-gray-700 font-medium">{patient.name}</span>
//             <div className="relative">
//               <Bell className="cursor-pointer" onClick={() => setShowNotifs(!showNotifs)} />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
//                   {unreadCount}
//                 </span>
//               )}
//               <AnimatePresence>
//                 {showNotifs && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 w-64 bg-white border shadow-lg z-50 rounded"
//                   >
//                     <div className="p-2 max-h-64 overflow-y-auto">
//                       {notifications.map((n) => (
//                         <div key={n._id} className={`p-2 border-b ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}>
//                           <p>{n.message}</p>
//                           {!n.read && (
//                             <button
//                               className="text-blue-600 text-xs hover:underline"
//                               onClick={() => markAsRead(n._id)}
//                             >
//                               Mark as read
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//             <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
//             <button onClick={() => {
//               localStorage.removeItem('patientToken');
//               window.location.href = '/login';
//             }} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
//           </div>

//           <div className="md:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-white px-4 py-3 space-y-2 shadow"
//           >
//             <div>Welcome, {patient.name}</div>
//             <button onClick={() => setEditMode(true)} className="text-blue-600 hover:underline">Edit</button>
//             <button onClick={() => {
//               localStorage.removeItem('patientToken');
//               window.location.href = '/login';
//             }} className="text-red-600 hover:underline">Logout</button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main */}
//       <main className="max-w-4xl mx-auto p-6">
//         <div className="bg-white shadow rounded-xl p-6">
//           <h1 className="text-2xl font-bold mb-2">{patient.name}</h1>
//           <p>Gender: {patient.gender}</p>
//           <p>Age: {patient.age}</p>
//           <p>Email: {patient.email}</p>
//           <p>Phone: {patient.contact?.phone}</p>
//           <p>Address: {patient.contact?.address}</p>
//           <p>Blood Group: {patient.bloodGroup}</p>
//           <p>Status: {patient.status}</p>
//           <p>Doctor Assigned: {patient.doctorAssigned?.name || 'N/A'}</p>
//           <p>Department: {patient.department || 'N/A'}</p>
//           <p>Diagnosis: {patient.diagnosis || 'N/A'}</p>
//         </div>

//         {editMode && (
//           <div className="bg-gray-100 p-4 mt-6 rounded-xl">
//             <h2 className="text-lg font-semibold mb-2">Edit Patient Info</h2>
//             <input
//               className="w-full p-2 mb-2 border"
//               value={form.name || ''}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//             />
//             <input
//               className="w-full p-2 mb-2 border"
//               value={form.contact?.phone || ''}
//               onChange={e => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })}
//             />
//             <input
//               className="w-full p-2 mb-2 border"
//               value={form.contact?.address || ''}
//               onChange={e => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })}
//             />
//             <textarea
//               className="w-full p-2 mb-2 border"
//               placeholder="Diagnosis"
//               value={form.diagnosis || ''}
//               onChange={e => setForm({ ...form, diagnosis: e.target.value })}
//             ></textarea>

//             <div className="mt-4">
//               <label className="block font-medium">Upload New Profile Image</label>
//               <input type="file" onChange={handleImageChange} />
//               <button onClick={uploadImage} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Upload</button>
//             </div>

//             <div className="flex space-x-2 mt-4">
//               <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//               <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//             </div>
//           </div>
//         )}

//         {/* Medical History */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Medical History</h2>
//           {patient.medicalHistory?.length ? (
//             patient.medicalHistory.map((item, i) => (
//               <div key={i} className="border p-2 rounded mb-2 bg-white">
//                 <p><strong>Condition:</strong> {item.condition}</p>
//                 <p><strong>Treatment:</strong> {item.treatment}</p>
//                 <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
//               </div>
//             ))
//           ) : <p className="text-gray-500">No history recorded.</p>}
//         </div>

//         {/* Reports */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Reports</h2>
//           {patient.reports?.length ? (
//             patient.reports.map((r, i) => (
//               <div key={i} className="border p-2 rounded mb-2 bg-white">
//                 <p><strong>Title:</strong> {r.title}</p>
//                 <p>{r.description}</p>
//                 {r.fileUrl && (
//                   <a
//                     href={`http://localhost:5000${r.fileUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     Download
//                   </a>
//                 )}
//               </div>
//             ))
//           ) : <p className="text-gray-500">No reports available.</p>}
//         </div>

// <Link to={`/patient/${patientId}/labReport/${report._id}`}>View Report</Link>

//         {/* Payments */}
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-2">Payments</h2>
//           {patient.payments?.length ? (
//             patient.payments.map((p, i) => (
//               <div key={i} className="border p-2 rounded mb-2 bg-white">
//                 <p><strong>Amount:</strong> ₹{p.amount}</p>
//                 <p><strong>Method:</strong> {p.method}</p>
//                 <p><strong>Status:</strong> {p.status}</p>
//                 <p><strong>Date:</strong> {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : 'Pending'}</p>
//               </div>
//             ))
//           ) : <p className="text-gray-500">No payments found.</p>}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default PatientProfilePage;












import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Bell, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const PatientProfilePage = () => {
  const { id } = useParams(); // patient ID
  const token = localStorage.getItem('patientToken');
  const headers = { Authorization: `Bearer ${token}` };

  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifs, setShowNotifs] = useState(false);
  const [image, setImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchPatient();
    fetchNotifications();
    fetchNotificationCount();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/patients/profile/${id}`, { headers });
      setPatient(res.data);
      setForm(res.data);
    } catch (err) {
      console.error('Error fetching patient:', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/patients/notifications`, { headers });
      setNotifications(res.data.notifications);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const fetchNotificationCount = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/patients/notifications-count`, { headers });
      setUnreadCount(res.data.count);
    } catch (err) {
      console.error('Error fetching notification count:', err);
    }
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const uploadImage = async () => {
    if (!image) return alert('Please select an image');
    const formData = new FormData();
    formData.append('image', image);

    try {
      await axios.post(`http://localhost:5000/api/patients/upload-photo`, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchPatient();
      setImage(null);
      alert('Image uploaded successfully');
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Failed to upload image');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/patients/profile/${id}`, form, { headers });
      setEditMode(false);
      fetchPatient();
      alert('Profile updated');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile');
    }
  };

  const markAsRead = async (notifId) => {
    try {
      await axios.patch(`http://localhost:5000/api/patients/notifications/${notifId}/read`, {}, { headers });
      fetchNotifications();
      fetchNotificationCount();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  if (!patient) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-xl font-bold text-blue-600">PatientPanel</div>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-700 font-medium">{patient.name}</span>
            <div className="relative">
              <Bell className="cursor-pointer" onClick={() => setShowNotifs(!showNotifs)} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                  {unreadCount}
                </span>
              )}
              <AnimatePresence>
                {showNotifs && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white border shadow-lg z-50 rounded"
                  >
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n._id} className={`p-2 border-b ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}>
                          <p>{n.message}</p>
                          {!n.read && (
                            <button
                              className="text-blue-600 text-xs hover:underline"
                              onClick={() => markAsRead(n._id)}
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => { localStorage.removeItem('patientToken'); window.location.href = '/login'; }} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white px-4 py-3 space-y-2 shadow"
          >
            <div>Welcome, {patient.name}</div>
            <button onClick={() => setEditMode(true)} className="text-blue-600 hover:underline">Edit</button>
            <button onClick={() => { localStorage.removeItem('patientToken'); window.location.href = '/login'; }} className="text-red-600 hover:underline">Logout</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Patient Info */}
        <div className="bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2">{patient.name}</h1>
          <p>Gender: {patient.gender}</p>
          <p>Age: {patient.age}</p>
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.contact?.phone}</p>
          <p>Address: {patient.contact?.address}</p>
          <p>Blood Group: {patient.bloodGroup}</p>
          <p>Status: {patient.status}</p>
          <p>Doctor Assigned: {patient.doctorAssigned?.name || 'N/A'}</p>
          <p>Department: {patient.department || 'N/A'}</p>
          <p>Diagnosis: {patient.diagnosis || 'N/A'}</p>
        </div>

        {/* Edit Mode */}
        {editMode && (
          <div className="bg-gray-100 p-4 mt-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-2">Edit Patient Info</h2>
            <input className="w-full p-2 mb-2 border" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="w-full p-2 mb-2 border" value={form.contact?.phone || ''} onChange={e => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })} />
            <input className="w-full p-2 mb-2 border" value={form.contact?.address || ''} onChange={e => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })} />
            <textarea className="w-full p-2 mb-2 border" placeholder="Diagnosis" value={form.diagnosis || ''} onChange={e => setForm({ ...form, diagnosis: e.target.value })}></textarea>

            <div className="mt-4">
              <label className="block font-medium">Upload New Profile Image</label>
              <input type="file" onChange={handleImageChange} />
              <button onClick={uploadImage} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Upload</button>
            </div>

            <div className="flex space-x-2 mt-4">
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        )}

        {/* Medical History */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Medical History</h2>
          {patient.medicalHistory?.length ? (
            patient.medicalHistory.map((item, i) => (
              <div key={i} className="border p-2 rounded mb-2 bg-white">
                <p><strong>Condition:</strong> {item.condition}</p>
                <p><strong>Treatment:</strong> {item.treatment}</p>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : <p className="text-gray-500">No history recorded.</p>}
        </div>

        {/* Reports */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          {patient.reports?.length ? (
            patient.reports.map((r, i) => (
              <div key={i} className="border p-2 rounded mb-2 bg-white">
                <p><strong>Title:</strong> {r.title}</p>
                <p>{r.description}</p>
                {r.fileUrl && (
                  <a href={`http://localhost:5000${r.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Download
                  </a>
                )}
                <Link to={`/patients/${id}/labReport/${r._id}`} className="ml-4 text-green-600 underline">
                  View Report
                </Link>
              </div>
            ))
          ) : <p className="text-gray-500">No reports available.</p>}
        </div>

        {/* Payments */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Payments</h2>
          {patient.payments?.length ? (
            patient.payments.map((p, i) => (
              <div key={i} className="border p-2 rounded mb-2 bg-white">
                <p><strong>Amount:</strong> ₹{p.amount}</p>
                <p><strong>Method:</strong> {p.method}</p>
                <p><strong>Status:</strong> {p.status}</p>
                <p><strong>Date:</strong> {p.paidAt ? new Date(p.paidAt).toLocaleDateString() : 'Pending'}</p>
              </div>
            ))
          ) : <p className="text-gray-500">No payments found.</p>}
        </div>
      </main>
    </div>
  );
};

export default PatientProfilePage;































