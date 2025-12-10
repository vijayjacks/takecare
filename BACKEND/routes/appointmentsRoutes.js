// const express = require('express');
// const router = express.Router();
// const { bookAppointment, respondToAppointment, getDoctorAppointments, getPatientAppointments } = require('../controllers/appointmentsController');

// const { protect, authorize } = require("../middleware/auth");

// // const upload = require('../middleware/upload');
// // const { protect, onlyDoctor, onlyPatient } = require('../middleware/auth');

// router.post('/', protect, authorize, bookAppointment);
// router.patch('/:appointmentId/respond', protect, authorize, respondToAppointment);
// router.get('/doctor/:doctorId', protect, authorize, getDoctorAppointments);
// router.get('/patient/:patientId', protect, authorize, getPatientAppointments);

// module.exports = router;







const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const {
  bookAppointment, respondToAppointment,updateAppointmentStatus,
  getClinicAppointments, getDoctorAppointments,  createCheckout,confirmPayment,validatePayment, 
 getPatientAppointments,getPatientAppointmentOnDate,checkPaymentValidity
} = require('../controllers/appointmentsController');

router.post('/bookAppointment', protect, authorize('patient'), bookAppointment);




// GET appointment for patient for a specific date & doctor
router.get("/patient/:patientId/appointment-on-date",  protect, authorize('patient'),getPatientAppointmentOnDate);
router.get("/patient/:patientId/has-valid-payment",checkPaymentValidity)
router.post("/create-checkout", createCheckout);
router.post("/confirm-payment", confirmPayment);

router.post("/validate-payment", validatePayment);












// Doctor routes
router.get('/DoctorAppointments/:doctorId', protect, authorize('doctor'), getDoctorAppointments);
router.patch('/respondToAppointment/:appointmentId', protect, authorize('doctor'), respondToAppointment);


// // Assign doctor
// router.post('/assignDoctor/:appointmentId', protect, authorize('clinic'), assignDoctorToAppointment);


router.get('/patient/:patientId', protect, authorize('patient'), getPatientAppointments);



module.exports = router;







// // const express = require('express');
// // const router = express.Router();
// // const { protect } = require('../middleware/auth');
// // const {
// //   bookByClinic, assignDoctor, respond, getClinicAppointments
// // } = require('../controllers/appointmentsController');

// // router.post('/clinic/book', protect, bookByClinic);
// // router.get('/clinic/:clinicId', protect, getClinicAppointments);
// // router.patch('/clinic/assign/:appointmentId', protect, assignDoctor);
// // router.patch('/:appointmentId/respond', protect, respond);

// // module.exports = router;
