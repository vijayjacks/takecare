// // models/LabTestReport.js
// const mongoose = require('mongoose');

// const labTestReportSchema = new mongoose.Schema({
//   labId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Lab',
//     required: true
//   },
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Patient',
//     required: true
//   },
//   testName: String,
//   result: String,
//   normalRange: String,
//   prescription: [
//     {
//       medicine: String,
//       dosage: String,
//       frequency: String,
//       duration: String,
//       instructions: String
//     }
//   ],
//   fileUrl: String,
//   uploadedAt: {
//     type: Date,
//     default: Date.now
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Completed'],
//     default: 'Pending'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('LabTestReport', labTestReportSchema);



// const mongoose = require('mongoose');

// const labTestReportSchema = new mongoose.Schema({
//   labId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Lab',
//     required: true
//   },
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Patient',
//     required: true
//   },
//   testName: String,
//   result: String,
//   normalRange: String,
//   prescription: [
//     {
//       medicine: String,
//       dosage: String,
//       frequency: String,
//       duration: String,
//       instructions: String
//     }
//   ],
//   fileUrl: String,
//   uploadedAt: {
//     type: Date,
//     default: Date.now
//   },
//     cost: Number,
//   status: {
//     type: String,
//     enum: ['Pending', 'Completed'],
//     default: 'Pending'
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('LabTestReport', labTestReportSchema);








const mongoose = require('mongoose');

const labTestReportSchema = new mongoose.Schema({
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabBooking', required: true },
  testName: { type: String, required: true },
  cost: { type: Number, default: 0 },
  normalRange: { type: String, default: 'N/A' },
  result: { type: String, default: 'Pending' },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  pdfUrl: String,  // after generating PDF, store URL or path
  paymentStatus: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }, // ✅ Linked payment

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('LabTestReport', labTestReportSchema);



