const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const { protect, authorize } = require("../middleware/auth");
const upload = require('../middleware/upload');

//Doctorregister
router.post("/register",upload.single("profileImage"),doctorController.registerDoctor);

//Doctor login
router.post("/login", doctorController.loginDoctor);


//doctordashboard
router.get('/dashboard',  doctorController.getAllDoctors);

//getalldoctor by clinic
router.get('/Approvedoctor',  protect, authorize("doctor","superadmin","clinic","patient"),doctorController.getAllDoctors);

// Only 'admin' (clinic admin) can approve
router.put("/approve/:doctorId", protect, authorize("doctor","superadmin","clinic","patient"), doctorController.approveDoctor);

// Upload profile image
router.post('/upload-photo', protect, authorize('doctor'), upload.single('image'), doctorController.uploadProfileImage);


// Get doctor profile by ID
router.get('/profile/:id', protect, authorize('doctor', 'clinic', 'superadmin'), doctorController.getDoctorProfileById);


// Update doctor profile by ID
router.patch('/profile/:doctorId', protect, authorize('doctor', 'clinic', 'superadmin'), doctorController.updateDoctorProfile);


// Get notifications
router.get('/notifications', protect, authorize('doctor'), doctorController.getDoctorNotifications);

// Mark a single notification as read
router.patch('/notifications/:id/read', protect, authorize('doctor'), doctorController.markNotificationAsRead);


// Get unread notification count
router.get('/notifications-count', protect, authorize('doctor'), doctorController.getNotificationCount);


router.post('/:doctorId/available-slots/',protect, authorize('doctor','clinic','patient','superadmin'),doctorController.getAvailableSlotsByWeekAvailability);


router.get("/:doctorId/patients",protect,authorize("doctor"),doctorController.getPatientsByDoctor);


// Send WhatsApp meet link to patient
// router.post('/send-meetlink-whatsapp',  doctorController.sendMeetLinkToPatient);



router.post("/send-meetlink-whatsapp",  doctorController.sendMeetLink);

module.exports = router;




// Fetch doctor by ID
router.get('/:doctorId', // protect,authorize("superadmin', 'doctor,'patient"),
doctorController.getDoctorById);




// // 🔐 Protected Routes (Doctor role only)
// router.get(
//   "/:doctorId/appointments",
//   protect,
//   authorize("doctor"),
//   doctorController.getDoctorAppointments
// );




router.post(
  "/:doctorId/prescriptions",
  protect,
  authorize("doctor"),
  doctorController.generatePrescription
);

router.get(
  "/:doctorId/test-results",
  protect,
  authorize("doctor"),
  doctorController.getTestResults
);

router.get(
  "/:doctorId/payments",
  protect,
  authorize("doctor"),
  doctorController.getPayments
);

router.post(
  "/:doctorId/notifications",
  protect,
  authorize("doctor"),
  doctorController.sendNotification
);

router.post(
  "/:doctorId/reports",
  protect,
  authorize("doctor"),
  doctorController.uploadReport
);

module.exports = router;
