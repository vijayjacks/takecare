
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Bell, Menu, X } from 'lucide-react';

// const DoctorProfilePage = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem('doctorToken');
//   const headers = { Authorization: `Bearer ${token}` };

//   const [doctor, setDoctor] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [image, setImage] = useState(null);
//   const [page, setPage] = useState(1);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const limit = 5;



//   //upload profile image
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const uploadImage = async () => {
//     if (!image) return;

//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       await axios.post('http://localhost:5000/api/doctors/upload-photo', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       fetchDoctor(); // Refresh profile after upload
//     } catch (err) {
//       console.error('Upload failed:', err);
//     }
//   };


//   //doctor fetch
//   const fetchDoctor = async () => {
//     const res = await axios.get(`http://localhost:5000/api/doctors/profile/${id}`, { headers });
//     setDoctor(res.data);
//     setForm(res.data);
//   };


//   //notification
//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/doctors/notifications?page=${page}&limit=${limit}`, { headers });
//       setNotifications(res.data.notifications);
//     } catch (error) {
//       console.error(error);
//     }
//   };



//   const fetchNotificationCount = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/doctors/notifications-count', { headers });
//       setUnreadCount(res.data.count);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctor();
//     fetchNotifications();
//     fetchNotificationCount();

//     const interval = setInterval(() => {
//       fetchNotificationCount();
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [id, page]);

//   //update profile image
//   const handleUpdate = async () => {
//     await axios.patch(`http://localhost:5000/api/doctors/profile/${id}`, form, { headers });
//     setEditMode(false);
//     fetchDoctor();

//   };

//   const markAsRead = async (notifId) => {
//     await axios.patch(`http://localhost:5000/api/doctors/notifications/${notifId}/read`, {}, { headers });
//     fetchNotifications();
//     fetchNotificationCount();
//   };

//   if (!doctor) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="bg-white shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="text-xl font-bold text-blue-600">DoctorPanel</div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex items-center space-x-6">
//               <span className="font-medium text-gray-700">Welcome, Dr. {doctor.name}</span>
//           <img src={`http://localhost:5000${doctor.profileImage}`} alt="Profile" className="w-32 h-32 object-cover rounded-full mt-2" />

//               <div className="relative">
//                 <Bell className="w-6 h-6 text-gray-700" />
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
//                     {unreadCount}
//                   </span>
//                 )}
//               </div>
//               <button onClick={() => setEditMode(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md">
//                 Edit Profile
//               </button>
//               <button
//                 onClick={() => {
//                   localStorage.removeItem('doctorToken');
//                   window.location.href = '/login';
//                 }}
//                 className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
//               >
//                 Logout
//               </button>
//             </div>

//             {/* Mobile Menu Toggle */}
//             <div className="md:hidden">
//               <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//                 {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Dropdown */}
//         {isMenuOpen && (
//           <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
//             <p className="text-gray-700 font-medium">Welcome, Dr. {doctor.name}</p>
//             <div className="flex items-center space-x-2">
//               <Bell className="w-5 h-5 text-gray-700" />
//               <span>Notifications</span>
//               {unreadCount > 0 && (
//                 <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
//                   {unreadCount}
//                 </span>
//               )}
//             </div>
//             <button onClick={() => setEditMode(true)} className="w-full bg-blue-600 text-white px-3 py-1 rounded">
//               Edit Profile
//             </button>
//             <button
//               onClick={() => {
//                 localStorage.removeItem('doctorToken');
//                 window.location.href = '/login';
//               }}
//               className="w-full bg-red-600 text-white px-3 py-1 rounded"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </nav>

//       {/* Page Content */}
//       <div className="max-w-3xl mx-auto p-6 space-y-4">
//      <div className="bg-white shadow p-6 rounded-xl">
//   <h1 className="text-2xl font-bold">{doctor.name}</h1>
//   <p>Email: {doctor.email}</p>
//   <p>Phone: {doctor.phone}</p>
//   <p>Specialization: {doctor.specialization}</p>
//   <p>Profile Updated: {doctor.profileUpdateCount} times</p>
//   <p>Unread Notifications: {unreadCount}</p>

//   {/* ✅ Availability Display */}
//   <div className="mt-2">
//     <h3 className="font-semibold">Availability:</h3>
//     <p>Days: {doctor.availability?.days?.join(', ') || 'N/A'}</p>
//     <p>Time: {doctor.availability?.from || '--:--'} to {doctor.availability?.to || '--:--'}</p>
//   </div>

//   <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
//     Edit Profile
//   </button>
// </div>
// {/* Availability Edit - Optional */}
// <div className="mt-4">
//   <label className="block font-medium">Available Days:</label>
//   <div className="flex flex-wrap gap-2 mt-1">
//     {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
//       <label key={day} className="flex items-center gap-1">
//         <input
//           type="checkbox"
//           checked={form.availability?.days?.includes(day)}
//           onChange={() => {
//             const days = form.availability?.days || [];
//             const updatedDays = days.includes(day)
//               ? days.filter((d) => d !== day)
//               : [...days, day];

//             setForm((prev) => ({
//               ...prev,
//               availability: {
//                 ...prev.availability,
//                 days: updatedDays,
//               },
//             }));
//           }}
//         />
//         <span>{day}</span>
//       </label>
//     ))}
//   </div>

//   <div className="grid grid-cols-2 gap-2 mt-2">
//     <input
//       type="time"
//       value={form.availability?.from || ''}
//       onChange={(e) =>
//         setForm((prev) => ({
//           ...prev,
//           availability: { ...prev.availability, from: e.target.value },
//         }))
//       }
//       className="border px-2 py-1 rounded"
//     />
//     <input
//       type="time"
//       value={form.availability?.to || ''}
//       onChange={(e) =>
//         setForm((prev) => ({
//           ...prev,
//           availability: { ...prev.availability, to: e.target.value },
//         }))
//       }
//       className="border px-2 py-1 rounded"
//     />
//   </div>
// </div>


//         {editMode && (

//           <div className="bg-gray-100 p-4 rounded-xl">
//             {doctor.profileImage && (
//           <img src={`http://localhost:5000${doctor.profileImage}`} alt="Profile" className="w-32 h-32 object-cover rounded-full mt-2" />
//         )}

//             <h2 className="text-lg font-semibold mb-2">Edit Profile</h2>
//             <input className="w-full p-2 mb-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//             <input className="w-full p-2 mb-2 border" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//             <input className="w-full p-2 mb-2 border" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
//             <img  value={form.pr}src="" alt="" />
//             <input className="w-full p-2 mb-2 border" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} />
//                         {/* <input className="w-full p-2 mb-2 border" value={form.availability} onChange={e => setForm({ ...form, specialization: e.target.value })} /> */}

//             <div className="flex space-x-2">

//               <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//               <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//             </div>

//           </div>

//         )}

//         <div className="mt-4">
//           <label>Update Profile Picture</label>
//           <input type="file" onChange={handleImageChange} className="block mt-1" />
//           <button onClick={uploadImage} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">
//             Upload
//           </button>
//         </div>


//         <div className="bg-white shadow p-6 rounded-xl">
//           <h2 className="text-lg font-bold mb-4">Notifications</h2>
//           {notifications.map(n => (
//             <div key={n._id} className={`p-2 mb-2 rounded ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}>
//               <p>{n.message}</p>
//               {!n.read && (
//                 <button onClick={() => markAsRead(n._id)} className="text-sm text-blue-600 mt-1">Mark as Read</button>
//               )}
//             </div>
//           ))}

//           <div className="flex justify-between mt-4">
//             <button
//               onClick={() => setPage(prev => Math.max(1, prev - 1))}
//               className="bg-gray-300 px-3 py-1 rounded"
//               disabled={page === 1}
//             >
//               Prev
//             </button>
//             <button
//               onClick={() => setPage(prev => prev + 1)}
//               className="bg-gray-300 px-3 py-1 rounded"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfilePage;


// import React, {  useState,useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Bell, Menu, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// const DoctorProfilePage = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem('doctorToken');
//   const headers = { Authorization: `Bearer ${token}` };

//   const [doctor, setDoctor] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifs, setShowNotifs] = useState(false);
//   const [image, setImage] = useState(null);
//   const [page, setPage] = useState(1);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const limit = 5;

// const fetchDoctor = useCallback(async () => {
//   const res = await axios.get(`http://localhost:5000/api/doctors/profile/${id}`, { headers });
//   setDoctor(res.data);
//   setForm(res.data);
// }, [id, headers]);

// const fetchNotifications = useCallback(async () => {
//   const res = await axios.get(`http://localhost:5000/api/doctors/notifications?page=${page}&limit=${limit}`, { headers });
//   setNotifications(res.data.notifications);
// }, [page, headers]);

// const fetchNotificationCount = useCallback(async () => {
//   const res = await axios.get('http://localhost:5000/api/doctors/notifications-count', { headers });
//   setUnreadCount(res.data.count);
// }, [headers]);

//   const handleImageChange = (e) => setImage(e.target.files[0]);

//   const uploadImage = async () => {
//     if (!image) return;
//     const formData = new FormData();
//     formData.append('image', image);
//     await axios.post('http://localhost:5000/api/doctors/upload-photo', formData, {
//       headers: {
//         ...headers,
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     fetchDoctor();
//   };

//   const handleUpdate = async () => {
//     if (form.availability?.from >= form.availability?.to) {
//       alert('Start time must be before end time');
//       return;
//     }
//     await axios.patch(`http://localhost:5000/api/doctors/profile/${id}`, form, { headers });
//     setEditMode(false);
//     fetchDoctor();
//   };

//   const markAsRead = async (notifId) => {
//     await axios.patch(`http://localhost:5000/api/doctors/notifications/${notifId}/read`, {}, { headers });
//     fetchNotifications();
//     fetchNotificationCount();
//   };

//   if (!doctor) return <div className="text-center p-4">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//           <div className="text-xl font-bold text-blue-600">DoctorPanel</div>
//           <div className="hidden md:flex space-x-4 items-center">
//             <span className="text-gray-700">Dr. {doctor.name}</span>


//             <img
//               src={`http://localhost:5000${doctor.profileImage}`}
//               alt="Profile"
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div className="relative">
//               <Bell className="w-6 h-6 text-gray-700 cursor-pointer" onClick={() => setShowNotifs(!showNotifs)} />
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
//                         <div
//                           key={n._id}
//                           className={`p-2 border-b text-sm ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}
//                         >
//                           <p>{n.message}</p>
//                           {!n.read && (
//                             <button
//                               className="text-blue-600 text-xs"
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
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => {
//                 localStorage.removeItem('doctorToken');
//                 window.location.href = '/login';
//               }}
//               className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </div>
//           <div className="md:hidden">
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Responsive Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white px-4 py-2 space-y-2 shadow">
//           <div>Welcome, Dr. {doctor.name}</div>
//           <button className="block w-full text-left" onClick={() => setEditMode(true)}>Edit Profile</button>
//           <button className="block w-full text-left text-red-600" onClick={() => {
//             localStorage.removeItem('doctorToken');
//             window.location.href = '/login';
//           }}>Logout</button>
//         </div>
//       )}

//       <main className="max-w-4xl mx-auto p-6">
//         <div className="bg-white shadow rounded-xl p-6">
//                       <img
//               src={`http://localhost:5000${doctor.profileImage}`}
//               alt="Profile"
//               className="w-40 h-40 rounded-xl object-cover"
//             />

//           <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
//           <p>Email: {doctor.email}</p>
//           <p>Phone: {doctor.phone}</p>
//           <p>Specialization: {doctor.specialization}</p>
//           <p>Profile Updated: {doctor.profileUpdateCount} times</p>







//           <div className="mt-4">
//             <h3 className="font-semibold">Availability:</h3>
//             <p>Days: {doctor.availability?.days?.join(', ') || 'N/A'}</p>
//             <p>Time: {doctor.availability?.from || '--:--'} to {doctor.availability?.to || '--:--'}</p>
//           </div>
//         </div>

//         {editMode && (
//           <div className="bg-gray-100 p-4 mt-6 rounded-xl">

//             <img
//               src={`http://localhost:5000${doctor.profileImage}`}
//               alt="Profile"
//               className="w-10 h-10 rounded-full object-cover"
//             />







//             <input className="w-full p-2 mb-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

//             <h2 className="text-lg font-semibold mb-2">Edit Profile</h2>
//             <input className="w-full p-2 mb-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//             <input className="w-full p-2 mb-2 border" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//             <input className="w-full p-2 mb-2 border" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
//             <input className="w-full p-2 mb-2 border" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} />

//             <div className="mt-4">
//               <label className="font-medium">Available Days:</label>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {daysOfWeek.map((day) => (
//                   <label key={day} className="flex items-center gap-1">
//                     <input
//                       type="checkbox"
//                       checked={form.availability?.days?.includes(day)}
//                       onChange={() => {
//                         const days = form.availability?.days || [];
//                         const updated = days.includes(day)
//                           ? days.filter(d => d !== day)
//                           : [...days, day];
//                         setForm(prev => ({
//                           ...prev,
//                           availability: { ...prev.availability, days: updated },
//                         }));
//                       }}
//                     />
//                     <span>{day}</span>
//                   </label>
//                 ))}
//               </div>
//               <div className="grid grid-cols-2 gap-2 mt-2">
//                 <input
//                   type="time"
//                   value={form.availability?.from || ''}
//                   onChange={(e) => setForm(prev => ({
//                     ...prev,
//                     availability: { ...prev.availability, from: e.target.value },
//                   }))}
//                   className="border p-2 rounded"
//                 />
//                 <input
//                   type="time"
//                   value={form.availability?.to || ''}
//                   onChange={(e) => setForm(prev => ({
//                     ...prev,
//                     availability: { ...prev.availability, to: e.target.value },
//                   }))}
//                   className="border p-2 rounded"
//                 />
//               </div>
//             </div>

//             <div className="flex space-x-2 mt-4">
//               <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//               <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//             </div>
//           </div>
//         )}

//         <div className="mt-6">
//           <label className="block font-medium">Update Profile Image</label>
//           <input type="file" onChange={handleImageChange} className="mt-1" />
//           <button onClick={uploadImage} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Upload</button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DoctorProfilePage;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bell, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DoctorAppointments from '../Doctors/DoctorAppointments';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Doctorprofile() {
  const { id } = useParams();
  const token = localStorage.getItem('doctorToken');
  const headers = { Authorization: `Bearer ${token}` };

  const [doctor, setDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifs, setShowNotifs] = useState(false);
  const [image, setImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const limit = 5;

  useEffect(() => {
    fetchDoctor();
    fetchNotifications();
    fetchNotificationCount();
    const interval = setInterval(() => fetchNotificationCount(), 60000);
    return () => clearInterval(interval);
  }, [id, page]);

  const fetchDoctor = async () => {
    const res = await axios.get(`http://localhost:5000/api/doctors/profile/${id}`, { headers });
    setDoctor(res.data);
    setForm(res.data);
  };

  const fetchNotifications = async () => {
    const res = await axios.get(`http://localhost:5000/api/doctors/notifications?page=${page}&limit=${limit}`, { headers });
    setNotifications(res.data.notifications);
  };

  const fetchNotificationCount = async () => {
    const res = await axios.get('http://localhost:5000/api/doctors/notifications-count', { headers });
    setUnreadCount(res.data.count);
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const uploadImage = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    await axios.post('http://localhost:5000/api/doctors/upload-photo', formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    fetchDoctor();
  };

  const handleUpdate = async () => {
    if (form.availability?.from >= form.availability?.to) {
      alert('Start time must be before end time');
      return;
    }
    await axios.patch(`http://localhost:5000/api/doctors/profile/${id}`, form, { headers });
    setEditMode(false);
    fetchDoctor();
  };

  const markAsRead = async (notifId) => {
    await axios.patch(`http://localhost:5000/api/doctors/notifications/${notifId}/read`, {}, { headers });
    fetchNotifications();
    fetchNotificationCount();
  };

  if (!doctor) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      {/* <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="text-xl font-bold text-blue-600">DoctorPanel</div>
          <div className="hidden md:flex space-x-4 items-center">
            <span className="text-gray-700">Dr. {doctor.name}</span>


            <img
              src={`http://localhost:5000${doctor.profileImage}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-700 cursor-pointer" onClick={() => setShowNotifs(!showNotifs)} />
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
                        <div
                          key={n._id}
                          className={`p-2 border-b text-sm ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}
                        >
                          <p>{n.message}</p>
                          {!n.read && (
                            <button
                              className="text-blue-600 text-xs"
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
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('doctorToken');
                window.location.href = '/login';
              }}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav> */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200 cursor-pointer">
            DoctorPanel
          </div>

          <div className="hidden md:flex space-x-4 items-center">
            <span className="text-gray-700 font-medium">Dr. {doctor.name}</span>

            <img
              src={`http://localhost:5000${doctor.profileImage}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />

            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer"
                onClick={() => setShowNotifs(!showNotifs)}
              >
                <Bell className="w-6 h-6 text-gray-700 transition hover:text-blue-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </motion.div>

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
                        <div
                          key={n._id}
                          className={`p-2 border-b text-sm ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}
                        >
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

            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('doctorToken');
                window.location.href = '/login';
              }}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white px-4 py-3 space-y-2 shadow"
            >
              <div className="text-gray-700 font-medium">Welcome, Dr. {doctor.name}</div>
              <button
                onClick={() => setEditMode(true)}
                className="block w-full text-left text-blue-600 hover:underline"
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('doctorToken');
                  window.location.href = '/login';
                }}
                className="block w-full text-left text-red-600 hover:underline"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Responsive Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 space-y-2 shadow">
          <div>Welcome, Dr. {doctor.name}</div>
          <button className="block w-full text-left" onClick={() => setEditMode(true)}>Edit Profile</button>
          <button className="block w-full text-left text-red-600" onClick={() => {
            localStorage.removeItem('doctorToken');
            window.location.href = '/login';
          }}>Logout</button>
        </div>
      )}

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow rounded-xl p-6">
          <img
            src={`http://localhost:5000${doctor.profileImage}`}
            alt="Profile"
            className="w-40 h-40 rounded-xl object-cover"
          />

          <h1 className="text-2xl font-bold mb-2">{doctor.name}</h1>
          <p>Email: {doctor.email}</p>
          <p>Phone: {doctor.phone}</p>
          <p>Specialization: {doctor.specialization}</p>
          {/* <p>Profile Updated: {doctor.profileUpdateCount} times</p> */}







          <div className="mt-4">
            <h3 className="font-semibold">Availability:</h3>
            <p>Days: {doctor.availability?.days?.join(', ') || 'N/A'}</p>
            <p>Time: {doctor.availability?.from || '--:--'} to {doctor.availability?.to || '--:--'}</p>
          </div>
        </div>

        {editMode && (
          <div className="bg-gray-100 p-4 mt-6 rounded-xl">

            <img
              src={`http://localhost:5000${doctor.profileImage}`}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />



            <input className="w-full text-lg font-semibold p-2 mb-2 bolder" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

            <h2 className="text-lg font-semibold mb-2">Edit Profile</h2>
            <input className="w-full p-2 mb-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input className="w-full p-2 mb-2 border" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <input className="w-full p-2 mb-2 border" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input className="w-full p-2 mb-2 border" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} />

            <div className="mt-4">
              <label className="font-medium">Available Days:</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {daysOfWeek.map((day) => (
                  <label key={day} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={form.availability?.days?.includes(day)}
                      onChange={() => {
                        const days = form.availability?.days || [];
                        const updated = days.includes(day)
                          ? days.filter(d => d !== day)
                          : [...days, day];
                        setForm(prev => ({
                          ...prev,
                          availability: { ...prev.availability, days: updated },
                        }));
                      }}
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="time"
                  value={form.availability?.from || ''}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    availability: { ...prev.availability, from: e.target.value },
                  }))}
                  className="border p-2 rounded"
                />
                <input
                  type="time"
                  value={form.availability?.to || ''}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    availability: { ...prev.availability, to: e.target.value },
                  }))}
                  className="border p-2 rounded"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-medium">Update Profile Image</label>
              <input type="file" onChange={handleImageChange} className="mt-1" />
              <button onClick={uploadImage} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Upload</button>
            </div>
            <div className="flex space-x-2 mt-4">
              <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        )}

        {/* Appointment Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
          <DoctorAppointments doctorId={doctor._id} />
        </div>


    



        {/* <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Send Google Meet Link</h2>
          <input
            type="text"
            placeholder="Enter Google Meet link"
            value={form.meetLink || doctor?.meetLink || ''} // show default saved link
            onChange={(e) => setForm({ ...form, meetLink: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />

          <button
            disabled={sending}
            className={`bg-blue-600 text-white px-4 py-2 rounded transition duration-200 ${sending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            onClick={async () => {
              const meetLink = form.meetLink?.trim();
              if (!meetLink) return alert("Please enter a Google Meet link.");

              const isValidMeetLink = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/.test(meetLink);
              if (!isValidMeetLink) return alert("Please enter a valid Google Meet link.");

              setSending(true);
              try {
                // Send meet link to backend
                const res = await axios.post(
                  'http://localhost:5000/api/doctors/send-meetlink-whatsapp',
                  {
                    doctorId: doctor._id,
                    patientId: doctor.patientId, // make sure this is set per appointment
                    meetLink
                  },
                  { headers }
                );

                // Open WhatsApp link automatically (optional)
                window.open(res.data.whatsappUrl, '_blank');

                alert("Meet link sent successfully to the patient via WhatsApp.");
                setForm({ ...form, meetLink: '' }); // clear input if you want
              } catch (error) {
                console.error(error);
                alert("Failed to send meet link. Please try again.");
              } finally {
                setSending(false);
              }
            }}
          >
            {sending ? 'Sending...' : 'Send Link'}
          </button>
        </div> */}

      </main>
    </div>
  );
};

export default Doctorprofile;
















// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const DoctorProfilePage = () => {
//   const { id } = useParams();
//   const token = localStorage.getItem('doctorToken');
//   const [doctor, setDoctor] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [form, setForm] = useState({});
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [image, setImage] = useState(null);
//   const headers = { Authorization: `Bearer ${token}` };
//   const [page, setPage] = useState(1);
//   const limit = 5;

//   const fetchDoctor = async () => {
//     const res = await axios.get(`http://localhost:5000/api/doctors/profile/${id}`, { headers });
//     setDoctor(res.data);
//     setForm(res.data);
//   };

//   const fetchNotifications = async () => {
//     try {

//       const res = await axios.get(`http://localhost:5000/api/doctors/notifications?page=${page}&limit=${limit}`, { headers });
//       setNotifications(res.data.notifications);
//       console.log(res);

//     } catch (error) {
//       console.log(error)
//     }
//   };

//   const fetchNotificationCount = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/doctors/notifications-count', { headers });
//       setUnreadCount(res.data.count);
//       // console.log(res.data.count)
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   useEffect(() => {
//     fetchDoctor();
//     fetchNotifications();
//     fetchNotificationCount();
//   }, [id, page]);

//   const handleUpdate = async () => {
//     await axios.patch(`http://localhost:5000/api/doctors/profile/${id}`, form, { headers });
//     setEditMode(false);
//     fetchDoctor();
//   };

//   const markAsRead = async (notifId) => {
//     await axios.patch(`http://localhost:5000/api/doctors/notifications/${notifId}/read`, {}, { headers });
//     fetchNotifications();
//     fetchNotificationCount();
//   };





//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const uploadImage = async () => {
//     const formData = new FormData();
//     formData.append('image', image);

//     await axios.post('http://localhost:5000/api/doctors/upload-photo', formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     fetchDoctor();
//   };


//   if (!doctor) return <div>Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-4">
//       <div className="bg-white shadow p-6 rounded-xl">
//         <h1 className="text-2xl font-bold">{doctor.name}</h1>
//         <p>Email: {doctor.email}</p>
//         <p>Phone: {doctor.phone}</p>
//         <p>Specialization: {doctor.specialization}</p>
//         <p>Profile Updated: {doctor.profileUpdateCount} times</p>
//         <p>Unread Notifications: {unreadCount}</p>
//         <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
//           Edit Profile
//         </button>
//       </div>

//       {editMode && (
//         <div className="bg-gray-100 p-4 rounded-xl">
//           <h2 className="text-lg font-semibold mb-2">Edit Profile</h2>
//           <input className="w-full p-2 mb-2 border" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//           <input className="w-full p-2 mb-2 border" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//           <input className="w-full p-2 mb-2 border" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
//           <input className="w-full p-2 mb-2 border" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} />
//           <div className="flex space-x-2">
//             <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//             <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-between mt-4">
//         <button
//           onClick={() => setPage(prev => Math.max(1, prev - 1))}
//           className="bg-gray-300 px-3 py-1 rounded"
//           disabled={page === 1}
//         >
//           Prev
//         </button>
//         <button
//           onClick={() => setPage(prev => prev + 1)}
//           className="bg-gray-300 px-3 py-1 rounded"
//         >
//           Next
//         </button>
//       </div>


//       <div className="mt-4">
//         <label>Update Profile Picture</label>
//         <input type="file" onChange={handleImageChange} className="block mt-1" />
//         <button onClick={uploadImage} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded">Upload</button>
//       </div>
//       {doctor.profileImage && (
//         <img src={doctor.profileImage} alt="Profile" className="w-32 h-32 object-cover rounded-full mt-2" />
//       )}

//       <div className="bg-white shadow p-6 rounded-xl">
//         <h2 className="text-lg font-bold mb-4">Notifications</h2>
//         {notifications.map(n => (
//           <div key={n._id} className={`p-2 mb-2 rounded ${n.read ? 'bg-gray-100' : 'bg-yellow-100'}`}>
//             <p>{n.message}</p>
//             {!n.read && (
//               <button onClick={() => markAsRead(n._id)} className="text-sm text-blue-600 mt-1">Mark as Read</button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>

//   );
// };

// export default DoctorProfilePage;

