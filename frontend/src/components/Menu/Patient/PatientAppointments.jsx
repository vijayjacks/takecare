import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PatientAppointments({ patientId }) {
  const [appts, setAppts] = useState([]);
  const token = localStorage.getItem('patientToken');
  const headers = { Authorization: `Bearer ${token}` };
  useEffect(() => {
    axios.get(`http://localhost:5000/api/appointments/patient/${patientId}`,{ headers }).then(r => setAppts(r.data));
  }, [patientId]);

  return (
    <div>
      {appts.map(ap => (
        <div key={ap._id} className="p-4 border rounded mb-2">
          <p>Dr. {ap.doctorId.name}</p>
          <p>Date: {new Date(ap.date).toDateString()}</p>
          <p>Time Slot: {ap.timeSlot.from}</p>
          <p>Status: {ap.status}</p>
        </div>
      ))}
    </div>
  );
}
