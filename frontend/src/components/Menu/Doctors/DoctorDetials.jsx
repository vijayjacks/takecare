
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link,useParams, } from 'react-router-dom';

// const DoctorList = () => {
//   const { id } = useParams();
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [search, setSearch] = useState('');
//   const [specializationFilter, setSpecializationFilter] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem('doctorToken');
//         const res = await axios.get(`http://localhost:5000/api/doctors/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDoctors(res.data);
//         setFilteredDoctors(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Error fetching doctors');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [id]);
// console.log("doc",doctors)
//   // Filter when search or specialization changes
//   useEffect(() => {
//     const lowerSearch = search.toLowerCase();

//     const filtered = doctors.filter((doc) =>
//       doc.name.toLowerCase().includes(lowerSearch) &&
//       (specializationFilter ? doc.specialization === specializationFilter : true)
//     );
//     setFilteredDoctors(filtered);
//   }, [search, specializationFilter, doctors]);

//   if (loading) return <p className="text-center mt-10 text-blue-500">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   const specializations = [...new Set(doctors.map(doc => doc.specialization))];

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
//       <h1 className="text-3xl font-bold mb-6">Doctors</h1>

//       {/* Search and Filter */}
//       <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <select
//           className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
//           value={specializationFilter}
//           onChange={(e) => setSpecializationFilter(e.target.value)}
//         >
//           <option value="">All Specializations</option>
//           {specializations.map((spec) => (
//             <option key={spec} value={spec}>{spec}</option>
//           ))}
//         </select>
//       </div>

//       {/* Doctors List */}
//       {filteredDoctors.length === 0 ? (
//         <p>No doctors found.</p>
//       ) : (
//         <ul>
//           {filteredDoctors.map((doctor) => (
//             <li key={doctor._id} className="border-b py-4">
//               <Link to={`/doctors/${doctor._id}`} className="text-xl text-blue-600 hover:underline">
//                 Dr. {doctor.name}
//               </Link>
//               <p className="text-sm text-gray-600">{doctor.specialization}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DoctorList;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const DoctorList = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  // const [search, setSearch] = useState('');
  // const [specializationFilter, setSpecializationFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem('doctorToken');
        const res = await axios.get(`http://localhost:5000/api/doctors/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data); // Assuming this is a single object, not an array
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching doctor');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-blue-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!doctor) return <p className="text-center mt-10 text-gray-600">No doctor data found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Doctor Details</h1>
      <div className="space-y-4">
        <p><strong>Name:</strong> Dr. {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Experience:</strong> {doctor.experience} years</p>
        <p><strong>Phone:</strong> {doctor.phone}</p>
        <Link to={`/doctors/${doctor._id}`} className="text-blue-600 hover:underline">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default DoctorList;
