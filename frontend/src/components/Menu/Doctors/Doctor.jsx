
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const AllDoctors = () => {
  
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const [searchTerm, setSearchTerm] = useState('');
//   const [specializationFilter, setSpecializationFilter] = useState('');
//   const [departmentFilter, setDepartmentFilter] = useState('');

// const navigate = useNavigate();


//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const token = localStorage.getItem("doctorToken");
//         if (!token) {
//           setError("You are not authorized. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:5000/api/doctors/dashboard", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setDoctors(res.data);
//         setFilteredDoctors(res.data);
//       } catch (err) {
//         console.error(err);
//         setError(err?.response?.data?.message || "Failed to fetch doctors");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // Filter doctors when search term or filters change
//   useEffect(() => {
//     const filtered = doctors.filter((doc) => {
//       const matchesSearch =
//         doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         doc.email?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesSpecialization = specializationFilter
//         ? doc.specialization === specializationFilter
//         : true;

//       const matchesDepartment = departmentFilter
//         ? doc.department === departmentFilter
//         : true;

//       return matchesSearch && matchesSpecialization && matchesDepartment;
//     });

//     setFilteredDoctors(filtered);
//   }, [searchTerm, specializationFilter, departmentFilter, doctors]);

//   // Unique filter options
//   const specializations = [...new Set(doctors.map(doc => doc.specialization).filter(Boolean))];
//   const departments = [...new Set(doctors.map(doc => doc.department).filter(Boolean))];

//   if (loading) return <div className="text-center py-10 text-blue-500">Loading doctors...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-8">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">All Registered Doctors</h2>

//         {/* Search and Filter */}
//         <div className="grid sm:grid-cols-3 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             className="border border-gray-300 rounded px-4 py-2"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />

//           <select
//             value={specializationFilter}
//             onChange={(e) => setSpecializationFilter(e.target.value)}
//             className="border border-gray-300 rounded px-4 py-2"
//           >
//             <option value="">All Specializations</option>
//             {specializations.map((spec) => (
//               <option key={spec} value={spec}>{spec}</option>
//             ))}
//           </select>

//           <select
//             value={departmentFilter}
//             onChange={(e) => setDepartmentFilter(e.target.value)}
//             className="border border-gray-300 rounded px-4 py-2"
//           >
//             <option value="">All Departments</option>
//             {departments.map((dep) => (
//               <option key={dep} value={dep}>{dep}</option>
//             ))}
//           </select>
//         </div>

//         {/* Doctors List */}
//         {filteredDoctors.length === 0 ? (
//           <p className="text-gray-600">No doctors match your search.</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   {filteredDoctors.map((doc) => (
//     <div key={doc._id} className="border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition">
//       <h4 className="text-lg font-bold text-blue-700">Dr. {doc.name}</h4>
//       <p className="text-gray-600">Email: {doc.email}</p>
//       <p className="text-gray-500">Phone: {doc.phone || 'N/A'}</p>
//       <p className="text-gray-500">Gender: {doc.gender || 'N/A'}</p>
//       <p className="text-gray-500">Specialization: {doc.specialization || 'N/A'}</p>
//       <p className="text-gray-500">Department: {doc.department || 'N/A'}</p>
//       <p className="text-sm text-green-600 mt-1">
//         Availability: {doc.availability?.from || 'N/A'} - {doc.availability?.to || 'N/A'}
//       </p>
//       <button
//         onClick={() => navigate(`/doctors/${doc._id}`)}
//         className="mt-3 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
//       >
//         Book Appointment
//       </button>
//     </div>
//   ))}
// </div>

//         )}
//       </div>
//     </div>
//   );
// };

// export default AllDoctors;












import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // ✅ Unified token logic
        const token =
          localStorage.getItem("doctorToken") ||
          // localStorage.getItem("superadminToken") ||
          localStorage.getItem("patientToken");

        if (!token) {
          setError("You are not authorized. Please log in.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/doctors/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setDoctors(res.data);
        setFilteredDoctors(res.data);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Filter doctors when search term or filters change
  useEffect(() => {
    const filtered = doctors.filter((doc) => {
      const matchesSearch =
        doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization = specializationFilter
        ? doc.specialization === specializationFilter
        : true;

      const matchesDepartment = departmentFilter
        ? doc.department === departmentFilter
        : true;

      return matchesSearch && matchesSpecialization && matchesDepartment;
    });

    setFilteredDoctors(filtered);
  }, [searchTerm, specializationFilter, departmentFilter, doctors]);

  // ✅ Unique filter options
  const specializations = [...new Set(doctors.map(doc => doc.specialization).filter(Boolean))];
  const departments = [...new Set(doctors.map(doc => doc.department).filter(Boolean))];

  if (loading) return <div className="text-center py-10 text-blue-500">Loading doctors...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Registered Doctors</h2>

        {/* 🔍 Search & Filter */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="border border-gray-300 rounded px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">All Departments</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
        </div>

        {/* 🧑‍⚕️ Doctor Cards */}
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-600">No doctors match your search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div key={doc._id} className="border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition">
                <h4 className="text-lg font-bold text-blue-700">Dr. {doc.name}</h4>
                <p className="text-gray-600">Email: {doc.email}</p>
                <p className="text-gray-500">Phone: {doc.phone || 'N/A'}</p>
                <p className="text-gray-500">Gender: {doc.gender || 'N/A'}</p>
                <p className="text-gray-500">Specialization: {doc.specialization || 'N/A'}</p>
                <p className="text-gray-500">Department: {doc.department || 'N/A'}</p>
                <p className="text-sm text-green-600 mt-1">
                  Availability: {doc.availability?.from || 'N/A'} - {doc.availability?.to || 'N/A'}
                </p>
                <button
                  onClick={() => navigate(`/doctors/${doc._id}`)}
                  className="mt-3 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctors;
