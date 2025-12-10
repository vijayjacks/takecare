// const express = require('express');
// const router = express.Router();


// // routes/paymentRoutes.js
// const paymentController = require("../controllers/paymentController");

// // Create payment intent
// router.post("/create-intent", paymentController.createPaymentIntent);

// // Stripe webhook (for successful payments)
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   paymentController.handleWebhook
// );




// // // routes/paymentRoutes.js
// // import { createPaymentIntent, handleStripeWebhook } from "../controllers/paymentController.js";

// // router.post("/create-intent", createPaymentIntent);
// // router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

// export default router;







// // // Create payment
// // router.post('/create', paymentsController.createPayment);

// // // Get all payments for clinic/admin
// // router.get('/all', paymentsController.getClinicPayments);

// // // Stripe checkout session
// // router.post('/checkout', paymentsController.createCheckoutSession);

// module.exports = router;




// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");
const { protect, authorize } = require("../middleware/auth"); // ⬅️ Import middleware

// ✅ Create Payment Intent (frontend calls this)
router.post("/create-intent",paymentsController.createPaymentIntent);

router.get("/verify-session/:sessionId",paymentsController. verifyPayment);

router.post('/success', protect, authorize('patient'),paymentsController.updatePaymentStatus);

// ✅ Stripe Webhook (Stripe calls this)
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   paymentsController.handleWebhook
// );

// Get paid lab reports
// router.get("/paid-reports/:patientId", paymentsController.getPaidLabReports);
module.exports = router;
