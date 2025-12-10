const mongoose = require("mongoose");

const SuggestedLabSchema = new mongoose.Schema({
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Doctor user
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
    required: true,
  },
  testsAdvised: [
    {
      testName: { type: String },
      department: String,
      reason: String,
    }
  ],
  advice: String,
  followUpDate: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("SuggestedLab", SuggestedLabSchema);
