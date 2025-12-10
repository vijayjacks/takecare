// routes/labRoutes.js
const express = require("express");
const router = express.Router();
const labController = require("../controllers/labController.js");
const { protect, authorize } = require("../middleware/auth");

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // or use cloud storage later

// ✅ Public Routes
router.post("/register", labController.registerLab);
router.post("/login", labController.loginLab);





// Get all registered labs
router.get("/all",
   protect, authorize("superadmin", "admin", "clinic","patient","lab"), labController.getAllLabs); 
// router.get('/', protect, authorize("superadmin", "admin", "clinic","patient","lab"),labController.getAlllabs);



// Approve a lab by clinic
router.put("/approve-lab/:labId", protect, authorize("clinic", "admin"), labController.approveLabByClinic);

router.put("/:labId/approve-admin",  protect, authorize("clinic", "admin"),labController.approveLabByAdmin);


router.get('/:labId/tests', protect, authorize( "clinic","patient","lab"),  labController.getLabTests);
router.post('/:labId/book', protect,  authorize( "clinic","patient","lab"), labController.bookLabTests);



// Get all lab bookings for logged-in lab user
router.get("/bookings/my", protect, authorize("lab"), labController.getLabBookings);

// Get detailed booking info
router.get("/bookings/:bookingId/details", protect, authorize("lab"), labController.getBookingDetails);

// Download or preview PDF
router.get("/bookings/:bookingId/pdf", protect, authorize("lab"), labController.getBookingPdf);



// router.post("/:labId/reports", protect, authorize("lab",'patient'), labController.genaratelabrtestreport);

// router.post('/:labId/generate-report', protect, authorize("lab",'patient'),labController.generateLabReport)// ;







// router.post('/:labId/:patientId/generate-report', protect, authorize("lab",'patient'), labController.generateLabReport);




// router.post(
//   '/bookings/:bookingId/generate-report',
//   protect,
//   authorize('lab'),
//   labController.generateTestReportFromBooking
// );


   // router.post('/:labBookingId/generate-report', protect, authorize("lab",'patient'), labController.generateLabReport);













// Your route must be registered like this (make sure path and method are correct)
router.post(
  '/generate-report/:bookingId',
  protect,
  authorize('lab', 'patient'),
  labController.getTestsFromBooking
);

router.post(
  '/submit-report',
  protect,
  authorize('lab','patient'),
  labController.submitLabTestResult
);













//payment

// router.get(
//   '/patient/labReport/:reportId', // singular labReport
//   protect,
//   authorize('patient'),
//   labController.getPatientLabReportById
// );




// router.get('/reports/:reportId/download', protect, labController.downloadReport);


// // Stripe payment routes
// router.post('/reports/:reportId/create-payment-intent', protect, labController.createPaymentIntent);
// router.post('/reports/:reportId/confirm-payment', protect, labController.confirmPayment);

















// router.get('/reports/:bookingId', protect, labController.getReportStatus);


// router.put(
//   '/update-report/:reportId',
//   protect,
//   authorize('lab', 'patient'),
//   labController.updateTestResult
// );






// router.post('/generate-report/:bookingId',  protect, authorize('lab','patient'), labController.generateTestReportFromBooking);
// router.put('/update-report/:reportId', protect, authorize('lab','patient'), labController.updateTestResult);











   
// router.post(
//   '/bookings/:bookingId/generate-report',
//   protect,
//   authorize('lab','patient'),
//   labController.generateTestReportFromBooking
// );


// router.get(
//   '/bookings/:bookingId/test-reports',
//   protect,
//   authorize('lab','patient'),
//   labController.getTestReportsByBooking
// );









// router.post(
//   '/:labId/generate-report',
//   protect,
//   authorize('lab', 'patient'),
//   upload.single('file'),
//   labController.generateLabReport
// );


// 💰 View lab-related payments
router.get("/:labId/payments", labController.getPayments);


















// // Patient route: download / preview their consultation PDF
// router.get("/:consultationId/download", protect, authorize("lab"), labController.generateConsultationPdf);


// Route: GET /api/labs/consultation/:id/prescriptions
// router.get(
//   "/consultation/:id/prescriptions",
//   protect,
//   authorize("lab"),
//   labController.getConsultationPrescriptionsForLab
// );













// router.get(
//   "/consultation/:id/prescriptions",
//   protect,
//   authorize("lab"),
//   labController.getConsultationPrescriptionsForLab
// );

// router.get(
//   "/prescription/:id", // PDF download
//   protect,
//   authorize("lab"),
//   labController.getPrescriptionPDFForLab
// );

// Lab route: lab views prescription for a patient + consultation
// router.get("prescription/:patientId", protect, authorize("lab"), labController.generatePrescriptionForLab);

module.exports = router;









// ✅ Protected Routes — accessible only to users with role "lab"
// router.use(protect, authorize("lab"));

// 🔍 View prescriptions relevant to lab
// router.get("/:labId/prescriptions", labController.getPrescriptions);

// // ➕ Add available diagnostic test
// router.post("/:labId/tests", labController.addTest);

// 💳 Generate a bill for patient

// 📄 Upload a test report

module.exports = router;
