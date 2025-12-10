const mongoose = require('mongoose');

// // const LabTestSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //   },
// //   department: {
// //     type: String,
// //   },
// //   description: {
// //     type: String,
// //   },
// //   cost: {
// //     type: Number,
// //     required: true,
// //   },
// // });

// // final
// // const LabBooking = new mongoose.Schema(
// //   {
// //     lab: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Lab',
// //       required: true,
// //     },
// //     patient: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Patient',
// //       required: true,
// //     },
    
// //     status: {
// //       type: String,
// //       enum: ['pending', 'confirmed', 'cancelled', 'completed'],
// //       default: 'confirmed',
// //     },
// //   },
// //   {
// //     timestamps: true, // adds createdAt and updatedAt
// //   }
// // );

// // module.exports = mongoose.model('LabBooking', LabBooking);


// const labBookingSchema = new mongoose.Schema(
//   {
//     lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
//     patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
//     consultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation", }, // ✅ fixed
//     selectedTests: { type: [String], required: true },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled", "completed"],
//       default: "confirmed",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("LabBooking", labBookingSchema);
// models/LabBooking.js

// const labBookingSchema = new mongoose.Schema(
//   {
//     lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: true },
//     patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
//     consultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation" },
//     selectedTests: { type: [String], required: true },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled", "completed"],
//       default: "confirmed",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("LabBooking", labBookingSchema);

























const labBookingSchema = new mongoose.Schema(
  {
    lab: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    selectedTests: [
      {
        type: String, // assuming just test names
        required: true,
      },
    ],
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      required: true,
    },
    prescription: [
      {
        medicine: String,
        dosage: String,
        frequency: String,
        duration: String,
        instructions: String,
      },
    ],
   status: {
  type: String,
  enum: ["Completed", "cancelled", "pending"], // ✅ all lowercase
  default: "Completed",
},

  // …
  reportPaid: { type: Boolean, default: false },

  },
  { timestamps: true }
);

module.exports = mongoose.model("LabBooking", labBookingSchema);



// const bookingSchema = new mongoose.Schema({
//   lab: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Lab",
//     required: true,
//   },
//   patient: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Patient",
//     required: true,
//   },
//   consultation: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Consultation",
//     required: true,
//   },
//   tests: [
//     {
//       type: String, // Name of the test
//       required: true,
//     },
//   ],
//   prescription: [
//     {
//       medicineName: String,
//       dosage: String,
//       frequency: String,
//       duration: String,
//       instructions: String,
//     },
//   ],
//   status: {
//     type: String,
//     enum: ["Pending", "Completed", "Cancelled"],
//     default: "Pending",
//   },
//   bookedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Booking", bookingSchema);
