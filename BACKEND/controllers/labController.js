// labController.js
const mongoose = require("mongoose");
const Lab = require("../models/Labs.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient.js")
// const payment =require('../models/Payment')
// const Prescription = require("../models/Prescription");
const Clinic = require("../models/clinic.js")
const dotenv = require("dotenv");
const LabBooking = require('../models/LabBooking.js');
const LabTestReport = require('../models/LabTestReport.js'); // if you're using separate model

const Consultation = require("../models/Consultation.js");
const PDFDocument = require("pdfkit");
dotenv.config();

const stripe = require("stripe")(process.env.secrete_key);
// // Register Lab
// exports.registerLab = async (req, res) => {
//   try {
//     const { name, email, password, phone, address, clinicId } = req.body;
// console.log('name',name);
// console.log('email',email);
// console.log('password',password);
// console.log('address',address);
// console.log('clinicId',clinicId);



//     if (!name || !email || !password || !phone || !address || !clinicId) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // FIXED HERE: capital Clinic (model)
//     const clinic = await Clinic.findById(clinicId);
//     if (!clinic) {
//       return res.status(400).json({ message: "Invalid clinic selected" });
//     }

//     const existingLab = await Lab.findOne({ email });
//     if (existingLab) {
//       return res.status(409).json({ message: "Lab with this email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newLab = new Lab({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       clinicId,
//       clinicApproved: false,
//       adminApproved: false,
//     });

//     await newLab.save();

//     res.status(201).json({
//       message: "Lab registered successfully. Awaiting clinic and admin approval.",
//       lab: {
//         _id: newLab._id,
//         name: newLab.name,
//         email: newLab.email,
//         clinicId: newLab.clinicId,
//         approved: {
//           clinic: newLab.clinicApproved,
//           admin: newLab.adminApproved,
//         },
//       },
//     });
//   } catch (err) {
//     console.error("Lab registration error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };



// exports.registerLab = async (req, res) => {
//   try {
//     const { name, email, password, phone, address, clinicId, availableTests } = req.body;

//     if (!name || !email || !password || !phone || !address || !clinicId) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const clinic = await Clinic.findById(clinicId);
//     if (!clinic) {
//       return res.status(400).json({ message: "Invalid clinic selected" });
//     }

//     const existingLab = await Lab.findOne({ email });
//     if (existingLab) {
//       return res.status(409).json({ message: "Lab with this email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Parse tests
//     let parsedTests = [];
//     if (availableTests) {
//       try {
//         parsedTests = JSON.parse(availableTests);
//       } catch (err) {
//         return res.status(400).json({ message: "Invalid test format" });
//       }
//     }

//     const newLab = new Lab({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       clinicId,
//       availableTests: parsedTests,
//       clinicApproved: false,
//       adminApproved: false,
//     });

//     await newLab.save();

//     res.status(201).json({
//       message: "Lab registered successfully. Awaiting clinic and admin approval.",
//       lab: {
//         _id: newLab._id,
//         name: newLab.name,
//         email: newLab.email,
//         clinicId: newLab.clinicId,
//         availableTests: newLab.availableTests,
//         approved: {
//           clinic: newLab.clinicApproved,
//           admin: newLab.adminApproved,
//         },
//       },
//     });
//   } catch (err) {
//     console.error("Lab registration error:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };


// ffinnall

// exports.registerLab = async (req, res) => {
//   try {
//     const { name, email, password, phone, address, clinicId, availableTests } = req.body;

//     if (!name || !email || !password || !phone || !address || !clinicId) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check clinic exists
//     const clinic = await Clinic.findById(clinicId);
//     if (!clinic) {
//       return res.status(400).json({ message: "Invalid clinic selected" });
//     }

//     // Check existing lab email
//     const existingLab = await Lab.findOne({ email });
//     if (existingLab) {
//       return res.status(409).json({ message: "Lab with this email already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Parse availableTests if sent as JSON string
//     let parsedTests = [];
//     if (availableTests) {
//       if (typeof availableTests === "string") {
//         try {
//           parsedTests = JSON.parse(availableTests);
//         } catch (err) {
//           return res.status(400).json({ message: "Invalid test format" });
//         }
//       } else {
//         parsedTests = availableTests;
//       }
//     }

//     const newLab = new Lab({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       clinicId,
//       availableTests: parsedTests,
//       clinicApproved: false,
//       adminApproved: false,
//     });

//     await newLab.save();

//     res.status(201).json({
//       message: "Lab registered successfully. Awaiting clinic and admin approval.",
//       lab: {
//         _id: newLab._id,
//         name: newLab.name,
//         email: newLab.email,
//         clinicId: newLab.clinicId,
//         availableTests: newLab.availableTests,
//         approved: {
//           clinic: newLab.clinicApproved,
//           admin: newLab.adminApproved,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Lab registration error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };



// ✅ Get all labs



exports.registerLab = async (req, res) => {
  try {
    const { name, email, password, phone, address, clinicId, availableTests } = req.body;

    if (!name || !email || !password || !phone || !address || !clinicId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(400).json({ message: "Invalid clinic selected" });
    }

    const existingLab = await Lab.findOne({ email });
    if (existingLab) {
      return res.status(409).json({ message: "Lab with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let parsedTests = [];
    if (availableTests) {
      if (typeof availableTests === "string") {
        try {
          parsedTests = JSON.parse(availableTests);
        } catch (err) {
          return res.status(400).json({ message: "Invalid test format" });
        }
      } else {
        parsedTests = availableTests;
      }

      for (const test of parsedTests) {
        if (!test.name || !test.cost || !test.department || !test.description || !test.normalRange) {
          return res.status(400).json({ message: "Each test must include name, cost, department, description, and normalRange" });
        }
      }
    }

    const newLab = new Lab({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      clinicId,
      availableTests: parsedTests,
    });

    await newLab.save();

    res.status(201).json({
      message: "Lab registered successfully. Awaiting clinic and admin approval.",
      lab: {
        _id: newLab._id,
        name: newLab.name,
        email: newLab.email,
        clinicId: newLab.clinicId,
        availableTests: newLab.availableTests,
        approved: {
          clinic: newLab.clinicApproved,
          admin: newLab.adminApproved,
        },
      },
    });
  } catch (error) {
    console.error("Lab registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find().populate("clinicId", "name");
    res.json(labs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Approve lab by clinic
exports.approveLabByClinic = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.labId);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    lab.clinicApproved = true;
    await lab.save();

    res.json({ message: "Lab approved by clinic" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Approve lab by admin
exports.approveLabByAdmin = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.labId);
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    lab.adminApproved = true;
    await lab.save();

    res.json({ message: "Lab approved by admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// // controllers/labController.js
exports.getLabTests = async (req, res) => {
  try {
    const { labId } = req.params;
    const lab = await Lab.findById(labId);

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    res.status(200).json(lab.availableTests || []);
  } catch (err) {
    console.error("Error fetching lab tests:", err);
    res.status(500).json({ message: err.message });
  }
};








// // controllers/labController.js
// exports.bookLabTests = async (req, res) => {
//   try {
//     const { labId } = req.params;
//     const { patientId, selectedTests } = req.body;

//     if (!selectedTests || selectedTests.length === 0) {
//       return res.status(400).json({ message: "No tests selected." });
//     }

//     const lab = await Lab.findById(labId);
//     if (!lab) {
//       return res.status(404).json({ message: "Lab not found." });
//     }

//     // Optional: store patient in lab's patient list
//     if (!lab.patients.includes(patientId)) {
//       lab.patients.push(patientId);
//       await lab.save();
//     }

//     // (Optional) Save booking in a separate collection, e.g., LabBooking
//     // You can implement a LabBooking model if needed.

//     res.status(200).json({ message: "Tests booked successfully." });
//   } catch (err) {
//     console.error("Booking error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };





// exports.bookLabTests = async (req, res) => {
//   try {
//     const { labId } = req.params;
//     const { patientId, selectedTests } = req.body;

//     if (!selectedTests || selectedTests.length === 0) {
//       return res.status(400).json({ message: "No tests selected." });
//     }

//     const lab = await Lab.findById(labId);
//     if (!lab) {
//       return res.status(404).json({ message: "Lab not found." });
//     }

//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found." });
//     }

//     // Add patient to lab.patients list if not already there
//     if (!lab.patients.includes(patientId)) {
//       lab.patients.push(patientId);
//       await lab.save();
//     }

//     // Filter test details from lab.availableTests for the selected tests
//     const testsDetails = lab.availableTests.filter(test =>
//       selectedTests.includes(test.name)
//     );

//     // Save booking record
//     const booking = new LabBooking({
//       lab: labId,
//       patient: patientId,
//       tests: testsDetails,
//       status: 'confirmed',
//     });
//     await booking.save();

//     return res.status(200).json({ message: "Tests booked successfully." });
//   } catch (err) {
//     console.error("Booking error:", err);
//     return res.status(500).json({ message: err.message || "Internal Server Error" });
//   }
// };




// exports.bookLabTests = async (req, res) => {
//   try {
//     const { labId } = req.params;
//     const { selectedTests } = req.body;
//     const patientId = req.user.id; 

//     if (!selectedTests || selectedTests.length === 0) {
//       return res.status(400).json({ message: "No tests selected." });
//     }

//     const lab = await Lab.findById(labId);
//     if (!lab) {
//       return res.status(404).json({ message: "Lab not found." });
//     }

//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found." });
//     }

//     // Add patient to lab if not already added
//     if (!lab.patients.includes(patientId)) {
//       lab.patients.push(patientId);
//       await lab.save();
//     }

//     // Extract test details
//     const testsDetails = lab.availableTests.filter(test =>
//       selectedTests.includes(test.name)
//     );

//     if (testsDetails.length === 0) {
//       return res.status(400).json({ message: "Selected tests not found in lab." });
//     }

//     const booking = new LabBooking({
//       lab: labId,
//       patient: patientId,
//       tests: testsDetails,
//       status: "confirmed",
//     });

//     await booking.save();

//     res.status(200).json({ message: "Tests booked successfully." });
//   } catch (err) {
//     console.error("Booking error:", err);
//     res.status(500).json({ message: err.message || "Internal Server Error" });
//   }
// };




















// exports.getLabBookings = async (req, res) => {
//   try {
//     const labId = req.user.id; // assuming req.user is the lab user
//     const bookings = await LabBooking.find({ lab: labId })
//       .populate("patient", "name email") 
//       .populate({
//         path: "consultation",
//         select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate",
//       })
//       .sort({ createdAt: -1 });

//     return res.status(200).json(bookings);
//   } catch (err) {
//     console.error("Error in getLabBookings:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };




// // Book lab tests linked to a consultation
// const bookLabTests = async (req, res) => {
//   try {
//     const patientId = req.patient._id;
//     const { labId } = req.params;
//     const { selectedTests, consultationId, prescription } = req.body;

//     if (!selectedTests || selectedTests.length === 0) {
//       return res.status(400).json({ message: "No tests selected" });
//     }

//     // Validate consultation belongs to this patient
//     const consultation = await Consultation.findOne({
//       _id: consultationId,
//       patient: patientId,
//     });

//     if (!consultation) {
//       return res.status(404).json({ message: "Consultation not found" });
//     }

//     // Create a new booking record (assuming you want to save this)
//     const booking = new LabBooking({
//       patient: patientId,
//       lab: labId,
//       consultation: consultationId,
//       tests: selectedTests,
//       prescription, // you may want to save prescription details if relevant
//       status: "Booked",
//       bookingDate: new Date(),
//     });

//     await booking.save();

//     res.status(201).json({ message: "Booking successful", bookingId: booking._id });
//   } catch (error) {
//     console.error("Booking error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


exports.bookLabTests = async (req, res) => {
  try {
    const patientId = req.user.id;  // extracted from auth middleware
    const { labId } = req.params;
    const { selectedTests, consultationId, prescription } = req.body;
    console.log('req.body', req.body);

    if (!selectedTests || selectedTests.length === 0) {
      return res.status(400).json({ message: "No tests selected" });
    }

    // Verify the consultation belongs to this patient
    const consultation = await Consultation.findOne({
      _id: consultationId,
      patient: patientId,
    });

    if (!consultation) {
      return res.status(404).json({ message: "Consultation not found" });
    }

    // Create new lab booking
    const booking = new LabBooking({
      patient: patientId,
      lab: labId,
      consultation: consultationId,
      selectedTests,
      prescription, // store prescription details if needed
      status: "Completed",
      bookingDate: new Date(),
    });

    await booking.save();

    return res.status(201).json({ message: "Booking successful", bookingId: booking._id });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};





// exports.getLabBookings = async (req, res) => {
//   try {
//     const labId = req.user.id; // Lab user's id

//     // Find bookings for this lab and populate patient & consultation data
//     const bookings = await LabBooking.find({ lab: labId })
//       .populate("patient", "name email") // Patient's basic info
//       .populate({
//         path: "consultation",
//         select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
//         populate: {
//           path: "doctor",
//           select: "name specialization",
//         },
//       })
//       .sort({ createdAt: -1 });

//     // If no bookings found or no consultation linked, you may want to handle accordingly
//     if (!bookings.length) {
//       return res.status(404).json({ message: "No bookings found for this lab." });
//     }

//     // Return the populated bookings
//     return res.status(200).json(bookings);
//   } catch (err) {
//     console.error("Error in getLabBookings:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// Generate PDF (stream) containing the booking + prescription + tests etc
// exports.getBookingPdf = async (req, res) => {
//   try {
//     const labId = req.user.id;
//     const { bookingId } = req.params;

//     const booking = await LabBooking.findOne({ _id: bookingId, lab: labId })
//       .populate("patient", "name email")
//       .populate({
//         path: "consultation",
//         select:
//           "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
//         populate: { path: "doctor", select: "name specialization" },
//       })
//       .lean();

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // Create PDF document
//     const doc = new PDFDocument({ size: "A4", margin: 50 });
//     // Set headers for PDF
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `inline; filename="booking-${bookingId}.pdf"`
//     );

//     // Pipe PDF to response
//     doc.pipe(res);

//     // Title
//     doc.fontSize(20).text("Lab Booking Report", { align: "center" });
//     doc.moveDown();

//     // Booking & Patient Info
//     doc.fontSize(14).text(`Booking ID: ${bookingId}`);
//     doc.text(`Patient: ${booking.patient.name} (${booking.patient.email})`);
//     if (booking.consultation && booking.consultation.doctor) {
//       doc.text(
//         `Doctor: ${booking.consultation.doctor.name} (${booking.consultation.doctor.specialization})`
//       );
//     }
//     doc.text(
//       `Consultation Date: ${new Date(
//         booking.consultation.consultationDate
//       ).toLocaleString()}`
//     );
//     doc.moveDown();

//     // Diagnosis, notes
//     doc.fontSize(12).text("Diagnosis & Notes:");
//     doc.text(booking.consultation.diagnosis || "-");
//     doc.text(booking.consultation.doctorNotes || "-");
//     doc.moveDown();

//     // Selected Tests
//     doc.fontSize(12).text("Selected Tests:");
//     if (booking.selectedTests && booking.selectedTests.length > 0) {
//       booking.selectedTests.forEach((t, idx) => {
//         doc.text(`${idx + 1}. ${t}`);
//       });
//     } else {
//       doc.text("-");
//     }
//     doc.moveDown();

//     // Prescription entries
//     doc.fontSize(12).text("Prescriptions:");
//     if (booking.prescription && booking.prescription.length > 0) {
//       booking.prescription.forEach((p, idx) => {
//         doc.text(
//           `${idx + 1}. ${p.medicine} — ${p.dosage}, ${p.frequency}, ${p.duration}`
//         );
//         if (p.instructions) {
//           doc.text(`Instructions: ${p.instructions}`, { indent: 20 });
//         }
//         doc.moveDown(0.5);
//       });
//     } else {
//       doc.text("-");
//     }

//     // Done PDF
//     doc.end();
//   } catch (err) {
//     console.error("Error in getBookingPdf:", err);
//     // If headers already sent, cannot send JSON
//     if (!res.headersSent) {
//       return res.status(500).json({ message: "Server error generating PDF" });
//     }
//   }
// };

// exports.getBookingDetails = async (req, res) => {
//   try {
//     const labId = req.user.id;
//     const { bookingId } = req.params;

//     if (!bookingId || bookingId.length !== 24) {
//       return res.status(400).json({ message: "Invalid booking ID" });
//     }

//     const booking = await LabBooking.findOne({ _id: bookingId, lab: labId })
//       .populate("patient", "name email")
//       .populate({
//         path: "consultation",
//         select:
//           "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
//         populate: { path: "doctor", select: "name specialization" },
//       })
//       .lean();

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json({
//       bookingId: booking._id,
//       patient: booking.patient,
//       consultation: booking.consultation,
//       selectedTests: booking.selectedTests,
//       prescription: booking.prescription,
//     });
//   } catch (err) {
//     console.error("Error in getBookingDetails:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// fii

// exports.getLabBookings = async (req, res) => {
//   try {
//     const labId = req.user.id;

//     const bookings = await LabBooking.find({ lab: labId })
//       .populate("patient", "name email")
//       .populate({
//         path: "consultation",
//         select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
//         populate: { path: "doctor", select: "name specialization" },
//       })
//       .sort({ createdAt: -1 });

//     if (!bookings.length) {
//       return res.status(404).json({ message: "No bookings found for this lab." });
//     }

//     return res.status(200).json(bookings);
//   } catch (err) {
//     console.error("Error in getLabBookings:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getBookingDetails = async (req, res) => {
//   try {
//     const labId = req.user.id;
//     const { bookingId } = req.params;

//     if (!bookingId || bookingId.length !== 24) {
//       return res.status(400).json({ message: "Invalid booking ID" });
//     }

//     const booking = await LabBooking.findOne({ _id: bookingId, lab: labId })
//       .populate("patient", "name email")
//       .populate({
//         path: "consultation",
//         select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
//         populate: { path: "doctor", select: "name specialization" },
//       })
//       .lean();

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json({
//       bookingId: booking._id,
//       patient: booking.patient,
//       consultation: booking.consultation,
//       selectedTests: booking.selectedTests,
//       prescription: booking.prescription,
//     });
//   } catch (err) {
//     console.error("Error in getBookingDetails:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getBookingPdf = async (req, res) => {
//   try {
//     const labId = req.user.id;
//     const { bookingId } = req.params;

//     const booking = await LabBooking.findOne({ _id: bookingId, lab: labId })
//       .populate("patient", "name email")
//       .populate({
//         path: "consultation",
//         select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
//         populate: { path: "doctor", select: "name specialization" },
//       })
//       .lean();

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     const doc = new PDFDocument({ size: "A4", margin: 50 });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `inline; filename="booking-${bookingId}.pdf"`);

//     doc.pipe(res);

//     doc.fontSize(20).text("Lab Booking Report", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(14).text(`Booking ID: ${bookingId}`);
//     doc.text(`Patient: ${booking.patient.name} (${booking.patient.email})`);
//     if (booking.consultation && booking.consultation.doctor) {
//       doc.text(`Doctor: ${booking.consultation.doctor.name} (${booking.consultation.doctor.specialization})`);
//     }
//     doc.text(`Consultation Date: ${new Date(booking.consultation.consultationDate).toLocaleString()}`);
//     doc.moveDown();

//     doc.fontSize(12).text("Diagnosis & Notes:");
//     doc.text(booking.consultation.diagnosis || "-");
//     doc.text(booking.consultation.doctorNotes || "-");
//     doc.moveDown();

//     doc.fontSize(12).text("Selected Tests:");
//     if (booking.selectedTests && booking.selectedTests.length > 0) {
//       booking.selectedTests.forEach((t, idx) => doc.text(`${idx + 1}. ${t}`));
//     } else {
//       doc.text("-");
//     }
//     doc.moveDown();

//     doc.fontSize(12).text("Prescriptions:");
//     if (booking.prescription && booking.prescription.length > 0) {
//       booking.prescription.forEach((p, idx) => {
//         doc.text(`${idx + 1}. ${p.medicine} — ${p.dosage}, ${p.frequency}, ${p.duration}`);
//         if (p.instructions) {
//           doc.text(`Instructions: ${p.instructions}`, { indent: 20 });
//         }
//         doc.moveDown(0.5);
//       });
//     } else {
//       doc.text("-");
//     }

//     doc.end();
//   } catch (err) {
//     console.error("Error in getBookingPdf:", err);
//     if (!res.headersSent) {
//       return res.status(500).json({ message: "Server error generating PDF" });
//     }
//   }
// };

















// Login Lab
// exports.loginLab = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const lab = await Lab.findOne({ email });
//     if (!lab) return res.status(404).json({ message: "Lab not found" });

//     const match = await bcrypt.compare(password, lab.password);
//     if (!match) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: lab._id, role: "lab" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     lab.lastLogin = new Date();
//     await lab.save();

//     res.json({ token, lab });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };












// exports.downloadPrescriptionByConsultation = async (req, res) => {
//   try {
//     const { consultationId, patientId } = req.params;

//     const consultation = await Consultation.findById(consultationId);

//     if (!consultation) {
//       return res.status(404).json({ message: "Consultation not found" });
//     }

//     if (consultation.patient.toString() !== patientId) {
//       return res.status(403).json({ message: "Unauthorized patient ID" });
//     }

//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     // Set headers for PDF download
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=prescription-${consultationId}.pdf`
//     );

//     const doc = new PDFDocument();
//     doc.pipe(res);

//     // Header
//     doc.fontSize(18).text("Prescription & Consultation Summary", { align: "center" });
//     doc.moveDown();

//     // Patient Info
//     doc.fontSize(12).text(`Patient: ${patient.name}`);
//     doc.text(`Email: ${patient.email}`);
//     doc.text(
//       `Consultation Date: ${new Date(consultation.consultationDate).toLocaleString()}`
//     );
//     doc.moveDown();

//     // Diagnosis
//     if (consultation.diagnosis) {
//       doc.text("Diagnosis:", { underline: true });
//       doc.text(`Primary: ${consultation.diagnosis.primary || "-"}`);
//       doc.moveDown();
//     }

//     // Doctor Notes
//     if (consultation.doctorNotes) {
//       doc.text("Doctor Notes:", { underline: true });
//       doc.text(consultation.doctorNotes);
//       doc.moveDown();
//     }

//     // Prescriptions
//     if (consultation.prescriptions?.length > 0) {
//       doc.text("Prescriptions:", { underline: true });
//       consultation.prescriptions.forEach((med, idx) => {
//         doc.text(
//           `${idx + 1}. ${med.medicine} — ${med.dosage}, ${med.frequency}, ${med.duration} (${med.instructions || "-"})`
//         );
//       });
//       doc.moveDown();
//     }

//     // Tests Advised
//     if (consultation.testsAdvised?.length > 0) {
//       doc.text("Tests Advised:", { underline: true });
//       consultation.testsAdvised.forEach((test, idx) => {
//         doc.text(
//           `${idx + 1}. ${test.name} (Lab: ${test.lab || "-"}) — Notes: ${test.notes || "-"}`  
//         );
//       });
//       doc.moveDown();
//     }

//     doc.end();
//   } catch (err) {
//     console.error("Error in downloadPrescriptionByConsultation:", err);
//     res.status(500).json({ message: "Failed to generate prescription PDF" });
//   }
// };



// // ✅ Ensure this function reads consultationId from query and patientId from params
// exports.downloadPrescriptionByConsultation = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { consultationId } = req.query;

//     if (!consultationId) {
//       return res.status(400).json({ message: "Consultation ID is required" });
//     }

//     const consultation = await Consultation.findById(consultationId);
//     if (!consultation) {
//       return res.status(404).json({ message: "Consultation not found" });
//     }

//     if (consultation.patient.toString() !== patientId) {
//       return res.status(403).json({ message: "Unauthorized patient ID" });
//     }

//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=prescription-${consultationId}.pdf`
//     );

//     const PDFDocument = require("pdfkit");
//     const doc = new PDFDocument();
//     doc.pipe(res);

//     doc.fontSize(18).text("Prescription & Consultation Summary", { align: "center" });
//     doc.moveDown();

//     doc.fontSize(12).text(`Patient: ${patient.name}`);
//     doc.text(`Email: ${patient.email}`);
//     doc.text(
//       `Consultation Date: ${new Date(consultation.consultationDate).toLocaleString()}`
//     );
//     doc.moveDown();

//     if (consultation.diagnosis) {
//       doc.text("Diagnosis:", { underline: true });
//       doc.text(`Primary: ${consultation.diagnosis.primary || "-"}`);
//       doc.moveDown();
//     }

//     if (consultation.doctorNotes) {
//       doc.text("Doctor Notes:", { underline: true });
//       doc.text(consultation.doctorNotes);
//       doc.moveDown();
//     }

//     if (consultation.prescriptions?.length > 0) {
//       doc.text("Prescriptions:", { underline: true });
//       consultation.prescriptions.forEach((med, idx) => {
//         doc.text(
//           `${idx + 1}. ${med.medicine} — ${med.dosage}, ${med.frequency}, ${med.duration} (${med.instructions || "-"})`
//         );
//       });
//       doc.moveDown();
//     }

//     if (consultation.testsAdvised?.length > 0) {
//       doc.text("Tests Advised:", { underline: true });
//       consultation.testsAdvised.forEach((test, idx) => {
//         doc.text(
//           `${idx + 1}. ${test.name} (Lab: ${test.lab || "-"}) — Notes: ${test.notes || "-"}`  
//         );
//       });
//       doc.moveDown();
//     }

//     doc.end();
//   } catch (err) {
//     console.error("Error in downloadPrescriptionByConsultation:", err);
//     res.status(500).json({ message: "Failed to generate prescription PDF" });
//   }
// };




// exports.getPrescriptionPdf = async (req, res) => {
//   const { consultationId } = req.query;
//   const { patientId } = req.params;

//   if (!consultationId) {
//     return res.status(400).json({ message: "Consultation ID is required" });
//   }

//   try {
//     const consultation = await Consultation.findOne({
//       _id: consultationId,
//       patient: patientId,
//     })
//       .populate("patient", "name email")
//       .populate("doctor", "name email");

//     if (!consultation) {
//       return res.status(404).json({ message: "Consultation not found" });
//     }

//     const doc = new PDFDocument();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "inline; filename=prescription.pdf");

//     doc.pipe(res);

//     // Header
//     doc.fontSize(20).text("Prescription", { align: "center" });
//     doc.moveDown();

//     // Patient Details
//     doc.fontSize(12).text(`Patient Name: ${consultation.patient.name}`);
//     doc.text(`Patient Email: ${consultation.patient.email}`);
//     doc.moveDown();

//     // Doctor Details
//     doc.text(`Doctor Name: ${consultation.doctor.name}`);
//     doc.text(`Consultation Date: ${new Date(consultation.consultationDate).toLocaleDateString()}`);
//     doc.moveDown();

//     // Diagnosis
//     doc.font("Helvetica-Bold").text("Diagnosis:");
//     doc.font("Helvetica").text(consultation.diagnosis?.primary || "N/A");
//     doc.moveDown();

//     // Prescriptions
//     doc.font("Helvetica-Bold").text("Prescriptions:");
//     if (consultation.prescriptions.length > 0) {
//       consultation.prescriptions.forEach((presc, index) => {
//         doc
//           .font("Helvetica")
//           .text(
//             `${index + 1}. ${presc.medicine} - ${presc.dosage} - ${presc.frequency} - ${presc.duration} - ${presc.instructions}`
//           );
//       });
//     } else {
//       doc.font("Helvetica").text("No prescriptions found.");
//     }

//     doc.moveDown();

//     // Tests
//     doc.font("Helvetica-Bold").text("Tests Advised:");
//     if (consultation.testsAdvised.length > 0) {
//       consultation.testsAdvised.forEach((test, index) => {
//         doc
//           .font("Helvetica")
//           .text(`${index + 1}. ${test.name} (${test.notes}) - ${test.lab}`);
//       });
//     } else {
//       doc.font("Helvetica").text("No tests advised.");
//     }

//     doc.end();
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).json({ message: "Error generating prescription PDF" });
//   }
// };





// For patient to view / download prescription PDF
// exports.generateConsultationPdf = async (req, res) => {
//   try {
//     const { consultationId } = req.params;
//     const userId = req.user.id; // from token

//     // Find consultation and ensure it belongs to that patient
//     const consultation = await Consultation.findOne({
//       _id: consultationId,
//       patient: userId,
//     })
//       .populate("patient", "name email")
//       .populate("doctor", "name email");

//     if (!consultation) {
//       return res.status(404).json({ message: "Consultation not found" });
//     }

//     // Generate PDF
//     const doc = new PDFDocument();
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `inline; filename=consultation-${consultationId}.pdf`);
//     doc.pipe(res);

//     doc.fontSize(18).text("Consultation & Prescription Details", { align: "center" });
//     doc.moveDown();

//     // Patient & Doctor info
//     doc.fontSize(12).text(`Patient: ${consultation.patient.name}`);
//     doc.text(`Doctor: ${consultation.doctor.name}`);
//     doc.text(`Date: ${new Date(consultation.consultationDate).toLocaleString()}`);
//     doc.moveDown();

//     // Diagnosis, notes
//     doc.font("Helvetica-Bold").text("Diagnosis:");
//     doc.font("Helvetica").text(consultation.diagnosis?.primary || "-");
//     doc.moveDown();

//     doc.font("Helvetica-Bold").text("Doctor Notes:");
//     doc.font("Helvetica").text(consultation.doctorNotes || "-");
//     doc.moveDown();

//     // Prescriptions
//     doc.font("Helvetica-Bold").text("Prescriptions:");
//     if (consultation.prescriptions && consultation.prescriptions.length > 0) {
//       consultation.prescriptions.forEach((p, idx) => {
//         doc
//           .font("Helvetica")
//           .text(
//             `${idx + 1}. ${p.medicine} | ${p.dosage} | ${p.frequency} | ${p.duration} | ${p.instructions}`
//           );
//       });
//     } else {
//       doc.font("Helvetica").text("No prescriptions.");
//     }
//     doc.moveDown();

//     // Tests Advised
//     doc.font("Helvetica-Bold").text("Tests Advised:");
//     if (consultation.testsAdvised && consultation.testsAdvised.length > 0) {
//       consultation.testsAdvised.forEach((t, idx) => {
//         doc
//           .font("Helvetica")
//           .text(`${idx + 1}. ${t.name} | ${t.lab || "-"} | ${t.notes || "-"}`);
//       });
//     } else {
//       doc.font("Helvetica").text("No tests.");
//     }

//     doc.end();
//   } catch (err) {
//     console.error("PDF generate error:", err);
//     res.status(500).json({ message: "Error generating PDF" });
//   }
// };


// Get all bookings for a lab
  // exports.getLabBookings = async (req, res) => {
  //   try {
  //     const labId = req.user.id;

  //     const bookings = await LabBooking.find({ lab: labId })
  //       .populate("patient", "name email")
  //         .populate("lab", "name") 
  //       .populate({
  //         path: "consultation",
  //         select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
  //         populate: { path: "doctor", select: "name specialization" },
  //       })
  //       .sort({ createdAt: -1 });

  //     if (!bookings.length) {
  //       return res.status(404).json({ message: "No bookings found for this lab." });
  //     }

  //     return res.status(200).json(bookings);
  //   } catch (err) {
  //     console.error("Error in getLabBookings:", err);
  //     return res.status(500).json({ message: "Server error" });
  //   }
  // };


exports.getLabBookings = async (req, res) => {
  try {
    const labId = req.user.id;

    const bookings = await LabBooking.find({ lab: labId })
      .populate("patient", "name email")
      .populate("lab", "name")
      .populate({
        path: "consultation",
        select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
        populate: { path: "doctor", select: "name specialization" },
      })
      .sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this lab." });
    }

    return res.status(200).json(bookings);
  } catch (err) {
    console.error("Error in getLabBookings:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getBookingDetails = async (req, res) => {
  try {
    const labId = req.user.id;
    const { bookingId } = req.params;

    if (!bookingId || bookingId.length !== 24) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const booking = await LabBooking.findOne({ _id: bookingId, lab: labId })
      .populate("lab", "name email") // ✅ Include lab name
      .populate("patient", "name email") // ✅ Include patient info
      .populate({
        path: "consultation",
        select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
        populate: { path: "doctor", select: "name specialization" },
      })
      .lean();

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
console.log("lab book",booking)
    // ✅ Return all required fields
    res.json({
      bookingId: booking._id,
      lab: booking.lab,
      patient: booking.patient,
      consultation: booking.consultation,
      selectedTests: booking.selectedTests,
      prescription: booking.prescription,
      status: booking.status,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    });
  } catch (err) {
    console.error("Error in getBookingDetails:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Download PDF

exports.getBookingPdf = async (req, res) => {
  try {
    const labId = req.user.id;
    const { bookingId } = req.params;

    const booking = await LabBooking.findOne({ _id: bookingId, lab: labId })
      .populate("lab", "name")
      .populate("patient", "name email")
      .populate({
        path: "consultation",
        select: "prescriptions testsAdvised doctorNotes diagnosis consultationDate doctor",
        populate: { path: "doctor", select: "name specialization" },
      })
      .lean();

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="booking-${bookingId}.pdf"`);

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Lab Booking Report", { align: "center" });
    doc.moveDown();

    // Basic Info
    doc.fontSize(14).text(`Booking ID: ${bookingId}`);
    doc.text(`Lab: ${booking.lab?.name || "N/A"}`);
    doc.text(`Patient: ${booking.patient.name} (${booking.patient.email})`);
    doc.text(`Status: ${booking.status}`);
    doc.text(`Created At: ${new Date(booking.createdAt).toLocaleString()}`);
    doc.text(`Updated At: ${new Date(booking.updatedAt).toLocaleString()}`);
    doc.moveDown();

    // Consultation
    if (booking.consultation) {
      const consultation = booking.consultation;
      doc.fontSize(14).text("Consultation Details", { underline: true });
      doc.moveDown(0.5);

      if (consultation.doctor) {
        doc.text(`Doctor: ${consultation.doctor.name} (${consultation.doctor.specialization})`);
      }

      doc.text(
        `Consultation Date: ${new Date(consultation.consultationDate).toLocaleString()}`
      );
      doc.moveDown();

      doc.fontSize(12).text("Diagnosis:");
      doc.text(consultation.diagnosis || "-");
      doc.moveDown();

      doc.text("Doctor Notes:");
      doc.text(consultation.doctorNotes || "-");
      doc.moveDown();

      if (consultation.testsAdvised?.length > 0) {
        doc.fontSize(12).text("Tests Advised:");
        consultation.testsAdvised.forEach((test, idx) =>
          doc.text(`${idx + 1}. ${test}`)
        );
        doc.moveDown();
      }
    }

    // Selected Tests
    doc.fontSize(14).text("Selected Tests", { underline: true });
    doc.moveDown(0.5);

    if (booking.selectedTests && booking.selectedTests.length > 0) {
      booking.selectedTests.forEach((test, idx) =>
        doc.text(`${idx + 1}. ${test}`)
      );
    } else {
      doc.text("None");
    }
    doc.moveDown();

    // Prescription Section
    doc.fontSize(14).text("Prescriptions", { underline: true });
    doc.moveDown(0.5);

    const prescriptions =
      booking.consultation?.prescriptions || booking.prescription || [];

    if (prescriptions.length > 0) {
      prescriptions.forEach((p, idx) => {
        doc.fontSize(12).text(
          `${idx + 1}. ${p.medicine} — ${p.dosage}, ${p.frequency}, ${p.duration}`
        );
        if (p.instructions) {
          doc.text(`Instructions: ${p.instructions}`, { indent: 20 });
        }
        doc.moveDown(0.5);
      });
    } else {
      doc.text("None");
    }

    doc.end();
  } catch (err) {
    console.error("Error in getBookingPdf:", err);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error generating PDF" });
    }
  }
};








// exports.generateTestReportFromBooking = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const labId = req.user.id;
//     console.log('bookingId',bookingId)

//     const booking = await LabBooking.findById(bookingId).populate('patient').lean();
//     if (!booking) return res.status(404).json({ message: 'Booking not found.' });
//     const selectedTests = booking.selectedTests || [];
//     if (!selectedTests.length) return res.status(400).json({ message: 'No tests selected.' });

//     console.log('selectedTests',selectedTests)

    
//     const lab = await Lab.findById(labId).lean();
//     if (!lab || !lab.availableTests) return res.status(400).json({ message: 'No available tests in lab.' });

//         console.log('lab',lab)

//     const matchedTests = selectedTests.map(testName =>
//       lab.availableTests.find(
//         t => t.name.toLowerCase().trim() === testName.toLowerCase().trim()
//       )
//     ).filter(Boolean);

//     if (!matchedTests.length) {
//       return res.status(400).json({ message: 'No matching tests found.' });
//     }

//     const reportDocs = matchedTests.map(test => ({
//       labId,
//       patientId: booking.patient,
//       bookingId: booking._id,
//       testName: test.name,
//       cost: test.cost || 0,
//       normalRange: test.normalRange || 'N/A',
//       result: 'Pending',
//       status: 'Pending',
//     }));

//     const insertedReports = await LabTestReport.insertMany(reportDocs);

//     // Optional: Update patient’s reports
//     await Patient.findByIdAndUpdate(booking.patient, {
//       $push: {
//         labReports: insertedReports.map(r => ({
//           labId: r.labId,
//           testName: r.testName,
//                 // cost: test.cost || 0,

//           result: r.result,
//           normalRange: r.normalRange,
//         })),
//       },
//     });

//     res.status(201).json({ message: 'Test reports generated.', reports: insertedReports });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };








// exports.updateTestResult = async (req, res) => {
//   try {
//     const { reportId } = req.params;
//     const { result } = req.body;

//     const updated = await LabTestReport.findByIdAndUpdate(
//       reportId,
//       { result, status: 'Completed' },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: 'Test report not found.' });
//     }

//     res.status(200).json({ message: 'Test result updated.', report: updated });
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating report.', error: err.message });
//   }
// };



// exports.updateTestResult = async (req, res) => {
//   try {
//     const { reportId } = req.params;
//     const { result } = req.body;

//     // 1. Update the LabTestReport
//     const updated = await LabTestReport.findByIdAndUpdate(
//       reportId,
//       { result, status: 'Completed' },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: 'Test report not found.' });
//     }

//     // 2. Update the corresponding test entry in patient's labReports
//     await Patient.updateOne(
//       {
//         _id: updated.patientId,
//         "labReports.testName": updated.testName,
//         "labReports.labId": updated.labId,
//       },
//       {
//         $set: {
//           "labReports.$.result": updated.result,
//         }
//       }
//     );

//     res.status(200).json({ message: 'Test result updated.', report: updated });

//   } catch (err) {
//     res.status(500).json({ message: 'Error updating report.', error: err.message });
//   }
// };























//   // exports.generateTestReportFromBooking = async (req, res) => {
//   //   try {
//   //     const { bookingId } = req.params;
//   //     const labId = req.user.id;

//   //     const booking = await LabBooking.findById(bookingId)
//   //       .populate('patient')
//   //       .lean();

//   //     if (!booking) {
//   //       return res.status(404).json({ message: 'Lab booking not found' });
//   //     }
//   //     if (String(booking.lab) !== String(labId)) {
//   //       return res.status(403).json({ message: 'Not authorized for this booking' });
//   //     }

//   //     const patient = booking.patient;
//   //     const selectedTests = booking.selectedTests || [];
//   //     // Use consultation's prescriptions if present, else booking-level prescription
//   //     const prescription =
//   //       booking.consultation?.prescriptions || booking.prescription || [];

//   //     // Create new report records in LabTestReport
//   //     const reportDocs = selectedTests.map((testName) => ({
//   //       labId,
//   //       patientId: patient._id,
//   //       testName,
//   //       result: "Pending",
//   //       normalRange: "N/A",
//   //       prescription,
//   //       status: "Pending"
//   //     }));

//   //     // Save them
//   //     const inserted = await LabTestReport.insertMany(reportDocs);

//   //     // Also optionally embed into patient’s record (if you keep labReports in patient)
//   //     // e.g.:
//   //     await Patient.findByIdAndUpdate(patient._id, {
//   //       $push: {
//   //         labReports: inserted.map(r => ({
//   //           labId: r.labId,
//   //           testName: r.testName,
//   //           result: r.result,
//   //           normalRange: r.normalRange,
//   //         }))
//   //       }
//   //     });

//   //     // Return simplified output
//   //     const responseReports = inserted.map(r => ({
//   //       _id: r._id,
//   //       testName: r.testName,
//   //       result: r.result,
//   //       normalRange: r.normalRange,
//   //       status: r.status
//   //     }));

//   //     return res.status(201).json({
//   //       message: 'Lab test report generated successfully',
//   //       reports: responseReports
//   //     });
//   //   } catch (err) {
//   //     console.error('Error generating test report:', err);
//   //     return res.status(500).json({ message: 'Server Error', error: err.message });
//   //   }
//   // };

//   // exports.  getTestReportsByBooking = async (req, res) => {
//   //   try {
//   //     const { bookingId } = req.params;
//   //     const labId = req.user.id;

//   //     // Find booking to get patient
//   //     const booking = await LabBooking.findById(bookingId).lean();
//   //     if (!booking) return res.status(404).json({ message: 'Booking not found' });
//   //     if (String(booking.lab) !== String(labId)) {
//   //       return res.status(403).json({ message: 'Not authorized' });
//   //     }

//   //     // Fetch reports linked to this patient & lab, for the selected tests
//   //     const reports = await LabTestReport.find({
//   //       labId,
//   //       patientId: booking.patient,
//   //       testName: { $in: booking.selectedTests }
//   //     }).lean();

//   //     res.json({ reports });
//   //   } catch (err) {
//   //     console.error("Error in getTestReportsByBooking:", err);
//   //     return res.status(500).json({ message: "Server error" });
//   //   }
//   // };






// // // Route: POST /api/labs/generate-report
// // exports.generateLabReport = async (req, res) => {
// //   try {
// //     const { labId, patientId, selectedTests, prescription, fileUrl } = req.body;

// //     // Validate inputs
// //     if (!patientId || !labId || !selectedTests || selectedTests.length === 0) {
// //       return res.status(400).json({ message: "Missing required fields." });
// //     }

// //     const patient = await Patient.findById(patientId);
// //     if (!patient) {
// //       return res.status(404).json({ message: "Patient not found." });
// //     }

// //     // Optionally: Generate a result (mocked here)
// //     const generatedReports = selectedTests.map(test => ({
// //       labId,
// //       testName: test,
// //       result: "Pending", // or generate result logic
// //       normalRange: "To be defined",
// //       fileUrl: fileUrl || "", // assume report file is uploaded and URL passed
// //       uploadedAt: new Date()
// //     }));

// //     // Add generated report to patient
// //     patient.labReports.push(...generatedReports);

// //     // Send a notification to the patient
// //     patient.notifications.push({
// //       type: 'report',
// //       message: `Lab report for tests [${selectedTests.join(", ")}] has been uploaded.`,
// //     });

// //     await patient.save();

// //     return res.status(200).json({
// //       message: "Lab report generated and sent to patient successfully.",
// //       labReports: generatedReports
// //     });

// //   } catch (error) {
// //     console.error("Lab Report Generation Error:", error);
// //     return res.status(500).json({ message: "Server error." });
// //   }
// // };




// // exports.generateLabReport = async (req, res) => {
// //   try {
// //     const { patientId, selectedTests, prescription, fileUrl } = req.body;
// //     const { labId } = req.params;

// //     // Validate patient
// //     const patient = await Patient.findById(patientId);
// //     if (!patient) {
// //       return res.status(404).json({ message: "Patient not found" });
// //     }

// //     // Option 1: Store report inside Patient (embedded in `labReports`)
// //     const newReports = selectedTests.map(test => ({
// //       labId,
// //       testName: test,
// //       result: "Pending", // or some logic to generate results
// //       normalRange: "N/A",
// //       // fileUrl
// //     }));

// //     patient.labReports.push(...newReports);
// //     await patient.save();

// //     // Optionally, send a notification to the patient
// //     patient.notifications.push({
// //       type: "report",
// //       message: `New lab report(s) available for tests: ${selectedTests.join(", ")}`,
// //     });
// //     await patient.save();

// //     res.status(201).json({ message: "Lab report generated and sent to patient", reports: newReports });

// //     // Option 2: Save to a separate LabTestReport collection (uncomment if needed)
    
// //     const reports = await LabTestReport.insertMany(selectedTests.map(test => ({
// //       labId,
// //       patientId,
// //       testName: test,
// //       result: "Pending",
// //       normalRange: "N/A",
// //       // fileUrl,
// //       prescription
// //     })));

// //     res.status(201).json({ message: "Lab reports saved", reports });
    
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };








// // exports.generateLabReport = async (req, res) => {
// //   try {
// //     const { labBookingId } = req.params;

// //     const booking = await LabBooking.findById(labBookingId)
// //       .populate('lab')
// //       .populate('patient');

// //     if (!booking) {
// //       return res.status(404).json({ message: "Lab booking not found" });
// //     }

// //     const patient = booking.patient;
// //     const labId = booking.lab._id;

// //     const selectedTests = booking.selectedTests || [];
// //     const prescription = booking.prescription || [];

// //     // Store in patient's embedded labReports
// //     const newReports = selectedTests.map(test => ({
// //       labId,
// //       testName: test,
// //       result: "Pending",
// //       normalRange: "N/A"
// //     }));

// //     patient.labReports.push(...newReports);
// //     patient.notifications.push({
// //       type: "report",
// //       message: `New lab report(s) generated for tests: ${selectedTests.join(", ")}`
// //     });

// //     await patient.save();

// //     // Optionally: store in separate LabTestReport collection
// //     await LabTestReport.insertMany(
// //       selectedTests.map(test => ({
// //         labId,
// //         patientId: patient._id,
// //         testName: test,
// //         result: "Pending",
// //         normalRange: "N/A",
// //         prescription
// //       }))
// //     );

// //     res.status(201).json({ message: "Lab report generated successfully", reports: newReports });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server Error", error: err.message });
// //   }
// // };

// // exports.generateTestReportFromBooking = async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;

// //     const booking = await LabBooking.findById(bookingId)
// //       .populate('lab')
// //       .populate('patient')
// //       .populate('consultation');

// //     if (!booking) {
// //       return res.status(404).json({ message: 'Lab booking not found' });
// //     }

// //     const patient = booking.patient;
// //     const labId = booking.lab._id;
// //     const selectedTests = booking.selectedTests || [];
// //     const prescription =
// //       booking.consultation?.prescriptions || booking.prescription || [];

// //     // Create new lab report entries
// //     const newReports = selectedTests.map((test) => ({
// //       labId,
// //       testName: test,
// //       result: 'Pending',
// //       normalRange: 'N/A',
// //     }));

// //     // Save in patient record
// //     patient.labReports.push(...newReports);

// //     // Notify patient
// //     patient.notifications.push({
// //       type: 'report',
// //       message: `New lab report(s) generated for tests: ${selectedTests.join(', ')}`,
// //     });

// //     await patient.save();

// //     // Optionally store in separate collection
// //     await LabTestReport.insertMany(
// //       selectedTests.map((test) => ({
// //         labId,
// //         patientId: patient._id,
// //         testName: test,
// //         result: 'Pending',
// //         normalRange: 'N/A',
// //         prescription,
// //       }))
// //     );

// //     return res.status(201).json({
// //       message: 'Lab test report generated successfully',
// //       reports: newReports,
// //       prescription,
// //     });
// //   } catch (err) {
// //     console.error('Error generating test report:', err);
// //     return res.status(500).json({ message: 'Server Error', error: err.message });
// //   }
// // };














// // ff

// // exports.getConsultationPrescriptionsForLab = async (req, res) => {
// //   try {
// //     const { consultationId } = req.params;
// //     const labId = req.user.id; // from lab auth middleware

// //     // Optional: verify the lab exists (or authorized)
// //     const lab = await Lab.findById(labId);
// //     if (!lab) {
// //       return res.status(403).json({ message: 'Unauthorized lab user' });
// //     }

// //     // Find consultation by id
// //     const consultation = await Consultation.findById(consultationId)
// //       .populate('patient', 'name email')
// //       .populate('doctor', 'name email')
// //       .populate('clinic', 'name location');

// //     if (!consultation) {
// //       return res.status(404).json({ message: 'Consultation not found' });
// //     }

// //     // Optional: check if this lab is authorized to access this consultation
// //     // For example, check if the lab matches the lab for any of the tests advised
// //     const isAuthorized = consultation.testsAdvised?.some(test => test.lab?.toString() === labId.toString());
// //     if (!isAuthorized) {
// //       return res.status(403).json({ message: 'Access denied for this consultation' });
// //     }

// //     // Return the prescriptions and basic consultation info
// //     res.json({
// //       consultationId: consultation._id,
// //       patient: consultation.patient,
// //       doctor: consultation.doctor,
// //       prescriptions: consultation.prescriptions || [],
// //       testsAdvised: consultation.testsAdvised || [],
// //       consultationDate: consultation.consultationDate,
// //     });

// //   } catch (error) {
// //     console.error('Error fetching consultation prescriptions:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };


// // // For lab to view prescription for a given consultation (by patientId + consultationId)
// // exports.generatePrescriptionForLab = async (req, res) => {
// //   try {
// //     const { patientId } = req.params;
// //     const { consultationId } = req.query;

// //     if (!consultationId) {
// //       return res.status(400).json({ message: "Consultation ID required" });
// //     }

// //     // Find consultation that matches both
// //     const consultation = await Consultation.findOne({
// //       _id: consultationId,
// //       patient: patientId,
// //     })
// //       .populate("patient", "name email")
// //       .populate("doctor", "name email");

// //     if (!consultation) {
// //       return res.status(404).json({ message: "Consultation not found for that patient" });
// //     }

// //     // Generate PDF same as above
// //     const doc = new PDFDocument();
// //     res.setHeader("Content-Type", "application/pdf");
// //     res.setHeader("Content-Disposition", `inline; filename=prescription-${consultationId}.pdf`);
// //     doc.pipe(res);

// //     doc.fontSize(18).text("Prescription (Lab View)", { align: "center" });
// //     doc.moveDown();

// //     doc.fontSize(12).text(`Patient: ${consultation.patient.name}`);
// //     doc.text(`Doctor: ${consultation.doctor.name}`);
// //     doc.text(`Date: ${new Date(consultation.consultationDate).toLocaleString()}`);
// //     doc.moveDown();

// //     doc.font("Helvetica-Bold").text("Diagnosis:");
// //     doc.font("Helvetica").text(consultation.diagnosis?.primary || "-");
// //     doc.moveDown();

// //     doc.font("Helvetica.B").text("Prescriptions:");
// //     if (consultation.prescriptions && consultation.prescriptions.length > 0) {
// //       consultation.prescriptions.forEach((p, idx) => {
// //         doc
// //           .font("Helvetica")
// //           .text(
// //             `${idx + 1}. ${p.medicine} | ${p.dosage} | ${p.frequency} | ${p.duration} | ${p.instructions}`
// //           );
// //       });
// //     } else {
// //       doc.font("Helvetica").text("No prescriptions.");
// //     }

// //     doc.end();
// //   } catch (err) {
// //     console.error("PDF error (lab):", err);
// //     res.status(500).json({ message: "Error generating prescription PDF" });
// //   }
// // };




// // const getConsultationPrescriptionsForLab = async (req, res) => {
// //   const consultationId = req.params.id;
// //   const labId = req.user._id;

// //   if (!mongoose.Types.ObjectId.isValid(consultationId)) {
// //     return res.status(400).json({ error: "Invalid consultation ID" });
// //   }

// //   try {
// //     const consultation = await Consultation.findById(consultationId).lean();

// //     if (!consultation) {
// //       return res.status(404).json({ error: "Consultation not found" });
// //     }

// //     const isLabAllowed = consultation.testsAdvised?.some(
// //       (test) => test.lab?.toString() === labId.toString()
// //     );

// //     if (!isLabAllowed) {
// //       return res.status(403).json({ error: "Access denied" });
// //     }

// //     return res.status(200).json({
// //       prescriptions: consultation.prescriptions || [],
// //       consultation: {
// //         _id: consultation._id,
// //         diagnosis: consultation.diagnosis,
// //         doctorNotes: consultation.doctorNotes,
// //         testsAdvised: consultation.testsAdvised,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Error fetching prescriptions:", error);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // };

// // module.exports = {
// //   getConsultationPrescriptionsForLab,
// // };











// // exports.getConsultationPrescriptionsForLab = async (req, res) => {
// //   const consultationId = req.params.id;
// //   const labId = req.user._id;

// //   if (!mongoose.Types.ObjectId.isValid(consultationId)) {
// //     return res.status(400).json({ error: "Invalid consultation ID" });
// //   }

// //   try {
// //     const consultation = await Consultation.findById(consultationId).lean();

// //     if (!consultation) {
// //       return res.status(404).json({ error: "Consultation not found" });
// //     }

// //     const isLabAllowed = consultation.testsAdvised?.some(
// //       (test) => test.lab?.toString() === labId.toString()
// //     );

// //     if (!isLabAllowed) {
// //       return res.status(403).json({ error: "Access denied" });
// //     }

// //     res.status(200).json({
// //       prescriptions: consultation.prescriptions || [],
// //       consultation: {
// //         _id: consultation._id,
// //         diagnosis: consultation.diagnosis,
// //         doctorNotes: consultation.doctorNotes,
// //         testsAdvised: consultation.testsAdvised,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Error fetching prescriptions:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // };

// // // PDF route
// // exports.getPrescriptionPDFForLab = async (req, res) => {
// //   const consultationId = req.params.id;
// //   const labId = req.user._id;

// //   if (!mongoose.Types.ObjectId.isValid(consultationId)) {
// //     return res.status(400).json({ error: "Invalid consultation ID" });
// //   }

// //   try {
// //     const consultation = await Consultation.findById(consultationId);

// //     if (!consultation) {
// //       return res.status(404).json({ error: "Consultation not found" });
// //     }

// //     const isLabAllowed = consultation.testsAdvised?.some(
// //       (test) => test.lab?.toString() === labId.toString()
// //     );

// //     if (!isLabAllowed) {
// //       return res.status(403).json({ error: "Access denied" });
// //     }

// //     // Replace this with your actual logic to generate/fetch PDF
// //     const filePath = path.join(__dirname, "../pdfs", `${consultationId}.pdf`);
// //     if (!fs.existsSync(filePath)) {
// //       return res.status(404).json({ error: "Prescription PDF not found" });
// //     }

// //     res.setHeader("Content-Type", "application/pdf");
// //     fs.createReadStream(filePath).pipe(res);
// //   } catch (err) {
// //     console.error("Error fetching PDF:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // };

// // // Bookings for lab
// // exports.getLabBookings = async (req, res) => {
// //   try {
// //     const labId = req.user._id;
// //     const LabBooking = await LabBooking.find({ "consultation.testsAdvised.lab": labId })
// //       .populate("patient")
// //       .populate({
// //         path: "consultation",
// //         populate: { path: "testsAdvised.lab" },
// //       })
// //       .lean();

// //     res.status(200).json(bookings);
// //   } catch (err) {
// //     console.error("Error fetching lab bookings:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // };




// // // Generate test reports for a booking
// // exports.generateTestReportFromBooking = async (req, res) => {
// //   try {
// //     const { bookingId } = req.params;
// //     const labId = req.user.id;

// //     const booking = await LabBooking.findById(bookingId)
// //       .populate('patient')
// //       .lean();

// //       console.log("lab",bookingId,labId)

// //     if (!booking) {
// //       return res.status(404).json({ message: 'Lab booking not found' });
// //     }

// //     // if (String(booking.lab) !== String(labId)) {
// //     //   return res.status(403).json({ message: 'Not authorized for this booking' });
// //     // }

// //     const patient = booking.patient;
// //     const selectedTests = booking.selectedTests || [];

// //     // Use consultation's prescriptions if present, else booking-level prescription
// //     const prescription = booking.consultation?.prescriptions || booking.prescription || [];

// //     // Prepare reports
// //     const reportDocs = selectedTests.map(testName => ({
// //       labId,
// //       patientId: patient._id,
// //       testName,
// //       result: "Pending",
// //       normalRange: "N/A",
// //       prescription,
// //       status: "Pending"
// //     }));

// //     // Insert reports
// //     const inserted = await LabTestReport.insertMany(reportDocs);

// //     // Optional: embed reports in Patient model (if you track reports in patient doc)
// //     await Patient.findByIdAndUpdate(patient._id, {
// //       $push: {
// //         labReports: inserted.map(r => ({
// //           labId: r.labId,
// //           testName: r.testName,
// //           result: r.result,
// //           normalRange: r.normalRange,
// //         }))
// //       }
// //     });

// //     // Simplify response
// //     const responseReports = inserted.map(r => ({
// //       _id: r._id,
// //       testName: r.testName,
// //       result: r.result,
// //       normalRange: r.normalRange,
// //       status: r.status,
// //     }));

// //     return res.status(201).json({
// //       message: 'Lab test report generated successfully',
// //       reports: responseReports,
// //     });
// //   } catch (err) {
// //     console.error('Error generating test report:', err);
// //     return res.status(500).json({ message: 'Server Error', error: err.message });
// //   }
// // };






// // Generate lab test reports by comparing booking's selectedTests with lab's availableTests
// exports.generateTestReportFromBooking = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const labId = req.user.id;

//     // 1. Fetch the booking with patient populated
//     const booking = await LabBooking.findById(bookingId).populate('patient').lean();

//     if (!booking) {
//       return res.status(404).json({ message: 'Lab booking not found.' });
//     }

//     const selectedTests = booking.selectedTests || [];
//     const patient = booking.patient;

//     if (!selectedTests.length) {
//       return res.status(400).json({ message: 'No tests selected in the booking.' });
//     }

//     // 2. Fetch lab's available tests
//     const lab = await Lab.findById(labId).lean();
//     if (!lab || !lab.availableTests || !lab.availableTests.length) {
//       return res.status(400).json({ message: 'Lab has no available tests.' });
//     }

//     // 3. Case-insensitive match of selectedTests with availableTests
//     const matchedTests = selectedTests
//       .map((testName) =>
//         lab.availableTests.find(
//           (t) => t.name.toLowerCase().trim() === testName.toLowerCase().trim()
//         )
//       )
//       .filter(Boolean); // Remove any undefined matches

//     if (!matchedTests.length) {
//       return res.status(400).json({ message: 'No matching tests found in lab records.' });
//     }
// consol.log('matchedTests',matchedTests)
//     // 4. Prepare test report documents
//     const reportDocs = matchedTests.map((test) => ({
//       labId,
//       patientId: patient._id,
//       bookingId: booking._id,
//       testName: test.name,
//       cost: test.cost || 0,
//       normalRange: test.normalRange || 'N/A',
//       result: 'Pending',
//       status: 'Pending',
//     }));

//     // 5. Insert reports into LabTestReport collection
//     const insertedReports = await LabTestReport.insertMany(reportDocs);

//     // 6. Optional: add to Patient record
//     await Patient.findByIdAndUpdate(patient._id, {
//       $push: {
//         labReports: insertedReports.map((r) => ({
//           labId: r.labId,
//           testName: r.testName,
//           result: r.result,
//           normalRange: r.normalRange,
//         })),
//       },
//     });

//     // 7. Respond with created reports
//     return res.status(201).json({
//       message: 'Lab test report(s) generated successfully.',
//       reports: insertedReports.map((r) => ({
//         _id: r._id,
//         testName: r.testName,
//         cost: r.cost,
//         result: r.result,
//         normalRange: r.normalRange,
//         status: r.status,
//       })),
//     });
//   } catch (err) {
//     console.error('Error generating lab test report:', err);
//     return res.status(500).json({
//       message: 'Server error while generating test report.',
//       error: err.message,
//     });
//   }
// };






// // Fetch test reports by booking
// exports.getTestReportsByBooking = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const labId = req.user.id;

//     const booking = await LabBooking.findById(bookingId).lean();
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     if (String(booking.lab) !== String(labId)) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const reports = await LabTestReport.find({
//       labId,
//       patientId: booking.patient,
//       testName: { $in: booking.selectedTests },
//     }).lean();

//     res.json({ reports });
//   } catch (err) {
//     console.error("Error in getTestReportsByBooking:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };




// exports.submitLabTestResult = async (req, res) => {
//   try {
//     const labId = req.user.id;
//     const { bookingId, testName, result } = req.body;

//     if (!bookingId || !testName || !result || result.trim().length === 0) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const booking = await LabBooking.findById(bookingId).populate('patient');
//     if (!booking) return res.status(404).json({ message: 'Booking not found' });

//     const lab = await Lab.findById(labId).lean();
//     if (!lab) return res.status(404).json({ message: 'Lab not found' });

//     const test = lab.availableTests.find(
//       t => t.name.toLowerCase().trim() === testName.toLowerCase().trim()
//     );
//     if (!test) return res.status(400).json({ message: 'Test not found in lab.' });

//     const reportData = {
//       labId,
//       bookingId,
//       patientId: booking.patient._id,
//       testName: test.name,
//       cost: test.cost || 0,
//       normalRange: test.normalRange || 'N/A',
//       result: result.trim(),
//       status: 'Completed',
//     };

//     const newReport = await LabTestReport.create(reportData);

//     await Patient.findByIdAndUpdate(booking.patient._id, {
//       $push: {
//         labReports: {
//           _id: newReport._id,
//           labId,
//           bookingId,
//           testName: test.name,
//           result: result.trim(),
//           cost: test.cost || 0,
//           normalRange: test.normalRange || 'N/A',
//           uploadedAt: new Date(),
//         }
//       }
//     });

//     res.status(201).json({
//       message: 'Test result submitted successfully.',
//       reportId: newReport._id,
//       report: newReport,
//     });

//   } catch (err) {
//     console.error('Submit Lab Test Error:', err);
//     res.status(500).json({
//       message: 'Failed to submit test result',
//       error: err.message
//     });
//   }
// };



exports.submitLabTestResult = async (req, res) => {
  try {
    const labId = req.user.id;
    const { bookingId, testName, result } = req.body;

    if (!bookingId || !testName || !result || result.trim().length === 0) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 1️⃣ Validate booking and lab
    const booking = await LabBooking.findById(bookingId).populate("patient");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const lab = await Lab.findById(labId).lean();
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    // 2️⃣ Find the test in lab.availableTests
    const test = lab.availableTests.find(
      (t) => t.name.toLowerCase().trim() === testName.toLowerCase().trim()
    );
    if (!test)
      return res.status(400).json({ message: "Test not found in lab." });

    // 3️⃣ Pre-generate a single ObjectId
    const reportId = new mongoose.Types.ObjectId();

    // 4️⃣ Build report data
    const reportData = {
      _id: reportId, // use the pre-generated id
      labId,
      bookingId,
      patientId: booking.patient._id,
      testName: test.name,
      cost: test.cost || 0,
      normalRange: test.normalRange || "N/A",
      result: result.trim(),
      status: "Completed",
    };

    // 5️⃣ Create report with custom _id
    const newReport = await LabTestReport.create(reportData);

    // 6️⃣ Push the same report _id to patient's labReports array
    await Patient.findByIdAndUpdate(booking.patient._id, {
      $push: {
        labReports: {
          _id: reportId, // ✅ same id used here
          labId,
          bookingId,
          testName: test.name,
          result: result.trim(),
          cost: test.cost || 0,
          normalRange: test.normalRange || "N/A",
          uploadedAt: new Date(),
        },
      },
    });

    res.status(201).json({
      message: "Test result submitted successfully.",
      reportId,
      report: newReport,
    });
  } catch (err) {
    console.error("Submit Lab Test Error:", err);
    res.status(500).json({
      message: "Failed to submit test result",
      error: err.message,
    });
  }
};





exports.getTestsFromBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const labId = req.user.id;

    const booking = await LabBooking.findById(bookingId).populate('patient').lean();
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const selectedTests = booking.selectedTests || [];
    if (!selectedTests.length) return res.status(400).json({ message: 'No tests selected.' });

    const lab = await Lab.findById(labId).lean();
    if (!lab || !lab.availableTests) {
      return res.status(400).json({ message: 'Lab or tests not found.' });
    }

    const matchedTests = selectedTests.map(testName =>
      lab.availableTests.find(
        t => t.name.toLowerCase().trim() === testName.toLowerCase().trim()
      )
    ).filter(Boolean);

    if (!matchedTests.length) {
      return res.status(400).json({ message: 'No matching tests found' });
    }

    // Construct labInfo
    const labInfo = {
      name: lab.name || 'N/A',
      email: lab.email || 'N/A',
      phone: lab.phone || 'N/A',
      address: lab.address || 'N/A'
    };

    // Construct patientInfo
    const patient = booking.patient;
    const patientInfo = {
      name: patient.name || 'N/A',
      email: patient.email || 'N/A',
      contact: patient.phone || patient.contact.phone || 'N/A',
      age: patient.age || 'N/A',
      gender: patient.gender || 'N/A',
      bookingDate: patient.bookingDate || null
    };

    return res.status(200).json({
      lab: labInfo,
      patient: patientInfo,
      tests: matchedTests
    });
  } catch (err) {
    console.error('Error in getTestsFromBooking:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};










// const path = require("path");
// const fs = require("fs");
// // (Assume PDF generation logic is elsewhere or integrated)

// exports.getReportStatus = async (req, res) => {
//   const { bookingId } = req.params;
//   const report = await LabTestReport.findOne({ bookingId }).lean();
//   if (!report) {
//     return res.status(404).json({ message: "Report not found" });
//   }
//   res.json({
//     paymentStatus: report.paymentStatus,
//     pdfUrl: report.pdfUrl,  // may be null if not generated yet
//     cost: report.cost,
//   });
// };







// exports.getPatientLabReportByLabId = async (req, res) => {
//   const { patientId, labId } = req.params;

//   try {
//     const patient = await Patient.findById(patientId).lean();
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const report = patient.labReports.find(
//       (r) => r.labId.toString() === labId.toString()
//     );

//     if (!report) {
//       return res.status(404).json({ message: "Lab report not found for this labId" });
//     }

//     res.json({ report });
//   } catch (error) {
//     console.error("Error fetching lab report:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// exports.getPatientLabReportById = async (req, res) => {
//   // const { patientId, reportId } = req.params;
// const { reportId } = req.params;
// const patient = await Patient.findById(req.user.id);

//   try {
//     const patient = await Patient.findById(patientId).lean();
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const report = patient.labReports.find(
//       (r) => r._id.toString() === reportId.toString()
//     );

//     if (!report) {
//       return res.status(404).json({ message: "Lab report not found for this report ID" });
//     }

//     // Optional: populate additional data if needed
//     const lab = await Lab.findById(report.labId).lean();
//     const fullReport = {
//       ...report,
//       patient: {
//         name: patient.name,
//         email: patient.email,
//         gender: patient.gender,
//         age: patient.age,
//         contact: patient.contact
//       },
//       lab: lab
//         ? {
//             name: lab.name,
//             email: lab.email,
//             phone: lab.phone,
//             address: lab.address
//           }
//         : null
//     };

//     res.json({ report: fullReport });
//   } catch (error) {
//     console.error("Error fetching lab report:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// exports.getPatientLabReportById = async (req, res) => {
//   const { reportId } = req.params;

//   try {
//     const patient = await Patient.findById(req.user.id).lean();

//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     const report = patient.labReports.find(
//       (r) => r._id.toString() === reportId.toString()
//     );

//     if (!report) {
//       return res.status(404).json({ message: "Lab report not found for this report ID" });
//     }

//     const lab = await Lab.findById(report.labId).lean();

//     const fullReport = {
//       ...report,
//       patient: {
//         name: patient.name,
//         email: patient.email,
//         gender: patient.gender,
//         age: patient.age,
//         contact: patient.contact,
//       },
//       lab: lab
//         ? {
//             name: lab.name,
//             email: lab.email,
//             phone: lab.phone,
//             address: lab.address,
//           }
//         : null,
//     };

//     res.json({ report: fullReport });
//   } catch (error) {
//     console.error("Error fetching lab report:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// exports.payForReport = async (req, res) => {
//   const { bookingId } = req.params;
//   const { paymentIntentId } = req.body;  // from Stripe or payment gateway

//   // validate booking & report
//   const report = await LabTestReport.findOne({ bookingId });
//   if (!report) return res.status(404).json({ message: "Report not found" });

//   if (report.paymentStatus === "Paid") {
//     return res.status(400).json({ message: "Already paid" });
//   }

//   // **Integration with Stripe** (example)
//   // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//   // if (paymentIntent.status !== "succeeded") throw error
//   // You may also confirm payment here

//   // Mark as paidFGFBGB
//   report.paymentStatus = "Paid";
//   await report.save();


//   // Optionally mark booking
//   await LabBooking.findByIdAndUpdate(bookingId, { reportPaid: true });

//   res.json({ message: "Payment successful" });
// };





// exports.createPaymentIntent = async (req, res) => {
//   const { reportId } = req.params;
// console.log('reportId',reportId)
//   try {
//     const report = await LabTestReport.findById(reportId);
//     if (!report) return res.status(404).json({ message: "Report not found" });

//     if (report.paymentStatus === "Paid") {
//       return res.status(400).json({ message: "Already paid" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(report.cost * 100), // in paisa
//       currency: "inr",
//       metadata: {
//         reportId: report._id.toString(),
//         bookingId: report.bookingId.toString(), 
//       },
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
    
//     });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     res.status(500).json({ message: "Payment failed to initialize." });
//   }
// };



// exports.confirmPayment = async (req, res) => {
//   const { reportId } = req.params;
//   const { paymentIntentId } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
// console.log('paymentIntent',paymentIntent)
//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ message: "Payment not successful." });
//     }

//     const report = await LabTestReport.findById(reportId);
//     if (!report) return res.status(404).json({ message: "Report not found" });

//     report.paymentStatus = "Paid";
//     await report.save();

//     await LabBooking.findByIdAndUpdate(report.bookingId, { reportPaid: true });

//     res.json({ message: "Payment confirmed and report unlocked." });
//   } catch (err) {
//     console.error("Payment confirmation error:", err);
//     res.status(500).json({ message: "Could not confirm payment" });
//   }
// };


// exports.downloadReport = async (req, res) => {
//   const { reportId } = req.params;

//   try {
//     const report = await LabTestReport.findById(reportId);
//     if (!report) return res.status(404).json({ message: "Report not found" });

//     if (report.paymentStatus !== "Paid") {
//       return res.status(403).json({ message: "Payment required to download report" });
//     }

//     const pdfPath = report.pdfUrl; // Should be a full file system path or URL
//     if (!pdfPath) {
//       return res.status(404).json({ message: "PDF not available" });
//     }

//     // If you're storing the file locally
//     return res.download(pdfPath);

//     // OR: If stored in S3 or external, redirect:
//     // return res.redirect(pdfPath);
//   } catch (error) {
//     console.error("Download error:", error);
//     res.status(500).json({ message: "Failed to download report" });
//   }
// };


























// exports.confirmPayment = async (req, res) => {
//   const { bookingId } = req.params;
//   const { paymentIntentId } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ message: "Payment not successful." });
//     }

//     const report = await LabTestReport.findOne({ bookingId });
//     if (!report) return res.status(404).json({ message: "Report not found" });

//     report.paymentStatus = "Paid";
//     await report.save();

//     await LabBooking.findByIdAndUpdate(bookingId, { reportPaid: true });

//     res.json({ message: "Payment confirmed and report unlocked." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Could not confirm payment" });
//   }
// };


// exports.downloadReport = async (req, res) => {
//   const { bookingId } = req.params;
//   const report = await LabTestReport.findOne({ bookingId });
//   if (!report) return res.status(404).json({ message: "Report not found" });

//   if (report.paymentStatus !== "Paid") {
//     return res.status(403).json({ message: "Payment required to download report" });
//   }

//   // Send PDF file or URL
//   const pdfPath = report.pdfUrl; 
//   if (!pdfPath) {
//     return res.status(404).json({ message: "PDF not generated yet" });
//   }

//   // Example: if local file
//   return res.download(pdfPath);  // this sends the file
// };









// exports.createPaymentIntent = async (req, res) => {
//   const { bookingId } = req.params;

//   const report = await LabTestReport.findOne({ bookingId });
//   if (!report) return res.status(404).json({ message: "Report not found" });

//   if (report.paymentStatus === "Paid") {
//     return res.status(400).json({ message: "Already paid" });
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(report.cost * 100), // cost in paisa
//       currency: "inr",
//       metadata: {
//         bookingId,
//         reportId: report._id.toString(),
//       },
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe error:", error);
//     res.status(500).json({ message: "Payment failed to initialize." });
//   }
// };








exports.loginLab = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lab = await Lab.findOne({ email });
    if (!lab) return res.status(404).json({ message: "Lab not found" });

    const match = await bcrypt.compare(password, lab.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    // 🚫 Require both clinic & admin approval before allowing login
    if (!lab.clinicApproved && !lab.adminApproved) {
      return res.status(403).json({
        message: "Lab is not approved yet. Please wait for clinic and admin approval.",
      });
    }

    const token = jwt.sign(
      { id: lab._id, role: "lab" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    lab.lastLogin = new Date();
    await lab.save();

    res.json({ token, lab });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};












exports.getAlllabs = async (req, res) => {
  try {
    const labs = await Lab.find()
    // .populate('clinicId doctorId patientId labId  superadminId');
    if (!labs) return res.status(404).jason({ message: "labs not found" });
    res.json(labs)
  } catch (err) {
    res.status(500).json({ message: err.message });

  }
};







// Get Prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const { labId } = req.params;
    const lab = await Lab.findById(labId).populate("prescriptions");
    res.json(lab.prescriptions || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Available Test
exports.addTest = async (req, res) => {
  try {
    const { labId } = req.params;
    const test = req.body;

    const lab = await Lab.findByIdAndUpdate(
      labId,
      { $push: { availableTests: test } },
      { new: true }
    );

    res.json({ message: "Test added", lab });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Generate Bill
exports.generateBill = async (req, res) => {
  try {
    const { labId } = req.params;
    const bill = req.body; // patientId, amount, description

    const lab = await Lab.findByIdAndUpdate(
      labId,
      { $push: { bills: bill } },
      { new: true }
    );

    res.status(201).json({ message: "Bill generated", lab });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Upload Test Report
exports.uploadTestReport = async (req, res) => {
  try {
    const { labId } = req.params;
    const report = req.body; // patientId, testName, result, normalRange, fileUrl

    const lab = await Lab.findByIdAndUpdate(
      labId,
      { $push: { testReports: { ...report, uploadedAt: new Date() } } },
      { new: true }
    );

    res.status(201).json({ message: "Report uploaded", lab });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Payments
exports.getPayments = async (req, res) => {
  try {
    const { labId } = req.params;
    const lab = await Lab.findById(labId);
    res.json(lab.payments || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
