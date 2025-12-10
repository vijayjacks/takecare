// import React, { useState } from 'react';
// import axios from 'axios';

// const LabtestReport = () => {
//   const [formData, setFormData] = useState({
//     labId: '',
//     patientId: '',
//     selectedTests: '',
//     prescription: '',
//     file: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'file') {
//       setFormData({ ...formData, file: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const selectedTestsArray = formData.selectedTests
//       .split(',')
//       .map((test) => test.trim());

//     const prescriptionArray = formData.prescription
//       ? formData.prescription.split(',').map((p) => p.trim())
//       : [];

//     try {
//       const data = new FormData();
//       data.append('labId', formData.labId);
//       data.append('patientId', formData.patientId);
//       data.append('selectedTests', JSON.stringify(selectedTestsArray));
//       data.append('prescription', JSON.stringify(prescriptionArray));
//       if (formData.file) {
//         data.append('file', formData.file);
//       }

//       const res = await axios.post(
//         `/api/labs/${formData.labId}/generate-report`,
//         data,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       setMessage(res.data.message);
//     } catch (err) {
//       console.error(err);
//       setMessage(
//         err?.response?.data?.message || 'An error occurred while sending the report.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
//       <h2>Generate & Send Lab Report</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Lab ID:</label>
//         <input
//           type="text"
//           name="labId"
//           value={formData.labId}
//           onChange={handleChange}
//           required
//         />

//         <label>Patient ID:</label>
//         <input
//           type="text"
//           name="patientId"
//           value={formData.patientId}
//           onChange={handleChange}
//           required
//         />

//         <label>Selected Tests (comma separated):</label>
//         <input
//           type="text"
//           name="selectedTests"
//           value={formData.selectedTests}
//           onChange={handleChange}
//           placeholder="e.g. Blood Sugar, CBC"
//           required
//         />

//         <label>Prescription (comma separated):</label>
//         <input
//           type="text"
//           name="prescription"
//           value={formData.prescription}
//           onChange={handleChange}
//           placeholder="e.g. Paracetamol, Amoxicillin"
//         />

//         <label>Upload Lab Report File (PDF):</label>
//         <input
//           type="file"
//           name="file"
//           accept=".pdf"
//           onChange={handleChange}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? 'Submitting...' : 'Generate & Send Report'}
//         </button>
//       </form>

//       {message && (
//         <p style={{ marginTop: '20px', color: message.includes('error') ? 'red' : 'green' }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default LabtestReport;









// import React, { useState } from 'react';
// import axios from 'axios';

// const GenerateLabReport = () => {
//   const [labBookingId, setLabBookingId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     const token = localStorage.getItem('labToken');
//     if (!token) {
//       setMessage('Access token not found. Please login.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/${labBookingId}/generate-report`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage(res.data.message || 'Report generated.');
//     } catch (err) {
//       console.error(err);
//       setMessage(
//         err?.response?.data?.message || 'An error occurred while generating the report.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
//       <h2>Generate Lab Report</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Lab Booking ID:</label>
//         <input
//           type="text"
//           value={labBookingId}
//           onChange={(e) => setLabBookingId(e.target.value)}
//           placeholder="Enter Lab Booking ID"
//           required
//         />

//         <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
//           {loading ? 'Generating...' : 'Generate Report'}
//         </button>
//       </form>

//       {message && (
//         <p style={{ marginTop: '20px', color: message.toLowerCase().includes('error') ? 'red' : 'green' }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default GenerateLabReport;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const GenerateLabReport = () => {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [generatedReports, setGeneratedReports] = useState([]);

//   // Fetch labBookingId from backend once and store in localStorage (for demo)
//   useEffect(() => {
//     const fetchBooking = async () => {
//       const token = localStorage.getItem('labToken');
//       if (!token) {
//         setMessage('Lab token missing. Please log in.');
//         return;
//       }
      

//       try {
//         const res = await axios.get('http://localhost:5000/api/labs/my-booking', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const booking = res.data.booking;

//         if (booking && booking._id) {
//           localStorage.setItem('labBookingId', booking._id);
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage('Failed to fetch lab booking ID.');
//       }
//     };

//     fetchBooking();
//   }, []);

//   const handleGenerateReport = async () => {
//     setLoading(true);
//     setMessage('');
//     setGeneratedReports([]);

//     const token = localStorage.getItem('labToken');
//     const labBookingId = localStorage.getItem('labBookingId');

//     if (!token || !labBookingId) {
//       setMessage('Missing lab token or booking ID in localStorage.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/${labBookingId}/generate-report`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const reports = res.data.reports || [];
//       const formatted = formatTestReports(reports);

//       setMessage(res.data.message || 'Report generated successfully.');
//       setGeneratedReports(formatted);
//     } catch (err) {
//       console.error(err);
//       setMessage(
//         err?.response?.data?.message ||
//           'An error occurred while generating the report.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to format selectedTests into a consistent report format
//   const formatTestReports = (reports) => {
//     return reports.map((test) => ({
//       testName: test.testName || 'N/A',
//       result: test.result || 'Pending',
//       normalRange: test.normalRange || 'N/A',
//     }));
//   };

//   return (
//     <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto' }}>
//       <h2>Generate Lab Test Report</h2>

//       <button
//         onClick={handleGenerateReport}
//         disabled={loading}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: '#007BFF',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           marginBottom: '20px',
//         }}
//       >
//         {loading ? 'Generating...' : 'Generate Report'}
//       </button>

//       {message && (
//         <p
//           style={{
//             color: message.toLowerCase().includes('error') ? 'red' : 'green',
//           }}
//         >
//           {message}
//         </p>
//       )}

//       {generatedReports.length > 0 && (
//         <div>
//           <h3>Generated Report</h3>
//           <table
//             style={{
//               width: '100%',
//               borderCollapse: 'collapse',
//               marginTop: '10px',
//             }}
//           >
//             <thead>
//               <tr style={{ backgroundColor: '#f2f2f2' }}>
//                 <th style={thStyle}>Test Name</th>
//                 <th style={thStyle}>Result</th>
//                 <th style={thStyle}>Normal Range</th>
//               </tr>
//             </thead>
//             <tbody>
//               {generatedReports.map((report, idx) => (
//                 <tr key={idx}>
//                   <td style={tdStyle}>{report.testName}</td>
//                   <td style={tdStyle}>{report.result}</td>
//                   <td style={tdStyle}>{report.normalRange}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// const thStyle = {
//   padding: '10px',
//   border: '1px solid #ccc',
//   textAlign: 'left',
// };

// const tdStyle = {
//   padding: '10px',
//   border: '1px solid #ccc',
// };

// export default GenerateLabReport;





// // components/LabtestReport.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const GenerateLabReport = () => {
//   const { bookingId } = useParams();

//   const [loadingReports, setLoadingReports] = useState(true);
//   const [loadingGenerate, setLoadingGenerate] = useState(false);
//   const [reports, setReports] = useState([]);
//   const [message, setMessage] = useState('');

//   // Fetch existing reports on mount
//   useEffect(() => {
//     const fetchReports = async () => {
//       setLoadingReports(true);
//       try {
//         const token = localStorage.getItem('labToken');
//         const res = await axios.get(
//           `http://localhost:5000/api/labs/bookings/${bookingId}/test-reports`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setReports(res.data.reports || []);
//         setMessage('');
//       } catch (err) {
//         console.error(err);
//         setMessage('Failed to load reports.');
//       } finally {
//         setLoadingReports(false);
//       }
//     };

//     fetchReports();
//   }, [bookingId]);

//   // Generate reports
//   const handleGenerate = async () => {
//     setLoadingGenerate(true);
//     setMessage('Generating reports...');
//     try {
//       const token = localStorage.getItem('labToken');
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/bookings/${bookingId}/generate-report`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // After generation, update the reports state with fresh data from server response
//       setReports(res.data.reports || []);
//       setMessage(res.data.message || 'Reports generated.');
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || 'Failed to generate reports.');
//     } finally {
//       setLoadingGenerate(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Lab Test Reports</h2>

//       <button
//         onClick={handleGenerate}
//         disabled={loadingGenerate}
//         style={{ ...buttonStyle, opacity: loadingGenerate ? 0.6 : 1 }}
//       >
//         {loadingGenerate ? 'Generating...' : 'Generate Reports'}
//       </button>

//       {message && <p style={{ marginTop: 10 }}>{message}</p>}

//       {loadingReports ? (
//         <p>Loading reports...</p>
//       ) : reports.length === 0 ? (
//         <p>No reports available.</p>
//       ) : (
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th>Test Name</th>
//               <th>Result</th>
//               <th>Normal Range</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.testName}</td>
//                 <td>{r.result}</td>
//                 <td>{r.normalRange}</td>
//                 <td>{r.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   backgroundColor: '#007BFF',
//   color: 'white',
//   border: 'none',
//   borderRadius: 4,
//   cursor: 'pointer',
//   marginBottom: 10,
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginTop: '20px',
//   border: '1px solid #ccc',
// };

// export default GenerateLabReport;



















































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GenerateLabReport = () => {
//   // Get booking ID from localStorage
//   const labBookingId = localStorage.getItem('labBookingId');

//   const [loadingReports, setLoadingReports] = useState(true);
//   const [loadingGenerate, setLoadingGenerate] = useState(false);
//   const [reports, setReports] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (!labBookingId) {
//       setMessage('Booking ID not found in localStorage.');
//       setLoadingReports(false);
//       return;
//     }

//     const fetchReports = async () => {
//       setLoadingReports(true);
//       try {
//         const token = localStorage.getItem('labToken');
//         const res = await axios.get(
//           `http://localhost:5000/api/labs/bookings/${labBookingId}/test-reports`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setReports(res.data.reports || []);
//         setMessage('');
//       } catch (err) {
//         console.error(err);
//         setMessage('Failed to load reports.');
//       } finally {
//         setLoadingReports(false);
//       }
//     };

//     fetchReports();
//   }, [labBookingId]);

//   const handleGenerate = async () => {
//     if (!labBookingId) {
//       setMessage('Booking ID not found in localStorage.');
//       return;
//     }

//     setLoadingGenerate(true);
//     setMessage('Generating reports...');
//     try {
//       const token = localStorage.getItem('labToken');
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/bookings/${labBookingId}/generate-report`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setReports(res.data.reports || []);
//       setMessage(res.data.message || 'Reports generated.');
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || 'Failed to generate reports.');
//     } finally {
//       setLoadingGenerate(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Lab Test Reports</h2>

//       <button
//         onClick={handleGenerate}
//         disabled={loadingGenerate}
//         style={{ ...buttonStyle, opacity: loadingGenerate ? 0.6 : 1 }}
//       >
//         {loadingGenerate ? 'Generating...' : 'Generate Reports'}
//       </button>

//       {message && <p style={{ marginTop: 10 }}>{message}</p>}

//       {loadingReports ? (
//         <p>Loading reports...</p>
//       ) : reports.length === 0 ? (
//         <p>No reports available.</p>
//       ) : (
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th>Test Name</th>
//               <th>Result</th>
//               <th>Normal Range</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.testName}</td>
//                 <td>{r.result}</td>
//                 <td>{r.normalRange}</td>
//                 <td>{r.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   backgroundColor: '#007BFF',
//   color: 'white',
//   border: 'none',
//   borderRadius: 4,
//   cursor: 'pointer',
//   marginBottom: 10,
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginTop: '20px',
//   border: '1px solid #ccc',
// };

// export default GenerateLabReport;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GenerateLabReport = () => {
//   const labBookingId = localStorage.getItem('labBookingId');
//   const token = localStorage.getItem('labToken');

//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [resultInputs, setResultInputs] = useState({});

//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };

//   useEffect(() => {
//     const generateReports = async () => {
//       if (!labBookingId || !token) {
//         setMessage('Missing booking ID or token.');
//         setLoading(false);
//         return;
//       }

//       try {
//         // POST request to generate reports and receive them in response
//         const res = await axios.post(
//           `http://localhost:5000/api/labs/bookings/${labBookingId}/generate-report`,
//           {},
//           {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//         );

//         setReports(res.data.reports || []);
//         setMessage(res.data.message || 'Reports generated successfully.');
//       } catch (err) {
//         // Handle case where reports already exist or other errors
//         if (err.response?.status === 400) {
//           setMessage(err.response?.data?.message || 'Reports might already be generated.');
//           // Optionally, you could fetch reports here if you have a GET endpoint
//           // But based on your request, we avoid GET route.
//           setReports([]); // Clear reports or handle accordingly
//         } else {
//           setMessage(err.response?.data?.message || 'Error generating reports.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     generateReports();
//   }, [labBookingId, token]);

//   const handleResultChange = (reportId, value) => {
//     setResultInputs((prev) => ({
//       ...prev,
//       [reportId]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     setMessage('');

//     const updates = reports.map((report) => ({
//       reportId: report._id,
//       result: resultInputs[report._id] || '',
//     }));

//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/labs/bookings/${labBookingId}/generate-report`,
//         { updates },
//         { headers }
//       );
//       setMessage(res.data.message || 'Results updated successfully.');

//       // Optionally refresh reports with updated data
//       if (res.data.reports) {
//         setReports(res.data.reports);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Failed to submit results.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Generate & Submit Lab Test Reports</h2>

//       {message && (
//         <p style={{ color: message.toLowerCase().includes('success') ? 'green' : 'red' }}>
//           {message}
//         </p>
//       )}

//       {loading ? (
//         <p>Loading test reports...</p>
//       ) : reports.length === 0 ? (
//         <p>No reports available. Please generate reports.</p>
//       ) : (
//         <>
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th>Test Name</th>
//                 <th>Cost</th>
//                 <th>Normal Range</th>
//                 <th>Enter Result</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.map((report) => (
//                 <tr key={report._id}>
//                   <td>{report.testName}</td>
//                   <td>₹{report.cost}</td>
//                   <td>{report.normalRange}</td>
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="Enter result"
//                       value={resultInputs[report._id] || ''}
//                       onChange={(e) => handleResultChange(report._id, e.target.value)}
//                       style={inputStyle}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button
//             onClick={handleSubmit}
//             disabled={submitting}
//             style={{
//               ...buttonStyle,
//               backgroundColor: submitting ? '#ccc' : '#28a745',
//               marginTop: '20px',
//             }}
//           >
//             {submitting ? 'Submitting...' : 'Submit Results'}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginTop: '20px',
//   border: '1px solid #ddd',
// };

// const inputStyle = {
//   padding: '6px',
//   width: '100%',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// export default GenerateLabReport;










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GenerateLabReport = ({ bookingId }) => {
//   const [reports, setReports] = useState([]);
//   const token = localStorage.getItem('labToken'); // Get lab token from localStorage
//   const API_BASE = 'http://localhost:5000'; // Adjust based on your backend

//   useEffect(() => {
//     axios
//       .post(
//         `${API_BASE}/api/lab/generate-report/${bookingId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((res) => setReports(res.data.reports))
//       .catch((err) => console.error('Error fetching reports:', err));
//   }, [bookingId, token]);

//   const handleResultChange = (index, value) => {
//     const newReports = [...reports];
//     newReports[index].result = value;
//     setReports(newReports);
//   };

//   const handleSubmit = async (reportId, result) => {
//     try {
//       await axios.put(
//         `${API_BASE}/api/lab/update-report/${reportId}`,
//         { result },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert('Report updated successfully!');
//     } catch (err) {
//       console.error('Error updating report:', err);
//       alert('Error updating report.');
//     }
//   };

//   return (
//     <div>
//       <h2>Lab Test Reports</h2>
//       {reports.map((report, index) => (
//         <div key={report._id} style={{ border: '1px solid gray', padding: 10, margin: 10 }}>
//           <p><strong>Test Name:</strong> {report.testName}</p>
//           <p><strong>Cost:</strong> ₹{report.cost}</p>
//           <p><strong>Normal Range:</strong> {report.normalRange}</p>
//           <input
//             type="text"
//             placeholder="Enter result"
//             value={report.result === 'Pending' ? '' : report.result}
//             onChange={(e) => handleResultChange(index, e.target.value)}
//           />
//           <button onClick={() => handleSubmit(report._id, reports[index].result)}>Submit Result</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GenerateLabReport;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const GenerateLabReport = () => {
//   const [searchParams] = useSearchParams();
//   const bookingId = searchParams.get("bookingId"); // ✅ Get bookingId from URL
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem('labToken');
//   // const API_BASE = 'http://localhost:5000';

//   useEffect(() => {
//     if (!bookingId) return;

//     const fetchReports = async () => {
//       try {
//         const res = await axios.post(
//           `http://localhost:5000/api/lab/generate-report/${bookingId}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setReports(res.data.reports || []);
//       } catch (err) {
//         console.error("Error fetching reports:", err);
//         toast.error("Failed to load lab reports");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [bookingId, token]);

//   const handleResultChange = (index, value) => {
//     const updated = [...reports];
//     updated[index].result = value;
//     setReports(updated);
//   };

//   const handleSubmit = async (reportId, result) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/lab/update-report/${reportId}`,
//         { result },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Report updated successfully!");
//     } catch (err) {
//       console.error("Error updating report:", err);
//       toast.error("Failed to update report");
//     }
//   };

//   if (loading) return <div className="p-6">Loading reports...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Lab Test Reports for Booking: {bookingId}</h2>

//       {reports.length === 0 ? (
//         <p>No reports found for this booking.</p>
//       ) : (
//         reports.map((report, index) => (
//           <div
//             key={report._id}
//             className="border border-gray-300 rounded p-4 mb-4 shadow-sm"
//           >
//             <p><strong>Test Name:</strong> {report.testName}</p>
//             <p><strong>Cost:</strong> ₹{report.cost}</p>
//             <p><strong>Normal Range:</strong> {report.normalRange}</p>

//             <input
//               type="text"
//               className="border mt-2 px-3 py-2 rounded w-full"
//               placeholder="Enter test result"
//               value={report.result === 'Pending' ? '' : report.result}
//               onChange={(e) => handleResultChange(index, e.target.value)}
//             />

//             <button
//               onClick={() => handleSubmit(report._id, report.result)}
//               className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Submit Result
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default GenerateLabReport;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const GenerateLabReport = () => {
//   const [searchParams] = useSearchParams();
//   const bookingId = searchParams.get("bookingId");
//   const [reports, setReports] = useState([]);
//   const [inputValues, setInputValues] = useState({});
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem('labToken');

//   useEffect(() => {
//     if (!bookingId) return;

//     const fetchReports = async () => {
//       try {
//         const res = await axios.post(
//           `http://localhost:5000/api/labs/generate-report/${bookingId}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const fetchedReports = res.data.reports || [];

//         setReports(fetchedReports);

//         // Initialize input values for each report
//         const initialInputValues = {};
//         fetchedReports.forEach((report) => {
//           initialInputValues[report._id] = report.result === 'Pending' ? '' : report.result;
//         });
//         setInputValues(initialInputValues);

//       } catch (err) {
//         console.error("Error fetching reports:", err);
//         toast.error("Failed to load lab reports");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [bookingId, token]);

//   const handleInputChange = (reportId, value) => {
//     setInputValues(prev => ({
//       ...prev,
//       [reportId]: value,
//     }));
//   };

//   const handleSubmit = async (reportId) => {
//     const result = inputValues[reportId];

//     if (!result || result.trim() === '') {
//       toast.error("Please enter a valid result before submitting.");
//       return;
//     }

//     try {
//       await axios.put(
//         `http://localhost:5000/api/labs/update-report/${reportId}`,
//         { result },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Report updated successfully!");
//     } catch (err) {
//       console.error("Error updating report:", err);
//       toast.error("Failed to update report");
//     }
//   };

//   if (loading) return <div className="p-6">Loading reports...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Lab Test Reports for Booking: {bookingId}</h2>

//       {reports.length === 0 ? (
//         <p>No reports found for this booking.</p>
//       ) : (
//         reports.map((report) => (
//           <div
//             key={report._id}
//             className="border border-gray-300 rounded p-4 mb-4 shadow-sm"
//           >
//             <p><strong>Test Name:</strong> {report.testName}</p>
//             <p><strong>Cost:</strong> ₹{report.cost}</p>
//             <p><strong>Normal Range:</strong> {report.normalRange}</p>

//             <input
//               type="text"
//               className="border mt-2 px-3 py-2 rounded w-full"
//               placeholder="Enter test result"
//               value={inputValues[report._id] || ''}
//               onChange={(e) => handleInputChange(report._id, e.target.value)}
//             />

//             <button
//               onClick={() => handleSubmit(report._id)}
//               className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Submit Result
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default GenerateLabReport;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const GenerateLabReport = () => {
//   const [searchParams] = useSearchParams();
//   const bookingId = searchParams.get("bookingId");

//   const [tests, setTests] = useState([]);
//   const [inputValues, setInputValues] = useState({});
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("labToken");

//   useEffect(() => {
//     if (!bookingId) return;

//     const fetchTests = async () => {
//       try {
//        const res = await axios.post(
//   `http://localhost:5000/api/labs/generate-report/${bookingId}`,
//   {},
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );
//         setTests(res.data.tests || []);
//         setInputValues({}); // reset input fields if needed
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch tests.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTests();
//   }, [bookingId, token]);

//   const handleInputChange = (testName, value) => {
//     setInputValues((prev) => ({
//       ...prev,
//       [testName]: value,
//     }));
//   };

//   const handleSubmit = async (test) => {
//     const result = inputValues[test.name];

//     if (!result || result.trim() === '') {
//       toast.error(`Please enter a result for ${test.name}`);
//       return;
//     }

//     const toastId = toast.loading(`Submitting ${test.name}...`);

//     try {
//       const res = await axios.post(
//   `http://localhost:5000/api/labs/submit-report`,
//   { bookingId, testName: test.name, result },
//   { headers: { Authorization: `Bearer ${token}` } }
// );

//       toast.success(`✅ ${test.name} submitted successfully`, { id: toastId });

//       // Optionally: Disable field or button
//       setInputValues((prev) => ({
//         ...prev,
//         [test.name]: '',
//       }));
//     } catch (err) {
//       console.error(err);
//       toast.error(`❌ Failed to submit ${test.name}`, { id: toastId });
//     }
//   };

//   if (loading) return <div className="p-6">Loading tests...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         Submit Lab Results for Booking: <span className="text-blue-600">{bookingId}</span>
//       </h2>

//       {tests.length === 0 ? (
//         <p>No tests found for this booking.</p>
//       ) : (
//         tests.map((test, idx) => (
//           <div
//             key={idx}
//             className="bg-white shadow-sm border rounded p-4 mb-4"
//           >
//             <p><strong>Test Name:</strong> {test.name}</p>
//             <p><strong>Cost:</strong> ₹{test.cost}</p>
//             <p><strong>Normal Range:</strong> {test.normalRange}</p>

//             <input
//               type="text"
//               placeholder="Enter result"
//               value={inputValues[test.name] || ''}
//               onChange={(e) => handleInputChange(test.name, e.target.value)}
//               className="mt-2 px-3 py-2 border w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <button
//               onClick={() => handleSubmit(test)}
//               className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Submit Result
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default GenerateLabReport;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const GenerateLabReport = () => {
//   const [searchParams] = useSearchParams();
//   const bookingId = searchParams.get("bookingId");

//   const [tests, setTests] = useState([]);
//   const [inputValues, setInputValues] = useState({});
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("labToken");

//   useEffect(() => {
//     if (!bookingId) return;

//     const fetchTests = async () => {
//       try {
//         const res = await axios.post(
//           `http://localhost:5000/api/labs/generate-report/${bookingId}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTests(res.data.tests || []);
//         setInputValues({});
//       } catch (err) {
//         console.error(err);
//         toast.error("❌ Failed to fetch tests.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTests();
//   }, [bookingId, token]);

//   const handleInputChange = (testName, value) => {
//     setInputValues((prev) => ({
//       ...prev,
//       [testName]: value,
//     }));
//   };

//   const handleSubmit = async (test) => {
//     const result = inputValues[test.name];

//     if (!result || result.trim() === '') {
//       toast.error(`Please enter a result for ${test.name}`);
//       return;
//     }

//     const toastId = toast.loading(`Submitting ${test.name}...`);

//     try {
//       await axios.post(
//         `http://localhost:5000/api/labs/submit-report`,
//         {
//           bookingId,
//           testName: test.name,
//           result: result.trim(),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(`✅ ${test.name} submitted successfully`, { id: toastId });

//       // Clear the field
//       setInputValues((prev) => ({
//         ...prev,
//         [test.name]: '',
//       }));

//       // Alert user (native)
//       window.alert(`${test.name} result submitted successfully!`);
//     } catch (err) {
//       console.error(err);
//       toast.error(`❌ Failed to submit ${test.name}`, { id: toastId });
//     }
//   };

//   if (loading) return <div className="p-6">Loading tests...</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">
//         Submit Lab Results for Booking: <span className="text-blue-600">{bookingId}</span>
//       </h2>

//       {tests.length === 0 ? (
//         <p>No tests found for this booking.</p>
//       ) : (
//         tests.map((test, idx) => (
//           <div
//             key={idx}
//             className="bg-white shadow-sm border rounded p-4 mb-4"
//           >
//             <p className="text-lg font-semibold text-gray-700 mb-1">🧪 {test.name}</p>
//             <p className="text-sm"><strong>Cost:</strong> ₹{test.cost}</p>
//             <p className="text-sm"><strong>Normal Range:</strong> {test.normalRange}</p>

//             <input
//               type="text"
//               placeholder="Enter result"
//               value={inputValues[test.name] || ''}
//               onChange={(e) => handleInputChange(test.name, e.target.value)}
//               className="mt-3 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <button
//               onClick={() => handleSubmit(test)}
//               className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
//             >
//               Submit Result
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default GenerateLabReport;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const GenerateLabReport = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const [tests, setTests] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [labInfo, setLabInfo] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);

  const token = localStorage.getItem("labToken");

  useEffect(() => {
    if (!bookingId) return;

    const fetchReportData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/labs/generate-report/${bookingId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { lab, patient, tests } = res.data;

        setLabInfo(lab || {});
        setPatientInfo(patient || {});
        setTests(tests || []);
        setInputValues({});
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to fetch report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [bookingId, token]);

  const handleInputChange = (testName, value) => {
    setInputValues((prev) => ({
      ...prev,
      [testName]: value,
    }));
  };

  const handleSubmit = async (test) => {
    const result = inputValues[test.name];

    if (!result || result.trim() === '') {
      toast.error(`Please enter a result for ${test.name}`);
      return;
    }

    const toastId = toast.loading(`Submitting ${test.name}...`);

    try {
      await axios.post(
        `http://localhost:5000/api/labs/submit-report`,
        {
          bookingId,
          testName: test.name,
          result: result.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`✅ ${test.name} submitted successfully`, { id: toastId });

      setInputValues((prev) => ({
        ...prev,
        [test.name]: '',
      }));

      window.alert(`${test.name} result submitted successfully!`);
    } catch (err) {
      console.error(err);
      toast.error(`❌ Failed to submit ${test.name}`, { id: toastId });
    }
  };

  if (loading) return <div className="p-6">Loading tests...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Submit Lab Results
      </h2>

      {/* Lab Info */}
      <div className="mb-6 border rounded p-4 bg-blue-50">
        <h3 className="text-xl font-semibold mb-2">🔬 Lab Information</h3>
        <p><strong>Name:</strong> {labInfo?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {labInfo?.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {labInfo?.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {labInfo?.address || 'N/A'}</p>
      </div>

      {/* Patient Info */}
      <div className="mb-6 border rounded p-4 bg-green-50">
        <h3 className="text-xl font-semibold mb-2">🧍 Patient Information</h3>
        <p><strong>Name:</strong> {patientInfo?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {patientInfo?.email || 'N/A'}</p>
        <p><strong>Contact:</strong> {patientInfo?.contact?.phone || patientInfo?.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {patientInfo?.contact?.address || 'N/A'}</p>
        <p><strong>Age:</strong> {patientInfo?.age || 'N/A'}</p>
        <p><strong>Gender:</strong> {patientInfo?.gender || 'N/A'}</p>
        <p><strong>Booking Date:</strong> {patientInfo?.bookingDate ? new Date(patientInfo.bookingDate).toLocaleDateString() : 'N/A'}</p>
      </div>

      {/* Test Inputs */}
      {tests.length === 0 ? (
        <p>No tests found for this booking.</p>
      ) : (
        tests.map((test, idx) => (
          <div
            key={idx}
            className="bg-white shadow border rounded p-4 mb-4"
          >
            <p className="text-lg font-semibold text-gray-700 mb-1">🧪 {test.name}</p>
            <p className="text-sm"><strong>Cost:</strong> ₹{test.cost}</p>
            <p className="text-sm"><strong>Normal Range:</strong> {test.normalRange || 'N/A'}</p>

            <input
              type="text"
              placeholder="Enter result"
              value={inputValues[test.name] || ''}
              onChange={(e) => handleInputChange(test.name, e.target.value)}
              className="mt-3 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={() => handleSubmit(test)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
            >
              Submit Result
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default GenerateLabReport;










// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const GenerateLabReport = () => {
//   const [searchParams] = useSearchParams();
//   const bookingId = searchParams.get("bookingId");

//   const [tests, setTests] = useState([]);
//   const [inputValues, setInputValues] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [labInfo, setLabInfo] = useState(null);
//   const [patientInfo, setPatientInfo] = useState(null);
//   const [reportId, setReportId] = useState(null); // ✅ To store report ID

//   const token = localStorage.getItem("labToken");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!bookingId) return;

//     const fetchReportData = async () => {
//       try {
//         const res = await axios.post(
//           `http://localhost:5000/api/labs/generate-report/${bookingId}`,
//           {},
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const { lab, patient, tests } = res.data;

//         setLabInfo(lab || {});
//         setPatientInfo(patient || {});
//         setTests(tests || []);
//         setInputValues({});
//       } catch (err) {
//         console.error(err);
//         toast.error("❌ Failed to fetch report data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReportData();
//   }, [bookingId, token]);

//   const handleInputChange = (testName, value) => {
//     setInputValues((prev) => ({
//       ...prev,
//       [testName]: value,
//     }));
//   };

//   const handleSubmit = async (test) => {
//     const result = inputValues[test.name];

//     if (!result || result.trim() === '') {
//       toast.error(`Please enter a result for ${test.name}`);
//       return;
//     }

//     const toastId = toast.loading(`Submitting ${test.name}...`);

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/submit-report`,
//         {
//           bookingId,
//           testName: test.name,
//           result: result.trim(),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(`✅ ${test.name} submitted successfully`, { id: toastId });

//       setInputValues((prev) => ({
//         ...prev,
//         [test.name]: '',
//       }));

//       // ✅ Capture reportId from response
//       if (res.data?.reportId) {
//         setReportId(res.data.reportId);
//       }

//     } catch (err) {
//       console.error(err);
//       toast.error(`❌ Failed to submit ${test.name}`, { id: toastId });
//     }
//   };

//   if (loading) return <div className="p-6">Loading tests...</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">
//         Submit Lab Results
//       </h2>

//       {/* Lab Info */}
//       <div className="mb-6 border rounded p-4 bg-blue-50">
//         <h3 className="text-xl font-semibold mb-2">🔬 Lab Information</h3>
//         <p><strong>Name:</strong> {labInfo?.name || 'N/A'}</p>
//         <p><strong>Email:</strong> {labInfo?.email || 'N/A'}</p>
//         <p><strong>Phone:</strong> {labInfo?.phone || 'N/A'}</p>
//         <p><strong>Address:</strong> {labInfo?.address || 'N/A'}</p>
//       </div>

//       {/* Patient Info */}
//       <div className="mb-6 border rounded p-4 bg-green-50">
//         <h3 className="text-xl font-semibold mb-2">🧍 Patient Information</h3>
//         <p><strong>Name:</strong> {patientInfo?.name || 'N/A'}</p>
//         <p><strong>Email:</strong> {patientInfo?.email || 'N/A'}</p>
//         <p><strong>Contact:</strong> {patientInfo?.contact?.phone || patientInfo?.phone || 'N/A'}</p>
//         <p><strong>Address:</strong> {patientInfo?.contact?.address || 'N/A'}</p>
//         <p><strong>Age:</strong> {patientInfo?.age || 'N/A'}</p>
//         <p><strong>Gender:</strong> {patientInfo?.gender || 'N/A'}</p>
//         <p><strong>Booking Date:</strong> {patientInfo?.bookingDate ? new Date(patientInfo.bookingDate).toLocaleDateString() : 'N/A'}</p>
//       </div>

//       {/* Test Inputs */}
//       {tests.length === 0 ? (
//         <p>No tests found for this booking.</p>
//       ) : (
//         tests.map((test, idx) => (
//           <div
//             key={idx}
//             className="bg-white shadow border rounded p-4 mb-4"
//           >
//             <p className="text-lg font-semibold text-gray-700 mb-1">🧪 {test.name}</p>
//             <p className="text-sm"><strong>Cost:</strong> ₹{test.cost}</p>
//             <p className="text-sm"><strong>Normal Range:</strong> {test.normalRange || 'N/A'}</p>
//             <p className="text-sm"><strong>reportid:</strong> {test._id || 'N/A'}</p>

//             <input
//               type="text"
//               placeholder="Enter result"
//               value={inputValues[test.name] || ''}
//               onChange={(e) => handleInputChange(test.name, e.target.value)}
//               className="mt-3 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <button
//               onClick={() => handleSubmit(test)}
//               className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
//             >
//               Submit Result
//             </button>
//           </div>
//         ))
//       )}
//       {/* ✅ View Report Link */}
      
//       {reportId && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate(`/labReports/${reportId}`)}
//             className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
//             >
//             🧾 View Complete Lab Report
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenerateLabReport;

  // import React, { useEffect, useState } from 'react';
  // import axios from 'axios';
  // import { useSearchParams } from 'react-router-dom';
  // import toast from 'react-hot-toast';

  // const GenerateLabReport = () => {
  //   const [searchParams] = useSearchParams();
  //   const bookingId = searchParams.get("bookingId");

  //   const [tests, setTests] = useState([]);
  //   const [inputValues, setInputValues] = useState({});
  //   const [loading, setLoading] = useState(true);
  //   const [labInfo, setLabInfo] = useState(null);
  //   const [patientInfo, setPatientInfo] = useState(null);

  //   const token = localStorage.getItem("labToken");

  //   useEffect(() => {
  //     if (!bookingId) return;

  //     const fetchReportData = async () => {
  //       try {
  //         const res = await axios.post(
  //           `http://localhost:5000/api/labs/generate-report/${bookingId}`,
  //           {},
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );

  //         const { lab, patient, tests } = res.data;

  //         setLabInfo(lab || {});
  //         setPatientInfo(patient || {});
  //         setTests(tests || []);
  //         setInputValues({});
  //       } catch (err) {
  //         console.error(err);
  //         toast.error("❌ Failed to fetch report data.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchReportData();
  //   }, [bookingId, token]);

  //   const handleInputChange = (testName, value) => {
  //     setInputValues((prev) => ({
  //       ...prev,
  //       [testName]: value,
  //     }));
  //   };

  //   const handleSubmit = async (test) => {
  //     const result = inputValues[test.name];

  //     if (!result || result.trim() === '') {
  //       toast.error(`Please enter a result for ${test.name}`);
  //       return;
  //     }

  //     const toastId = toast.loading(`Submitting ${test.name}...`);

  //     try {
  //       await axios.post(
  //         `http://localhost:5000/api/labs/submit-report`,
  //         {
  //           bookingId,
  //           testName: test.name,
  //           result: result.trim(),
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       toast.success(`✅ ${test.name} submitted successfully`, { id: toastId });

  //       setInputValues((prev) => ({
  //         ...prev,
  //         [test.name]: '',
  //       }));

  //       window.alert(`${test.name} result submitted successfully!`);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error(`❌ Failed to submit ${test.name}`, { id: toastId });
  //     }
  //   };

  //   if (loading) return <div className="p-6">Loading tests...</div>;

  //   return (
  //     <div className="p-6 max-w-4xl mx-auto">
  //       <h2 className="text-3xl font-bold mb-6 text-gray-800">
  //         Submit Lab Results
  //       </h2>

  //       {/* Lab Info */}
  //       <div className="mb-6 border rounded p-4 bg-blue-50">
  //         <h3 className="text-xl font-semibold mb-2">🔬 Lab Information</h3>
  //         <p><strong>Name:</strong> {labInfo?.name || 'N/A'}</p>
  //         <p><strong>Email:</strong> {labInfo?.email || 'N/A'}</p>
  //         <p><strong>Phone:</strong> {labInfo?.phone || 'N/A'}</p>
  //         <p><strong>Address:</strong> {labInfo?.address || 'N/A'}</p>
  //       </div>

  //       {/* Patient Info */}
  //       <div className="mb-6 border rounded p-4 bg-green-50">
  //         <h3 className="text-xl font-semibold mb-2">🧍 Patient Information</h3>
  //         <p><strong>Name:</strong> {patientInfo?.name || 'N/A'}</p>
  //         <p><strong>Email:</strong> {patientInfo?.email || 'N/A'}</p>
  //         <p><strong>Contact:</strong> {patientInfo?.contact || 'N/A'}</p>
  //         <p><strong>Age:</strong> {patientInfo?.age || 'N/A'}</p>
  //         <p><strong>Gender:</strong> {patientInfo?.gender || 'N/A'}</p>
  //         <p><strong>Booking Date:</strong> {patientInfo?.bookingDate ? new Date(patientInfo.bookingDate).toLocaleDateString() : 'N/A'}</p>
  //       </div>

  //       {/* Test Inputs */}
  //       {tests.length === 0 ? (
  //         <p>No tests found for this booking.</p>
  //       ) : (
  //         tests.map((test, idx) => (
  //           <div
  //             key={idx}
  //             className="bg-white shadow border rounded p-4 mb-4"
  //           >
  //             <p className="text-lg font-semibold text-gray-700 mb-1">🧪 {test.name}</p>
  //             <p className="text-sm"><strong>Cost:</strong> ₹{test.cost}</p>
  //             <p className="text-sm"><strong>Normal Range:</strong> {test.normalRange}</p>

  //             <input
  //               type="text"
  //               placeholder="Enter result"
  //               value={inputValues[test.name] || ''}
  //               onChange={(e) => handleInputChange(test.name, e.target.value)}
  //               className="mt-3 px-3 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />

  //             <button
  //               onClick={() => handleSubmit(test)}
  //               className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
  //             >
  //               Submit Result
  //             </button>
  //           </div>
  //         ))
  //       )}
  //     </div>
  //   );
  // };

  // export default GenerateLabReport;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GenerateLabReport = () => {
//   const labBookingId = localStorage.getItem('labBookingId');
//   const token = localStorage.getItem('labToken');

//   const [labTests, setLabTests] = useState([]);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [mergedTests, setMergedTests] = useState([]);
//   const [results, setResults] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch lab's available tests and selected tests from booking
//   useEffect(() => {
//     const fetchTests = async () => {
//       setLoading(true);
//       try {
//         const headers = { Authorization: `Bearer ${token}` };

//         // Fetch lab details
//         const labRes = await axios.get('http://localhost:5000/api/labs/me', {
//           headers,
//         });

//         const availableTests = labRes.data.lab.availableTests || [];

//         // Fetch booking details
//         const bookingRes = await axios.get(
//           `http://localhost:5000/api/labs/bookings/${labBookingId}`,
//           {
//             headers,
//           }
//         );

//         const selectedTestNames = bookingRes.data.booking.selectedTests || [];

//         // Match selected tests with available tests to get full details
//         const matchedTests = selectedTestNames
//           .map((testName) =>
//             availableTests.find((test) => test.name === testName)
//           )
//           .filter(Boolean); // remove undefined if test not found

//         setLabTests(availableTests);
//         setSelectedTests(selectedTestNames);
//         setMergedTests(matchedTests);
//       } catch (error) {
//         console.error(error);
//         setMessage('Failed to load test data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (labBookingId && token) {
//       fetchTests();
//     } else {
//       setMessage('Booking ID or token missing.');
//       setLoading(false);
//     }
//   }, [labBookingId, token]);

//   // Handle input change
//   const handleResultChange = (testId, value) => {
//     setResults((prev) => ({
//       ...prev,
//       [testId]: value,
//     }));
//   };

//   // Submit results
//   const handleSubmit = async () => {
//     setSubmitting(true);
//     setMessage('');

//     const reportPayload = mergedTests.map((test) => ({
//       testId: test._id,
//       testName: test.name,
//       normalRange: test.normalRange,
//       result: results[test._id] || '',
//     }));

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/bookings/${labBookingId}/generate-report`,
//         { reports: reportPayload },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setMessage(res.data.message || 'Reports submitted successfully.');
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || 'Error submitting reports.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Generate Lab Test Reports</h2>

//       {message && <p style={{ color: 'red' }}>{message}</p>}

//       {loading ? (
//         <p>Loading tests...</p>
//       ) : mergedTests.length === 0 ? (
//         <p>No matching tests found between selected and available.</p>
//       ) : (
//         <>
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th>Test Name</th>
//                 <th>Cost</th>
//                 <th>Normal Range</th>
//                 <th>Enter Result</th>
//               </tr>
//             </thead>
//             <tbody>
//               {mergedTests.map((test) => (
//                 <tr key={test._id}>
//                   <td>{test.name}</td>
//                   <td>₹{test.cost}</td>
//                   <td>{test.normalRange}</td>
//                   <td>
//                     <input
//                       type="text"
//                       placeholder="Result"
//                       value={results[test._id] || ''}
//                       onChange={(e) =>
//                         handleResultChange(test._id, e.target.value)
//                       }
//                       style={inputStyle}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button
//             onClick={handleSubmit}
//             disabled={submitting}
//             style={{
//               ...buttonStyle,
//               marginTop: '20px',
//               backgroundColor: submitting ? '#ccc' : '#28a745',
//             }}
//           >
//             {submitting ? 'Submitting...' : 'Submit Reports'}
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginTop: '20px',
//   border: '1px solid #ddd',
// };

// const inputStyle = {
//   padding: '5px',
//   width: '100%',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
// };

// const buttonStyle = {
//   padding: '10px 20px',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
// };

// export default GenerateLabReport;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const GenerateLabReport = () => {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [generatedReports, setGeneratedReports] = useState([]);
//   const [patientInfo, setPatientInfo] = useState(null);

//   // Fetch booking and patient info on mount
//   useEffect(() => {
//     const fetchBookingAndPatient = async () => {
//       const token = localStorage.getItem('labToken');
//       if (!token) {
//         setMessage('Lab token missing. Please log in.');
//         return;
//       }

//       try {
//         // Fetch booking info
//         const bookingRes = await axios.get('http://localhost:5000/api/labs/my-booking', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const booking = bookingRes.data.booking;

//         if (booking && booking._id) {
//           localStorage.setItem('labBookingId', booking._id);
//         }

//         if (booking?.patient?._id) {
//           const patientId = booking.patient._id;
//           localStorage.setItem('patientId', patientId);

//           // Fetch patient details
//           const patientRes = await axios.get(`http://localhost:5000/api/patients/${patientId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           setPatientInfo(patientRes.data.patient);
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage('Failed to fetch booking or patient info.');
//       }
//     };

//     fetchBookingAndPatient();
//   }, []);

//   const handleGenerateReport = async () => {
//     setLoading(true);
//     setMessage('');
//     setGeneratedReports([]);

//     const token = localStorage.getItem('labToken');
//     const labBookingId = localStorage.getItem('labBookingId');

//     if (!token || !labBookingId) {
//       setMessage('Missing lab token or booking ID.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/labs/${labBookingId}/generate-report`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const reports = res.data.reports || [];
//       const formatted = formatTestReports(reports);

//       setMessage(res.data.message || 'Report generated successfully.');
//       setGeneratedReports(formatted);
//     } catch (err) {
//       console.error(err);
//       setMessage(
//         err?.response?.data?.message || 'An error occurred while generating the report.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTestReports = (reports) =>
//     reports.map((test) => ({
//       testName: test.testName || 'N/A',
//       result: test.result || 'Pending',
//       normalRange: test.normalRange || 'N/A',
//     }));

//   return (
//     <div style={{ padding: 30, maxWidth: 800, margin: 'auto' }}>
//       <h2>Generate Lab Test Report</h2>

//       {/* Patient Info */}
//       {patientInfo && (
//         <div style={infoBox}>
//           <h3>Patient Info</h3>
//           <p><strong>Patient ID:</strong> {patientInfo._id}</p>
//           <p><strong>Name:</strong> {patientInfo.name}</p>
//           <p><strong>Age:</strong> {patientInfo.age}</p>
//           <p><strong>Gender:</strong> {patientInfo.gender}</p>
//           <p><strong>Email:</strong> {patientInfo.email}</p>
//           <p><strong>Phone:</strong> {patientInfo.contact?.phone || 'N/A'}</p>
//         </div>
//       )}

//       {/* Generate Report Button */}
//       <button
//         onClick={handleGenerateReport}
//         disabled={loading}
//         style={{
//           padding: '10px 20px',
//           backgroundColor: '#007BFF',
//           color: 'white',
//           border: 'none',
//           borderRadius: 4,
//           cursor: loading ? 'not-allowed' : 'pointer',
//           marginBottom: 20,
//         }}
//       >
//         {loading ? 'Generating...' : 'Generate Report'}
//       </button>

//       {/* Status Message */}
//       {message && (
//         <p style={{ color: message.toLowerCase().includes('error') ? 'red' : 'green' }}>
//           {message}
//         </p>
//       )}

//       {/* Generated Lab Report Table */}
//       {generatedReports.length > 0 && (
//         <div>
//           <h3>Generated Report</h3>
//           <table style={tableStyle}>
//             <thead>
//               <tr style={{ backgroundColor: '#f2f2f2' }}>
//                 <th style={thStyle}>Test Name</th>
//                 <th style={thStyle}>Result</th>
//                 <th style={thStyle}>Normal Range</th>
//               </tr>
//             </thead>
//             <tbody>
//               {generatedReports.map((report, idx) => (
//                 <tr key={idx}>
//                   <td style={tdStyle}>{report.testName}</td>
//                   <td style={tdStyle}>{report.result}</td>
//                   <td style={tdStyle}>{report.normalRange}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// // Styles
// const thStyle = {
//   padding: 10,
//   border: '1px solid #ccc',
//   textAlign: 'left',
// };
// const tdStyle = {
//   padding: 10,
//   border: '1px solid #ccc',
// };
// const tableStyle = {
//   width: '100%',
//   borderCollapse: 'collapse',
//   marginTop: 10,
// };
// const infoBox = {
//   marginBottom: 20,
//   padding: 15,
//   border: '1px solid #ddd',
//   borderRadius: 5,
//   backgroundColor: '#f9f9f9',
// };

// export default GenerateLabReport;
