// // pages/LabReportDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function LabReportDetails() {
//   const { patientId, reportId } = useParams();
//   const navigate = useNavigate();
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const token = localStorage.getItem('patientToken');
//         const res = await axios.get(
//           `http://localhost:5000/api/patients/${patientId}/labreports/${reportId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setReport(res.data);
//       } catch (err) {
//         console.error('Error fetching report:', err);
//         setError('Failed to fetch report');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (patientId && reportId) fetchReport();
//   }, [patientId, reportId]);

//   if (loading) return <div className="text-center p-8">Loading report...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;
//   if (!report) return <div className="text-center text-gray-500">No report found.</div>;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
//       <h1 className="text-2xl font-bold mb-4 text-blue-700">🧪 Lab Test Report</h1>
//       <p><strong>Test Name:</strong> {report.testName}</p>
//       <p><strong>Result:</strong> {report.result}</p>
//       <p><strong>Normal Range:</strong> {report.normalRange}</p>
//       <p><strong>Status:</strong> {report.status}</p>
//       <p><strong>Cost:</strong> ₹{report.cost}</p>
//       <p><strong>Payment Status:</strong> {report.paymentStatus}</p>
//       <p><strong>Date:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>

//       {report.labId && (
//         <p><strong>Lab:</strong> {report.labId.labName}</p>
//       )}

//       <button
//         onClick={() => navigate(-1)}
//         className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//       >
//         ⬅ Back to Reports
//       </button>
//     </div>
//   );
// }



// // pages/LabReportDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function LabReportDetails() {
//   const { patientId, reportId } = useParams();
//   const navigate = useNavigate();
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const token = localStorage.getItem('patientToken');
//         const res = await axios.get(
//           `http://localhost:5000/api/patients/${patientId}/labreports/${reportId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("rep",res.data)
//         setReport(res.data);
//       } catch (err) {
//         console.error('Error fetching report:', err);
//         setError('Failed to fetch report');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (patientId && reportId) fetchReport();
//   }, [patientId, reportId]);

//   // ------------------- PDF Generation -------------------
//   const downloadPDF = () => {
//     if (!report) return;

//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text('🧪 Lab Test Report', 14, 20);

//     doc.setFontSize(12);
//     doc.text(`Date: ${new Date(report.createdAt).toLocaleDateString()}`, 14, 28);

//     // ---------- Patient Details ----------
//     doc.setFontSize(14);
//     doc.text('👤 Patient Details', 14, 38);
//     doc.setFontSize(12);

//     const patientDetails = [
//       ['Patient Name', report.patientId?.name || 'N/A'],
//       ['Patient Email', report.patientId?.email || 'N/A'],
//       ['Patient Phone', report.patientId?.phone || 'N/A'],
//     ];

//     doc.autoTable({
//       startY: 42,
//       head: [['Field', 'Value']],
//       body: patientDetails,
//       theme: 'grid',
//       headStyles: { fillColor: [41, 128, 185] },
//       styles: { fontSize: 11 },
//     });

//     // ---------- Lab Details ----------
//     doc.setFontSize(14);
//     doc.text('🏥 Lab Details', 14, doc.lastAutoTable.finalY + 10);
//     doc.setFontSize(12);

//     const labDetails = [
//       ['Lab Name', report.labId?.name || 'N/A'],
//       ['Lab Address', report.labId?.address || 'N/A'],
//       ['Lab Contact', report.labId?.phone || 'N/A'],
//     ];

//     doc.autoTable({
//       startY: doc.lastAutoTable.finalY + 14,
//       head: [['Field', 'Value']],
//       body: labDetails,
//       theme: 'grid',
//       headStyles: { fillColor: [39, 174, 96] },
//       styles: { fontSize: 11 },
//     });

//     // ---------- Test Report Details ----------
//     doc.setFontSize(14);
//     doc.text('📝 Test Report Details', 14, doc.lastAutoTable.finalY + 10);
//     doc.setFontSize(12);

//     const reportDetails = [
//       ['Test Name', report.testName || 'N/A'],
//       ['Result', report.result || 'N/A'],
//       ['Normal Range', report.normalRange || 'N/A'],
//       ['Status', report.status || 'N/A'],
//       ['Cost', `₹${report.cost || 0}`],
//       ['Payment Status', report.paymentStatus || 'N/A'],
//     ];

//     doc.autoTable({
//       startY: doc.lastAutoTable.finalY + 14,
//       head: [['Field', 'Value']],
//       body: reportDetails,
//       theme: 'grid',
//       headStyles: { fillColor: [192, 57, 43] },
//       styles: { fontSize: 11 },
//     });

//     doc.save(`LabReport_${report.testName || reportId}.pdf`);
//   };

//   if (loading) return <div className="text-center p-8">Loading report...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;
//   if (!report) return <div className="text-center text-gray-500">No report found.</div>;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
//       <h1 className="text-2xl font-bold mb-4 text-blue-700">🧪 Lab Test Report</h1>

//       {/* Patient Info */}
//       <div className="mb-4">
//         <h2 className="font-semibold text-lg">👤 Patient Details</h2>
//         <p>Name: {report.patientId?.name || 'N/A'}</p>
//         <p>Email: {report.patientId?.email || 'N/A'}</p>
//         <p>Phone: {report.patientId?.phone || 'N/A'}</p>
//       </div>

//       {/* Lab Info */}
//       <div className="mb-4">
//         <h2 className="font-semibold text-lg">🏥 Lab Details</h2>
//         <p>Lab Name: {report.labId?.name || 'N/A'}</p>
//         <p>Address: {report.labId?.address || 'N/A'}</p>
//         <p>Contact: {report.labId?.phone || 'N/A'}</p>
//       </div>

//       {/* Test Report Info */}
//       <div className="mb-4">
//         <h2 className="font-semibold text-lg">📝 Test Report Details</h2>
//         <p>Test Name: {report.testName}</p>
//         <p>Result: {report.result}</p>
//         <p>Normal Range: {report.normalRange}</p>
//         <p>Status: {report.status}</p>
//         <p>Cost: ₹{report.cost}</p>
//         <p>Payment Status: {report.paymentStatus}</p>
//         <p>Date: {new Date(report.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div className="mt-4 flex space-x-2">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//         >
//           ⬅ Back to Reports
//         </button>

//         <button
//           onClick={downloadPDF}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           ⬇ Download PDF
//         </button>
//       </div>
//     </div>
//   );
// }











// pages/LabReportDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function LabReportDetails() {
  const { patientId, reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem('patientToken');
        const res = await axios.get(
          `http://localhost:5000/api/patients/${patientId}/labreports/${reportId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setReport(res.data);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('Failed to fetch report');
      } finally {
        setLoading(false);
      }
    };

    if (patientId && reportId) fetchReport();
  }, [patientId, reportId]);

  // ------------------- PDF Generation -------------------
  const downloadPDF = () => {
    if (!report) return;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("🧪 Lab Test Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${new Date(report.createdAt).toLocaleDateString()}`, 14, 28);

    // Patient Details
    doc.setFontSize(14);
    doc.text("👤 Patient Details", 14, 38);

    autoTable(doc, {
      startY: 42,
      head: [["Field", "Value"]],
      body: [
        ["Patient Name", report.patientId?.name || "N/A"],
        ["Email", report.patientId?.email || "N/A"],
        ["Phone", report.patientId?.phone || "N/A"],
      ]
    });

    // Lab Details
    doc.text("🏥 Lab Details", 14, doc.lastAutoTable.finalY + 10);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 14,
      head: [["Field", "Value"]],
      body: [
        ["Lab Name", report.labId?.name || "N/A"],
        ["Address", report.labId?.address || "N/A"],
        ["Contact", report.labId?.phone || "N/A"],
      ]
    });

    // Test Report Details
    doc.text("📝 Test Report Details", 14, doc.lastAutoTable.finalY + 10);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 14,
      head: [["Field", "Value"]],
      body: [
        ["Test Name", report.testName || "N/A"],
        ["Result", report.result || "N/A"],
        ["Normal Range", report.normalRange || "N/A"],
        ["Status", report.status || "N/A"],
        ["Cost", `₹${report.cost}`],
        ["Payment Status", report.paymentStatus],
      ]
    });

    doc.save(`LabReport_${report.testName}.pdf`);
  };

  if (loading) return <div className="text-center p-8">Loading report...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!report) return <div className="text-center text-gray-500">No report found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">🧪 Lab Test Report</h1>

      {/* Patient Info */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg">👤 Patient Details</h2>
        <p>Name: {report.patientId?.name}</p>
        <p>Email: {report.patientId?.email}</p>
        <p>Phone: {report.patientId?.phone}</p>
      </div>

      {/* Lab Info */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg">🏥 Lab Details</h2>
        <p>Lab Name: {report.labId?.name}</p>
        <p>Address: {report.labId?.address}</p>
        <p>Contact: {report.labId?.phone}</p>
      </div>

      {/* Report Info */}
      <div className="mb-4">
        <h2 className="font-semibold text-lg">📝 Test Report Details</h2>
        <p>Test Name: {report.testName}</p>
        <p>Result: {report.result}</p>
        <p>Normal Range: {report.normalRange}</p>
        <p>Status: {report.status}</p>
        <p>Cost: ₹{report.cost}</p>
        <p>Payment Status: {report.paymentStatus}</p>
        <p>Date: {new Date(report.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          ⬅ Back to Reports
        </button>

        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ⬇ Download PDF
        </button>
      </div>
    </div>
  );
}
