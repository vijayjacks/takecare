
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment =require('../models/Appointment')
const upload=require("../middleware/upload")
const Consultation = require('../models/Consultation');
const Payment = require('../models/Payment');
const LabTestReport = require('../models/LabTestReport');

//patient register
exports.registerPatient = async (req, res) => {
    try {
        const { name, email, password, gender, age, contact } = req.body;
        console.log("req.body", req.body);

        // Check if email already exists
        const existing = await Patient.findOne({ email });
        if (existing) return res.status(400).json({ message: "Patient already exists" });

        // Hash password
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        // Create and save patient
        const patient = new Patient({
            name,
            email,
            password: hashedPassword,
            gender,
            age,
            contact
        });

        await patient.save();
        res.status(201).json({ message: "Patient registered successfully", patient });
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: err.message || "Server error" });
    }
};

//patient Login
exports.loginPatient = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        const foundPatient = await Patient.findOne({ email });

        if (!foundPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const comparePwd = await bcrypt.compare(password, foundPatient.password)

        // ✅ Create token
        if (comparePwd) {
            const token = jwt.sign(
                { id: foundPatient._id, role: "patient" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.status(200).json({success:true,token,foundPatient})
        }
        // ✅ Update login time
        foundPatient.lastLogin = new Date();
        await foundPatient.save();

        res.json({ token, patient: foundPatient });

    } catch (err) {
       console.log({ message: err.message });
    }
};





// exports.bookAppointment = async (req, res) => {
//   const { doctorId, patientId, date, timeSlot, clinicId, reason } = req.body;

//   try {
//     const newAppointment = await Appointment.create({
//       doctorId,
//       patientId,
//       clinicId,
//       date,
//       timeSlot,
//       reason
//     });

//     await doctorId.findByIdAndUpdate(doctorId, { $push: { appointments: newAppointment._id } });
//     await Patient.findByIdAndUpdate(patientId, { $push: { notifications: {
//       type: 'info',
//       message: 'Appointment booked successfully',
//     }}});

//     res.status(201).json(newAppointment);
//   } catch (err) {
//     res.status(500).json({ message: "Error booking appointment", error: err.message });
//   }
// };

 

// exports.bookAppointment = async (req, res) => {
//   const { doctorId, patientId, date, timeSlot, clinicId, reason } = req.body;

//   try {
//     const appointmentDateTime = new Date(`${date}T${timeSlot}`);

//     // Prevent double booking
//     const existing = await Appointment.findOne({
//       doctorId,
//       date: appointmentDateTime
//     });

//     if (existing) {
//       return res.status(400).json({ message: "Time slot already booked for this doctor." });
//     }

//     // Create appointment
//     const newAppointment = await Appointment.create({
//       doctorId,
//       patientId,
//       clinicId,
//       date: appointmentDateTime,
//       timeSlot,
//       reason,
//       status: "booked"
//     });

//     // Add appointment to doctor
//     await Doctor.findByIdAndUpdate(doctorId, {
//       $push: { appointments: newAppointment._id }
//     });

//     // Notify patient
//     await Patient.findByIdAndUpdate(patientId, {
//       $push: {
//         notifications: {
//           type: 'info',
//           message: `Your appointment with Doctor has been booked for ${date} at ${timeSlot}.`
//         }
//       }
//     });

//     res.status(201).json(newAppointment);
//   } catch (err) {
//     res.status(500).json({
//       message: "Error booking appointment",
//       error: err.message
//     });
//   }
// };



exports.searchDoctorsByAvailability = async (req, res) => {
  const { specialization, clinicId, day, from, to } = req.query;

  const query = {
    approved: true,
    status: 'active'
  };

  if (specialization) query.specialization = specialization;
  if (clinicId) query.clinicId = clinicId;
  if (day) query['availability.days'] = day;

  // Availability time filtering logic (from <= doctor.from and to >= doctor.to)
  if (from && to) {
    query['availability.from'] = { $lte: from };
    query['availability.to'] = { $gte: to };
  }

  try {
    const doctors = await Doctor.find(query).populate('clinicId', 'name location');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors", error: err.message });
  }
};





// @desc    Get patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    // .populate('doctorAssigned', 'name email');
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

// @desc    Update patient by ID
exports.updatePatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    Object.assign(patient, req.body);
    await patient.save();
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

// @desc    Upload profile photo
exports.uploadPatientPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const patient = await Patient.findById(req.user.id); // assuming user is the logged-in patient
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    patient.profileImage = `/uploads/${req.file.filename}`;
    await patient.save();

    res.status(200).json({ message: 'Image uploaded', path: patient.profileImage });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload image', error: err.message });
  }
};

// @desc    Get notifications
exports.getNotifications = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    res.status(200).json({ notifications: patient.notifications });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};

// @desc    Get unread notifications count
exports.getUnreadNotificationCount = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const count = patient.notifications.filter(n => !n.read).length;
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Error counting notifications', error: err.message });
  }
};

// @desc    Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const notification = patient.notifications.id(req.params.notifId);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    notification.read = true;
    await patient.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notification', error: err.message });
  }
};










// ✅ Get all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find()
        // .populate('clinicId doctorId patientId labId pharmacyId superadminId');
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Get a single patient
exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate("doctorAssigned", "name email");
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Update patient
exports.updatePatient = async (req, res) => {
    try {
        const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Delete patient
exports.deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Patient deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Assign doctor
exports.assignDoctor = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const doctor = await Admin.findById(doctorId);
        if (!doctor || doctor.role !== "doctor") {
            return res.status(400).json({ message: "Invalid doctor ID" });
        }

        const patient = await Patient.findByIdAndUpdate(req.params.id, { doctorAssigned: doctorId }, { new: true });
        res.json({ message: "Doctor assigned", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Add report
exports.addReport = async (req, res) => {
    try {
        const report = {
            title: req.body.title,
            description: req.body.description,
            fileUrl: req.body.fileUrl,
        };

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { reports: report } },
            { new: true }
        );

        res.json({ message: "Report added", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Add notification
exports.addNotification = async (req, res) => {
    try {
        const note = {
            type: req.body.type,
            message: req.body.message,
        };

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { notifications: note } },
            { new: true }
        );

        res.json({ message: "Notification added", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};






















// exports. getMyConsultations = async (req, res) => {
//   try {
//     const patientId = req.patient._id; // assuming protect middleware sets req.patient

//     const consultations = await Consultation.find({ patient: patientId })
//       .populate('doctor', 'name email')           // populate doctor details
//       .populate('prescriptions')                   // populate prescriptions if a separate model
//       .sort({ consultationDate: -1 });              // latest first

//     res.status(200).json(consultations);
//   } catch (error) {
//     console.error('Error fetching consultations:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };






// exports. getMyConsultations = async (req, res) => {
//   try {
//     const patientId = req.user._id;
// consol.log('patientId',patientId)
//     const consultations = await Consultation.find({ patient: patientId })
//       .populate('doctor', 'name email')
//       .populate('prescriptions')
//       .sort({ consultationDate: -1 });

//     res.status(200).json(consultations);
//   } catch (error) {
//     console.error('Error fetching consultations:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


exports. getMyConsultations = async (req, res) => {
  try {
    const patientId = req.patient?._id || req.user?.id;
console.log('patientId',patientId);

    if (!patientId) {
      return res.status(401).json({ message: "Unauthorized: No patient ID" });
    }

    const consultations = await Consultation.find({ patient: patientId })
      .populate("doctor", "name email")
      .populate("prescriptions")
      .sort({ consultationDate: -1 });

    res.status(200).json(consultations);
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ message: "Server error" });
  }
};







// // Get all lab report/

// exports.getLabReportsByPatientId = async (req, res) => {
//   try {
//     const { patientId ,reportId} = req.params;

//     // Find patient
//     const patient = await Patient.findOne({_id:patientId})
//     // .select("labReports");
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }




//     const reports=await LabTestReport.find({patientId},{reportId})
//     console.log("paid",reports)





//     res.status(200).json(reports);
//   } catch (error) {
//     console.error("Error fetching lab reports:", error);
   
//     res.status(500).json({ error: error.message });
//   }
// };





// Get all lab reports for a patient OR a single report if reportId is provided
exports.getLabReportsByPatientId = async (req, res) => {
  try {
    const { patientId, reportId } = req.params;

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Fetch reports
    let query = { patientId };
    if (reportId) query._id = reportId;

    console.log("query",query)

    const reports = await LabTestReport.find(query);
    // console.log("reportbyId",reports)

    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching lab reports:", error);
    res.status(500).json({ error: error.message });
  }
};















// Get only paid lab reports for a patient
exports.getPaidLabReports = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Fetch reports where paymentStatus = "paid"
    const reports = await LabTestReport.find({
      patientId,
    //   paymentStatus: "paid" || "Paid",
    })
    // .select("testName result normalRange status createdAt");

    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching paid lab reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch paid lab reports",
      error: error.message,
    });
  }
};






// ✅ GET /api/patients/:patientId/labreports/:reportId
exports.getLabReportByPatientAndReportId = async (req, res) => {
  try {
    const { patientId, reportId } = req.params;

    // Ensure patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // // Fetch single lab report
    // const report = await LabTestReport.findOne({ _id: reportId, patientId })
    //   .populate('patientId', 'name email phone') // optional
    //   .populate('labId', 'labName address');     // optional


// Example in your controller
const report = await LabTestReport.findOne({ _id: reportId, patientId })
  .populate('patientId', 'name email phone gender age contact status bookingDate') // populate all needed patient fields
  .populate('labId', 'name email phone address'); // populate all needed lab fields

console.log("report",report)

    if (!report) {
      return res.status(404).json({ message: 'Lab report not found' });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching lab report:', error);
    res.status(500).json({ error: error.message });
  }
};






















// const Patient = require("../models/Patient");
// const Payment = require("../models/Payment");
// const LabTestReport = require("../models/LabTestReport");

// exports.getLabReportsByPatientId = async (req, res) => {
//   try {
//     const { patientId } = req.params;

//     // ✅ Find patient and their lab reports
//     const patient = await Patient.findById(patientId).select("labReports");
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     // ✅ Fetch all payments for this patient
//     const payments = await LabTestReport.find({
//       patientId,
//       paymentStatus: "paid" ||'Paid' ,
//     }).select("labId");

//     const paidLabIds = payments.map((p) => p.labId.toString());

//     console.log("paid",paidLabIds)

//     // ✅ Enrich lab reports with paid/unpaid flag
//     const reportsWithStatus = patient.labReports.map((report) => ({
//       _id: report._id,
//       testName: report.testName,
//       uploadedAt: report.uploadedAt,
//       result: paidLabIds.includes(report._id.toString()) ? report.result : null,
//       paymentStatus: paidLabIds.includes(report._id.toString())
//         ? "paid"
//         : "unpaid",
//     }));

//     res.status(200).json({ labReports: reportsWithStatus });
//   } catch (error) {
//     console.error("Error fetching lab reports:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// //













// ✅ Add payment (Doctor, Pharmacy, Lab)





exports.addPayment = async (req, res) => {
    try {
        const payment = {
            amount: req.body.amount,
            method: req.body.method,
            status: req.body.status || "pending",
            paidAt: req.body.paidAt || new Date(),
        };

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { payments: payment } },
            { new: true }
        );

        res.json({ message: "Payment added", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Update status
exports.updatePatientStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const patient = await Patient.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json({ message: "Status updated", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};












// ✅ Add medical record
exports.addMedicalRecord = async (req, res) => {
    try {
        const record = {
            condition: req.body.condition,
            treatment: req.body.treatment,
            date: req.body.date || new Date()
        };

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { medicalHistory: record } },
            { new: true }
        );

        res.json({ message: "Medical record added", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Request for medicine
exports.requestMedicine = async (req, res) => {
    try {
        const note = {
            type: "alert",
            message: `Patient requested medicine: ${req.body.medicine}`
        };
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { notifications: note } },
            { new: true }
        );
        res.json({ message: "Medicine request noted", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Request for test
exports.requestTest = async (req, res) => {
    try {
        const note = {
            type: "reminder",
            message: `Test requested: ${req.body.test}`
        };
        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { notifications: note } },
            { new: true }
        );
        res.json({ message: "Test request noted", patient });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ View prescriptions (assumes prescription model connected to doctor or external system)
exports.viewPrescriptions = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate({
            path: "doctorAssigned",
            populate: { path: "prescriptions", match: { patientId: req.params.id } }
        });
        res.json(patient.doctorAssigned.prescriptions || []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ View test results
exports.viewTestResults = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate({
            path: "doctorAssigned",
            populate: { path: "testResults", match: { patientId: req.params.id } }
        });
        res.json(patient.doctorAssigned.testResults || []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
