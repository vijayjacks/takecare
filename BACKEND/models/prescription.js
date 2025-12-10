const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Ensure role = 'doctor'
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
  },
  pharmacyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
    required: true,
  },
  superadminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Superadmin",
    required: true,
  },

  // Clinical data
  symptoms: {
    type: [String],
    default: [],
  },
  diagnosis: {
    type: String,
    required: true,
  },

  // Medication info
  medicines: [
    {
      name: { type: String, required: true },
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String,
    },
  ],

  // Lab test recommendations
  testsAdvised: [
    {
      testName: String,
      department: String,
      reason: String,
    },
  ],

  advice: String,
  followUpDate: Date,

  // Attachments (PDF/image uploads like test results)
  attachedFiles: [
    {
      fileUrl: String,
      fileType: {
        type: String,
        enum: ["pdf", "image", "other"],
        default: "pdf",
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  // Issuer Info (stored snapshot)
  issuedBy: {
    name: String,
    email: String,
    role: {
      type: String,
      enum: ["doctor"],
      default: "doctor",
    },
  },

  // Status tracking
  status: {
    type: String,
    enum: ["issued", "dispensed", "completed"],
    default: "issued",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

// ✅ Prevent OverwriteModelError during development
module.exports = mongoose.models.Prescription || mongoose.model("Prescription", PrescriptionSchema);
