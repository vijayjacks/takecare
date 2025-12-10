const mongoose = require("mongoose");

const consultationPaymentSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  paymentId: { type: String },
  sessionId: { type: String },
  paidAt: { type: Date },
  expiresAt: { type: Date }, // 7-day validity period
}, { timestamps: true });

module.exports = mongoose.model("ConsultationPayment", consultationPaymentSchema);
