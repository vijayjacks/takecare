const Consultation = require('../models/Consultation');
const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');

// const generateConsultationPdf = require('../utils/generateConsultationPdf.js');
const path = require('path');
const Appointment = require('../models/Appointment');

const cloudinary = require('../utils/cloudinary');

// const result = await cloudinary.uploader.upload(filePath, {
//   folder: 'consultation-reports',
//   resource_type: 'auto' // Auto-detect file type (image, pdf, etc.)
// });
// console.log(result.secure_url); // The Cloudinary URL


// //doctor create consultation
// exports.createConsultation = async (req, res) => {
//   try {
//     const consultation = await Consultation.create(req.body);
//     console.log('consultation',req.body);

//     res.status(201).json(consultation);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };






// exports.createConsultation = async (req, res) => {
//   try {
//     const { appointment: appointmentId } = req.body;

//     let type = 'online';         // default
//     let isOnline = true;         // default

//     // ✅ If appointment is provided, fetch its type and isOnline
//     if (appointmentId) {
//       const appointment = await Appointment.findById(appointmentId);

//       if (!appointment) {
//         return res.status(404).json({ message: "Appointment not found" });
//       }

//       // Inherit from appointment
//       type = appointment.type || 'online';
//       isOnline = appointment.isOnline !== undefined ? appointment.isOnline : (type === 'online');
//     }

//     const consultationData = {
//       ...req.body,
//       type,
//       isOnline
//     };

//     const consultation = await Consultation.create(consultationData);
//     console.log('✅ Consultation created:', consultation);

//     res.status(201).json(consultation);
//   } catch (err) {
//     console.error("❌ Consultation creation failed:", err);
//     res.status(400).json({ error: err.message });
//   }
// };




exports.createConsultation = async (req, res) => {
  try {
    const { appointment, doctor, patient, clinic } = req.body;

    // Required fields
    if (!appointment || !doctor || !patient || !clinic) {
      return res.status(400).json({
        message: "appointment, doctor, patient, and clinic are required."
      });
    }

    // Fetch appointment to inherit type
    const appt = await Appointment.findById(appointment);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    const type = appt.type || "offline";
    const isOnline = appt.isOnline ?? (type === "online");

    const consultation = await Consultation.create({
      ...req.body,
      type,
      isOnline
    });

    console.log("cons",consultation)

    res.status(201).json(consultation);
  } catch (err) {
    console.error("Consultation Create Error:", err);
    res.status(400).json({
      message: "Failed to create consultation",
      error: err.message
    });
  }
};















// exports.createConsultation = async (req, res) => {
//   try {
//     const {
//       appointment,
//       doctor,
//       patient,
//       clinic,
//       status,
//       chiefComplaint,
//       diagnosis,
//       medicalHistory,
//       vitals,
//       prescriptions,
//       testsAdvised,
//       doctorNotes,
//       followUp,
//       isEmergency
//     } = req.body;

//     // ------------------------------
//     // REQUIRED FIELDS VALIDATION
//     // ------------------------------
//     if (!appointment || !doctor || !patient || !clinic) {
//       return res.status(400).json({
//         message: "appointment, doctor, patient, and clinic are required.",
//       });
//     }

//     // ------------------------------
//     // AUTOMATIC TYPE + isOnline
//     // ------------------------------
//     let type = "offline";
//     let isOnline = false;

//     const appointmentData = await Appointment.findById(appointment);
//     if (!appointmentData) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     type = appointmentData.type || "offline";
//     isOnline = appointmentData.isOnline ?? appointmentData.type === "online";

//     // ------------------------------
//     // BUILD CONSULTATION DATA
//     // ------------------------------
//     const consultationData = {
//       appointment,
//       doctor,
//       patient,
//       clinic,
//       type,
//       isOnline,
//       status,
//       chiefComplaint,
//       diagnosis,
//       medicalHistory,
//       vitals,
//       prescriptions,
//       testsAdvised,
//       doctorNotes,
//       followUp,
//       isEmergency,
//     };

//     // ------------------------------
//     // SAVE
//     // ------------------------------
//     const consultation = await Consultation.create(consultationData);

//     res.status(201).json(consultation);
//   } catch (err) {
//     console.error("❌ Consultation creation failed:", err);
//     res.status(400).json({
//       message: "Failed to create consultation",
//       error: err.message,
//     });
//   }
// };




// exports.createConsultation = async (req, res) => {
//   try {
//     const { appointment: appointmentId, labBooking: labBookingId } = req.body;

//     let type = 'online'; // default
//     let isOnline = true; // default

//     // Fetch appointment if appointmentId provided to get type and isOnline
//     if (appointmentId) {
//       const appointment = await Appointment.findById(appointmentId);
//       if (!appointment) {
//         return res.status(404).json({ message: "Appointment not found" });
//       }

//       type = appointment.type || 'online';
//       isOnline = appointment.isOnline !== undefined ? appointment.isOnline : (type === 'online');
//     }

//     // Build consultation data from request body + inherited appointment info
//     const consultationData = {
//       ...req.body,
//       type,
//       isOnline,
//     };

//     // Optional: validate labBookingId if needed

//     const consultation = await Consultation.create(consultationData);

//     console.log('✅ Consultation created:', consultation);
//     res.status(201).json(consultation);
//   } catch (err) {
//     console.error("❌ Consultation creation failed:", err);
//     res.status(400).json({ error: err.message });
//   }
// };






















exports.getConsultationAppointmentDetails = async (req, res) => {
  const { appointmentId } = req.params;
  console.log('apt', appointmentId);

  const appointment = await Appointment.findById(appointmentId)
    .select('type doctorId patientId clinicId date time status') // Return only needed fields
    .populate('doctorId', 'name specialization') // Optional
    .populate('patientId', 'name age gender') // Optional
    .populate('clinicId', 'name address'); // Optional
  console.log('apt', appointment);

  if (!appointment) {

    res.status(404);
    throw new Error('Appointment not found');
  }

  res.status(200).json(appointment);
};









exports.validatePayment = async (req, res) => {
  const { consultationDate, patientId } = req.body;

  try {
    const consultation = await Consultation.findOne({ patient: patientId, consultationDate });
    if (!consultation) return res.json({ valid: false, message: "Consultation not found" });

    const now = new Date();
  if (!consultation.payment || consultation.payment.paymentStatus !== "paid" || now > consultation.payment.expiresAt) {
  return res.json({ valid: false, message: "Consultation fee expired. Please pay again." });
}

    return res.json({ valid: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createCheckout = async (req, res) => {
  const { clinicId, doctorId, patientId, amount, consultationDate } = req.body;

  try {
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Consultation Fee" },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URI}/ConsultationSuccess?session_id={CHECKOUT_SESSION_ID}&consultationId=${consultation._id}&clinicId=${clinicId}&doctorId=${doctorId}`,

      cancel_url: `${process.env.FRONTEND_URI}/consultation-cancel`,
    });

    // Update or create consultation with payment info
    const consultation = await Consultation.findOneAndUpdate(
      { patient: patientId, doctor: doctorId, consultationDate },
      { payment: { sessionId: session.id, paymentStatus: "unpaid", expiresAt: new Date(Date.now() + 3600 * 1000) } }, // 1 hour expiry
      { new: true, upsert: true }
    );

    return res.json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



exports.confirmConsultationPayment = async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const consultation = await Consultation.findOneAndUpdate(
        { "payment.sessionId": session_id },
        { "payment.paymentStatus": "paid", "payment.expiresAt": new Date(Date.now() + 24*3600*1000) }, // e.g., valid 24h
        { new: true }
      );
      return res.json({ message: "Payment confirmed", consultation });
    }

    return res.status(400).json({ message: "Payment not completed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};













// -------------------------
// GET CONSULTATION DETAILS
// -------------------------
exports.getConsultationById = async (req, res) => {
  try {
    const consultationId = req.params.consultationId;

    const consultation = await Consultation.findById(consultationId)
      .populate('doctor', 'name')
      .populate('clinic', 'name')
      .populate('patient', 'name email');

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    res.json(consultation);
  } catch (error) {
    console.error("Error fetching consultation:", error);
    res.status(500).json({ message: 'Server error' });
  }
};







// -------------------------
// DOWNLOAD CONSULTATION PDF
// -------------------------
exports.downloadConsultationPdf = async (req, res) => {
  try {
    const consultationId = req.params.consultationId;

    const consultation = await Consultation.findById(consultationId)
      .populate('doctor', 'name')
      .populate('clinic', 'name')
      .populate('patient', 'name email');

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=consultation-${consultationId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Consultation Report", { underline: true });
    doc.moveDown();

    doc.fontSize(12).text(`Doctor: ${consultation.doctor?.name || "-"}`);
    doc.text(`Clinic: ${consultation.clinic?.name || "-"}`);
    doc.text(`Patient: ${consultation.patient?.name || "-"}`);
    doc.text(`Date: ${new Date(consultation.consultationDate).toLocaleString()}`);
    doc.text(`Type: ${consultation.type}`);
    doc.text(`Status: ${consultation.status}`);
    doc.text(`Emergency: ${consultation.isEmergency ? "Yes" : "No"}`);
    doc.moveDown();

    doc.fontSize(14).text("Chief Complaint:", { underline: true });
    doc.fontSize(12).text(consultation.chiefComplaint || "-");
    doc.moveDown();

    doc.fontSize(14).text("Doctor Notes:", { underline: true });
    doc.fontSize(12).text(consultation.doctorNotes || "-");
    doc.moveDown();

    if (consultation.prescriptions?.length > 0) {
      doc.fontSize(14).text("Prescriptions:", { underline: true });
      consultation.prescriptions.forEach((p) => {
        doc.fontSize(12).text(
          `${p.medicine} — ${p.dosage}, ${p.frequency}, ${p.duration}`
        );
      });
      doc.moveDown();
    }

    doc.end();

  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};





// exports.bookAppointment = async (req, res) => {
//   const { clinicId, doctorId, patientId, date, slot, time, subTokenNumber, reason, timezone, isOnline } = req.body;

//   try {
//     // Check payment again
//     const consultation = await Consultation.findOne({ patient: patientId, doctor: doctorId, consultationDate: date });
//     if (!consultation || consultation.payment.paymentStatus !== "paid") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     // Create Appointment
//     const appointment = new Appointment({
//       clinic: clinicId,
//       doctor: doctorId,
//       patient: patientId,
//       date,
//       slot,
//       time,
//       subTokenNumber,
//       reason,
//       timezone,
//       isOnline,
//     });
//     await appointment.save();

//     return res.json({ message: "Appointment booked successfully", appointment });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };




















// exports.validateConsultationPayment = async (req, res) => {
//     try {
//         const { clinicId, patientId, doctorId, consultationDate } = req.body;

//         if (!clinicId || !patientId || !doctorId || !consultationDate) {
//             return res.status(400).json({ valid: false, message: "Missing required fields" });
//         }

//         const consultationDateObj = new Date(consultationDate);

//         // Find latest paid consultation
//         const latestPayment = await ConsultationPayment.findOne({
//             clinicId,
//             patientId,
//             doctorId,
//             paymentStatus: "paid",
//         }).sort({ createdAt: -1 }).lean();

//         if (!latestPayment) {
//             return res.status(400).json({
//                 valid: false,
//                 message: "Consultation fee not found. Please pay first."
//             });
//         }

//         const validUntil = new Date(latestPayment.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

//         if (consultationDateObj > validUntil) {
//             return res.status(400).json({
//                 valid: false,
//                 message: "Consultation fee expired. Please pay again."
//             });
//         }

//         return res.status(200).json({
//             valid: true,
//             message: "Consultation fee is valid",
//             payment: latestPayment
//         });

//     } catch (error) {
//         console.error("Error validating consultation fee:", error);
//         return res.status(500).json({ valid: false, message: "Internal server error", error });
//     }
// };

// exports.bookAppointment = async (req, res) => {
//     try {
//         const { clinicId, doctorId, patientId, date, slot, time, subTokenNumber, reason, timezone, isOnline } = req.body;

//         if (!clinicId || !doctorId || !patientId || !date || !slot || !time || !subTokenNumber) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // Prevent double booking
//         const existing = await Appointment.findOne({
//             doctorId,
//             date,
//             slot,
//             subTokenNumber
//         });

//         if (existing) {
//             return res.status(400).json({ message: "This slot is already booked. Please select another." });
//         }

//         const appointment = new Appointment({
//             clinicId,
//             doctorId,
//             patientId,
//             date,
//             slot,
//             time,
//             subTokenNumber,
//             reason,
//             timezone,
//             isOnline
//         });

//         await appointment.save();

//         return res.status(200).json({ message: "Appointment booked successfully", appointment });

//     } catch (error) {
//         console.error("Error booking appointment:", error);
//         return res.status(500).json({ message: "Internal server error", error });
//     }
// };
















//patient doctor clinic appointment get consultation

// exports.getConsultationById = async (req, res) => {
//   try {
//        const consultation = await Consultation.findById(req.params.id)
//       .populate('patient')
//       .populate('doctor', 'name')  // ✅ specify second argument as fields to include
//       .populate('clinic', 'name')  // ✅ same here
//       .populate('appointment');

//     if (!consultation) {
//       return res.status(404).json({ message: 'Consultation not found' });
//     }

//     res.json(consultation);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };






// Only return consultation if it belongs to logged-in patient
// exports.getConsultationByIdForPatient = async (req, res) => {
//   try {
//     const consultationId = req.params.id;
//     const patientId = req.user.id;

//     const consultation = await Consultation.findOne({ _id: consultationId, patient: patientId })
//       .populate('patient', 'name age gender')
//       .populate('doctor', 'name specialization')
//       .populate('clinic', 'name location')
//       .populate('appointment');

//     if (!consultation) {
//       return res.status(404).json({ message: 'Consultation not found or access denied' });
//     }

//     res.json(consultation);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };




// exports.downloadConsultationPdfForPatient = async (req, res) => {
//   try {
//     const consultationId = req.params.id;
//     const patientId = req.user.id;

//     // Fetch consultation only if belongs to logged-in patient
//     const consultation = await Consultation.findOne({ _id: consultationId, patient: patientId })
//       .populate('doctor', 'name specialization')
//       .populate('clinic', 'name location');

//     if (!consultation) {
//       return res.status(404).json({ message: 'Consultation not found or access denied' });
//     }

//     // HTML content for the PDF
//     const html = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="utf-8" />
//         <style>
//           body { font-family: Arial, sans-serif; padding: 40px; }
//           h1, h2, h3 { color: #2c3e50; }
//           .section { margin-top: 30px; }
//           .label { font-weight: bold; }
//           .value { margin-bottom: 8px; }
//           ul { margin: 0; padding-left: 20px; }
//         </style>
//       </head>
//       <body>
//         <h1>Consultation Report</h1>

//         <div class="section">
//           <h2>General Info</h2>
//           <p><span class="label">Doctor:</span> ${consultation.doctor?.name || 'N/A'} (${consultation.doctor?.specialization || ''})</p>
//           <p><span class="label">Clinic:</span> ${consultation.clinic?.name || 'N/A'} - ${consultation.clinic?.location || ''}</p>
//           <p><span class="label">Date:</span> ${new Date(consultation.consultationDate).toLocaleString()}</p>
//           <p><span class="label">Type:</span> ${consultation.type}</p>
//           <p><span class="label">Status:</span> ${consultation.status}</p>
//         </div>

//         <div class="section">
//           <h2>Complaint & Diagnosis</h2>
//           <p><span class="label">Chief Complaint:</span> ${consultation.chiefComplaint || '-'}</p>
//           <p><span class="label">Primary Diagnosis:</span> ${consultation.diagnosis?.primary || '-'}</p>
//           <p><span class="label">Secondary Diagnosis:</span> ${(consultation.diagnosis?.secondary || []).join(', ') || '-'}</p>
//           <p><span class="label">Diagnosis Notes:</span> ${consultation.diagnosis?.notes || '-'}</p>
//         </div>

//         <div class="section">
//           <h2>Vitals</h2>
//           ${Object.entries(consultation.vitals || {}).map(([key, value]) => `
//             <p><span class="label">${key}:</span> ${value}</p>
//           `).join('')}
//         </div>

//         <div class="section">
//           <h2>Medical History</h2>
//           <ul>
//             ${(consultation.medicalHistory || []).map(item => `<li>${item}</li>`).join('') || '<li>-</li>'}
//           </ul>
//         </div>

//         <div class="section">
//           <h2>Prescriptions</h2>
//           <ul>
//             ${(consultation.prescriptions || []).map(p => `
//               <li>
//                 <strong>${p.medicine}</strong> - ${p.dosage}, ${p.frequency}, ${p.duration}<br/>
//                 <em>${p.instructions || ''}</em>
//               </li>
//             `).join('') || '<li>-</li>'}
//           </ul>
//         </div>

//         <div class="section">
//           <h2>Tests Advised</h2>
//           <ul>
//             ${(consultation.testsAdvised || []).map(t => `
//               <li>
//                 <strong>${t.name}</strong> - ${t.notes || ''} (Lab: ${t.lab || 'N/A'})
//               </li>
//             `).join('') || '<li>-</li>'}
//           </ul>
//         </div>

//         <div class="section">
//           <h2>Doctor Notes & Follow Up</h2>
//           <p><span class="label">Doctor Notes:</span> ${consultation.doctorNotes || '-'}</p>
//           <p><span class="label">Is Emergency:</span> ${consultation.isEmergency ? 'Yes' : 'No'}</p>
//           <p><span class="label">Follow-Up:</span> ${consultation.followUp?.advised ? `Yes, after ${consultation.followUp.afterDays} day(s)` : 'No'}</p>
//           <p><span class="label">Follow-Up Note:</span> ${consultation.followUp?.note || '-'}</p>
//         </div>

//       </body>
//       </html>
//     `;

//     // Generate PDF with Puppeteer
//     const browser = await puppeteer.launch({ headless: 'new' });
//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: 'networkidle0' });

//     const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
//     await browser.close();

//     // Send response as download
//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename=consultation-${consultationId}.pdf`,
//     });

//     res.send(pdfBuffer);

//   } catch (err) {
//     console.error('Error generating PDF:', err);
//     res.status(500).json({ error: 'Failed to generate consultation PDF' });
//   }
// };

// VIJ

// exports.downloadConsultationPdfForPatient = async (req, res) => {
//   try {
//     const consultationId = req.params.id;
//     const patientId = req.user.id;

//     const consultation = await Consultation.findOne({ _id: consultationId, patient: patientId })
//       .populate('doctor', 'name specialization')
//       .populate('clinic', 'name location');

//     if (!consultation) {
//       return res.status(404).json({ message: 'Consultation not found or access denied' });
//     }

//     // 🔁 Use external helper to generate & send the PDF
//     return generateConsultationPdf(consultation, res);

//   } catch (err) {
//     console.error('Error in download handler:', err.message);
//     return res.status(500).json({ error: 'Failed to generate consultation PDF' });
//   }
// };


// exports.downloadConsultationPdfForPatient = async (req, res) => {
//   try {
//     const consultationId = req.params.id;
//     const patientId = req.user.id;

//     const consultation = await Consultation.findOne({
//       _id: consultationId,
//       patient: patientId
//     })
//       .populate('doctor', 'name specialization')
//       .populate('clinic', 'name location')
//       .populate('patient', 'name'); // Optional: to show patient name in PDF

//     if (!consultation) {
//       return res.status(404).json({ message: 'Consultation not found or access denied' });
//     }

//     // Generate and send PDF
//     return generateConsultationPdf(consultation, res);

//   } catch (err) {
//     console.error('Error generating consultation PDF:', err.message);
//     return res.status(500).json({ error: 'Failed to generate consultation PDF' });
//   }
// };










const generateConsultationPdf = (consultation, res) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const filename = `consultation-${consultation._id}.pdf`;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  doc.pipe(res);

  // Title & metadata
  doc.fontSize(20).text('Consultation Details', { align: 'center' }).moveDown();
  doc.fontSize(12)
    .text(`Doctor: ${consultation.doctor?.name || '-'}`)
    .text(`Clinic: ${consultation.clinic?.name || '-'}`)
    .text(`Date: ${new Date(consultation.consultationDate).toLocaleString()}`)
    .text(`Type: ${consultation.type || '-'}`)
    .text(`Status: ${consultation.status || '-'}`)
    .text(`Emergency: ${consultation.isEmergency ? 'Yes' : 'No'}`)
    .moveDown();

  // Complaint & Diagnosis
  doc.text(`Chief Complaint: ${consultation.chiefComplaint || '-'}`)
    .text(`Primary Diagnosis: ${consultation.diagnosis?.primary || '-'}`)
    .text(`Doctor Notes: ${consultation.doctorNotes || '-'}`)
    .moveDown();

  // Vitals
  if (consultation.vitals && Object.keys(consultation.vitals).length > 0) {
    doc.fontSize(14).text('Vitals', { underline: true });
    Object.entries(consultation.vitals).forEach(([k, v]) => {
      doc.fontSize(12).text(`${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`);
    });
    doc.moveDown();
  }

  // History, Prescriptions, Tests, Follow-Up
  const renderList = (title, items) => {
    if (items?.length) {
      doc.fontSize(14).text(title, { underline: true });
      items.forEach(item => doc.fontSize(12).text(`• ${item}`));
      doc.moveDown();
    }
  };

  renderList('Medical History', consultation.medicalHistory);

  if (consultation.prescriptions?.length) {
    doc.fontSize(14).text('Prescriptions', { underline: true });
    consultation.prescriptions.forEach(p => {
      doc.fontSize(12).text(`• ${p.medicine} – ${p.dosage}, ${p.frequency}, ${p.duration}`);
      doc.text(`  Instructions: ${p.instructions || '-'}`);
    });
    doc.moveDown();
  }

  if (consultation.testsAdvised?.length) {
    doc.fontSize(14).text('Tests Advised', { underline: true });
    consultation.testsAdvised.forEach(t => {
      doc.fontSize(12).text(`• ${t.name} – ${t.lab || '-'}`);
      doc.text(`  Notes: ${t.notes || '-'}`);
    });
    doc.moveDown();
  }

  if (consultation.followUp?.advised) {
    doc.fontSize(14).text('Follow-Up', { underline: true });
    doc.fontSize(12).text(`After ${consultation.followUp.afterDays} days`);
    doc.text(`Note: ${consultation.followUp.note || '-'}`);
    doc.moveDown();
  }

  doc.end();
};

exports.downloadConsultationPdfForPatient = async (req, res) => {
  try {
    const consultation = await Consultation.findOne({
      _id: req.params.id, patient: req.user.id
    })
      .populate('doctor', 'name')
      .populate('clinic', 'name');

    if (!consultation) {
      return res.status(404).json({ message: 'Not found or access denied' });
    }

    generateConsultationPdf(consultation, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error generating PDF' });
  }
};
















exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .populate('patient');
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateConsultation = async (req, res) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteConsultation = async (req, res) => {
  try {
    await Consultation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Consultation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
// exports.uploadReportFile = async (req, res) => {
//   const { id } = req.params;
//   const file = req.file;

//   if (!file) return res.status(400).json({ message: 'No file uploaded' });

//   try {
//     const consultation = await Consultation.findById(id);
//     if (!consultation) return res.status(404).json({ message: 'Consultation not found' });

//     consultation.testResults.push({
//       title: file.originalname,
//       fileUrl: `/uploads/${file.filename}`,
//       uploadedAt: new Date()
//     });

//     await consultation.save();
//     res.json({ message: 'Report uploaded', file: consultation.testResults.at(-1) });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };








exports.uploadReportFile = async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  console.log('file', file);


  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const consultation = await Consultation.findById(id);
    if (!consultation) return res.status(404).json({ message: 'Consultation not found' });

    consultation.reports.push({
      title: file.originalname || file.filename,
      fileUrl: file.path, // Cloudinary URL

      uploadedAt: new Date()
    });

    await consultation.save();

    res.status(200).json({
      message: 'Report uploaded successfully',
      file: consultation.reports.at(-1)
    });
  } catch (err) {
    console.error('Error uploading report:', err.message);
    res.status(500).json({ error: 'Failed to upload report', details: err.message });
  }
};





// exports.downloadPdf = async (req, res) => {
//   try {
//     const consultation = await Consultation.findById(req.params.id)
//       .populate('consultation reports');

//     if (!consultation) return res.status(404).json({ message: 'Not found' });

//     const html =await generateConsultationPdf(consultation);
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(html);
//     const pdfBuffer = await page.pdf({ format: 'A4' });

//     await browser.close();

//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename=consultation_${consultation._id}.pdf`
//     });
//     res.send(pdfBuffer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'PDF generation failed' });
//   }
// };




// exports.downloadPdf = async (req, res) => {
//   try {
//     const consultation = await Consultation.findById(req.params.id)
//       .populate('doctor patient clinic reports');

//     if (!consultation) return res.status(404).json({ message: 'Consultation not found' });

//     const html = await generateConsultationPdf(consultation);

//     const puppeteer = await import('puppeteer');
//     const browser = await puppeteer.default.launch();
//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: 'networkidle0' });

//     const pdfBuffer = await page.pdf({ format: 'A4' });
//     await browser.close();

//     // ✅ Optional: upload to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload_stream(
//       {
//         folder: 'consultation-reports',
//         resource_type: 'raw', // For PDFs
//       },
//       (error, result) => {
//         if (error) console.error('Cloudinary upload error:', error);
//         else console.log('Uploaded PDF URL:', result.secure_url);
//       }
//     );

//     const stream = require('stream');
//     const bufferStream = new stream.PassThrough();
//     bufferStream.end(pdfBuffer);
//     bufferStream.pipe(uploadResult); // Pipe PDF to Cloudinary

//     // ✅ Stream to user as download
//     res.set({
//       'Content-Type': 'application/pdf',
//       'Content-Disposition': `attachment; filename=consultation_${consultation._id}.pdf`,
//     });
//     res.send(pdfBuffer);

//   } catch (err) {
//     console.error('PDF generation error:', err.message);
//     res.status(500).json({ error: 'PDF generation failed', details: err.message });
//   }
// };

exports.downloadPdf = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id).populate('doctor patient clinic reports');

    console.log('consultation', consultation);


    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    const html = await generateConsultationPdf(consultation);

    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.default.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    console.log('pdfBuffer', pdfBuffer);

    await browser.close();

    // ✅ Wrap cloudinary upload_stream in a promise
    const cloudinaryUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'consultation-reports',
            resource_type: 'auto', // PDFs are binary/raw files
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result); // result.secure_url will be returned
          }
        );

        // Pipe buffer to Cloudinary
        const bufferStream = new (require('stream').PassThrough)();
        bufferStream.end(pdfBuffer);
        bufferStream.pipe(stream);
      });
    };

    const uploadResult = await cloudinaryUpload()

    console.log("upurl", uploadResult);

    // ✅ Send back the link to frontend
    res.json({
      message: 'PDF generated and uploaded',
      url: uploadResult.secure_url,
    });

  } catch (err) {
    console.error('PDF generation error:', err.message);
    res.status(500).json({ error: 'PDF generation failed', details: err.message });
  }
};




































// // Example: Triggered on appointment completion
// const consultation = new Consultation({
//   appointment: appointmentId,
//   doctor: appointment.doctorId,
//   patient: appointment.patientId,
//   clinic: appointment.clinicId,
//   type: appointment.type,
//   status: 'scheduled',
//   consultationDate: new Date()
// });
// await consultation.save();
















// const { sendEmailWithAttachment } = require('../utils/emailService');
// const generatePdf = require('../utils/generateConsultationPdf.mjs');

// const filePath = `temp/consultation-${consultation._id}.pdf`;
// const fs = require('fs');

// generatePdf(consultation, fs.createWriteStream(filePath));

// await sendEmailWithAttachment(
//   consultation.patient.email,
//   'Your Consultation Report',
//   'Dear patient, please find your consultation report attached.',
//   filePath
// );

// // Optionally delete after sending
// fs.unlinkSync(filePath);















// //PDF
// exports.downloadPdf = async (req, res) => {
//   try {
//     const consultation = await Consultation.findById(req.params.id)
//       .populate('doctor patient clinic');

//     if (!consultation) {
//       return res.status(404).json({ message: 'Consultation not found' });
//     }

//     await generateConsultationPdf(consultation, res);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to download PDF' });
//   }
// };



