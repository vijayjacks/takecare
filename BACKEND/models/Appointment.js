// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema({
//   clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
//   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
//   patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },

//   date: { type: String, required: true }, // Format: YYYY-MM-DD

//   timeSlot: {
//     from: { type: String, required: true }, // e.g., "09:00"
//     to: { type: String, required: true }    // e.g., "09:30"
//   },

//   slot: { type: Number, required: true },         // e.g., 1, 2, 3...
//   subTokenNumber: { type: Number, required: true }, // 1 to 10
//   time: { type: String, required: true },           // Exact sub-slot time
//   reason: { type: String },
//   timezone: { type: String, required: true },

//   status: {
//     type: String,
//     enum: ['pending', 'confirmed', 'cancelled', 'completed'],
//     default: 'pending'
//   },

//   type: { type: String, enum: ['online', 'offline'], default: 'online' },

//   paymentStatus: {
//     type: String,
//     enum: ['paid', 'unpaid', 'pending', 'failed'],
//     default: 'unpaid'
//   },

//   paymentId: { type: String },
//   meetingLink: { type: String },

//   feedback: {
//     rating: { type: Number, min: 1, max: 5 },
//     comment: String,
//     submittedAt: Date
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Appointment", appointmentSchema);

























const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    // Appointment date in YYYY-MM-DD
    date: { type: String, required: true },

    // Time slot (main slot)
    timeSlot: {
      from: { type: String, required: true }, // "09:00"
      to: { type: String, required: true },   // "09:30"
    },

    // Final selected sub-slot time (e.g. "09:12")
    time: { type: String, required: true },
    slot: { type: Number, required: true },         // e.g., 1, 2, 3...
    subTokenNumber: { type: Number, required: true }, // 1 to 10
    time: { type: String, required: true },           // Exact sub-slot time
    reason: { type: String },
    timezone: { type: String, required: true },

    // Online / Offline mode
    type: { type: String, enum: ['online', 'offline'], default: 'online' },

    reason: { type: String },
    timezone: { type: String, required: true },

    // Appointment Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    // Simple payment status for quick access
    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid", "failed"],
      default: "unpaid",
    },

    // Stripe Payment Info
    payment: {
      sessionId: { type: String },
      paymentStatus: {
        type: String,
        enum: ["unpaid", "pending", "paid"],
        default: "unpaid",
      },
      expiresAt: { type: Date }, // Payment valid for 7 days
    },

    paymentId: { type: String }, // optional external payment id

    // For online appointments (Zoom/Meet link)
    meetingLink: { type: String },

    // Patient feedback after completion
    feedback: {
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String },
      submittedAt: { type: Date },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);









// const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
//   patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
//   clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
//   date: { type: Date, required: true },
//   timeSlot: {
//     from: { type: String, required: true },
//     to: { type: String, required: true }
//   },
//   type: { type: String, enum: ['online','offline'], default: 'online' },
//   status: {
//     type: String,
//     enum: ['booked', 'completed', 'cancelled'],
//     default: 'booked'
//   },
//   reason: String
// }, { timestamps: true });

// module.exports = mongoose.model('Appointment', appointmentSchema);

