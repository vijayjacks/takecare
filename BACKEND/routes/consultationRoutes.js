


// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { protect, authorize } = require('../middleware/auth');

// const {
//   createConsultation,
//   getAllConsultations,
//   getConsultationById,
//   updateConsultation,
//   deleteConsultation,
//   uploadReportFile,
//   downloadConsultationPdf,
// } = require('../controllers/consultationController');

// const upload = multer({ dest: 'uploads/' });

// // Upload report file – Only doctors
// router.post(
//   '/:id/upload-report',
//   protect,
//   authorize('doctor'),
//   upload.single('file'),
//   uploadReportFile
// );

// // Create consultation – Only doctors
// router.post(
//   '/',
//   protect,
//   authorize('doctor'),
//   createConsultation
// );

// // Get all consultations – Doctors, clinics, patients, superadmin
// router.get(
//   '/',
//   protect,
//   authorize('doctor', 'clinic', 'patient', 'superadmin'),
//   getAllConsultations
// );

// // Get single consultation
// router.get(
//   '/:id',
//   protect,
//   authorize('doctor', 'clinic', 'patient', 'superadmin'),
//   getConsultationById
// );

// // Update consultation – Only doctors
// router.put(
//   '/:id',
//   protect,
//   authorize('doctor'),
//   updateConsultation
// );

// // Delete consultation – Doctors & Superadmin
// router.delete(
//   '/:id',
//   protect,
//   authorize('doctor', 'superadmin'),
//   deleteConsultation
// );

// // PDF download route
// router.get(
//   '/:id/pdf',
//   protect,
//   authorize('doctor', 'clinic', 'patient', 'superadmin'),
//   downloadConsultationPdf
// );

// module.exports = router;
























// // const express = require('express');
// // const router = express.Router();
// // const {
// //   createConsultation,
// //   getAllConsultations,
// //   getConsultationById,
// //   updateConsultation,
// //   deleteConsultation,
// //   uploadReportFile
// // } = require('../controllers/consultationController');

// // const multer = require('multer');
// // const { protect, authorize } = require('../middleware/auth');

// // const upload = multer({ dest: 'uploads/' }); // configure as needed

// // // Upload report file – Only doctors
// // router.post(
// //   '/:id/upload-report',
// //   protect,
// //   authorize('doctor'),
// //   upload.single('file'),
// //   uploadReportFile
// // );

// // // Create consultation – Only doctors
// // router.post(
// //   '/',
// //   protect,
// //   authorize('doctor'),
// //   createConsultation
// // );

// // // Get all consultations – Doctors, clinics, patients
// // router.get(
// //   '/',
// //   protect,
// //   authorize('doctor', 'clinic', 'patient', 'superadmin'),
// //   getAllConsultations
// // );

// // // Get consultation by ID – Doctors, clinics, patients
// // router.get(
// //   '/:id',
// //   protect,
// //   authorize('doctor', 'clinic', 'patient', 'superadmin'),
// //   getConsultationById
// // );

// // // Update consultation – Only doctors
// // router.put(
// //   '/:id',
// //   protect,
// //   authorize('doctor'),
// //   updateConsultation
// // );

// // // Delete consultation – Only doctors and superadmins
// // router.delete(
// //   '/:id',
// //   protect,
// //   authorize('doctor', 'superadmin'),
// //   deleteConsultation
// // );

// // module.exports = router;








const express = require('express');
const router = express.Router();
const {
  createConsultation,
  getConsultationAppointmentDetails,
  getConsultationByIdForPatient,
  downloadConsultationPdfForPatient,
  getAllConsultations,
  updateConsultation,
  deleteConsultation,
  uploadReportFile,
  downloadPdf,
  createCheckout,
  validatePayment,
  confirmConsultationPayment,getConsultationById,downloadConsultationPdf
} = require('../controllers/consultationController');

const upload = require('../utils/cloudinaryMulter');


const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('doctor'), createConsultation);

router.get('/:appointmentId',  protect,  authorize('doctor', 'clinic', 'patient'),  getConsultationAppointmentDetails);






// Get Consultation Details
router.get(
  '/con/:consultationId',
  protect,
  authorize('doctor', 'clinic', 'patient'),
  getConsultationById
);

// Download Consultation PDF
router.get(
  '/:consultationId/download',
  protect,
  authorize('doctor', 'clinic', 'patient'),
  downloadConsultationPdf
);






router.post("/create-checkout", createCheckout);
router.post("/confirm-payment", confirmConsultationPayment);
router.post("/validate-payment", validatePayment);



  // router.get('/:id', protect, authorize('doctor', 'clinic', 'patient'), getConsultationById);

// Route for patient to get consultation by ID
// router.get('/con/:id', protect, authorize('doctor', 'clinic', 'patient'), getConsultationByIdForPatient);

router.get('/:id/download', protect, authorize('patient'), downloadConsultationPdfForPatient);





router.get('/', protect, authorize('doctor', 'clinic', 'patient'), getAllConsultations);
router.put('/:id', protect, authorize('doctor'), updateConsultation);
router.delete('/:id', protect, authorize('doctor', 'superadmin'), deleteConsultation);


router.post('/:id/upload-report', protect, authorize('doctor'), upload.single('file'), uploadReportFile);

router.get('/:id/pdf', protect, authorize('doctor', 'patient', 'clinic'), downloadPdf);

module.exports = router;














// const express = require('express');
// const router = express.Router();
// const {
//   createConsultation,
//   getAllConsultations,
//   getConsultationById,
//   updateConsultation,
//   deleteConsultation,
//   uploadReportFile,
//   downloadPdf
// } = require('../controllers/consultationController');

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const { protect, authorize } = require('../middleware/auth');

// router.post('/', protect, authorize('doctor'), createConsultation);
// router.get('/', protect, authorize('doctor', 'clinic', 'patient'), getAllConsultations);
// router.get('/:id', protect, authorize('doctor', 'clinic', 'patient'), getConsultationById);
// router.put('/:id', protect, authorize('doctor'), updateConsultation);
// router.delete('/:id', protect, authorize('doctor', 'superadmin'), deleteConsultation);
// router.post('/:id/upload-report', protect, authorize('doctor'), upload.single('file'), uploadReportFile);

// // 📥 PDF download route
// router.get('/:id/pdf', protect, authorize('doctor', 'patient', 'clinic'), downloadPdf);

// module.exports = router;
