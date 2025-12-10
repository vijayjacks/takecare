// const Stripe = require("stripe");
// const Payment = require("../models/Payment");
// const Patient = require("../models/Patient");
// const LabTestReport = require("../models/LabTestReport");

// const stripe = new Stripe(process.env.secrete_key);

// // Create a Stripe Payment Intent
// exports.createPaymentIntent = async (req, res) => {
//   try {
//     const { patientId, reportId, amount } = req.body;

//     if (!patientId || !reportId || !amount) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }

//     // Create payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // ₹ to paise
//       currency: "inr",
//       automatic_payment_methods: { enabled: true },
//       metadata: { patientId, reportId },
//     });

//     // Save payment record
//     await Payment.create({
//       patientId,
//       reportId,
//       amount,
//       status: "pending",
//       stripePaymentIntentId: paymentIntent.id,
//       createdAt: new Date(),
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     console.error("Stripe Payment Intent Error:", err);
//     res.status(500).json({ message: "Failed to create payment intent", error: err.message });
//   }
// };

// // Stripe webhook to handle payment success
// exports.handleWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "payment_intent.succeeded") {
//     const paymentIntent = event.data.object;
//     const { patientId, reportId } = paymentIntent.metadata;

//     // Update payment record
//     await Payment.findOneAndUpdate(
//       { stripePaymentIntentId: paymentIntent.id },
//       { status: "succeeded", paymentDate: new Date() }
//     );

//     // Mark lab report as "Paid"
//     await LabTestReport.findByIdAndUpdate(reportId, { status: "Paid" });

//     console.log("✅ Payment successful for report:", reportId);
//   }

//   res.json({ received: true });
// };



// // Get all lab reports for a patient that are paid
// exports.getPaidLabReports = async (req, res) => {
//   try {
//     const { patientId } = req.params;

//     // Find lab reports that have status "Paid"
//     const reports = await LabTestReport.find({ patientId, status: "Paid" })
//       .select("_id testName result uploadedAt");

//     res.status(200).json({ patientId, reports });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch paid reports", error: err.message });
//   }
// // };











// const Stripe = require("stripe");
// const Payment = require("../models/Payment");
// const Patient = require("../models/Patient");
// const LabTestReport = require("../models/LabTestReport");


// exports.createPaymentIntent = async (req, res) => {
//   try {
//     const { labId, patientId, amount } = req.body;
//     if (!labId || !patientId || !amount) {
//       return res.status(400).json({ message: "Missing payment details" });
//     }

//     const session = await Stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: { name: "Lab Test Payment" },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/payment-success",
//       cancel_url: "http://localhost:3000/payment-cancel",
//     });

//     // Save to DB (optional)
//     const payment = await Payment.create({
//       stripeSessionId: session.id,
//       labId,
//       patientId,
//       amount,
//       paymentStatus: "pending",
//     });

//     res.status(200).json({ sessionId: session.id });
//   } catch (err) {
//     console.error("Payment creation error:", err);
//     res.status(500).json({
//       message: "Failed to create payment intent",
//       error: err.message,
//     });
//   }
// };










// controllers/paymentController.js
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const stripe = new Stripe(process.env.secrete_key);
const LabTestReport = require('../models/LabTestReport');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { reportId, patientId, cost } = req.body;

    if (!reportId || !patientId || !cost) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data:{ name: "Lab Test Payment", },
            unit_amount: cost * 100, // INR in paisa
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // success_url: `${process.env.FRONTEND_URI}/payment-success/${patientId}?session_id={CHECKOUT_SESSION_ID}`,
     success_url: `${process.env.FRONTEND_URI}/patients/${patientId}/labreports/${reportId}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

     
      cancel_url: `${process.env.FRONTEND_URI}/payment-cancel`,
    });

    if (!session.id) {
  return res.status(500).json({ message: "Stripe session creation failed" });
}
    // Save payment record
    const payment = await Payment.create({
      stripeSessionId: session.id,
      reportId,
      patientId,
      // bookingId,
      // testName,
      cost,
      paymentStatus: "unpaid",
      status: "Pending",
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Payment creation error:", err);
    res.status(500).json({
      message: "Failed to create payment intent",
      error: err.message,
    });
  }
};










// ✅ Verify payment after redirect (no webhook)
exports.verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Get session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Find payment by session ID
      const payment = await Payment.findOne({ stripeSessionId: sessionId });
      if (payment) {
        payment.paymentStatus = "paid";
        await payment.save();

        // Update lab report too
        await LabTestReport.updateOne(
          { reportId: payment.reportId, patientId: payment.patientId },
          { $set: { paymentStatus: "paid" } }
        );

        return res.status(200).json({ success: true, message: "Payment verified and updated" });
      }
    }

    res.status(400).json({ success: false, message: "Payment not completed yet" });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};



// controllers/paymentController.js


exports.updatePaymentStatus = async (req, res) => {
  try {
    const { sessionId } = req.body; // From Stripe webhook or frontend success

    const payment = await Payment.findOne({ stripeSessionId: sessionId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.paymentStatus = 'paid';
    
    await payment.save();

    // ✅ Update corresponding Lab Report
    if (payment.reportId) {
      await LabTestReport.findByIdAndUpdate(payment.reportId, {
        paymentStatus: 'paid',
        paymentId: payment._id,
      });
    }

    res.status(200).json({ message: 'Payment and report updated successfully' });
  } catch (error) {
    console.error('Payment update failed:', error);
    res.status(500).json({ error: error.message });
  }
};
