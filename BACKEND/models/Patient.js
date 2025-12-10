// const mongoose = require("mongoose");

// const patientSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   gender: {
//     type: String,
//     enum: ["male", "female", "other"],
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   },
//   contact: {
//     phone: String,
//     email: String,
//     address: String
//   },
//   bloodGroup: {
//     type: String,
//     enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
//   },
//   bookingDate: {
//     type: Date,
//     default: Date.now
//   },

//   doctorAssigned: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin" // Assuming doctors are stored in Admin collection
//   },

//   department: {
//     type: String, // Example: "Cardiology", "Orthopedics"
//     required: false
//   },

//   diagnosis: {
//     type: String
//   },

//   medicalHistory: [
//     {
//       condition: String,
//       treatment: String,
//       date: Date
//     }
//   ],

//   notifications: [
//     {
//       type: {
//         type: String,
//         enum: ["alert", "reminder", "info", "report"],
//         default: "info"
//       },
//       message: String,
//       read: { type: Boolean, default: false },
//       createdAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ],

//   reports: [
//     {
//       title: String,
//       description: String,
//       fileUrl: String, // link to report file (PDF, image, etc.)
//       uploadedAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ],

//   payments: [
//     {
//       amount: Number,
//       method: {
//         type: String,
//         enum: ["cash", "card", "online"]
//       },
//       status: {
//         type: String,
//         enum: ["paid", "pending", "failed"],
//         default: "pending"
//       },
//       paidAt: Date
//     }
//   ],

//   status: {
//     type: String,
//     enum: ["booked", "under observation", "suspended"],
//     default: "under observation"
//   }
// });

// module.exports = mongoose.model("Patient", patientSchema);


const mongoose = require("mongoose");

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  age: { type: Number, required: true },

  email: { type: String, required: true, unique: true },
  password: { type: String }, // hashed password

  contact: {
    phone: String,
    addres: String
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },

  bookingDate: { type: Date, default: Date.now },
  type: { type: String, enum: ['online', 'offline'], default: 'online' },

  // Reference to a Doctor or Admin assigned to patient (you mentioned Admin, but maybe Doctor)
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor" // or "Admin" depending on your design
  },

  department: { type: String },

  diagnosis: { type: String },

  // Medical History - subdocuments
  medicalHistory: [
    {
      condition: String,
      treatment: String,
      date: Date
    }
  ],


  // Chief complaint (main reason for visit)
  chiefComplaint: { type: String },

 
  // Vitals as a subdocument
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
 
vitalsUpdatedAt: { type: Date }, // NEW field to track when vitals were last updated

  // Notifications subdocuments
  notifications: [
    {
      type: {
        type: String,
        enum: ["alert", "reminder", "info", "report"],
        default: "info"
      },
      message: String,
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],

 

labReports: [{
  labId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lab' },
  testName: String,
  result: String,
  normalRange: String,
  cost: Number,
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'LabBooking' },
  uploadedAt: { type: Date, default: Date.now },
}],

  // Payments subdocuments
  payments: [
    {
      amount: Number,
      method: {
        type: String,
        enum: ["cash", "card", "online"]
      },
      status: {
        type: String,
        enum: ["paid", "pending", "failed"],
        default: "pending"
      },
      paidAt: Date
    }
  ],











  registeredClinics: [
  {
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentId: String, // Stripe payment ID
    registeredAt: Date,
  },
],





// consultationPayments: [
//   {
//     paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "ConsultationPayment" },
//     clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
//     doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
//     amount: Number,
//     paidAt: Date,
//     validUntil: Date, // ✅ expires after 7 days
//   },
// ],







    // Store appointment payment history
    bookedAppointments: [
      {
        appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
        paymentStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
        paymentId: String,
        paidAt: Date,
      }
    ],


  // Profile image path (optional)
  profileImage: { type: String, default: "" },

  status: {
    type: String,
    enum: ["booked", "under observation", "suspended"],
    default: "under observation"
  }
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);


  //  labReports: [{
  //   labId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Lab',
  //   },
  //   testName: String,
  //   result: String,
  //   normalRange: String,
  //   uploadedAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   fileUrl: String,
  // }],



 // // Reports subdocuments with file URLs
  // reports: [
  //   {
  //     title: String,
  //     description: String,
  //     fileUrl: String,
  //     uploadedAt: { type: Date, default: Date.now }
  //   }
  // ],







// const mongoose = require("mongoose");

// const patientSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   gender: { type: String, enum: ["male", "female", "other"], required: true },
//   age: { type: Number, required: true },

//   email: { type: String, required: true, unique: true },
//   password: { type: String }, // hashed password

//   contact: {
//     phone: String,
//     address: String
//   },

//   bloodGroup: {
//     type: String,
//     enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
//   },

//   bookingDate: { type: Date, default: Date.now },
//   type: { type: String, enum: ['online', 'offline'], default: 'online' },





//   doctorAssigned: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin"
//   },

//   department: { type: String },

//   diagnosis: { type: String },

//   medicalHistory: [
//     {
//       condition: String,
//       treatment: String,
//       date: Date
//     }
//   ],

//   notifications: [
//     {
//       type: {
//         type: String,
//         enum: ["alert", "reminder", "info", "report"],
//         default: "info"
//       },
//       message: String,
//       read: { type: Boolean, default: false },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],

//   reports: [
//     {
//       title: String,
//       description: String,
//       fileUrl: String,
//       uploadedAt: { type: Date, default: Date.now }
//     }
//   ],

//   payments: [
//     {
//       amount: Number,
//       method: {
//         type: String,
//         enum: ["cash", "card", "online"]
//       },
//       status: {
//         type: String,
//         enum: ["paid", "pending", "failed"],
//         default: "pending"
//       },
//       paidAt: Date
//     }
//   ],

//   status: {
//     type: String,
//     enum: ["booked", "under observation", "suspended"],
//     default: "under observation"
//   }
// });

// module.exports = mongoose.model("Patient", patientSchema);
