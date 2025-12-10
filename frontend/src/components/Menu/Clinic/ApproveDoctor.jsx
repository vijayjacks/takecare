// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Approvedoctor = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // all | approved | unapproved
// const {id}=useParams();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/doctors/Approvedoctor`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//       clinicdoctors = res.data.filter()
//         setDoctors(clinicdoctors);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [token]);

//   const handleApproval = async (doctorId, currentStatus) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/doctors/approve/${doctorId}`,{clinicId:id},
//          // no body needed
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert(res.data.message);
//       // Update state immediately
//       setDoctors(prev =>
//         prev.map(doc =>
//           doc._id === doctorId ? { ...doc, approved: !currentStatus } : doc
//         )
//       );
//     } catch (err) {
//       console.error('Approval failed:', err);
//       alert(err.response?.data?.message || 'Approval error');
//     }
//   };

//   const filteredDoctors = doctors.filter(doc => {
//     if (filter === 'approved') return doc.approved;
//     if (filter === 'unapproved') return !doc.approved;
//     return true;
//   });

//   if (loading) return <p className="text-center text-gray-600">Loading doctors...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Doctor Approval Panel</h2>

//       {/* Filter buttons */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('all')}
//         >
//           All
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${filter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('approved')}
//         >
//           Approved
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${filter === 'unapproved' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('unapproved')}
//         >
//           Unapproved
//         </button>
//       </div>

//       {/* Doctor list */}
//       {filteredDoctors.length === 0 ? (
//         <p className="text-gray-600">No doctors to show.</p>
//       ) : (
//         <ul className="space-y-4">
//           {filteredDoctors.map(doc => (
//             <li
//               key={doc._id}
//               className="bg-white shadow rounded p-4 flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-semibold text-lg">{doc.name}</p>
//                 <p className="text-gray-500">{doc.email}</p>
//                 <p className="text-sm">
//                   Status:{' '}
//                   <span
//                     className={`px-2 py-1 rounded text-white text-xs ${
//                       doc.approved ? 'bg-green-600' : 'bg-yellow-600'
//                     }`}
//                   >
//                     {doc.approved ? 'Approved' : 'Pending'}
//                   </span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleApproval(doc._id, doc.approved)}
//                 className={`px-4 py-2 text-white rounded ${
//                   doc.approved ? 'bg-red-600' : 'bg-blue-600'
//                 }`}
//               >
//                 {doc.approved ? 'Revoke Approval' : 'Approve'}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Approvedoctor;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Approvedoctor = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('all'); // all | approved | unapproved
//   const { id: clinicId } = useParams(); // clinic ID from URL
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/doctors/Approvedoctor`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         // Filter doctors by clinicId here
//         const clinicDoctors = res.data.filter(doc => doc.clinicId === clinicId);
//         setDoctors(clinicDoctors);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [token, clinicId]);

//   const handleApproval = async (doctorId, currentStatus) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/doctors/approve/${doctorId}`,
//         { clinicId,currentStatus }, // Request body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       alert(res.data.message);

//       // Update local state
//       setDoctors(prev =>
//         prev.map(doc =>
//           doc._id === doctorId ? { ...doc, approved: !currentStatus } : doc
//         )
//       );
//     } catch (err) {
//       console.error('Approval failed:', err);
//       alert(err.response?.data?.message || 'Approval error');
//     }
//   };

//   const filteredDoctors = doctors.filter(doc => {
//     if (filter === 'approved') return doc.approved;
//     if (filter === 'unapproved') return !doc.approved;
//     return true;
//   });

//   if (loading) return <p className="text-center text-gray-600">Loading doctors...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Doctor Approval Panel</h2>

//       {/* Filter buttons */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('all')}
//         >
//           All
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${filter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('approved')}
//         >
//           Approved
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${filter === 'unapproved' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setFilter('unapproved')}
//         >
//           Unapproved
//         </button>
//       </div>

//       {/* Doctor list */}
//       {filteredDoctors.length === 0 ? (
//         <p className="text-gray-600">No doctors to show.</p>
//       ) : (
//         <ul className="space-y-4">
//           {filteredDoctors.map(doc => (
//             <li
//               key={doc._id}
//               className="bg-white shadow rounded p-4 flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-semibold text-lg">{doc.name}</p>
//                 <p className="text-gray-500">{doc.email}</p>
//                 <p className="text-sm">
//                   Status:{' '}
//                   <span
//                     className={`px-2 py-1 rounded text-white text-xs ${
//                       doc.approved ? 'bg-green-600' : 'bg-yellow-600'
//                     }`}
//                   >
//                     {doc.approved ? 'Approved' : 'Pending'}
//                   </span>
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleApproval(doc._id, doc.approved)}
//                 className={`px-4 py-2 text-white rounded ${
//                   doc.approved ? 'bg-red-600' : 'bg-blue-600'
//                 }`}
//               >
//                 {doc.approved ? 'Revoke Approval' : 'Approve'}
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Approvedoctor;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ useNavigate added

const Approvedoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | approved | unapproved
  const { id: clinicId } = useParams(); // clinic ID from URL
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/doctors/Approvedoctor`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter doctors by clinicId
        const clinicDoctors = res.data.filter(doc => doc.clinicId === clinicId);
        setDoctors(clinicDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [token, clinicId]);

  const handleApproval = async (doctorId, currentStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/doctors/approve/${doctorId}`,
        { clinicId, currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);

      // Update local state
      setDoctors(prev =>
        prev.map(doc =>
          doc._id === doctorId ? { ...doc, approved: !currentStatus } : doc
        )
      );
    } catch (err) {
      console.error('Approval failed:', err);
      alert(err.response?.data?.message || 'Approval error');
    }
  };

  const filteredDoctors = doctors.filter(doc => {
    if (filter === 'approved') return doc.approved;
    if (filter === 'unapproved') return !doc.approved;
    return true;
  });

  if (loading) return <p className="text-center text-gray-600">Loading doctors...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Doctor Approval Panel</h2>

      {/* ✅ Navigation button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(`/clinics/${clinicId}/registrations`)} // ✅ navigate to clinic registrations
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          View Clinic Registrations
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'unapproved' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('unapproved')}
        >
          Unapproved
        </button>
      </div>

      {/* Doctor list */}
      {filteredDoctors.length === 0 ? (
        <p className="text-gray-600">No doctors to show.</p>
      ) : (
        <ul className="space-y-4">
          {filteredDoctors.map(doc => (
            <li
              key={doc._id}
              className="bg-white shadow rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg">{doc.name}</p>
                <p className="text-gray-500">{doc.email}</p>
                <p className="text-sm">
                  Status:{' '}
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      doc.approved ? 'bg-green-600' : 'bg-yellow-600'
                    }`}
                  >
                    {doc.approved ? 'Approved' : 'Pending'}
                  </span>
                </p>
              </div>
              <button
                onClick={() => handleApproval(doc._id, doc.approved)}
                className={`px-4 py-2 text-white rounded ${
                  doc.approved ? 'bg-red-600' : 'bg-blue-600'
                }`}
              >
                {doc.approved ? 'Revoke Approval' : 'Approve'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Approvedoctor;
