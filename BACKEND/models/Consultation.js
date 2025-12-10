const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic"
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  },


   
  labBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LabBooking',
    required: false,  // optional if not all consultations have labs
  },
  
  // or alternatively, direct lab reference
  lab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab',
    required: false,
  },

  consultationDate: {
    type: Date,
    default: Date.now
  },

//  payment: {
//     amount: { type: Number,},
//     paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
//     paymentId: { type: String },
//     sessionId: { type: String },
//     paidAt: { type: Date },
//     expiresAt: { type: Date }, // 7-day validity
//   },


  type: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online'
  },

  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },

  diagnosis: {
    primary: String,
    secondary: [String],
    notes: String
  },

  chiefComplaint: String,

  medicalHistory: [String],

  vitals: {
    temperature: String,
    pulse: String,
    bloodPressure: String,
    respirationRate: String,
    oxygenSaturation: String,
    height: String,
    weight: String,
    bmi: String,
    glucose:String

  },
  VitalsHistory: [String],

  prescriptions: [
    {
      medicine: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }
  ],

  testsAdvised: [
    {
      name: String,
      notes: String,
      lab: String
    }
  ],

  reports: [
    {
      title: String,
      description: String,
      fileUrl: String,
      uploadedAt: { type: Date, default: Date.now }
    }
  ],

  attachments: [
    {
      fileUrl: String,
      name: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  doctorNotes: String,

  followUp: {
    advised: { type: Boolean, default: false },
    afterDays: Number,
    note: String
  },

  patientFeedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    submittedAt: Date
  },

  videoCallSummary: String,

  isEmergency: { type: Boolean, default: false },

  createdBy: {
    type: String,
    enum: ['doctor', 'admin'],
    default: 'doctor'
  },

  updatedBy: String
}, {
  timestamps: true
});

module.exports = mongoose.model("Consultation", consultationSchema);
