// const express = require("express");
// const router = express.Router();
// const {
//   createPaymentIntent,
//   confirmPayment,
//   checkPaymentStatus,
// } = require("../controllers/consultationPaymentController");

// router.post("/create-payment-intent", createPaymentIntent);
// router.post("/confirm-payment", confirmPayment);
// router.get("/check-status", checkPaymentStatus);







// const express = require("express");
// const router = express.Router();
// const {
//   createConsultationCheckout,
//   confirmConsultationPayment,
//   validateConsultationPayment,
// } = require("../controllers/consultationPaymentController");

// router.post("/create-checkout", createConsultationCheckout);
// router.post("/confirm-payment", confirmConsultationPayment);
// router.post("/validate-payment", validateConsultationPayment);

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const {
//   createConsultationCheckout,
//   confirmConsultationPayment,
// } = require("../controllers/consultationPaymentController");

// router.post("/create-checkout", createConsultationCheckout);
// router.post("/confirm-payment", confirmConsultationPayment);

// module.exports = router;



















// const express = require("express");
// const router = express.Router();
// const paymentController = require("../controllers/consultationPaymentController");

// // Create a Stripe Payment Intent
// router.post("/create-payment-intent", paymentController.createPaymentIntent);

// router.post("/confirm-payment", paymentController.confirmPayment);

// // Check if the patient has already paid (last 7 days)
// router.get("/status/:clinicId/:patientId", paymentController.getPaymentStatus);

// module.exports = router;






// // Payment Routes
// router.post("/create-payment-intent", paymentController.createPaymentIntent);
// router.get("/status/:clinicId/:patientId", paymentController.getPaymentStatus);

// module.exports = router;
