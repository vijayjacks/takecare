


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Allconsultation() {
  const [consultations, setConsultations] = useState([]);

  const nav=useNavigate()

  const fetchConsultations = async () => {
    const token = localStorage.getItem("patientToken");

    const res = await axios.get(
      "http://localhost:5000/api/consultations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log(res)
    return res.data;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchConsultations();
        setConsultations(data);
      } catch (err) {
        console.error("Error fetching consultations:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Consultations</h2>

      {consultations.length === 0 ? (
        <p>No consultations found.</p>
      ) : (
        consultations.map((c) => (
          <div key={c._id} className="card p-3 mb-4 shadow-sm">
            
            <h4 className="text-primary"
            onClick={()=>nav(`/patient/consultation/${c._id}`)}
            >Consultation - {c.type} (click here to view/download)</h4>
            <p><strong>Status:</strong> {c.status}</p>

            <p><strong>Patient:</strong> {c.patient?.name || "No Name"}</p>
            <p><strong>Doctor:</strong> {c.doctor?.name || "N/A"}</p>
            <p><strong>Clinic:</strong> {c.clinic?.name || "N/A"}</p>

            <p><strong>Chief Complaint:</strong> {c.chiefComplaint}</p>

            <h5 className="mt-3">Diagnosis</h5>
            <p><strong>Primary:</strong> {c.diagnosis?.primary}</p>
            <p><strong>Notes:</strong> {c.diagnosis?.notes}</p>

            <h5 className="mt-3">Vitals</h5>
            <p>Temp: {c.vitals?.temperature}</p>
            <p>Pulse: {c.vitals?.pulse}</p>
            <p>BP: {c.vitals?.bloodPressure}</p>

            <h5 className="mt-3">Prescriptions</h5>
            {c.prescriptions?.length > 0 ? (
              c.prescriptions.map((p) => (
                <p key={p._id}>
                  {p.medicine} - {p.dosage} ({p.frequency} times/day)
                </p>
              ))
            ) : (
              <p>No prescription</p>
            )}

            <h5 className="mt-3">Tests Advised</h5>
            {c.testsAdvised?.length > 0 ? (
              c.testsAdvised.map((t) => (
                <p key={t._id}>{t.name} ({t.lab})</p>
              ))
            ) : (
              <p>No tests advised</p>
            )}

            <p><strong>Doctor Notes:</strong> {c.doctorNotes}</p>

            <p>
              <strong>Follow-up:</strong> 
              {c.followUp?.advised ? `${c.followUp.afterDays} days` : "No follow-up"}
            </p>

            <p><strong>Date:</strong> {new Date(c.consultationDate).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
