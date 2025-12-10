// // const mongoose = require('mongoose');
// // const PaymentSchema = new mongoose.Schema({
// //   patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
// //   clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
// //   amount: Number,
// //   method: String,
// //   status: { type: String, enum: ['paid','pending'], default: 'pending' },
// //   createdAt: { type: Date, default: Date.now }
// // });
// // module.exports = mongoose.model('Payment', PaymentSchema);


// // import mongoose from "mongoose";

// // const paymentSchema = new mongoose.Schema({
// //   patientId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: "Patient",
// //     required: true,
// //   },
// //   labId: {
// //     type: String, // matches labReport.labId
// //     required: true,
// //   },
// //   stripeSessionId: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   amount: {
// //     type: Number, // stored in smallest currency unit (e.g., paise)
// //     required: true,
// //   },
// //   currency: {
// //     type: String,
// //     default: "inr",
// //   },
// //   paymentStatus: {
// //     type: String,
// //     enum: ["pending", "paid", "failed", "refunded"],
// //     default: "pending",
// //   },
// //   paymentIntentId: {
// //     type: String, // Stripe PaymentIntent ID (optional)
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   },
// //   paidAt: {
// //     type: Date,
// //   },
// // });

// // const Payment = mongoose.model("Payment", paymentSchema);

// // export default Payment;




// const mongoose=require("mongoose")

// const paymentSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Patient",
//     required: true,
//   },
//   labId: {
//     type: String, // Corresponds to labReport.labId
//     required: true,
//   },
//   stripeSessionId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   amount: {
//     type: Number, // in smallest currency unit, e.g., paise
//     required: true,
//   },
//   currency: {
//     type: String,
//     default: "inr",
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "paid", "failed", "refunded"],
//     default: "pending",
//   },
//   paymentIntentId: {
//     type: String, // Optional Stripe PaymentIntent ID
//   },
//   method: {
//     type: String,
//     default: "card",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   paidAt: {
//     type: Date,
//   },
// });

// const Payment = mongoose.model("Payment", paymentSchema);

// module.exports=Payment



// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Patient",
//     required: true,
//   },
//   labId: {
//     type: mongoose.Schema.Types.ObjectId, // use ObjectId to reference Lab or LabReport
//     ref: "LabTestReport", // or "Lab" if you're paying the lab directly
//     required: true,
//   },
//   stripeSessionId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   amount: {
//     type: Number, // in smallest currency unit, e.g., paise
//     required: true,
//   },
//   currency: {
//     type: String,
//     default: "inr",
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "paid", "failed", "refunded"],
//     default: "pending",
//   },
//   paymentIntentId: {
//     type: String, // Optional Stripe PaymentIntent ID
//   },
//   method: {
//     type: String,
//     default: "card",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   paidAt: {
//     type: Date,
//   },
// });

// module.exports = mongoose.model("Payment", paymentSchema);

























// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Patient",
//     required: true,
//   },
//   labId: {
//     type: mongoose.Schema.Types.ObjectId, // Reference to LabTestReport
//     ref: "LabTestReport",
//     required: true,
//   },
//   stripeSessionId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   amount: {
//     type: Number, // stored in rupees
//     required: true,
//   },
//   currency: {
//     type: String,
//     default: "inr",
//   },
//   paymentStatus: {
//     type: String,
//     enum: ["pending", "paid", "failed", "refunded"],
//     default: "pending",
//   },
//   paymentIntentId: {
//     type: String, // Optional Stripe payment intent ID
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   paidAt: {
//     type: Date,
//   },
// });

// module.exports = mongoose.model("Payment", paymentSchema);




// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // labId: { type: mongoose.Schema.Types.ObjectId, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    stripeSessionId: { type: String, unique: true },
      transactionId: { type: String },


  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true
  },
    reportId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabTestReport' }, // ✅ connect to report

  testName: {
    type: String,
    // required: true
  },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  cost: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },  stripeSessionId: { type: String, required: true, unique: true },
  result: { type: String },
  normalRange: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);


