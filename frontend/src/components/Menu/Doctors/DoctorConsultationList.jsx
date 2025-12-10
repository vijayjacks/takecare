
// import { useEffect, useState,useRef  } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';





// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// // ------------------------- Consultation Reports Component -------------------------
// function ConsultationReports({ consultationId }) {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem('doctorToken');

//   useEffect(() => {
//     if (consultationId && consultationId !== 'null' && consultationId.trim() !== '') {
//       fetchReports();
//     }
//   }, [consultationId]);



//   const fetchReports = async () => {
//     if (!consultationId || consultationId === 'null' || consultationId.trim() === '') {
//       console.warn('Invalid consultationId:', consultationId);
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:5000/api/consultations/${consultationId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setReports(res.data.testResults || []);
//     } catch (error) {
//       console.error('Error fetching reports:', error?.response?.data || error.message);
//       alert('Failed to fetch reports.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!selectedFile) return alert('Please select a file to upload');

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       setLoading(true);
//       await axios.post(
//         `http://localhost:5000/api/consultations/${consultationId}/upload-report`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       alert('Report uploaded successfully!');
//       setSelectedFile(null);
//       fetchReports();
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert('Failed to upload report.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-10 p-4 border rounded shadow bg-white">
//       <h2 className="text-lg font-semibold mb-3">Consultation Reports</h2>
//       <div className="mb-4">
//         <input type="file" onChange={handleFileChange} />
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {loading ? 'Uploading...' : 'Upload Report'}
//         </button>
//       </div>
//       <div>
//         <h3 className="font-medium mb-2">Uploaded Reports</h3>
//         {loading ? (
//           <p>Loading reports...</p>
//         ) : reports.length === 0 ? (
//           <p>No reports uploaded yet.</p>
//         ) : (
//           <ul className="list-disc pl-5 space-y-2">
//             {reports.map((report, index) => (
//               <li key={index}>
//                 <a
//                   href={`http://localhost:5000${report.fileUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {report.title || `Report ${index + 1}`}
//                 </a>{' '}
//                 <span className="text-gray-500 text-sm">
//                   (Uploaded: {new Date(report.uploadedAt).toLocaleString()})
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }

// // ------------------------- Main DoctorConsultationForm -------------------------
// export default function DoctorConsultationForm() {
//   const { appointmentId, doctorId, patientId, clinicId } = useParams();
//   const [consultationId, setConsultationId] = useState(null);
//   const [formData, setFormData] = useState({
//     appointment: appointmentId || '',
//     doctor: doctorId || '',
//     patient: patientId || '',
//     clinic: clinicId || '',
//     type: '',
//     status: 'scheduled',
//     chiefComplaint: '',
//     diagnosis: { primary: '', secondary: [''], notes: '' },
//     medicalHistory: [''],
//     vitals: {
//       temperature: '',
//       pulse: '',
//       bloodPressure: '',
//       respirationRate: '',
//       oxygenSaturation: '',
//       height: '',
//       weight: '',
//       bmi: ''
//     },
//     prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     testsAdvised: [{ name: '', notes: '', lab: '' }],
//     doctorNotes: '',
//     followUp: { advised: false, afterDays: 0, note: '' },
//     isEmergency: false
//   });

//   // ---------- Handlers ----------
//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleNestedChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value }
//     }));
//   };

//   const handleArrayChange = (section, index, value) => {
//     const arr = [...formData[section]];
//     arr[index] = value;
//     setFormData(prev => ({ ...prev, [section]: arr }));
//   };

//   const addArrayItem = (section, defaultItem = '') => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: [...prev[section], defaultItem]
//     }));
//   };

//   const removeArrayItem = (section, index) => {
//     const arr = [...formData[section]];
//     arr.splice(index, 1);
//     setFormData(prev => ({ ...prev, [section]: arr }));
//   };

//   const handleVitalsChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       vitals: { ...prev.vitals, [field]: value }
//     }));
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const arr = [...formData.prescriptions];
//     arr[index][field] = value;
//     setFormData(prev => ({ ...prev, prescriptions: arr }));
//   };

//   const addPrescription = () => {
//     setFormData(prev => ({
//       ...prev,
//       prescriptions: [...prev.prescriptions, { medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }]
//     }));
//   };

//   const removePrescription = (index) => {
//     const arr = [...formData.prescriptions];
//     arr.splice(index, 1);
//     setFormData(prev => ({ ...prev, prescriptions: arr }));
//   };

//   const handleTestChange = (index, field, value) => {
//     const arr = [...formData.testsAdvised];
//     arr[index][field] = value;
//     setFormData(prev => ({ ...prev, testsAdvised: arr }));
//   };

//   const addTest = () => {
//     setFormData(prev => ({
//       ...prev,
//       testsAdvised: [...prev.testsAdvised, { name: '', notes: '', lab: '' }]
//     }));
//   };

//   const removeTest = (index) => {
//     const arr = [...formData.testsAdvised];
//     arr.splice(index, 1);
//     setFormData(prev => ({ ...prev, testsAdvised: arr }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/consultations', formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('doctorToken')}` }
//       });
//       alert('Consultation saved successfully!');
//       setConsultationId(res.data._id);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save consultation.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white space-y-6">
//         <h2 className="text-xl font-semibold mb-4">New Consultation</h2>

//         {/* Appointment Info */}
//         <div className="bg-gray-100 p-3 rounded border text-sm text-gray-700">
//           <p><strong>Appointment ID:</strong> {appointmentId}</p>
//           <p><strong>Type:</strong> {appointmentId.type}</p>
//           <p><strong>Doctor ID:</strong> {doctorId}</p>
//           <p><strong>Patient ID:</strong> {patientId}</p>
//           <p><strong>Clinic ID:</strong> {clinicId}</p>
//         </div>

//         {/* Chief Complaint */}
//         <div>
//           <label className="font-semibold">Chief Complaint</label>
//           <input
//             type="text"
//             value={formData.chiefComplaint}
//             onChange={e => handleChange('chiefComplaint', e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Diagnosis */}
//         <div>
//           <label className="font-semibold">Primary Diagnosis</label>
//           <input
//             type="text"
//             value={formData.diagnosis.primary}
//             onChange={e => handleNestedChange('diagnosis', 'primary', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Medical History */}
//         <div>
//           <label className="font-semibold">Medical History</label>
//           {formData.medicalHistory.map((item, idx) => (
//             <div key={idx} className="flex gap-2 mb-1">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={e => handleArrayChange('medicalHistory', idx, e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <button type="button" onClick={() => removeArrayItem('medicalHistory', idx)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addArrayItem('medicalHistory')} className="text-blue-600">+ Add History</button>
//         </div>

//         {/* Vitals */}
//         <div>
//           <label className="font-semibold">Vitals</label>
//           <div className="grid grid-cols-2 gap-3">
//             {Object.keys(formData.vitals).map((key) => (
//               <input
//                 key={key}
//                 placeholder={key}
//                 value={formData.vitals[key]}
//                 onChange={e => handleVitalsChange(key, e.target.value)}
//                 className="p-2 border rounded"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Prescriptions */}
//         <div>
//           <label className="font-semibold">Prescriptions</label>
//           {formData.prescriptions.map((prescription, index) => (
//             <div key={index} className="grid grid-cols-5 gap-2 mb-2">
//               {Object.keys(prescription).map((field) => (
//                 <input
//                   key={field}
//                   placeholder={field}
//                   value={prescription[field]}
//                   onChange={e => handlePrescriptionChange(index, field, e.target.value)}
//                   className="p-2 border rounded"
//                 />
//               ))}
//               <button type="button" onClick={() => removePrescription(index)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addPrescription} className="text-blue-600">+ Add Prescription</button>
//         </div>

//         {/* Tests Advised */}
//         <div>
//           <label className="font-semibold">Tests Advised</label>
//           {formData.testsAdvised.map((test, index) => (
//             <div key={index} className="grid grid-cols-4 gap-2 mb-2">
//               <input
//                 placeholder="Test Name"
//                 value={test.name}
//                 onChange={e => handleTestChange(index, 'name', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 placeholder="Notes"
//                 value={test.notes}
//                 onChange={e => handleTestChange(index, 'notes', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 placeholder="Lab"
//                 value={test.lab}
//                 onChange={e => handleTestChange(index, 'lab', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <button type="button" onClick={() => removeTest(index)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addTest} className="text-blue-600">+ Add Test</button>
//         </div>

//         {/* Doctor Notes */}
//         <div>
//           <label className="font-semibold">Doctor Notes</label>
//           <textarea
//             value={formData.doctorNotes}
//             onChange={e => handleChange('doctorNotes', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Follow Up */}
//         <div>
//           <label className="font-semibold">Follow Up</label>
//           <div className="flex gap-3 items-center">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={formData.followUp.advised}
//                 onChange={e => handleNestedChange('followUp', 'advised', e.target.checked)}
//               />
//               {' '}Advised
//             </label>
//             {formData.followUp.advised && (
//               <>
//                 <input
//                   type="number"
//                   placeholder="After Days"
//                   value={formData.followUp.afterDays}
//                   onChange={e => handleNestedChange('followUp', 'afterDays', e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <input
//                   placeholder="Note"
//                   value={formData.followUp.note}
//                   onChange={e => handleNestedChange('followUp', 'note', e.target.value)}
//                   className="p-2 border rounded"
//                 />
//               </>
//             )}
//           </div>
//         </div>

//         {/* Emergency Checkbox */}
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={formData.isEmergency}
//               onChange={e => handleChange('isEmergency', e.target.checked)}
//             />{' '}
//             Mark as Emergency
//           </label>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//           Save Consultation
//         </button>
//       </form>

//       {/* Show Reports Upload Section if consultation created */}
//       {consultationId && <ConsultationReports consultationId={consultationId} />}
//     </div>
//   );
// }

// export default function DoctorConsultationForm() {
//   const { appointmentId, doctorId, patientId, clinicId } = useParams();

//   const [consultationId, setConsultationId] = useState(null);
//   const [formData, setFormData] = useState({
//     appointment: appointmentId || '',
//     doctor: doctorId || '',
//     patient: patientId || '',
//     clinic: clinicId || '',
//     type: '', // Fetched from appointment
//     isOnline: false,
//     status: 'scheduled',
//     chiefComplaint: '',
//     diagnosis: { primary: '', secondary: [''], notes: '' },
//     medicalHistory: [''],
//     vitals: {
//       temperature: '',
//       pulse: '',
//       bloodPressure: '',
//       respirationRate: '',
//       oxygenSaturation: '',
//       height: '',
//       weight: '',
//       bmi: ''
//     },
//     prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     testsAdvised: [{ name: '', notes: '', lab: '' }],
//     doctorNotes: '',
//     followUp: { advised: false, afterDays: 0, note: '' },
//     isEmergency: false
//   });

//   // Fetch type from appointment on mount
//   useEffect(() => {
//     if (appointmentId) {
//       axios.get(`http://localhost:5000/api/consultations/${appointmentId}`, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('doctorToken')}`
//   }
// })

//         .then((res) => {
//           const appointment = res.data;
//           console.log("appt",res.data)
//           const type = appointment.type || 'offline';
//           setFormData((prev) => ({
//             ...prev,
//             type,
//             isOnline: type === 'online'
//           }));
//         })
//         .catch((err) => {
//           console.error('Failed to fetch appointment', err);
//           setFormData((prev) => ({
//             ...prev,
//             type: 'offline',
//             isOnline: false
//           }));
//         });
//     }
//   }, [appointmentId]);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleNestedChange = (section, field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value }
//     }));
//   };

//   const handleArrayChange = (section, index, value) => {
//     const arr = [...formData[section]];
//     arr[index] = value;
//     setFormData((prev) => ({ ...prev, [section]: arr }));
//   };

//   const addArrayItem = (section, defaultItem = '') => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: [...prev[section], defaultItem]
//     }));
//   };

//   const removeArrayItem = (section, index) => {
//     const arr = [...formData[section]];
//     arr.splice(index, 1);
//     setFormData((prev) => ({ ...prev, [section]: arr }));
//   };

//   const handleVitalsChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       vitals: { ...prev.vitals, [field]: value }
//     }));
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const arr = [...formData.prescriptions];
//     arr[index][field] = value;
//     setFormData((prev) => ({ ...prev, prescriptions: arr }));
//   };

//   const addPrescription = () => {
//     setFormData((prev) => ({
//       ...prev,
//       prescriptions: [...prev.prescriptions, { medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }]
//     }));
//   };

//   const removePrescription = (index) => {
//     const arr = [...formData.prescriptions];
//     arr.splice(index, 1);
//     setFormData((prev) => ({ ...prev, prescriptions: arr }));
//   };

//   const handleTestChange = (index, field, value) => {
//     const arr = [...formData.testsAdvised];
//     arr[index][field] = value;
//     setFormData((prev) => ({ ...prev, testsAdvised: arr }));
//   };

//   const addTest = () => {
//     setFormData((prev) => ({
//       ...prev,
//       testsAdvised: [...prev.testsAdvised, { name: '', notes: '', lab: '' }]
//     }));
//   };

//   const removeTest = (index) => {
//     const arr = [...formData.testsAdvised];
//     arr.splice(index, 1);
//     setFormData((prev) => ({ ...prev, testsAdvised: arr }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/consultations', formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('doctorToken')}` }
//       });
//       alert('Consultation saved successfully!');
//       setConsultationId(res.data._id);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save consultation.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white space-y-6">
//         <h2 className="text-xl font-semibold mb-4">New Consultation</h2>

//         <div className="bg-gray-100 p-3 rounded border text-sm text-gray-700">
//           <p><strong>Appointment ID:</strong> {appointmentId}</p>
//           <p><strong>Doctor ID:</strong> {doctorId}</p>
//           <p><strong>Patient ID:</strong> {patientId}</p>
//           <p><strong>Clinic ID:</strong> {clinicId}</p>
//           <p><strong>Consultation Type:</strong> {formData.type}</p>
//         </div>

//         <div>
//           <label className="font-semibold">Chief Complaint</label>
//           <input
//             type="text"
//             value={formData.chiefComplaint}
//             onChange={(e) => handleChange('chiefComplaint', e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Primary Diagnosis</label>
//           <input
//             type="text"
//             value={formData.diagnosis.primary} 
//             onChange={(e) => handleNestedChange('diagnosis', 'primary', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Medical History</label>
//           {formData.medicalHistory.map((item, idx) => (
//             <div key={idx} className="flex gap-2 mb-1">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) => handleArrayChange('medicalHistory', idx, e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <button type="button" onClick={() => removeArrayItem('medicalHistory', idx)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addArrayItem('medicalHistory')} className="text-blue-600">+ Add History</button>
//         </div>

//         <div>
//           <label className="font-semibold">Vitals</label>
//           <div className="grid grid-cols-2 gap-3">
//             {Object.keys(formData.vitals).map((key) => (
//               <input
//                 key={key}
//                 placeholder={key}
//                 value={formData.vitals[key]}
//                 onChange={(e) => handleVitalsChange(key, e.target.value)}
//                 className="p-2 border rounded"
//               />
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="font-semibold">Prescriptions</label>
//           {formData.prescriptions.map((prescription, index) => (
//             <div key={index} className="grid grid-cols-5 gap-2 mb-2">
//               {Object.keys(prescription).map((field) => (
//                 <input
//                   key={field}
//                   placeholder={field}
//                   value={prescription[field]}
//                   onChange={(e) => handlePrescriptionChange(index, field, e.target.value)}
//                   className="p-2 border rounded"
//                 />
//               ))}
//               <button type="button" onClick={() => removePrescription(index)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addPrescription} className="text-blue-600">+ Add Prescription</button>
//         </div>

//         <div>
//           <label className="font-semibold">Tests Advised</label>
//           {formData.testsAdvised.map((test, index) => (
//             <div key={index} className="grid grid-cols-4 gap-2 mb-2">
//               <input
//                 placeholder="Test Name"
//                 value={test.name}
//                 onChange={(e) => handleTestChange(index, 'name', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 placeholder="Notes"
//                 value={test.notes}
//                 onChange={(e) => handleTestChange(index, 'notes', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 placeholder="Lab"
//                 value={test.lab}
//                 onChange={(e) => handleTestChange(index, 'lab', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <button type="button" onClick={() => removeTest(index)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addTest} className="text-blue-600">+ Add Test</button>
//         </div>

//         <div>
//           <label className="font-semibold">Doctor Notes</label>
//           <textarea
//             value={formData.doctorNotes}
//             onChange={(e) => handleChange('doctorNotes', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Follow Up</label>
//           <div className="flex gap-3 items-center">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={formData.followUp.advised}
//                 onChange={(e) => handleNestedChange('followUp', 'advised', e.target.checked)}
//               />
//               {' '}Advised
//             </label>
//             {formData.followUp.advised && (
//               <>
//                 <input
//                   type="number"
//                   placeholder="After Days"
//                   value={formData.followUp.afterDays}
//                   onChange={(e) => handleNestedChange('followUp', 'afterDays', e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <input
//                   placeholder="Note"
//                   value={formData.followUp.note}
//                   onChange={(e) => handleNestedChange('followUp', 'note', e.target.value)}
//                   className="p-2 border rounded"
//                 />
//               </>
//             )}
//           </div>
//         </div>

//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={formData.isEmergency}
//               onChange={(e) => handleChange('isEmergency', e.target.checked)}
//             />{' '}
//             Mark as Emergency
//           </label>
//         </div>

//         <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//           Save Consultation
//         </button>
//       </form>

//       {consultationId && (
//         // <div className="mt-6 p-4 border rounded bg-gray-50">
//           // <h3 className="font-semibold mb-2">Upload Consultation Reports</h3>
//           {/* <ConsultationReports consultationId={consultationId} /> */}
//         // </div>
//       )}
//     </div>
//   );
// }


// JAC

// // // ------------------------- Main DoctorConsultationForm -------------------------
// export default function DoctorConsultationForm() {
//   const { appointmentId, doctorId, patientId, clinicId } = useParams();
//   const formRef = useRef();

//   const [consultationId, setConsultationId] = useState(null);
//   const [formData, setFormData] = useState({
//     appointment: appointmentId || '',
//     doctor: doctorId || '',
//     patient: patientId || '',
//     clinic: clinicId || '',
//     type: '',
//     isOnline: false,
//     status: 'scheduled',
//     chiefComplaint: '',
//     diagnosis: { primary: '', secondary: [''], notes: '' },
//     medicalHistory: [''],
//     vitals: {
//       temperature: '',
//       pulse: '',
//       bloodPressure: '',
//       respirationRate: '',
//       oxygenSaturation: '',
//       height: '',
//       weight: '',
//       bmi: ''
//     },
//     prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     testsAdvised: [{ name: '', notes: '', lab: '' }],
//     doctorNotes: '',
//     followUp: { advised: false, afterDays: 0, note: '' },
//     isEmergency: false
//   });

//   useEffect(() => {
//     if (appointmentId) {
//       axios.get(`http://localhost:5000/api/consultations/${appointmentId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('doctorToken')}`
//         }
//       })
//       .then((res) => {
//         const type = res.data?.type || 'offline';
//         setFormData((prev) => ({
//           ...prev,
//           type,
//           isOnline: type === 'online'
//         }));
//       })
//       .catch(() => {
//         setFormData((prev) => ({
//           ...prev,
//           type: 'offline',
//           isOnline: false
//         }));
//       });
//     }
//   }, [appointmentId]);

//   const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
//   const handleNestedChange = (section, field, value) => setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
//   const handleArrayChange = (section, index, value) => {
//     const updated = [...formData[section]];
//     updated[index] = value;
//     setFormData(prev => ({ ...prev, [section]: updated }));
//   };
//   const addArrayItem = (section, defaultItem = '') => setFormData(prev => ({ ...prev, [section]: [...prev[section], defaultItem] }));
//   const removeArrayItem = (section, index) => {
//     const updated = [...formData[section]];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, [section]: updated }));
//   };

//   const handleVitalsChange = (field, value) => {
//     setFormData(prev => ({ ...prev, vitals: { ...prev.vitals, [field]: value } }));
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const updated = [...formData.prescriptions];
//     updated[index][field] = value;
//     setFormData(prev => ({ ...prev, prescriptions: updated }));
//   };

//   const addPrescription = () => {
//     setFormData(prev => ({
//       ...prev,
//       prescriptions: [...prev.prescriptions, { medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }]
//     }));
//   };

//   const removePrescription = (index) => {
//     const updated = [...formData.prescriptions];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, prescriptions: updated }));
//   };

//   const handleTestChange = (index, field, value) => {
//     const updated = [...formData.testsAdvised];
//     updated[index][field] = value;
//     setFormData(prev => ({ ...prev, testsAdvised: updated }));
//   };

//   const addTest = () => {
//     setFormData(prev => ({
//       ...prev,
//       testsAdvised: [...prev.testsAdvised, { name: '', notes: '', lab: '' }]
//     }));
//   };

//   const removeTest = (index) => {
//     const updated = [...formData.testsAdvised];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, testsAdvised: updated }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/consultations', formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('doctorToken')}`
//         }
//       });

//       setConsultationId(res.data._id);
//       alert('Consultation saved successfully!');

//       // Generate PDF
//       const doc = new jsPDF({ unit: 'pt', format: 'a4' });
//       await doc.html(formRef.current, {
//         callback: (doc) => {
//           doc.save(`consultation-${res.data._id}.pdf`);
//         },
//         x: 10,
//         y: 10,
//         html2canvas: { scale: 0.6 }
//       });

//     } catch (err) {
//       console.error(err);
//       alert('Failed to save consultation.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md bg-white space-y-6" ref={formRef}>
//         <h2 className="text-xl font-semibold mb-4">New Consultation</h2>

//         <div className="bg-gray-100 p-3 rounded border text-sm text-gray-700">
//           <p><strong>Appointment ID:</strong> {appointmentId}</p>
//           <p><strong>Doctor ID:</strong> {doctorId}</p>
//           <p><strong>Patient ID:</strong> {patientId}</p>
//           <p><strong>Clinic ID:</strong> {clinicId}</p>
//           <p><strong>Consultation Type:</strong> {formData.type}</p>
//         </div>

//         <div>
//           <label className="font-semibold">Chief Complaint</label>
//           <input
//             type="text"
//             value={formData.chiefComplaint}
//             onChange={(e) => handleChange('chiefComplaint', e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Primary Diagnosis</label>
//           <input
//             type="text"
//             value={formData.diagnosis.primary}
//             onChange={(e) => handleNestedChange('diagnosis', 'primary', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Medical History</label>
//           {formData.medicalHistory.map((item, idx) => (
//             <div key={idx} className="flex gap-2 mb-1">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) => handleArrayChange('medicalHistory', idx, e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <button type="button" onClick={() => removeArrayItem('medicalHistory', idx)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addArrayItem('medicalHistory')} className="text-blue-600">+ Add History</button>
//         </div>

//         <div>
//           <label className="font-semibold">Vitals</label>
//           <div className="grid grid-cols-2 gap-3">
//             {Object.keys(formData.vitals).map((key) => (
//               <input
//                 key={key}
//                 placeholder={key}
//                 value={formData.vitals[key]}
//                 onChange={(e) => handleVitalsChange(key, e.target.value)}
//                 className="p-2 border rounded"
//               />
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="font-semibold">Prescriptions</label>
//           {formData.prescriptions.map((prescription, index) => (
//             <div key={index} className="grid grid-cols-6 gap-2 mb-2">
//               {Object.keys(prescription).map((field) => (
//                 <input
//                   key={field}
//                   placeholder={field}
//                   value={prescription[field]}
//                   onChange={(e) => handlePrescriptionChange(index, field, e.target.value)}
//                   className="p-2 border rounded"
//                 />
//               ))}
//               <button type="button" onClick={() => removePrescription(index)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addPrescription} className="text-blue-600">+ Add Prescription</button>
//         </div>

//         <div>
//           <label className="font-semibold">Tests Advised</label>
//           {formData.testsAdvised.map((test, index) => (
//             <div key={index} className="grid grid-cols-4 gap-2 mb-2">
//               <input
//                 placeholder="Test Name"
//                 value={test.name}
//                 onChange={(e) => handleTestChange(index, 'name', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 placeholder="Notes"
//                 value={test.notes}
//                 onChange={(e) => handleTestChange(index, 'notes', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 placeholder="Lab"
//                 value={test.lab}
//                 onChange={(e) => handleTestChange(index, 'lab', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <button type="button" onClick={() => removeTest(index)} className="text-red-600">Remove</button>
//             </div>
//           ))}
//           <button type="button" onClick={addTest} className="text-blue-600">+ Add Test</button>
//         </div>

//         <div>
//           <label className="font-semibold">Doctor Notes</label>
//           <textarea
//             value={formData.doctorNotes}
//             onChange={(e) => handleChange('doctorNotes', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Follow Up</label>
//           <div className="flex gap-3 items-center">
//             <label>
//               <input
//                 type="checkbox"
//                 checked={formData.followUp.advised}
//                 onChange={(e) => handleNestedChange('followUp', 'advised', e.target.checked)}
//               />
//               {' '}Advised
//             </label>
//             {formData.followUp.advised && (
//               <>
//                 <input
//                   type="number"
//                   placeholder="After Days"
//                   value={formData.followUp.afterDays}
//                   onChange={(e) => handleNestedChange('followUp', 'afterDays', e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <input
//                   placeholder="Note"
//                   value={formData.followUp.note}
//                   onChange={(e) => handleNestedChange('followUp', 'note', e.target.value)}
//                   className="p-2 border rounded"
//                 />
//               </>
//             )}
//           </div>
//         </div>

//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={formData.isEmergency}
//               onChange={(e) => handleChange('isEmergency', e.target.checked)}
//             />
//             {' '}Mark as Emergency
//           </label>
//         </div>

//         <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//           Save Consultation
//         </button>
//       </form>
//     </div>
//   );
// }


// vijlatest
// export default function DoctorConsultationForm() {
//   const [vitals, setVitals] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); 
//   const token = localStorage.getItem('doctorToken');

//   const { appointmentId, doctorId, patientId, clinicId } = useParams();
//   const formRef = useRef();

//   const [consultationId, setConsultationId] = useState(null);
//   const [formData, setFormData] = useState({
//     appointment: appointmentId || '',
//     doctor: doctorId || '',
//     patient: patientId || '',
//     clinic: clinicId || '',
//     type: '',
//     isOnline: false,
//     status: 'scheduled',
//     chiefComplaint: '',
//     diagnosis: { primary: '', secondary: [''], notes: '' },
//     medicalHistory: [''],
//     vitals: {
//       temperature: '',
//       pulse: '',
//       bloodPressure: '',
//       respirationRate: '',
//       oxygenSaturation: '',
//       height: '',
//       weight: '',
//       bmi: '',
//     },
//     prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     testsAdvised: [{ name: '', notes: '', lab: '' }],
//     doctorNotes: '',
//     followUp: { advised: false, afterDays: 0, note: '' },
//     isEmergency: false,
//   });

//   // Fetch appointment type to set online/offline
//   useEffect(() => {
//     if (appointmentId) {
//       axios
//         .get(`http://localhost:5000/api/consultations/${appointmentId}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('doctorToken')}` },
//         })
//         .then((res) => {
//           const type = res.data?.type || 'offline';
//           setFormData((prev) => ({
//             ...prev,
//             type,
//             isOnline: type === 'online',
//           }));
//         })
//         .catch(() => {
//           setFormData((prev) => ({
//             ...prev,
//             type: 'offline',
//             isOnline: false,
//           }));
//         });
//     }
//   }, [appointmentId]);


//   useEffect(async () => {
//     try {
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
//   }, []);

//   // Handlers for form data changes
//   const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

//   const handleNestedChange = (section, field, value) =>
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));

//   const handleArrayChange = (section, index, value) => {
//     const updated = [...formData[section]];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, [section]: updated }));
//   };

//   const addArrayItem = (section, defaultItem = '') =>
//     setFormData((prev) => ({ ...prev, [section]: [...prev[section], defaultItem] }));

//   const removeArrayItem = (section, index) => {
//     const updated = [...formData[section]];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, [section]: updated }));
//   };

//   const handleVitalsChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, vitals: { ...prev.vitals, [field]: value } }));
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const updated = [...formData.prescriptions];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, prescriptions: updated }));
//   };

//   const addPrescription = () => {
//     setFormData((prev) => ({
//       ...prev,
//       prescriptions: [...prev.prescriptions, { medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     }));
//   };

//   const removePrescription = (index) => {
//     const updated = [...formData.prescriptions];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, prescriptions: updated }));
//   };

//   const handleTestChange = (index, field, value) => {
//     const updated = [...formData.testsAdvised];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, testsAdvised: updated }));
//   };

//   const addTest = () => {
//     setFormData((prev) => ({
//       ...prev,
//       testsAdvised: [...prev.testsAdvised, { name: '', notes: '', lab: '' }],
//     }));
//   };

//   const removeTest = (index) => {
//     const updated = [...formData.testsAdvised];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, testsAdvised: updated }));
//   };

//   // Submit form and save consultation, then generate PDF
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/consultations', formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('doctorToken')}`,
//         },
//       });

//       setConsultationId(res.data._id);
//       alert('Consultation saved successfully!');

//       // Generate PDF from form content
//       const doc = new jsPDF({ unit: 'pt', format: 'a4' });

//       // Use html2canvas for better rendering
//       const canvas = await html2canvas(formRef.current, { scale: 2 });
//       const imgData = canvas.toDataURL('image/png');

//       const imgProps = doc.getImageProperties(imgData);
//       const pdfWidth = doc.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       doc.save(`consultation-${res.data._id}.pdf`);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save consultation.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6 my-8">
//       <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md bg-white space-y-6" ref={formRef}>
//         <h2 className="text-2xl font-semibold mb-6">New Consultation</h2>

//         <div className="bg-gray-100 p-3 rounded border text-sm text-gray-700 space-y-1">
//           <p>
//             <strong>Appointment ID:</strong> {appointmentId || 'N/A'}
//           </p>
//           <p>
//             <strong>Doctor ID:</strong> {doctorId || 'N/A'}
//           </p>
//           <p>
//             <strong>Patient ID:</strong> {patientId || 'N/A'}
//           </p>
//           <p>
//             <strong>Clinic ID:</strong> {clinicId || 'N/A'}
//           </p>
//           <p>
//             <strong>Consultation Type:</strong> {formData.type || 'N/A'}
//           </p>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Chief Complaint</label>
//           <input
//             type="text"
//             value={formData.chiefComplaint}
//             onChange={(e) => handleChange('chiefComplaint', e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Primary Diagnosis</label>
//           <input
//             type="text"
//             value={formData.diagnosis.primary}
//             onChange={(e) => handleNestedChange('diagnosis', 'primary', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Medical History</label>
//           {formData.medicalHistory.map((item, idx) => (
//             <div key={idx} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) => handleArrayChange('medicalHistory', idx, e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem('medicalHistory', idx)}
//                 className="text-red-600 hover:underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addArrayItem('medicalHistory')} className="text-blue-600 hover:underline">
//             + Add History
//           </button>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Vitals</label>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {/* {Object.keys(formData.vitals).map((key) => ( */}
//             <input

//               value={vitals.temperature}
//               onChange={(e) => handleVitalsChange(key, e.target.value)}
//               className="p-2 border rounded"
//             />
//             <input

//               value={vitals.pulse}
//               onChange={(e) => handleVitalsChange( e.target.value)}
//               className="p-2 border rounded"
//             />


//             <input

//               value={vitals.bloodPressure}
//               onChange={(e) => handleVitalsChange( e.target.value)}
//               className="p-2 border rounded"
//             />
//             <input
//               value={vitals.respirationRate}
//               onChange={(e) => handleVitalsChange( e.target.value)}
//               className="p-2 border rounded"
//             />
//             <input

//               value={vitals.oxygenSaturation}
//               onChange={(e) => handleVitalsChange(e.target.value)}
//               className="p-2 border rounded"
//             />


//             <input

//               value={vitals.height}
//               onChange={(e) => handleVitalsChange( e.target.value)}
//               className="p-2 border rounded"
//             />
//             <input
//               value={vitals.weight}
//               onChange={(e) => handleVitalsChange(e.target.value)}
//               className="p-2 border rounded"
//             />
//             <input
//               value={vitals.bmi}
//               onChange={(e) => handleVitalsChange(e.target.value)}
//               className="p-2 border rounded"
//             />











//             {/* )
//             )} */}
//           </div>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Prescriptions</label>
//           {formData.prescriptions.map((prescription, index) => (
//             <div key={index} className="grid grid-cols-6 gap-2 mb-3 items-center">
//               {Object.keys(prescription).map((field) => (
//                 <input
//                   key={field}
//                   type="text"
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={prescription[field]}
//                   onChange={(e) => handlePrescriptionChange(index, field, e.target.value)}
//                   className="p-2 border rounded col-span-1"
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={() => removePrescription(index)}
//                 className="text-red-600 hover:underline col-span-1"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addPrescription} className="text-blue-600 hover:underline">
//             + Add Prescription
//           </button>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Tests Advised</label>
//           {formData.testsAdvised.map((test, idx) => (
//             <div key={idx} className="grid grid-cols-4 gap-2 mb-3 items-center">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={test.name}
//                 onChange={(e) => handleTestChange(idx, 'name', e.target.value)}
//                 className="p-2 border rounded col-span-1"
//               />
//               <input
//                 type="text"
//                 placeholder="Notes"
//                 value={test.notes}
//                 onChange={(e) => handleTestChange(idx, 'notes', e.target.value)}
//                 className="p-2 border rounded col-span-1"
//               />
//               <input
//                 type="text"
//                 placeholder="Lab"
//                 value={test.lab}
//                 onChange={(e) => handleTestChange(idx, 'lab', e.target.value)}
//                 className="p-2 border rounded col-span-1"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeTest(idx)}
//                 className="text-red-600 hover:underline col-span-1"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addTest} className="text-blue-600 hover:underline">
//             + Add Test
//           </button>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Doctor Notes</label>
//           <textarea
//             value={formData.doctorNotes}
//             onChange={(e) => handleChange('doctorNotes', e.target.value)}
//             rows={4}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         <div>
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.followUp.advised}
//               onChange={(e) => handleNestedChange('followUp', 'advised', e.target.checked)}
//             />
//             Advise Follow-up
//           </label>
//           {formData.followUp.advised && (
//             <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
//               <input
//                 type="number"
//                 min={1}
//                 placeholder="After Days"
//                 value={formData.followUp.afterDays}
//                 onChange={(e) => handleNestedChange('followUp', 'afterDays', e.target.value)}
//                 className="p-2 border rounded"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Note"
//                 value={formData.followUp.note}
//                 onChange={(e) => handleNestedChange('followUp', 'note', e.target.value)}
//                 className="p-2 border rounded"
//               />
//             </div>
//           )}
//         </div>

//         <div>
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.isEmergency}
//               onChange={(e) => handleChange('isEmergency', e.target.checked)}
//             />
//             Mark as Emergency
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//         >
//           Save Consultation & Download PDF
//         </button>
//       </form>
//     </div>
//   );
// }


// final

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export default function DoctorConsultationForm() {
//   const [vitals, setVitals] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem('doctorToken');

//   const { appointmentId, doctorId, patientId, clinicId } = useParams();
//   const formRef = useRef();

//   const [consultationId, setConsultationId] = useState(null);
//   const [formData, setFormData] = useState({
//     appointment: appointmentId || '',
//     doctor: doctorId || '',
//     patient: patientId || '',
//     clinic: clinicId || '',
//     type: '',
//     isOnline: false,
//     status: 'scheduled',
//     chiefComplaint: '',
//     diagnosis: { primary: '', secondary: [''], notes: '' },
//     medicalHistory: [''],
//     vitals: {
//       temperature: '',
//       pulse: '',
//       bloodPressure: '',
//       respirationRate: '',
//       oxygenSaturation: '',
//       height: '',
//       weight: '',
//       bmi: '',
//     },
//     prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     testsAdvised: [{ name: '', notes: '', lab: '' }],
//     doctorNotes: '',
//     followUp: { advised: false, afterDays: 0, note: '' },
//     isEmergency: false,
//   });

//   // Fetch appointment type to set online/offline
//   useEffect(() => {
//     if (appointmentId) {
//       axios
//         .get(`http://localhost:5000/api/consultations/${appointmentId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => {
//           const type = res.data?.type || 'offline';
//           setFormData((prev) => ({
//             ...prev,
//             type,
//             isOnline: type === 'online',
//           }));
//         })
//         .catch(() => {
//           setFormData((prev) => ({
//             ...prev,
//             type: 'offline',
//             isOnline: false,
//           }));
//         });
//     }
//   }, [appointmentId, token]);

//   // Fetch vitals and set to state
//   useEffect(() => {
//     const fetchVitals = async () => {
//       try {
//         const res = await axios.put(
//           `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setVitals(res.data.vitals);
//         setFormData((prev) => ({
//           ...prev,
//           vitals: { ...prev.vitals, ...res.data.vitals },
//         }));
//         setMessage(res.data.message);
//       } catch (err) {
//         console.error("Error syncing vitals:", err);
//         setMessage(err.response?.data?.message || 'Error syncing vitals');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVitals();
//   }, [patientId, token]);

//   // Handlers
//   const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

//   const handleNestedChange = (section, field, value) =>
//     setFormData((prev) => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value,
//       },
//     }));

//   const handleArrayChange = (section, index, value) => {
//     const updated = [...formData[section]];
//     updated[index] = value;
//     setFormData((prev) => ({ ...prev, [section]: updated }));
//   };

//   const addArrayItem = (section, defaultItem = '') =>
//     setFormData((prev) => ({ ...prev, [section]: [...prev[section], defaultItem] }));

//   const removeArrayItem = (section, index) => {
//     const updated = [...formData[section]];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, [section]: updated }));
//   };

//   const handleVitalsChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       vitals: { ...prev.vitals, [field]: value },
//     }));
//   };

//   const handlePrescriptionChange = (index, field, value) => {
//     const updated = [...formData.prescriptions];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, prescriptions: updated }));
//   };

//   const addPrescription = () => {
//     setFormData((prev) => ({
//       ...prev,
//       prescriptions: [...prev.prescriptions, { medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     }));
//   };

//   const removePrescription = (index) => {
//     const updated = [...formData.prescriptions];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, prescriptions: updated }));
//   };

//   const handleTestChange = (index, field, value) => {
//     const updated = [...formData.testsAdvised];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, testsAdvised: updated }));
//   };

//   const addTest = () => {
//     setFormData((prev) => ({
//       ...prev,
//       testsAdvised: [...prev.testsAdvised, { name: '', notes: '', lab: '' }],
//     }));
//   };

//   const removeTest = (index) => {
//     const updated = [...formData.testsAdvised];
//     updated.splice(index, 1);
//     setFormData((prev) => ({ ...prev, testsAdvised: updated }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/consultations', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setConsultationId(res.data._id);
//       alert('Consultation saved successfully!');

//       const doc = new jsPDF({ unit: 'pt', format: 'a4' });

//       const canvas = await html2canvas(formRef.current, { scale: 2 });
//       const imgData = canvas.toDataURL('image/png');
//       const imgProps = doc.getImageProperties(imgData);
//       const pdfWidth = doc.internal.pageSize.getWidth();
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       doc.save(`consultation-${res.data._id}.pdf`);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save consultation.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6 my-8">
//       <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md bg-white space-y-6" ref={formRef}>
//         <h2 className="text-2xl font-semibold mb-6">New Consultation</h2>

//         <div className="bg-gray-100 p-3 rounded border text-sm text-gray-700 space-y-1">
//           <p><strong>Appointment ID:</strong> {appointmentId || 'N/A'}</p>
//           <p><strong>Doctor ID:</strong> {doctorId || 'N/A'}</p>
//           <p><strong>Patient ID:</strong> {patientId || 'N/A'}</p>
//           <p><strong>Clinic ID:</strong> {clinicId || 'N/A'}</p>
//           <p><strong>Consultation Type:</strong> {formData.type || 'N/A'}</p>
//         </div>

//         {/* Chief Complaint */}
//         <div>
//           <label className="font-semibold block mb-1">Chief Complaint</label>
//           <input
//             type="text"
//             value={formData.chiefComplaint}
//             onChange={(e) => handleChange('chiefComplaint', e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Diagnosis */}
//         <div>
//           <label className="font-semibold block mb-1">Primary Diagnosis</label>
//           <input
//             type="text"
//             value={formData.diagnosis.primary}
//             onChange={(e) => handleNestedChange('diagnosis', 'primary', e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Medical History */}
//         <div>
//           <label className="font-semibold block mb-1">Medical History</label>
//           {formData.medicalHistory.map((item, idx) => (
//             <div key={idx} className="flex gap-2 mb-2">
//               <input
//                 type="text"
//                 value={item}
//                 onChange={(e) => handleArrayChange('medicalHistory', idx, e.target.value)}
//                 className="flex-1 p-2 border rounded"
//               />
//               <button type="button" onClick={() => removeArrayItem('medicalHistory', idx)} className="text-red-600 hover:underline">
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={() => addArrayItem('medicalHistory')} className="text-blue-600 hover:underline">
//             + Add History
//           </button>
//         </div>

//         {/* Vitals */}
//         <div>
//           <label className="font-semibold block mb-1">Vitals</label>
//           {loading ? (
//             <p className="italic text-gray-500">Loading vitals...</p>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {Object.entries(formData.vitals).map(([key, value]) => (
//                 <input
//                   key={key}
//                   placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                   value={value}
//                   onChange={(e) => handleVitalsChange(key, e.target.value)}
//                   className="p-2 border rounded"
//                 />
//               ))}
//             </div>
//           )}
//         </div>






//         {/* Prescriptions */}
//         <div>
//           <label className="font-semibold block mb-1">Prescriptions</label>
//           {formData.prescriptions.map((prescription, index) => (
//             <div key={index} className="grid grid-cols-6 gap-2 mb-3 items-center">
//               {Object.keys(prescription).map((field) => (
//                 <input
//                   key={field}
//                   type="text"
//                   placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                   value={prescription[field]}
//                   onChange={(e) => handlePrescriptionChange(index, field, e.target.value)}
//                   className="p-2 border rounded col-span-1"
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={() => removePrescription(index)}
//                 className="text-red-600 hover:underline col-span-1"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addPrescription} className="text-blue-600 hover:underline">
//             + Add Prescription
//           </button>
//         </div>

//         {/* Tests Advised */}
//         <div>
//           <label className="font-semibold block mb-1">Tests Advised</label>
//           {formData.testsAdvised.map((test, idx) => (
//             <div key={idx} className="grid grid-cols-4 gap-2 mb-3 items-center">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={test.name}
//                 onChange={(e) => handleTestChange(idx, 'name', e.target.value)}
//                 className="p-2 border rounded col-span-1"
//               />
//               <input
//                 type="text"
//                 placeholder="Notes"
//                 value={test.notes}
//                 onChange={(e) => handleTestChange(idx, 'notes', e.target.value)}
//                 className="p-2 border rounded col-span-1"
//               />
//               <input
//                 type="text"
//                 placeholder="Lab"
//                 value={test.lab}
//                 onChange={(e) => handleTestChange(idx, 'lab', e.target.value)}
//                 className="p-2 border rounded col-span-1"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeTest(idx)}
//                 className="text-red-600 hover:underline col-span-1"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addTest} className="text-blue-600 hover:underline">
//             + Add Test
//           </button>
//         </div>

//         {/* Doctor Notes */}
//         <div>
//           <label className="font-semibold block mb-1">Doctor Notes</label>
//           <textarea
//             value={formData.doctorNotes}
//             onChange={(e) => handleChange('doctorNotes', e.target.value)}
//             rows={4}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Follow-Up Advice */}
//         <div>
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.followUp.advised}
//               onChange={(e) => handleNestedChange('followUp', 'advised', e.target.checked)}
//             />
//             Advise Follow-up
//           </label>
//           {formData.followUp.advised && (
//             <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
//               <input
//                 type="number"
//                 min={1}
//                 placeholder="After Days"
//                 value={formData.followUp.afterDays}
//                 onChange={(e) => handleNestedChange('followUp', 'afterDays', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Note"
//                 value={formData.followUp.note}
//                 onChange={(e) => handleNestedChange('followUp', 'note', e.target.value)}
//                 className="p-2 border rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* Emergency Toggle */}
//         <div>
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.isEmergency}
//               onChange={(e) => handleChange('isEmergency', e.target.checked)}
//             />
//             Mark as Emergency
//           </label>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//         >
//           Save Consultation & Download PDF
//         </button>










//       </form>
//     </div>
//   );
// }





import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DoctorConsultationForm() {
  const [vitals, setVitals] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('doctorToken');

  const { appointmentId, doctorId, patientId, clinicId } = useParams();
  const formRef = useRef();

  const [consultationId, setConsultationId] = useState(null);
  const [availableTests, setAvailableTests] = useState([]);

  const [formData, setFormData] = useState({
    appointment: appointmentId || '',
    doctor: doctorId || '',
    patient: patientId || '',
    clinic: clinicId || '',
    type: '',
    isOnline: false,
    status: 'scheduled',
    chiefComplaint: '',
    diagnosis: { primary: '', secondary: [''], notes: '' },
    medicalHistory: [''],
    vitals: {
      temperature: '',
      pulse: '',
      bloodPressure: '',
      respirationRate: '',
      oxygenSaturation: '',
      height: '',
      weight: '',
      bmi: '',
    },
    prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    testsAdvised: [{ name: '', notes: '', lab: '' }],
    doctorNotes: '',
    followUp: { advised: false, afterDays: 0, note: '' },
    isEmergency: false,
  });

  // Fetch appointment type to set online/offline
  useEffect(() => {
    if (appointmentId) {
      axios
        .get(`http://localhost:5000/api/consultations/${appointmentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const type = res.data?.type || 'offline';
          setFormData((prev) => ({
            ...prev,
            type,
            isOnline: type === 'online',
          }));
        })
        .catch(() => {
          setFormData((prev) => ({
            ...prev,
            type: 'offline',
            isOnline: false,
          }));
        });
    }
  }, [appointmentId, token]);

  // Fetch vitals and set to state
  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const res = await axios.put(
          `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVitals(res.data.vitals);
        setFormData((prev) => ({
          ...prev,
          vitals: { ...prev.vitals, ...res.data.vitals },
        }));
        setMessage(res.data.message);
      } catch (err) {
        console.error("Error syncing vitals:", err);
        setMessage(err.response?.data?.message || 'Error syncing vitals');
      } finally {
        setLoading(false);
      }
    };

    fetchVitals();
  }, [patientId, token]);

  // Fetch available tests for select dropdown
  useEffect(() => {
    axios.get('http://localhost:5000/api/tests/available', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setAvailableTests(res.data.tests))
    .catch(err => console.error("Failed to fetch tests", err));
  }, [token]);

  // Handlers
  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleNestedChange = (section, field, value) =>
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

  const handleArrayChange = (section, index, value) => {
    const updated = [...formData[section]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const addArrayItem = (section, defaultItem = '') =>
    setFormData((prev) => ({ ...prev, [section]: [...prev[section], defaultItem] }));

  const removeArrayItem = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [section]: updated }));
  };

  const handleVitalsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      vitals: { ...prev.vitals, [field]: value },
    }));
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updated = [...formData.prescriptions];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, prescriptions: updated }));
  };

  const addPrescription = () => {
    setFormData((prev) => ({
      ...prev,
      prescriptions: [...prev.prescriptions, { medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    }));
  };

  const removePrescription = (index) => {
    const updated = [...formData.prescriptions];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, prescriptions: updated }));
  };

  // Updated test handler: when test name changes, also set the lab if found in availableTests
  const handleTestChange = (index, field, value) => {
    const updated = [...formData.testsAdvised];
    updated[index][field] = value;

    if (field === 'name') {
      const selectedTest = availableTests.find(t => t.testName === value);
      updated[index].lab = selectedTest ? selectedTest.labName : '';
    }

    setFormData((prev) => ({ ...prev, testsAdvised: updated }));
  };

  const addTest = () => {
    setFormData((prev) => ({
      ...prev,
      testsAdvised: [...prev.testsAdvised, { name: '', notes: '', lab: '' }],
    }));
  };

  const removeTest = (index) => {
    const updated = [...formData.testsAdvised];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, testsAdvised: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/consultations', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setConsultationId(res.data._id);
      alert('Consultation saved successfully!');

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });

      const canvas = await html2canvas(formRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save(`consultation-${res.data._id}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Failed to save consultation.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-8">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md bg-white space-y-6" ref={formRef}>
        <h2 className="text-2xl font-semibold mb-6">New Consultation</h2>

        <div className="bg-gray-100 p-3 rounded border text-sm text-gray-700 space-y-1">
          <p><strong>Appointment ID:</strong> {appointmentId || 'N/A'}</p>
          <p><strong>Doctor ID:</strong> {doctorId || 'N/A'}</p>
          <p><strong>Patient ID:</strong> {patientId || 'N/A'}</p>
          <p><strong>Clinic ID:</strong> {clinicId || 'N/A'}</p>
          <p><strong>Consultation Type:</strong> {formData.type || 'N/A'}</p>
        </div>

        {/* Chief Complaint */}
        <div>
          <label className="font-semibold block mb-1">Chief Complaint</label>
          <input
            type="text"
            value={formData.chiefComplaint}
            onChange={(e) => handleChange('chiefComplaint', e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Diagnosis */}
        <div>
          <label className="font-semibold block mb-1">Primary Diagnosis</label>
          <input
            type="text"
            value={formData.diagnosis.primary}
            onChange={(e) => handleNestedChange('diagnosis', 'primary', e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Medical History */}
        <div>
          <label className="font-semibold block mb-1">Medical History</label>
          {formData.medicalHistory.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('medicalHistory', idx, e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button type="button" onClick={() => removeArrayItem('medicalHistory', idx)} className="text-red-600 hover:underline">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('medicalHistory')} className="text-blue-600 hover:underline">
            + Add History
          </button>
        </div>

        {/* Vitals */}
        <div>
          <label className="font-semibold block mb-1">Vitals</label>
          {loading ? (
            <p className="italic text-gray-500">Loading vitals...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(formData.vitals).map(([key, value]) => (
                <input
                  key={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                  onChange={(e) => handleVitalsChange(key, e.target.value)}
                  className="p-2 border rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Prescriptions */}
        <div>
          <label className="font-semibold block mb-1">Prescriptions</label>
          {formData.prescriptions.map((prescription, index) => (
            <div key={index} className="grid grid-cols-6 gap-2 mb-3 items-center">
              {Object.keys(prescription).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={prescription[field]}
                  onChange={(e) => handlePrescriptionChange(index, field, e.target.value)}
                  className="p-2 border rounded col-span-1"
                />
              ))}
              <button
                type="button"
                onClick={() => removePrescription(index)}
                className="text-red-600 hover:underline col-span-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addPrescription} className="text-blue-600 hover:underline">
            + Add Prescription
          </button>
        </div>

        {/* Tests Advised */}
        <div>
          <label className="font-semibold block mb-1">Tests Advised</label>
          {formData.testsAdvised.map((test, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-2 mb-3 items-center">
              <select
                value={test.name}
                onChange={(e) => handleTestChange(idx, 'name', e.target.value)}
                className="p-2 border rounded col-span-1"
              >
                <option value="">Select Test</option>
                {availableTests.map((testOption) => (
                  <option key={`${testOption.labId}-${testOption.testName}`} value={testOption.testName}>
                    {testOption.testName} ({testOption.labName})
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Notes"
                value={test.notes}
                onChange={(e) => handleTestChange(idx, 'notes', e.target.value)}
                className="p-2 border rounded col-span-1"
              />
              <input
                type="text"
                placeholder="Lab"
                value={test.lab}
                readOnly
                className="p-2 border rounded col-span-1 bg-gray-100 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => removeTest(idx)}
                className="text-red-600 hover:underline col-span-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addTest} className="text-blue-600 hover:underline">
            + Add Test
          </button>
        </div>

        {/* Doctor Notes */}
        <div>
          <label className="font-semibold block mb-1">Doctor Notes</label>
          <textarea
            value={formData.doctorNotes}
            onChange={(e) => handleChange('doctorNotes', e.target.value)}
            rows={4}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Follow-Up Advice */}
        <div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.followUp.advised}
              onChange={(e) => handleNestedChange('followUp', 'advised', e.target.checked)}
            />
            Advise Follow-up
          </label>
          {formData.followUp.advised && (
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="number"
                min={1}
                placeholder="After Days"
                value={formData.followUp.afterDays}
                onChange={(e) => handleNestedChange('followUp', 'afterDays', e.target.value)}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Note"
                value={formData.followUp.note}
                onChange={(e) => handleNestedChange('followUp', 'note', e.target.value)}
                className="p-2 border rounded"
              />
            </div>
          )}
        </div>

        {/* Emergency Toggle */}
        <div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isEmergency}
              onChange={(e) => handleChange('isEmergency', e.target.checked)}
            />
            Mark as Emergency
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Save Consultation & Download PDF
        </button>
      </form>
    </div>
  );
}


























































// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export default function DoctorConsultationForm() {
//   const { appointmentId, doctorId, patientId, clinicId } = useParams();
//   const token = localStorage.getItem('doctorToken');

//   const [availableTests, setAvailableTests] = useState([]);
//   const [vitals, setVitals] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [consultationId, setConsultationId] = useState(null);
//   const formRef = useRef();

//   const [formData, setFormData] = useState({
//     appointment: appointmentId || '',
//     doctor: doctorId || '',
//     patient: patientId || '',
//     clinic: clinicId || '',
//     type: '',
//     isOnline: false,
//     status: 'scheduled',
//     chiefComplaint: '',
//     diagnosis: { primary: '', secondary: [''], notes: '' },
//     medicalHistory: [''],
//     vitals: {
//       temperature: '',
//       pulse: '',
//       bloodPressure: '',
//       respirationRate: '',
//       oxygenSaturation: '',
//       height: '',
//       weight: '',
//       bmi: '',
//     },
//     prescriptions: [{ medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }],
//     testsAdvised: [{ name: '', notes: '', lab: '' }],
//     doctorNotes: '',
//     followUp: { advised: false, afterDays: 0, note: '' },
//     isEmergency: false,
//   });

//   // Fetch available lab tests
//   useEffect(() => {
//     if (!clinicId) return;
//    axios.get(`http://localhost:5000/api/labs/available`, {
//   headers: { Authorization: `Bearer ${token}` },
//     }).then(res => {
//       setAvailableTests(res.data.tests || []);
//     }).catch(err => {
//       console.error('Failed to fetch lab tests:', err);
//     });
//   }, [clinicId, token]);

//   // Fetch consultation type
//   useEffect(() => {
//     if (appointmentId) {
//       axios.get(`http://localhost:5000/api/consultations/${appointmentId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       }).then(res => {
//         const type = res.data?.type || 'offline';
//         setFormData(prev => ({
//           ...prev,
//           type,
//           isOnline: type === 'online',
//         }));
//       });
//     }
//   }, [appointmentId, token]);

//   // Sync vitals from wearable devices
//   useEffect(() => {
//     const fetchVitals = async () => {
//       try {
//         const res = await axios.put(
//           `http://localhost:5000/api/clinics/patient/${patientId}/sync-vitals`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setVitals(res.data.vitals);
//         setFormData(prev => ({
//           ...prev,
//           vitals: { ...prev.vitals, ...res.data.vitals },
//         }));
//       } catch (err) {
//         console.error("Error syncing vitals:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVitals();
//   }, [patientId, token]);

//   // Handlers
//   const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
//   const handleNestedChange = (section, field, value) =>
//     setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
//   const handleArrayChange = (section, index, value) => {
//     const updated = [...formData[section]];
//     updated[index] = value;
//     setFormData(prev => ({ ...prev, [section]: updated }));
//   };
//   const handleVitalsChange = (field, value) => {
//     setFormData(prev => ({ ...prev, vitals: { ...prev.vitals, [field]: value } }));
//   };
//   const handlePrescriptionChange = (index, field, value) => {
//     const updated = [...formData.prescriptions];
//     updated[index][field] = value;
//     setFormData(prev => ({ ...prev, prescriptions: updated }));
//   };
//   const handleTestChange = (index, field, value) => {
//     const updated = [...formData.testsAdvised];
//     updated[index][field] = value;
//     setFormData(prev => ({ ...prev, testsAdvised: updated }));
//   };

//   const addTest = () => {
//     setFormData(prev => ({
//       ...prev,
//       testsAdvised: [...prev.testsAdvised, { name: '', notes: '', lab: '' }]
//     }));
//   };

//   const removeTest = (index) => {
//     const updated = [...formData.testsAdvised];
//     updated.splice(index, 1);
//     setFormData(prev => ({ ...prev, testsAdvised: updated }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/consultations', formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setConsultationId(res.data._id);
//       alert('Consultation saved successfully!');

//       const doc = new jsPDF({ unit: 'pt', format: 'a4' });
//       const canvas = await html2canvas(formRef.current, { scale: 2 });
//       const imgData = canvas.toDataURL('image/png');
//       const pdfWidth = doc.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//       doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       doc.save(`consultation-${res.data._id}.pdf`);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to save consultation.');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-8 p-6 bg-white border rounded shadow">
//       <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
//         <h2 className="text-2xl font-bold">New Consultation</h2>

//         <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
//           <p><strong>Appointment:</strong> {appointmentId}</p>
//           <p><strong>Doctor:</strong> {doctorId}</p>
//           <p><strong>Patient:</strong> {patientId}</p>
//           <p><strong>Clinic:</strong> {clinicId}</p>
//           <p><strong>Type:</strong> {formData.type}</p>
//         </div>

//         {/* Chief Complaint */}
//         <div>
//           <label className="font-semibold block">Chief Complaint</label>
//           <input
//             type="text"
//             value={formData.chiefComplaint}
//             onChange={(e) => handleChange('chiefComplaint', e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         {/* Vitals */}
//         <div>
//           <label className="font-semibold block mb-2">Vitals</label>
//           {loading ? (
//             <p>Loading vitals...</p>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//               {Object.entries(formData.vitals).map(([key, val]) => (
//                 <input
//                   key={key}
//                   type="text"
//                   placeholder={key}
//                   value={val}
//                   onChange={(e) => handleVitalsChange(key, e.target.value)}
//                   className="border p-2 rounded"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Tests Advised */}
//         <div>
//           <label className="font-semibold block mb-2">Tests Advised</label>
//           {formData.testsAdvised.map((test, idx) => (
//             <div key={idx} className="grid grid-cols-5 gap-2 items-center mb-2">
//               <select
//                 value={test.name}
//                 onChange={(e) => {
//                   const selected = availableTests.find(t => t.testName === e.target.value);
//                   const updated = [...formData.testsAdvised];
//                   updated[idx] = {
//                     ...updated[idx],
//                     name: selected?.testName || '',
//                     lab: selected?.labName || '',
//                   };
//                   setFormData(prev => ({ ...prev, testsAdvised: updated }));
//                 }}
//                 className="col-span-2 border p-2 rounded"
//               >
//                 <option value="">Select Test</option>
//                 {availableTests.map((t, i) => (
//                   <option key={i} value={t.testName}>
//                     {t.testName} - {t.labName}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 placeholder="Notes"
//                 value={test.notes}
//                 onChange={(e) => handleTestChange(idx, 'notes', e.target.value)}
//                 className="col-span-1 border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Lab"
//                 value={test.lab}
//                 readOnly
//                 className="col-span-1 bg-gray-100 border p-2 rounded"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeTest(idx)}
//                 className="text-red-600 underline"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={addTest} className="text-blue-600 underline">
//             + Add Test
//           </button>
//         </div>

//         {/* Doctor Notes */}
//         <div>
//           <label className="font-semibold block mb-1">Doctor Notes</label>
//           <textarea
//             value={formData.doctorNotes}
//             onChange={(e) => handleChange('doctorNotes', e.target.value)}
//             rows={4}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Follow-Up Advice */}
//         <div>
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.followUp.advised}
//               onChange={(e) => handleNestedChange('followUp', 'advised', e.target.checked)}
//             />
//             Follow-up Required
//           </label>
//           {formData.followUp.advised && (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
//               <input
//                 type="number"
//                 placeholder="After Days"
//                 value={formData.followUp.afterDays}
//                 onChange={(e) => handleNestedChange('followUp', 'afterDays', e.target.value)}
//                 className="p-2 border rounded"
//               />
//               <input
//                 type="text"
//                 placeholder="Note"
//                 value={formData.followUp.note}
//                 onChange={(e) => handleNestedChange('followUp', 'note', e.target.value)}
//                 className="p-2 border rounded"
//               />
//             </div>
//           )}
//         </div>

//         {/* Emergency */}
//         <div>
//           <label className="inline-flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={formData.isEmergency}
//               onChange={(e) => handleChange('isEmergency', e.target.checked)}
//             />
//             Emergency
//           </label>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//         >
//           Save & Download PDF
//         </button>
//       </form>
//     </div>
//   );
// }












// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export default function DoctorConsultationForm() {
//   const { appointmentId, doctorId, patientId, clinicId } = useParams();
//   const token = localStorage.getItem('doctorToken');
//   const formRef = useRef(null);

//   const [availableTests, setAvailableTests] = useState([]);
//   const [formData, setFormData] = useState({
//     appointment: appointmentId || '',
//     doctor: doctorId || '',
//     patient: patientId || '',
//     clinic: clinicId || '',
//     type: '',
//     isOnline: false,
//     status: 'scheduled',
//     chiefComplaint: '',
//     diagnosis: { primary: '', secondary: [''], notes: '' },
//     medicalHistory: [''],
//     vitals: {
//       temperature: '',
//       pulse: '',
//       bloodPressure: '',
//       respirationRate: '',
//       oxygenSaturation: '',
//       height: '',
//       weight: '',
//       bmi: '',
//     },
//     prescriptions: [
//       { medicine: '', dosage: '', frequency: '', duration: '', instructions: '' }
//     ],
//     testsAdvised: [ { name: '', notes: '', lab: '', cost: 0, department: '', description: '' } ],
//     doctorNotes: '',
//     followUp: { advised: false, afterDays: 0, note: '' },
//     isEmergency: false,
//   });

//   const [loadingTests, setLoadingTests] = useState(true);

//   // Fetch available tests when clinicId ready
//   useEffect(() => {
//     const fetchTests = async () => {
//       if (!clinicId) return;
//       try {
//         setLoadingTests(true);
//         const res = await axios.get(
//           `http://localhost:5000/api/tests/available?clinicId=${clinicId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );
//         setAvailableTests(res.data.tests || []);
//       } catch (err) {
//         console.error("Failed to fetch available lab tests:", err);
//       } finally {
//         setLoadingTests(false);
//       }
//     };
//     fetchTests();
//   }, [clinicId, token]);

//   const handleTestChange = (index, field, value) => {
//     const updated = [...formData.testsAdvised];
//     if (field === 'name') {
//       // When test name selected, auto fill lab, cost etc
//       const selected = availableTests.find(t => t.testName === value);
//       if (selected) {
//         updated[index] = {
//           ...updated[index],
//           name: selected.testName,
//           lab: selected.labName,
//           cost: selected.cost,
//           department: selected.department,
//           description: selected.description || '',
//           notes: updated[index].notes || ''
//         };
//       } else {
//         // If clearing or custom, reset fields
//         updated[index] = {
//           ...updated[index],
//           name: value,
//           lab: '',
//           cost: 0,
//           department: '',
//           description: '',
//         };
//       }
//     } else {
//       // notes etc
//       updated[index][field] = value;
//     }
//     setFormData(prev => ({
//       ...prev,
//       testsAdvised: updated
//     }));
//   };

//   const addTest = () => {
//     setFormData(prev => ({
//       ...prev,
//       testsAdvised: [
//         ...prev.testsAdvised,
//         { name: '', notes: '', lab: '', cost: 0, department: '', description: '' }
//       ]
//     }));
//   };

//   const removeTest = (index) => {
//     const updated = [...formData.testsAdvised];
//     updated.splice(index, 1);
//     setFormData(prev => ({
//       ...prev,
//       testsAdvised: updated
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // your other submit logic...

//       const res = await axios.post(
//         'http://localhost:5000/api/consultations',
//         formData,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//       // after saving, maybe generate PDF etc
//       // ...
//     } catch (err) {
//       console.error("Failed to save consultation:", err);
//       // show error
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-8 space-y-6">
//       <form onSubmit={handleSubmit} ref={formRef} className="p-6 bg-white rounded shadow-md space-y-6">
//         <h2 className="text-2xl font-semibold">New Consultation</h2>

//         {/* Other fields ... */}

//         <div>
//           <label className="font-semibold block mb-2">Tests Advised</label>
//           {loadingTests ? (
//             <p className="text-gray-500">Loading tests...</p>
//           ) : (
//             formData.testsAdvised.map((test, idx) => (
//               <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4 p-2 border rounded">
                
//                 {/* Test name dropdown */}
//                 <div className="col-span-2">
//                   <label className="block mb-1">Test Name</label>
//                   <select
//                     value={test.name}
//                     onChange={(e) => handleTestChange(idx, 'name', e.target.value)}
//                     className="w-full p-2 border rounded"
//                   >
//                     <option value="">-- Select a test --</option>
//                     {availableTests.map((t, i) => (
//                       <option key={i} value={t.testName}>
//                         {t.testName} — {t.labName} — ₹{t.cost}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Notes */}
//                 <div className="col-span-2">
//                   <label className="block mb-1">Notes (optional)</label>
//                   <input
//                     type="text"
//                     value={test.notes}
//                     onChange={(e) => handleTestChange(idx, 'notes', e.target.value)}
//                     className="w-full p-2 border rounded"
//                     placeholder="Any notes or instructions"
//                   />
//                 </div>

//                 {/* Lab name auto filled */}
//                 <div className="col-span-1">
//                   <label className="block mb-1">Lab</label>
//                   <input
//                     type="text"
//                     value={test.lab}
//                     readOnly
//                     className="w-full p-2 border rounded bg-gray-100"
//                     placeholder="Lab"
//                   />
//                 </div>

//                 {/* Cost (read-only) */}
//                 <div className="col-span-1">
//                   <label className="block mb-1">Cost</label>
//                   <input
//                     type="text"
//                     value={test.cost ? `₹${test.cost}` : ''}
//                     readOnly
//                     className="w-full p-2 border rounded bg-gray-100"
//                     placeholder="Cost"
//                   />
//                 </div>

//                 {/* Remove button */}
//                 <div className="col-span-6 flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeTest(idx)}
//                     className="px-2 py-1 text-red-600 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}

//           <button
//             type="button"
//             onClick={addTest}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             + Add Another Test
//           </button>
//         </div>

//         {/* Submit Button etc */}
//         <div>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             Save Consultation & Download PDF
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// }


