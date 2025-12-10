// // import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const PatientConsultationDetails = () => {
//   const { consultationId } = useParams();
//   const [consultation, setConsultation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchConsultation = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('patientToken');

//         const response = await axios.get(
//           `http://localhost:5000/api/consultations/con/${consultationId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         setConsultation(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load consultation');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (consultationId) {
//       fetchConsultation();
//     }
//   }, [consultationId]);

//   const handleDownloadPdf = () => {
//     const token = localStorage.getItem('patientToken');
//     const downloadUrl = `http://localhost:5000/api/consultations/${consultationId}/download?token=${token}`;
//     window.open(downloadUrl, '_blank');
//   };

//   if (loading) return <p className="text-center">Loading consultation details...</p>;
//   if (error) return <p className="text-red-600 text-center">Error: {error}</p>;
//   if (!consultation) return <p className="text-center">No consultation found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6">
//       <h2 className="text-2xl font-bold mb-4">Consultation Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//         <div><strong>Doctor:</strong> {consultation.doctor?.name}</div>
//         <div><strong>Clinic:</strong> {consultation.clinic?.name}</div>
//         <div><strong>Date:</strong> {new Date(consultation.consultationDate).toLocaleString()}</div>
//         <div><strong>Type:</strong> {consultation.type}</div>
//         <div><strong>Status:</strong> {consultation.status}</div>
//         <div><strong>Emergency:</strong> {consultation.isEmergency ? 'Yes' : 'No'}</div>
//         <div><strong>Chief Complaint:</strong> {consultation.chiefComplaint}</div>
//         <div><strong>Primary Diagnosis:</strong> {consultation.diagnosis?.primary}</div>
//         <div><strong>Doctor Notes:</strong> {consultation.doctorNotes}</div>
//       </div>

//       {/* Vitals */}
//       {consultation.vitals && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Vitals</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
//             {Object.entries(consultation.vitals).map(([key, value]) => (
//               <div key={key}>
//                 <strong>{key}:</strong> {value}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Medical History */}
//       {consultation.medicalHistory?.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Medical History</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.medicalHistory.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Prescriptions */}
//       {consultation.prescriptions?.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Prescriptions</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.prescriptions.map((prescription, index) => (
//               <li key={index}>
//                 <strong>{prescription.medicine}</strong> - {prescription.dosage}, {prescription.frequency}, {prescription.duration}
//                 <br />
//                 Instructions: {prescription.instructions}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Tests Advised */}
//       {consultation.testsAdvised?.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Tests Advised</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.testsAdvised.map((test, index) => (
//               <li key={index}>
//                 <strong>{test.name}</strong> - {test.lab}
//                 <br />
//                 Notes: {test.notes}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Follow-up */}
//       {consultation.followUp?.advised && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Follow-Up</h3>
//           <p className="text-sm">After {consultation.followUp.afterDays} days</p>
//           <p className="text-sm italic text-gray-700">{consultation.followUp.note}</p>
//         </div>
//       )}

//       {/* Reports */}
//       {consultation.reports && consultation.reports.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Reports</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.reports.map((report, idx) => (
//               <li key={idx}>
//                 <a
//                   href={`http://localhost:5000${report.fileUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {report.title || `Report ${idx + 1}`}
//                 </a>{' '}
//                 <span className="text-gray-500 text-xs">
//                   (Uploaded: {new Date(report.uploadedAt).toLocaleString()})
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Download PDF */}
//       <div className="mt-8 text-center">
//         <button
//           onClick={handleDownloadPdf}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
//         >
//           Download Consultation PDF
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PatientConsultationDetails;








// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const PatientConsultationDetails = () => {
//   const { consultationId } = useParams();
//   const [consultation, setConsultation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pdfLoading, setPdfLoading] = useState(false);

//   useEffect(() => {
//     const fetchConsultation = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem('patientToken');

//         const response = await axios.get(
//           `http://localhost:5000/api/consultations/con/${consultationId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         setConsultation(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load consultation');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (consultationId) {
//       fetchConsultation();
//     }
//   }, [consultationId]);

//   // ✅ PDF download with axios + blob + auth
//   const handleDownloadPdf = async () => {
//     setPdfLoading(true);
//     const token = localStorage.getItem('patientToken');

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/consultations/${consultationId}/download`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           responseType: 'blob'
//         }
//       );

//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `consultation-${consultationId}.pdf`;
//       a.click();

//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('PDF download failed:', err);
//       alert('Failed to download PDF. Please try again.');
//     } finally {
//       setPdfLoading(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-6">Loading consultation details...</p>;
//   if (error) return <p className="text-center text-red-600 mt-6">Error: {error}</p>;
//   if (!consultation) return <p className="text-center mt-6">No consultation found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6">
//       <h2 className="text-2xl font-bold mb-4">Consultation Details</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//         <div><strong>Doctor:</strong> {consultation.doctor?.name}</div>
//         <div><strong>Clinic:</strong> {consultation.clinic?.name}</div>
//         <div><strong>Date:</strong> {new Date(consultation.consultationDate).toLocaleString()}</div>
//         <div><strong>Type:</strong> {consultation.type}</div>
//         <div><strong>Status:</strong> {consultation.status}</div>
//         <div><strong>Emergency:</strong> {consultation.isEmergency ? 'Yes' : 'No'}</div>
//         <div><strong>Chief Complaint:</strong> {consultation.chiefComplaint}</div>
//         <div><strong>Primary Diagnosis:</strong> {consultation.diagnosis?.primary}</div>
//         <div><strong>Doctor Notes:</strong> {consultation.doctorNotes}</div>
//       </div>

//       {/* Vitals */}
//       {consultation.vitals && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Vitals</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
//             {Object.entries(consultation.vitals).map(([key, value]) => (
//               <div key={key}>
//                 <strong>{key}:</strong> {value}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Medical History */}
//       {consultation.medicalHistory?.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Medical History</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.medicalHistory.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Prescriptions */}
//       {consultation.prescriptions?.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Prescriptions</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.prescriptions.map((prescription, index) => (
//               <li key={index}>
//                 <strong>{prescription.medicine}</strong> - {prescription.dosage}, {prescription.frequency}, {prescription.duration}
//                 <br />
//                 Instructions: {prescription.instructions || '-'}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Tests Advised */}
//       {consultation.testsAdvised?.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Tests Advised</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.testsAdvised.map((test, index) => (
//               <li key={index}>
//                 <strong>{test.name}</strong> - {test.lab}
//                 <br />
//                 Notes: {test.notes || '-'}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Follow-up */}
//       {consultation.followUp?.advised && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Follow-Up</h3>
//           <p className="text-sm">After {consultation.followUp.afterDays} days</p>
//           <p className="text-sm italic text-gray-700">{consultation.followUp.note}</p>
//         </div>
//       )}

//       {/* Reports */}
//       {consultation.reports && consultation.reports.length > 0 && (
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-lg">Reports</h3>
//           <ul className="list-disc pl-5 text-sm">
//             {consultation.reports.map((report, idx) => (
//               <li key={idx}>
//                 <a
//                   href={`http://localhost:5000${report.fileUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {report.title || `Report ${idx + 1}`}
//                 </a>{' '}
//                 <span className="text-gray-500 text-xs">
//                   (Uploaded: {new Date(report.uploadedAt).toLocaleString()})
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Download PDF */}
//       <div className="mt-8 text-center">
//         <button
//           onClick={handleDownloadPdf}
//           disabled={pdfLoading}
//           className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow ${
//             pdfLoading ? 'opacity-50 cursor-not-allowed' : ''
//           }`}
//         >
//           {pdfLoading ? 'Downloading PDF...' : 'Download Consultation PDF'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PatientConsultationDetails;















































import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PatientConsultationDetails = () => {
  const { consultationId } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pdfLoading, setPdfLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fileSize, setFileSize] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch consultation details
  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('patientToken');
        const response = await axios.get(
          `http://localhost:5000/api/consultations/con/${consultationId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setConsultation(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load consultation');
      } finally {
        setLoading(false);
      }
    };

    if (consultationId) fetchConsultation();
  }, [consultationId]);

  // Download and preview PDF
  const handleDownloadAndPreview = async () => {
    setPdfLoading(true);
    setSuccessMessage('');
    const token = localStorage.getItem('patientToken');

    try {
      const response = await axios.get(
        `http://localhost:5000/api/consultations/${consultationId}/download`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        }
      );

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const sizeKB = (blob.size / 1024).toFixed(2);
      setFileSize(sizeKB);
      setPreviewUrl(blobUrl);
      setShowPreview(true);
      setSuccessMessage(`PDF loaded successfully (${sizeKB} KB)`);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to generate PDF.');
    } finally {
      setPdfLoading(false);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleDownloadFromPreview = () => {
    if (!previewUrl) return;

    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `consultation-${consultationId}.pdf`;
    a.click();
  };

  if (loading) return <p className="text-center mt-6">Loading consultation details...</p>;
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (!consultation) return <p className="text-center mt-6">No consultation found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6 relative">
      <h2 className="text-2xl font-bold mb-4">Consultation Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><strong>Doctor:</strong> {consultation.doctor?.name || '-'}</div>
        <div><strong>Clinic:</strong> {consultation.clinic?.name || '-'}</div>
        <div><strong>Date:</strong> {consultation.consultationDate ? new Date(consultation.consultationDate).toLocaleString() : '-'}</div>
        <div><strong>Type:</strong> {consultation.type || '-'}</div>
        <div><strong>Status:</strong> {consultation.status || '-'}</div>
        <div><strong>Emergency:</strong> {consultation.isEmergency ? 'Yes' : 'No'}</div>
        <div><strong>Chief Complaint:</strong> {consultation.chiefComplaint || '-'}</div>
        <div><strong>Primary Diagnosis:</strong> {consultation.diagnosis?.primary || '-'}</div>
        <div><strong>Doctor Notes:</strong> {consultation.doctorNotes || '-'}</div>
      </div>

      {/* Vitals */}
      {consultation.vitals && Object.keys(consultation.vitals).length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Vitals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            {Object.entries(consultation.vitals).map(([key, value]) => (
              <div key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || '-'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medical History */}
      {consultation.medicalHistory?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Medical History</h3>
          <ul className="list-disc pl-5 text-sm">
            {consultation.medicalHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Prescriptions */}
      {consultation.prescriptions?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Prescriptions</h3>
          <ul className="list-disc pl-5 text-sm">
            {consultation.prescriptions.map((prescription, index) => (
              <li key={index}>
                <strong>{prescription.medicine}</strong> - {prescription.dosage}, {prescription.frequency}, {prescription.duration}
                <br />
                Instructions: {prescription.instructions || '-'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tests Advised */}
      {consultation.testsAdvised?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Tests Advised</h3>
          <ul className="list-disc pl-5 text-sm">
            {consultation.testsAdvised.map((test, index) => (
              <li key={index}>
                <strong>{test.name}</strong> - {test.lab || '-'}
                <br />
                Notes: {test.notes || '-'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Follow-Up */}
      {consultation.followUp?.advised && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Follow-Up</h3>
          <p className="text-sm">After {consultation.followUp.afterDays || '-'} days</p>
          <p className="text-sm italic text-gray-700">{consultation.followUp.note || '-'}</p>
        </div>
      )}

      {/* Reports */}
      {consultation.reports && consultation.reports.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg">Reports</h3>
          <ul className="list-disc pl-5 text-sm">
            {consultation.reports.map((report, idx) => (
              <li key={idx}>
                <a
                  href={`http://localhost:5000${report.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {report.title || `Report ${idx + 1}`}
                </a>{' '}
                <span className="text-gray-500 text-xs">
                  (Uploaded: {new Date(report.uploadedAt).toLocaleString()})
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PDF Download + Preview */}
      <div className="mt-8 text-center">
        <button
          onClick={handleDownloadAndPreview}
          disabled={pdfLoading}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow ${
            pdfLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {pdfLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
              Generating PDF...
            </span>
          ) : (
            'Preview & Download PDF'
          )}
        </button>

        {successMessage && (
          <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
        )}
      </div>

      {/* PDF Preview Modal */}
      {showPreview && previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative">
            <h3 className="text-lg font-semibold mb-2">PDF Preview</h3>

            <iframe
              src={previewUrl}
              title="PDF Preview"
              width="100%"
              height="500px"
              className="border rounded"
            />

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">Size: {fileSize} KB</p>
              <div className="space-x-4">
                <button
                  onClick={handleDownloadFromPreview}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Download
                </button>
                <button
                  onClick={handleClosePreview}
                  className="text-sm text-red-600 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientConsultationDetails;
