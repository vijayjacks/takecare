import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function LabReportDetail() {
  const { labId } = useParams();
  const [params] = useSearchParams();
  const patientId = params.get("patient");
  const payment = params.get("payment");
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (payment === "success") {
      axios.get(`http://localhost:5000/api/patient/${patientId}/labreports`)
        .then((res) => {
          const found = res.data.find((r) => r.labId === labId);
          setReport(found);
        })
        .catch(console.error);
    }
  }, [labId, patientId, payment]);

  if (payment !== "success") {
    return <p className="text-center mt-10 text-red-500">Payment required to view report.</p>;
  }

  if (!report) return <p className="text-center mt-10">Loading report...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">{report.testName}</h2>
      <p><strong>Result:</strong> {report.result}</p>
      <p><strong>Normal Range:</strong> {report.normalRange}</p>
      <p><strong>Uploaded:</strong> {new Date(report.uploadedAt).toLocaleString()}</p>
    </div>
  );
}
