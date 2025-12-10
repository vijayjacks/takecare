
// vii
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function ClinicAppointments() {
//   const clinicId = JSON.parse(localStorage.getItem("clinicId"))?._id;
//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const [appts, setAppts] = useState([]);
//   const [filterStatus, setFilterStatus] = useState('');
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const pageSize = 5;

//   useEffect(() => {
//     if (clinicId) fetchAppointments();
//   }, [clinicId]);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/clinics/ClinicAppointmentsview/${clinicId}`,
//         { headers }
//       );
//       setAppts(res.data);
//     } catch {
//       toast.error("Failed to load appointments");
//     }
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/clinics/updateStatus/${id}`, { status }, { headers });
//       toast.success(`Appointment ${status}`);
//       fetchAppointments();
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   const filtered = appts.filter(a => {
//     const ms = filterStatus ? a.status === filterStatus : true;
//     const ms2 = search
//       ? (a.patientId.name || '').toLowerCase().includes(search.toLowerCase()) ||
//         a.date.includes(search)
//       : true;
//     return ms && ms2;
//   });

//   const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

//   return (
//     <div className="p-6 bg-white rounded shadow mx-auto max-w-4xl">
//       <h2 className="text-2xl font-bold mb-4">
//         Appointments – {appts[0]?.clinicId?.name}
//       </h2>

//       <div className="flex gap-4 mb-4">
//         <select
//           value={filterStatus}
//           onChange={e => setFilterStatus(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">All</option>
//           <option value="pending">Pending</option>
//           <option value="confirmed">Confirmed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Search by patient or date"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="border p-2 rounded flex-grow"
//         />
//       </div>

//       {paginated.map(a => (
//         <div key={a._id} className="border p-4 rounded mb-3 shadow-sm">
//           <p><strong>Patient:</strong> {a.patientId.name}</p>
//           <p><strong>Email:</strong> {a.patientId.email}</p>
//           <p><strong>Phone:</strong> {a.patientId.phone}</p>
//           <p><strong>Doctor:</strong> {a.doctorId?.name || 'Unassigned'}</p>
//           <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
//           <p><strong>Time:</strong> {a.from} – {a.to}</p>
//           <p><strong>Status:</strong> {a.status}</p>

//           {a.status === 'pending' && (
//             <div className="mt-2 flex gap-2">
//               <button
//                 className="px-3 py-1 bg-green-600 text-white rounded"
//                 onClick={() => handleStatusUpdate(a._id, 'confirmed')}
//               >Confirm</button>
//               <button
//                 className="px-3 py-1 bg-red-600 text-white rounded"
//                 onClick={() => handleStatusUpdate(a._id, 'cancelled')}
//               >Cancel</button>
//             </div>
//           )}
//         </div>
//       ))}

//       <div className="mt-4 flex justify-center gap-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(p => p - 1)}
//           className="px-3 py-1 bg-gray-200 rounded"
//         >
//           Prev
//         </button>
//         <button
//           disabled={page * pageSize >= filtered.length}
//           onClick={() => setPage(p => p + 1)}
//           className="px-3 py-1 bg-gray-200 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function ClinicAppointments() {
//   // const clinicId = localStorage.getItem('clinicId');
//   const clinicId = JSON.parse(localStorage.getItem("clinicId"))._id
//   console.log('clinicId', clinicId);

//   const token = localStorage.getItem('clinicToken');
//   const headers = { Authorization: `Bearer ${token}` };

//   const [appts, setAppts] = useState([]);
//   const [filterStatus, setFilterStatus] = useState('');
//   const [page, setPage] = useState(1);
//   const [doctors, setDoctors] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [form, setForm] = useState({ doctorId: '', date: '', from: '', to: '' });

//   // Load data
//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/appointments/ClinicAppointmentsview/${clinicId}`, { headers })
//       .then(r => setAppts(r.data)).catch(() => toast.error("Failed to load appointments"));

//     axios.get(`http://localhost:5000/api/doctors?clinicId=${clinicId}`, { headers })
//       .then(r => setDoctors(r.data)).catch(() => toast.error("Failed to load doctors"));
//   }, []);

//   const assignDoctor = async () => {
//     const { doctorId, date, from, to } = form;
//     if (!doctorId || !date || !from || !to) {
//       return toast.error("Fill all fields");
//     }

//     try {
//       await axios.post(`http://localhost:5000/api/appointments/assignDoctor/${selected._id}`, {
//         doctorId, date, from, to
//       }, { headers });

//       toast.success("Doctor assigned and patient notified");
//       setForm({ doctorId: '', date: '', from: '', to: '' });
//       setSelected(null);

//       const res = await axios.get(`http://localhost:5000/api/appointments/ClinicAppointmentsview/${clinicId}`, { headers });
//       setAppts(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Assignment failed");
//     }
//   };

//   const filtered = appts.filter(a => filterStatus ? a.status === filterStatus : true);

//   return (
//     <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Clinic Appointments</h2>

//       <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="mb-4 border p-2 rounded">
//         <option value="">All</option>
//         <option value="pending">Pending</option>
//         <option value="confirmed">Confirmed</option>
//         <option value="cancelled">Cancelled</option>
//       </select>

//       {filtered.slice((page - 1) * 5, page * 5).map(a => (
//         <div key={a._id} className="border p-3 rounded mb-2">
//           <p><strong>Patient:</strong> {a.patientId?.name}</p>
//           <p><strong>Doctor:</strong> {a.doctorId?.name || 'Not Assigned'}</p>
//           <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()} {a.from} - {a.to}</p>
//           <p><strong>Status:</strong> {a.status}</p>
//           {!a.doctorId && (
//             <button onClick={() => setSelected(a)} className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
//               Assign Doctor
//             </button>
//           )}
//         </div>
//       ))}

//       {/* Modal */}
//       {selected && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//             <h3 className="text-lg font-bold mb-4">Assign Doctor</h3>
//             <select
//               className="w-full border p-2 mb-2 rounded"
//               value={form.doctorId}
//               onChange={e => setForm(f => ({ ...f, doctorId: e.target.value }))}
//             >
//               <option value="">Select Doctor</option>
//               {doctors.map(d => (
//                 <option key={d._id} value={d._id}>Dr. {d.name}</option>
//               ))}
//             </select>

//             <input type="date" className="w-full border p-2 mb-2 rounded"
//               value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
//             <div className="flex gap-2">
//               <input type="time" className="w-full border p-2 mb-2 rounded"
//                 value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} />
//               <input type="time" className="w-full border p-2 mb-2 rounded"
//                 value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} />
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Cancel</button>
//               <button onClick={assignDoctor} className="px-4 py-2 bg-green-600 text-white rounded">Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Pagination */}
//       <div className="mt-4 flex justify-center gap-4">
//         <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 bg-gray-200 rounded">Prev</button>
//         <button onClick={() => setPage(p => p + 1)} className="px-3 py-1 bg-gray-200 rounded">Next</button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ClinicAppointments() {
  const clinicId = JSON.parse(localStorage.getItem("clinicId"))?._id;
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [appts, setAppts] = useState([]);
  console.log("appoiments,",appts);
  
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loadingId, setLoadingId] = useState(null);
  const pageSize = 5;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);

  useEffect(() => {
    if (clinicId) {
      fetchAppointments();
    }
  }, [clinicId]);

  useEffect(() => {
    setPage(1);
  }, [search, filterStatus]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/clinics/ClinicAppointmentsview/${clinicId}`,
        { headers }
      );
      setAppts(res.data);
    } catch {
      toast.error("Failed to load appointments");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      setLoadingId(id);
      await axios.put(
        `http://localhost:5000/api/clinics/updateStatus/${id}`,
        { status },
        { headers }
      );
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = appts.filter(a => {
    const statusMatch = filterStatus ? a.status === filterStatus : true;
    const searchLower = search.toLowerCase();


    console.log(a.patientId);
    


    const patientName = a.patientId?.name?.toLowerCase() || '';
    const dateStr = a.date || '';
    const searchMatch =
      search
        ? patientName.includes(searchLower) || dateStr.includes(searchLower)
        : true;
    return statusMatch && searchMatch;



  });

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  console.log("paginated",paginated);
  

  

  return (
    <div className="p-6 bg-white rounded shadow mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">
        Appointments – {appts[0]?.clinicId?.name || 'Clinic'}
      </h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          placeholder="Search by patient or date"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
      </div>

      {/* Appointment Cards */}
      {paginated.length === 0 ? (
        <p className="text-gray-500 text-center">No appointments found.</p>
      ) : (
        paginated.map(a => (
          <div key={a._id} className="border p-4 rounded mb-3 shadow-sm relative">
            {/* Add Vitals Button in the top-right corner */}
            <button
              onClick={() => navigate('/clinic/patient/PatientVitals', { state: { patient: a.patientId } })}
              className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Vitals
            </button>

            {/* Clickable patient info */}
            <div
              onClick={() => navigate('/clinic/patient/PatientVitals', { state: { patient: a.patientId } })}
              className="cursor-pointer hover:bg-gray-50 p-2 rounded transition duration-150"
            >
              <p><strong>Patient:</strong> {a.patientId?.name}</p>
              <p><strong>Email:</strong> {a.patientId?.email}</p>
              <p><strong>Phone:</strong> {a.patientId?.contact?.phone}</p>
              
              
              {/* <p><strong>Phone:</strong> {a.patientId?.contact?.phone || a.patientId?.phone || 'N/A'}</p> */}
            </div>

            <p><strong>Doctor:</strong> {a.doctorId?.name || 'Unassigned'}</p>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {a.timeSlot?.from} – {a.timeSlot?.to}</p>
            <p><strong>Status:</strong> {a.status}</p>

            {/* Status actions */}
            {a.status === 'pending' && (
              <div className="mt-2 flex gap-2">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                  disabled={loadingId === a._id}
                  onClick={() => handleStatusUpdate(a._id, 'confirmed')}
                >
                  Confirm
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                  disabled={loadingId === a._id}
                  onClick={() => handleStatusUpdate(a._id, 'cancelled')}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page * pageSize >= filtered.length}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
