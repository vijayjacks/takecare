const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const { protect, authorize } = require("../middleware/auth");
const upload = require('../middleware/upload');

const suggestedLabController = require("../controllers/suggestedLabController");// 🚪 Public Routes
router.post("/register", patientController.registerPatient);
router.post("/login", patientController.loginPatient);


//patient booking to doctor
// router.post('/bookAppointment/:id',protect, authorize("patient"), patientController.bookAppointment);

 
router.get('/search', protect, authorize("patient"), patientController.searchDoctorsByAvailability);



// Public or protected based on your app — adjust `protect`/`authorize` as needed
router.get('/profile/:id', protect, authorize('patient', 'admin'), patientController.getPatientById);
router.patch('/profile/:id', protect, authorize('patient', 'admin'), patientController.updatePatientById);

router.post('/upload-photo', protect, authorize('patient'), upload.single('image'), patientController.uploadPatientPhoto);


router.get('/notifications', protect, authorize('patient'), patientController.getNotifications);
router.get('/notifications-count', protect, authorize('patient'), patientController.getUnreadNotificationCount);
router.patch('/notifications/:notifId/read', protect, authorize('patient'), patientController.markNotificationAsRead);


// for all reports
router.get('/:patientId/labreports', protect, authorize('patient'),patientController.getLabReportsByPatientId);
  
router.get("/:patientId/lab-reports", protect, authorize('patient'),patientController.getPaidLabReports);





// ✅ Route for single report details
router.get('/:patientId/labreports/:reportId',protect,authorize('patient'),patientController.getLabReportByPatientAndReportId);


// router.get(
//   '/:patientId/:reportId/labreports', // for single report
//   protect,
//   authorize('patient'),
//   patientController.getLabReportsByPatientId
// );

// router.get('/:patientId/:reportId/labreports', protect, authorize('patient'),patientController.getLabReportsByPatientId);






module.exports = router;









//get all patients
router.get("/", protect, authorize("superadmin','admin', 'clinic', 'doctor', 'lab', 'pharmacy', 'patient"), patientController.getAllPatients);



// ✅ GET Suggested Labs and Tests for a patient
router.get(
  "/suggestedLabs", protect, authorize("patient"), suggestedLabController.SuggestedLabsWithTests);


router.get(
  '/my-consultations', 
  protect, 
  authorize('patient','lab'), 
  patientController.getMyConsultations
);






// 🔐 Protected Routes (Patient role only)
// router.get("/:id", protect, authorize("patient"), patientController.getPatientById);
// router.put("/:id", protect, authorize("patient"), patientController.updatePatient);
// router.delete("/:id", protect, authorize("patient"), patientController.deletePatient);

// 🩺 Doctor Assignment
// router.put("/:id/assign-doctor", protect, authorize("patient"), patientController.assignDoctor);









// 📝 Medical Records & Reports
router.put("/:id/add-medical-record", protect, authorize("patient"), patientController.addMedicalRecord);
router.put("/:id/add-report", protect, authorize("patient"), patientController.addReport);

// 📩 Notifications
router.put("/:id/add-notification", protect, authorize("patient"), patientController.addNotification);

// 💳 Payments
router.put("/:id/add-payment", protect, authorize("patient"), patientController.addPayment);

// ⚙️ Status Update
router.put("/:id/status", protect, authorize("patient"), patientController.updatePatientStatus);

// 💊 Medicine/Test Requests
router.post("/:id/request-medicine", protect, authorize("patient"), patientController.requestMedicine);
router.post("/:id/request-test", protect, authorize("patient"), patientController.requestTest);

// 📃 View Prescriptions & Test Results
router.get("/:id/prescriptions", protect, authorize("patient"), patientController.viewPrescriptions);
router.get("/:id/test-results", protect, authorize("patient"), patientController.viewTestResults);

module.exports = router;
