// src/components/PatientVitals.js

// import React, { useState } from 'react';
// import axios from 'axios';

// const PatientVitals = () => {
//   const [patientId, setPatientId] = useState('');
//   const [vitals, setVitals] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSyncVitals = async () => {
//     try {
//       setLoading(true);
//       setMessage('');
//       setVitals(null);

//       const token = localStorage.getItem('token'); // Must be set at login

//       if (!token) {
//         setMessage("Authentication token not found. Please log in.");
//         return;
//       }

//       const res = await axios.put(
//         `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setVitals(res.data.vitals);
//       setMessage(res.data.message);
//     } catch (err) {
//       console.error("Error syncing vitals:", err);
//       setMessage(err.response?.data?.message || 'Error syncing vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>🩺 Sync Patient Vitals from Latest Consultation</h2>

//       <input
//         style={styles.input}
//         type="text"
//         placeholder="Enter Patient ID"
//         value={patientId}
//         onChange={(e) => setPatientId(e.target.value)}
//       />

//       <button style={styles.button} onClick={handleSyncVitals} disabled={loading}>
//         {loading ? 'Syncing...' : 'Sync Latest Vitals'}
//       </button>

//       {message && <p style={styles.message}>{message}</p>}

//       {vitals && (
//         <div style={styles.vitalsBox}>
//           <h3>🩺 Current Vitals</h3>
//           <ul>
//             {Object.entries(vitals).map(([key, value]) => (
//               <li key={key}>
//                 <strong>{formatKey(key)}:</strong> {value}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const formatKey = (key) => {
//   return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
// };

// const styles = {
//   container: {
//     padding: 20,
//     maxWidth: 600,
//     margin: 'auto',
//     fontFamily: 'Arial',
//   },
//   input: {
//     padding: 10,
//     width: '100%',
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   button: {
//     padding: 10,
//     width: '100%',
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     fontSize: 16,
//     cursor: 'pointer',
//     marginBottom: 12,
//   },
//   message: {
//     fontSize: 14,
//     marginBottom: 10,
//     color: '#333',
//   },
//   vitalsBox: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     border: '1px solid #ccc',
//     borderRadius: 5,
//   },
// };

// export default PatientVitals;

// voii

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VITAL_FIELDS = {
//   temperature: '°C',
//   pulse: 'bpm',
//   bloodPressure: 'mmHg',
//   respirationRate: 'rpm',
//   oxygenSaturation: '%',
//   height: 'cm',
//   weight: 'kg',
//   bmi: '',
//   glucose: 'mg/dL',
// };

// const PatientVitals = () => {
//   const [patientId, setPatientId] = useState('');
//   const [vitals, setVitals] = useState({});
//   const [updatedAt, setUpdatedAt] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   const token = localStorage.getItem('token');

//   const handleInputChange = (key, value) => {
//     if (!/^\d*\.?\d*$/.test(value)) return; // Allow numeric only
//     setVitals((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!token) return setMessage('Login required');

//     try {
//       setLoading(true);
//       setMessage('');

//       const res = await axios.post(
//         `http://localhost:5000/api/clinics/patient/${patientId}/vitals`,
//         { vitals },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage('Vitals saved successfully');
//       setUpdatedAt(new Date().toLocaleString());
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || 'Error saving vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchVitalsHistory = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/clinics/patient/${patientId}/vitals/history`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setHistory(res.data.history || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (patientId) {
//       fetchVitalsHistory();
//     }
//   }, [patientId]);

//   return (
//     <div style={styles.container}>
//       <h2>🏥 Add/Update Patient Vitals</h2>

//       <input
//         type="text"
//         placeholder="Enter Patient ID"
//         value={patientId}
//         onChange={(e) => setPatientId(e.target.value)}
//         style={styles.input}
//       />

//       <div style={styles.grid}>
//         {Object.entries(VITAL_FIELDS).map(([key, unit]) => (
//           <input
//             key={key}
//             placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} (${unit})`}
//             value={vitals[key] || ''}
//             onChange={(e) => handleInputChange(key, e.target.value)}
//             style={styles.inputField}
//           />
//         ))}
//       </div>

//       <button style={styles.button} onClick={handleSubmit} disabled={loading || !patientId}>
//         {loading ? 'Saving...' : 'Save Vitals'}
//       </button>

//       {message && <p style={styles.message}>{message}</p>}
//       {updatedAt && <p style={{ fontSize: 12 }}>Last Updated: {updatedAt}</p>}

//       {history.length > 0 && (
//         <div style={styles.historyBox}>
//           <h4>📜 Vitals History</h4>
//           <ul>
//             {history.map((entry, index) => (
//               <li key={index}>
//                 <strong>{new Date(entry.updatedAt).toLocaleString()}:</strong>{' '}
//                 {Object.entries(entry.vitals).map(([k, v]) => `${k}: ${v}${VITAL_FIELDS[k] ? ' ' + VITAL_FIELDS[k] : ''}`).join(', ')}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: 20,
//     maxWidth: 600,
//     margin: 'auto',
//     fontFamily: 'Arial',
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
//     gap: 10,
//     marginBottom: 20,
//   },
//   input: {
//     padding: 10,
//     width: '100%',
//     marginBottom: 12,
//     fontSize: 16,
//   },
//   inputField: {
//     padding: 8,
//     fontSize: 14,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#007bff',
//     color: '#fff',
//     border: 'none',
//     fontSize: 16,
//     cursor: 'pointer',
//     width: '100%',
//     marginBottom: 12,
//   },
//   message: {
//     fontSize: 14,
//     color: '#333',
//   },
//   historyBox: {
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 6,
//   },
// };

// export default PatientVitals;





// // javk

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VITAL_FIELDS = {
//   temperature: '°C',
//   pulse: 'bpm',
//   bloodPressure: 'mmHg',
//   respirationRate: 'rpm',
//   oxygenSaturation: '%',
//   height: 'cm',
//   weight: 'kg',
//   bmi: '',
//   glucose: 'mg/dL',
// };

// const PatientVitals = () => {
//   const [patientId, setPatientId] = useState('');
//   const [vitals, setVitals] = useState({});
//   const [updatedAt, setUpdatedAt] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   const token = localStorage.getItem('token');

//   const handleInputChange = (key, value) => {
//     if (!/^\d*\.?\d*$/.test(value)) return; // Only allow numbers
//     setVitals((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async () => {
//     if (!token) return setMessage('🔒 Login required');
//     if (!patientId.trim()) return setMessage('⚠️ Patient ID is required');

//     const filledVitals = Object.fromEntries(
//       Object.entries(vitals).filter(([_, val]) => val !== '')
//     );

//     if (Object.keys(filledVitals).length === 0) {
//       return setMessage('⚠️ Please enter at least one vital sign');
//     }

//     try {
//       setLoading(true);
//       setMessage('');

//       const res = await axios.post(
//         `http://localhost:5000/api/clinics/patient/${patientId}/vitals`,
//         { vitals: filledVitals },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage('✅ Vitals saved successfully');
//       setUpdatedAt(new Date().toLocaleString());
//       fetchVitalsHistory(); // refresh history
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || '❌ Error saving vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchVitalsHistory = async () => {
//     if (!patientId.trim()) return;
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/clinics/patient/${patientId}/vitals/history`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setHistory(res.data.history || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSyncVitals = async () => {
//     if (!token) return setMessage('🔒 Login required');
//     if (!patientId.trim()) return setMessage('⚠️ Patient ID is required');

//     try {
//       setLoading(true);
//       setMessage('');
//       const res = await axios.put(
//         `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const newVitals = res.data.vitals || {};
//       setVitals(newVitals);
//       setUpdatedAt(
//         res.data.updatedAt
//           ? new Date(res.data.updatedAt).toLocaleString()
//           : ''
//       );
//       setMessage(res.data.message || 'Synced vitals');
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || '❌ Error syncing vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearForm = () => {
//     setVitals({});
//     setMessage('');
//     setUpdatedAt('');
//   };

//   useEffect(() => {
//     if (patientId.trim()) {
//       fetchVitalsHistory();
//     }
//   }, [patientId]);

//   return (
//     <div style={styles.container}>
//       <h2>🏥 Patient Vitals Form</h2>

//       <input
//         type="text"
//         placeholder="Enter Patient ID"
//         value={patientId}
//         onChange={(e) => setPatientId(e.target.value)}
//         style={styles.input}
//       />

//       <div style={styles.grid}>
//         {Object.entries(VITAL_FIELDS).map(([key, unit]) => (
//           <div key={key} style={styles.inputGroup}>
//             <label style={styles.label}>
//               {key.charAt(0).toUpperCase() + key.slice(1)} {unit && `(${unit})`}
//             </label>
//             <input
//               type="text"
//               value={vitals[key] || ''}
//               onChange={(e) => handleInputChange(key, e.target.value)}
//               style={styles.inputField}
//               placeholder={`Enter ${key}`}
//             />
//           </div>
//         ))}
//       </div>

//       <div style={styles.buttonRow}>
//         <button
//           style={{ ...styles.button, backgroundColor: '#007bff' }}
//           onClick={handleSubmit}
//           disabled={loading || !patientId}
//         >
//           {loading ? 'Saving...' : '💾 Save Vitals'}
//         </button>

//         <button
//           style={{ ...styles.button, backgroundColor: '#28a745' }}
//           onClick={handleSyncVitals}
//           disabled={loading || !patientId}
//         >
//           {loading ? 'Syncing...' : '🔄 Sync from Consultation'}
//         </button>

//         <button
//           style={{ ...styles.button, backgroundColor: '#6c757d' }}
//           onClick={clearForm}
//         >
//           🧹 Clear Form
//         </button>
//       </div>

//       {message && <p style={styles.message}>{message}</p>}
//       {updatedAt && <p style={styles.timestamp}>🕒 Last Updated: {updatedAt}</p>}

//       {history.length > 0 && (
//         <div style={styles.historyBox}>
//           <h4>📜 Vitals History</h4>
//           <table style={styles.table}>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 {Object.keys(VITAL_FIELDS).map((field) => (
//                   <th key={field}>{field}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{new Date(entry.updatedAt).toLocaleString()}</td>
//                   {Object.keys(VITAL_FIELDS).map((field) => (
//                     <td key={field}>
//                       {entry.vitals[field]
//                         ? `${entry.vitals[field]} ${VITAL_FIELDS[field]}`
//                         : '-'}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: 20,
//     maxWidth: 800,
//     margin: 'auto',
//     fontFamily: 'Arial, sans-serif',
//   },
//   input: {
//     padding: 10,
//     width: '100%',
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
//     gap: 16,
//     marginBottom: 20,
//   },
//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 4,
//     fontWeight: 'bold',
//   },
//   inputField: {
//     padding: 8,
//     fontSize: 14,
//     border: '1px solid #ccc',
//     borderRadius: 4,
//   },
//   buttonRow: {
//     display: 'flex',
//     gap: 12,
//     marginBottom: 12,
//   },
//   button: {
//     padding: 10,
//     color: '#fff',
//     border: 'none',
//     fontSize: 14,
//     cursor: 'pointer',
//     flex: 1,
//     borderRadius: 4,
//   },
//   message: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 10,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#777',
//     marginBottom: 10,
//   },
//   historyBox: {
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 6,
//     marginTop: 20,
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: 10,
//   },
//   tableHeader: {
//     backgroundColor: '#f1f1f1',
//   },
//   th: {
//     border: '1px solid #ccc',
//     padding: 8,
//     fontWeight: 'bold',
//   },
//   td: {
//     border: '1px solid #ccc',
//     padding: 8,
//     textAlign: 'center',
//   },
// };

// export default PatientVitals;
















// okkk

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VITAL_FIELDS = {
//   temperature: '°C',
//   pulse: 'bpm',
//   bloodPressure: 'mmHg',
//   respirationRate: 'rpm',
//   oxygenSaturation: '%',
//   height: 'cm',
//   weight: 'kg',
//   bmi: '',
//   glucose: 'mg/dL',
// };

// const PatientVitals = () => {
//   const [patientId, setPatientId] = useState('');
//   const [vitals, setVitals] = useState({});
//   const [updatedAt, setUpdatedAt] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   const token = localStorage.getItem('token');

//   const handleInputChange = (key, value) => {
//     if (!/^\d*\.?\d*$/.test(value)) return; // Only allow numbers
//     setVitals((prev) => ({ ...prev, [key]: value }));
//   };

//   // const fetchVitalsHistory = async () => {
//   //   if (!patientId.trim()) return;
//   //   try {
//   //     const res = await axios.get(
//   //       `http://localhost:5000/api/clinics/patient/${patientId}/vitals/history`,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     setHistory(res.data.history || []);
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     if (!token) return setMessage('🔒 Login required');
//     if (!patientId.trim()) return setMessage('⚠️ Patient ID is required');

//     const filledVitals = Object.fromEntries(
//       Object.entries(vitals).filter(([_, val]) => val !== '')
//     );

//     if (Object.keys(filledVitals).length === 0) {
//       return setMessage('⚠️ Please enter at least one vital sign');
//     }

//     try {
//       setLoading(true);
//       setMessage('');

//       const res = await axios.post(
//         `http://localhost:5000/api/clinics/patient/${patientId}/vitals`,
//         { vitals: filledVitals },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setMessage(res.data.message || '✅ Vitals saved successfully');
//       setUpdatedAt(new Date().toLocaleString());
//       // fetchVitalsHistory();
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || '❌ Error saving vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSyncVitals = async () => {
//     if (!token) return setMessage('🔒 Login required');
//     if (!patientId.trim()) return setMessage('⚠️ Patient ID is required');

//     try {
//       setLoading(true);
//       setMessage('');

//       const res = await axios.put(
//         `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setVitals(res.data.vitals || {});
//       setUpdatedAt(
//         res.data.updatedAt ? new Date(res.data.updatedAt).toLocaleString() : ''
//       );
//       setMessage(res.data.message || '✅ Synced from latest consultation');
//     } catch (err) {
//       console.error(err);
//       setMessage(err.response?.data?.message || '❌ Error syncing vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearForm = () => {
//     setVitals({});
//     setMessage('');
//     setUpdatedAt('');
//   };

//   useEffect(() => {
//     if (patientId.trim()) {
//       // fetchVitalsHistory();
//     }
//   }, [patientId]);

//   return (
//     <div style={styles.container}>
//       <h2>🏥 Patient Vitals Form</h2>

//       <input
//         type="text"
//         placeholder="Enter Patient ID"
//         value={patientId}
//         onChange={(e) => setPatientId(e.target.value)}
//         style={styles.input}
//       />

//       <div style={styles.grid}>
//         {Object.entries(VITAL_FIELDS).map(([key, unit]) => (
//           <div key={key} style={styles.inputGroup}>
//             <label style={styles.label}>
//               {key.charAt(0).toUpperCase() + key.slice(1)} {unit && `(${unit})`}
//             </label>
//             <input
//               type="text"
//               value={vitals[key] || ''}
//               onChange={(e) => handleInputChange(key, e.target.value)}
//               style={styles.inputField}
//               placeholder={`Enter ${key}`}
//             />
//           </div>
//         ))}
//       </div>

//       <div style={styles.buttonRow}>
//         <button
//           style={{ ...styles.button, backgroundColor: '#007bff' }}
//           onClick={handleSubmit}
//           disabled={loading || !patientId}
//         >
//           {loading ? 'Saving...' : '💾 Save Vitals'}
//         </button>

//         <button
//           style={{ ...styles.button, backgroundColor: '#28a745' }}
//           onClick={handleSyncVitals}
//           disabled={loading || !patientId}
//         >
//           {loading ? 'Syncing...' : '🔄 Sync from Consultation'}
//         </button>

//         <button
//           style={{ ...styles.button, backgroundColor: '#6c757d' }}
//           onClick={clearForm}
//         >
//           🧹 Clear Form
//         </button>
//       </div>

//       {message && <p style={styles.message}>{message}</p>}
//       {updatedAt && <p style={styles.timestamp}>🕒 Last Updated: {updatedAt}</p>}

//       {history.length > 0 && (
//         <div style={styles.historyBox}>
//           <h4>📜 Vitals History</h4>
//           <table style={styles.table}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th>Date</th>
//                 {Object.keys(VITAL_FIELDS).map((field) => (
//                   <th key={field}>{field}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{new Date(entry.updatedAt).toLocaleString()}</td>
//                   {Object.keys(VITAL_FIELDS).map((field) => (
//                     <td key={field}>
//                       {entry.vitals[field]
//                         ? `${entry.vitals[field]} ${VITAL_FIELDS[field]}`
//                         : '-'}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: 20,
//     maxWidth: 1000,
//     margin: 'auto',
//     fontFamily: 'Arial, sans-serif',
//   },
//   input: {
//     padding: 10,
//     width: '100%',
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
//     gap: 16,
//     marginBottom: 20,
//   },
//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 4,
//     fontWeight: 'bold',
//   },
//   inputField: {
//     padding: 8,
//     fontSize: 14,
//     border: '1px solid #ccc',
//     borderRadius: 4,
//   },
//   buttonRow: {
//     display: 'flex',
//     gap: 12,
//     marginBottom: 12,
//     flexWrap: 'wrap',
//   },
//   button: {
//     padding: 10,
//     color: '#fff',
//     border: 'none',
//     fontSize: 14,
//     cursor: 'pointer',
//     flex: 1,
//     borderRadius: 4,
//     minWidth: 150,
//   },
//   message: {
//     fontSize: 14,
//     color: '#333',
//     marginBottom: 10,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#777',
//     marginBottom: 10,
//   },
//   historyBox: {
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 6,
//     marginTop: 20,
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: 10,
//   },
//   tableHeader: {
//     backgroundColor: '#f1f1f1',
//   },
//   th: {
//     border: '1px solid #ccc',
//     padding: 8,
//     fontWeight: 'bold',
//   },
//   td: {
//     border: '1px solid #ccc',
//     padding: 8,
//     textAlign: 'center',
//   },
// };

// export default PatientVitals;



// finallyl
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const VITAL_FIELDS = {
//   temperature: '°C',
//   pulse: 'bpm',
//   bloodPressure: 'mmHg',
//   respirationRate: 'rpm',
//   oxygenSaturation: '%',
//   height: 'cm',
//   weight: 'kg',
//   bmi: '',
//   glucose: 'mg/dL',
// };

// const PatientVitals = () => {
//   const [patientId, setPatientId] = useState('');
//   const [vitals, setVitals] = useState({});
//   const [updatedAt, setUpdatedAt] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   const token = localStorage.getItem('token');

//   const handleInputChange = (key, value) => {
//     if (!/^\d*\.?\d*$/.test(value)) return;
//     setVitals((prev) => ({ ...prev, [key]: value }));
//   };

//   // const fetchVitalsHistory = async () => {
//   //   if (!patientId.trim()) return;
//   //   try {
//   //     const res = await axios.get(
//   //       `http://localhost:5000/api/clinics/patient/${patientId}/vitals/history`,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     setHistory(res.data.history || []);
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     if (!token) return toast.error('🔒 Login required');
//     if (!patientId.trim()) return toast.warn('⚠️ Patient ID is required');

//     const filledVitals = Object.fromEntries(
//       Object.entries(vitals).filter(([_, val]) => val !== '')
//     );

//     if (Object.keys(filledVitals).length === 0) {
//       return toast.warn('⚠️ Please enter at least one vital sign');
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `http://localhost:5000/api/clinics/patient/${patientId}/vitals`,
//         { vitals: filledVitals },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success(res.data.message || '✅ Vitals saved successfully');
//       setUpdatedAt(new Date().toLocaleString());
//       // fetchVitalsHistory();
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || '❌ Error saving vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSyncVitals = async () => {
//     if (!token) return toast.error('🔒 Login required');
//     if (!patientId.trim()) return toast.warn('⚠️ Patient ID is required');

//     try {
//       setLoading(true);
//       const res = await axios.put(
//         `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setVitals(res.data.vitals || {});
//       setUpdatedAt(
//         res.data.updatedAt ? new Date(res.data.updatedAt).toLocaleString() : ''
//       );
//       toast.success(res.data.message || '✅ Synced from latest consultation');
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || '❌ Error syncing vitals');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearForm = () => {
//     setVitals({});
//     setUpdatedAt('');
//     toast.info('🧹 Form cleared');
//   };

//   useEffect(() => {
//     if (patientId.trim()) {
//       // fetchVitalsHistory();
//     }
//   }, [patientId]);

//   return (
//     <div style={styles.container}>
//       <h2>🏥 Patient Vitals Form</h2>

//       <input
//         type="text"
//         placeholder="Enter Patient ID"
//         value={patientId}
//         onChange={(e) => setPatientId(e.target.value)}
//         style={styles.input}
//       />

//       <div style={styles.grid}>
//         {Object.entries(VITAL_FIELDS).map(([key, unit]) => (
//           <div key={key} style={styles.inputGroup}>
//             <label style={styles.label}>
//               {key.charAt(0).toUpperCase() + key.slice(1)} {unit && `(${unit})`}
//             </label>
//             <input
//               type="text"
//               value={vitals[key] || ''}
//               onChange={(e) => handleInputChange(key, e.target.value)}
//               style={styles.inputField}
//               placeholder={`Enter ${key}`}
//             />
//           </div>
//         ))}
//       </div>

//       <div style={styles.buttonRow}>
//         <button
//           style={{ ...styles.button, backgroundColor: '#007bff' }}
//           onClick={handleSubmit}
//           disabled={loading || !patientId}
//         >
//           {loading ? 'Saving...' : '💾 Save Vitals'}
//         </button>

//         <button
//           style={{ ...styles.button, backgroundColor: '#28a745' }}
//           onClick={handleSyncVitals}
//           disabled={loading || !patientId}
//         >
//           {loading ? 'Syncing...' : '🔄 Sync from Consultation'}
//         </button>

//         <button
//           style={{ ...styles.button, backgroundColor: '#6c757d' }}
//           onClick={clearForm}
//         >
//           🧹 Clear Form
//         </button>
//       </div>

//       {updatedAt && (
//         <p style={styles.timestamp}>🕒 Last Updated: {updatedAt}</p>
//       )}

//       {/* Vitals History Section */}
//       {history.length > 0 && (
//         <div style={styles.historyBox}>
//           <h4>📜 Vitals History</h4>
//           <table style={styles.table}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th>Date</th>
//                 {Object.keys(VITAL_FIELDS).map((field) => (
//                   <th key={field}>{field}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((entry, index) => (
//                 <tr key={index}>
//                   <td>{new Date(entry.updatedAt).toLocaleString()}</td>
//                   {Object.keys(VITAL_FIELDS).map((field) => (
//                     <td key={field}>
//                       {entry.vitals[field]
//                         ? `${entry.vitals[field]} ${VITAL_FIELDS[field]}`
//                         : '-'}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: 20,
//     maxWidth: 1000,
//     margin: 'auto',
//     fontFamily: 'Arial, sans-serif',
//   },
//   input: {
//     padding: 10,
//     width: '100%',
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
//     gap: 16,
//     marginBottom: 20,
//   },
//   inputGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   label: {
//     fontSize: 14,
//     marginBottom: 4,
//     fontWeight: 'bold',
//   },
//   inputField: {
//     padding: 8,
//     fontSize: 14,
//     border: '1px solid #ccc',
//     borderRadius: 4,
//   },
//   buttonRow: {
//     display: 'flex',
//     gap: 12,
//     marginBottom: 12,
//     flexWrap: 'wrap',
//   },
//   button: {
//     padding: 10,
//     color: '#fff',
//     border: 'none',
//     fontSize: 14,
//     cursor: 'pointer',
//     flex: 1,
//     borderRadius: 4,
//     minWidth: 150,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#777',
//     marginBottom: 10,
//   },
//   historyBox: {
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 6,
//     marginTop: 20,
//     overflowX: 'auto',
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: 10,
//   },
//   tableHeader: {
//     backgroundColor: '#f1f1f1',
//   },
// };

// export default PatientVitals;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useParams } from 'react-router-dom';

const VITAL_FIELDS = {
  temperature: '°C',
  pulse: 'bpm',
  bloodPressure: 'mmHg',
  respirationRate: 'rpm',
  oxygenSaturation: '%',
  height: 'cm',
  weight: 'kg',
  bmi: '',
  glucose: 'mg/dL',
};

const PatientVitals = () => {
  // Use react-router hooks to get patient info
  const { patientId: paramPatientId } = useParams();
  const location = useLocation();
  const statePatient = location.state?.patient; // e.g. from navigate('/path', { state: { patient } })
  
  // Determine patientId either from URL param or from passed patient state
  const patientId = paramPatientId || statePatient?._id || '';

  const [vitals, setVitals] = useState({});
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const token = localStorage.getItem('token');

  const handleInputChange = (key, value) => {
    if (!/^\d*\.?\d*$/.test(value)) return; // only numbers & dot allowed
    setVitals((prev) => ({ ...prev, [key]: value }));
  };

  // Fetch vitals history (uncomment to enable)
  const fetchVitalsHistory = async () => {
    if (!patientId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/clinics/patient/${patientId}/vitals/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory(res.data.history || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchVitalsHistory();
    }
  }, [patientId]);

  const handleSubmit = async () => {
    if (!token) return toast.error('🔒 Login required');
    if (!patientId) return toast.warn('⚠️ Patient ID not found');

    const filledVitals = Object.fromEntries(
      Object.entries(vitals).filter(([_, val]) => val !== '')
    );

    if (Object.keys(filledVitals).length === 0) {
      return toast.warn('⚠️ Please enter at least one vital sign');
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/clinics/patient/${patientId}/vitals`,
        { vitals: filledVitals },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || '✅ Vitals saved successfully');
      setUpdatedAt(new Date().toLocaleString());
      fetchVitalsHistory();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || '❌ Error saving vitals');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncVitals = async () => {
    if (!token) return toast.error('🔒 Login required');
    if (!patientId) return toast.warn('⚠️ Patient ID not found');

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVitals(res.data.vitals || {});
      setUpdatedAt(
        res.data.updatedAt ? new Date(res.data.updatedAt).toLocaleString() : ''
      );
      toast.success(res.data.message || '✅ Synced from latest consultation');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || '❌ Error syncing vitals');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setVitals({});
    setUpdatedAt('');
    toast.info('🧹 Form cleared');
  };

  return (
    <div style={styles.container}>
      <h2>🏥 Patient Vitals Form</h2>

      {/* Show Patient Info if available */}
      {statePatient ? (
        <div style={{ marginBottom: 16 }}>
          <p><strong>Patient Name:</strong> {statePatient.name}</p>
          <p><strong>Patient Email:</strong> {statePatient.email}</p>
        </div>
      ) : (
        <p style={{ marginBottom: 16, color: 'red' }}>
          Patient information not available.
        </p>
      )}

      <div style={styles.grid}>
        {Object.entries(VITAL_FIELDS).map(([key, unit]) => (
          <div key={key} style={styles.inputGroup}>
            <label style={styles.label}>
              {key.charAt(0).toUpperCase() + key.slice(1)} {unit && `(${unit})`}
            </label>
            <input
              type="text"
              value={vitals[key] || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              style={styles.inputField}
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}
      </div>

      <div style={styles.buttonRow}>
        <button
          style={{ ...styles.button, backgroundColor: '#007bff' }}
          onClick={handleSubmit}
          disabled={loading || !patientId}
        >
          {loading ? 'Saving...' : '💾 Save Vitals'}
        </button>

        <button
          style={{ ...styles.button, backgroundColor: '#28a745' }}
          onClick={handleSyncVitals}
          disabled={loading || !patientId}
        >
          {loading ? 'Syncing...' : '🔄 Sync from Consultation'}
        </button>

        <button
          style={{ ...styles.button, backgroundColor: '#6c757d' }}
          onClick={clearForm}
        >
          🧹 Clear Form
        </button>
      </div>

      {updatedAt && <p style={styles.timestamp}>🕒 Last Updated: {updatedAt}</p>}

      {/* Vitals History Section */}
      {history.length > 0 && (
        <div style={styles.historyBox}>
          <h4>📜 Vitals History</h4>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th>Date</th>
                {Object.keys(VITAL_FIELDS).map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.updatedAt).toLocaleString()}</td>
                  {Object.keys(VITAL_FIELDS).map((field) => (
                    <td key={field}>
                      {entry.vitals[field]
                        ? `${entry.vitals[field]} ${VITAL_FIELDS[field]}`
                        : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    maxWidth: 1000,
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 16,
    marginBottom: 20,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  inputField: {
    padding: 8,
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  buttonRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  button: {
    padding: 10,
    color: '#fff',
    border: 'none',
    fontSize: 14,
    cursor: 'pointer',
    flex: 1,
    borderRadius: 4,
    minWidth: 150,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  historyBox: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginTop: 20,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 10,
  },
  tableHeader: {
    backgroundColor: '#f1f1f1',
  },
};

export default PatientVitals;
