// import React, { useState } from 'react';
// import useClinics from '../hooks/useClinics';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import Spinner from './Spinner'; // Assume you have a spinner component

// const ClinicList = ({ token }) => {
//   const { clinics, loading, error, refetch } = useClinics(token);
//   const [search, setSearch] = useState('');
//   const [editing, setEditing] = useState(null);
//   const [editedData, setEditedData] = useState({});

//   const handleEdit = (clinic) => {
//     setEditing(clinic._id);
//     setEditedData(clinic);
//   };

//   const handleSave = async () => {
//     try {
//       const res = await axios.put(
//         `/api/clinics/${editing}`,
//         editedData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success('Clinic updated');
//       refetch();
//       setEditing(null);
//     } catch (err) {
//       toast.error('Update failed');
//     }
//   };

//   const filtered = clinics.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase()) ||
//     c.email.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) return <Spinner />;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         placeholder="Search clinics"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="mb-4 px-3 py-2 border rounded w-full"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {filtered.map((clinic) => (
//           <div
//             key={clinic._id}
//             className="p-4 border rounded shadow hover:shadow-lg transition"
//           >
//             {editing === clinic._id ? (
//               <div>
//                 <input
//                   type="text"
//                   value={editedData.name}
//                   onChange={(e) =>
//                     setEditedData({ ...editedData, name: e.target.value })
//                   }
//                   className="mb-2 w-full border px-2 py-1 rounded"
//                 />
//                 <input
//                   type="text"
//                   value={editedData.email}
//                   onChange={(e) =>
//                     setEditedData({ ...editedData, email: e.target.value })
//                   }
//                   className="mb-2 w-full border px-2 py-1 rounded"
//                 />
//                 <button
//                   onClick={handleSave}
//                   className="bg-green-500 text-white px-3 py-1 rounded mr-2"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditing(null)}
//                   className="bg-gray-300 px-3 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <h3 className="text-lg font-bold">{clinic.name}</h3>
//                 <p>{clinic.email}</p>
//                 <button
//                   onClick={() => handleEdit(clinic)}
//                   className="mt-2 text-blue-500 hover:underline"
//                 >
//                   Edit
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClinicList;



