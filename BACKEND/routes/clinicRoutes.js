const express = require("express");
const router = express.Router();
const clinicController = require("../controllers/clinicController");
const { protect, authorize } = require("../middleware/auth");

// 🔐 Authentication
router.post("/register", clinicController.registerClinic);  
router.post("/login", clinicController.loginClinic);        


//get all clinic
router.get('/', clinicController.getAllClinics);


// 📋 Clinic Info (Protected)
router.get("/:clinicId",  clinicController.getClinicById);



// router.post("/registerationfee", clinicController.createClinicRegistrationPayment);
router.post("/registerationfee", clinicController.createClinicRegistrationCheckout);

router.post("/confirm-registration", clinicController.confirmClinicRegistration);

// ✅ Get all registrations for a clinic
router.get("/:clinicId/registrations",  clinicController.getClinicRegistrations);


router.get("/:clinicId/registration/:patientId", clinicController.checkClinicRegistration);



// // Get doctors by clinic ID and Specialization
router.post('/:clinicId/doctors', clinicController.getDoctorsBySpecialization);



    // Clinic can only view appointments (no doctor assignment)
    router.get('/ClinicAppointmentsview/:clinicId', protect, authorize('clinic'),clinicController. getClinicAppointments);

    // Clinic can confirm or reject booking
    router.put('/updateStatus/:appointmentId', protect, authorize('clinic'), clinicController.updateAppointmentStatus);


    

router.put("/:clinicId", protect, authorize("superadmin", "admin"), clinicController.updateClinic);
router.delete("/:clinicId", protect, authorize("superadmin"), clinicController.deleteClinic);


// Route to sync latest vitals into patient
// router.put('/patient/:patientId/sync-vitals',protect,authorize('clinic', 'patient', 'consultation'),
//   clinicController.syncLatestVitalsToPatient
// );


// router.put(
//   '/patient/:patientId/sync-vitals',
//   protect,
//   authorize('clinic', 'doctor'),
//   clinicController.syncLatestVitalsToPatient
// );


// routes/clinic.js
router.post('/patient/:patientId/vitals', protect, authorize('clinic'), clinicController.addVitals);
router.put('/patient/:patientId/sync-vitals', protect, authorize('clinic', 'doctor'), clinicController.syncLatestVitalsToPatient);
// router.get('/patient/:patientId/vitals/history', protect, authorize('clinic', 'doctor'), clinicController.getVitalsHistory);






// 🧪 Lab Test Management
router.post("/:clinicId/tests", protect, authorize("clinic", "admin"), clinicController.addTest);
router.get("/:clinicId/tests", protect, authorize("clinic", "admin", "doctor"), clinicController.getAllTests);

// 💊 Medicine Management
router.post("/:clinicId/medicines", protect, authorize("clinic", "pharmacy", "admin"), clinicController.addMedicine);
router.get("/:clinicId/medicines", protect, authorize("clinic", "admin", "doctor"), clinicController.getAllMedicines);

// 💵 Payments
router.get("/:clinicId/payments", protect, authorize("clinic", "billing-staff", "admin"), clinicController.getPayments);

// 📄 Bills
router.get("/:clinicId/bills", protect, authorize("clinic", "billing-staff", "admin"), clinicController.getBills);

// 📜 Prescriptions
router.get("/:clinicId/prescriptions", protect, authorize("clinic", "doctor", "admin"), clinicController.getPrescriptions);

// 📤 Reports
router.post("/:clinicId/reports", protect, authorize("clinic", "lab", "admin"), clinicController.uploadReport);
router.get("/:clinicId/reports", protect, authorize("clinic", "lab", "doctor", "admin"), clinicController.getReports);

// 📆 Bookings
router.get("/:clinicId/bookings", protect, authorize("clinic", "receptionist", "admin"), clinicController.getBookings);

// 👥 Staff Management (Optional)
router.get("/:clinicId/staff", protect, authorize("clinic", "admin"), clinicController.getAllStaff);

module.exports = router;
