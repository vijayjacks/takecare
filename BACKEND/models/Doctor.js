// const mongoose = require("mongoose");

// const doctorSchema = new mongoose.Schema({
//   // 🔐 Account Details
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   phone: String,
//   gender: { type: String, enum: ["male", "female", "other"] },
//   age: Number,

//   // 🏥 Professional Info
//   specialization: { type: String, required: true },
//   department: String,
//   clinicId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Clinic",
//     required: false
//   },
//   approved: {
//     type: Boolean,
//     default: false
//   },



// notifications: [
//   {
//     type: {
//       type: String,
//       enum: ["info", "alert", "reminder", "system"],
//       default: "info"
//     },
//     message: String,
//     link: String, 
//     read: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   }
// ],


// profileImage: { type: String, default: "" },


//   // 🗓️ Availability
//   availability: {
//     days: [String],  // Example: ["Monday", "Wednesday"]
//     from: String,    // "09:00"
//     to: String       // "17:00"
//   },

//   // 🔗 Video Call Info
//   videoCallLink: { type: String },

//   // 📋 Prescriptions
//   prescriptions: [
//     {
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       prescriptionText: String,
//       date: { type: Date, default: Date.now },
//       fileUrl: String
//     }
//   ],




//   approvalHistory: [
//   {
//     approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
//     status: { type: String, enum: ['approved', 'rejected'], required: true },
//     timestamp: { type: Date, default: Date.now },
//     note: String
//   }
// ],


//   // 🧪 Test Results
//   testResults: [
//     {
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       testName: String,
//       resultUrl: String,
//       date: Date
//     }
//   ],

//   // 💰 Payments
//   payments: [
//     {
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
//       amount: Number,
//       method: { type: String, enum: ["cash", "card", "online"] },
//       status: { type: String, enum: ["paid", "pending", "failed"], default: "pending" },
//       paidAt: Date
//     }
//   ],

//   // 📖 Appointments
//   appointments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Appointment"
//     }
//   ],

//   // 🔔 Notifications
//   notifications: [
//     {
//       type: {
//         type: String,
//         enum: ["info", "alert", "reminder", "system"],
//         default: "info"
//       },
//       message: String,
//       read: { type: Boolean, default: false },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],

//   // 📂 Reports (doctor uploaded or received)
//   reports: [
//     {
//       title: String,
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       fileUrl: String,
//       description: String,
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],

//   // ℹ️ Status
//   status: {
//     type: String,
//     enum: ["active", "inactive", "suspended"],
//     default: "active"
//   },

//   createdAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model("Doctor", doctorSchema);


const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  gender: { type: String, enum: ["male", "female", "other"] },
  age: Number,
  specialization: { type: String, required: true },
  department: String,
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
  approved: { type: Boolean, default: false },

  // Availability with slots
  // availability: {
  //   days: [String], // ["Monday", "Wednesday"]
  //   from: String,   // "09:00"
  //   to: String,     // "17:00"
  //   slots: [
  //     {
  //       slot: Number,
  //       from: String, // e.g., "09:00"
  //       to: String,   // e.g., "09:30"
  //       status: { type: String, enum: ["available", "booked"], default: "available" },
  //       subSlots: [
  //         {
  //           time: String, // e.g., "09:00"
  //           status: { type: String, enum: ["available", "booked"], default: "available" }
  //         }
  //       ]
  //     }
  //   ]
  // },



// Availability with slots
  availability: {
  days: {
    type: [String],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  from: { type: String }, // e.g., "09:00"
  to: { type: String },   // e.g., "17:00"
  slots: [
    {
      slot: Number,
      from: String, // e.g., "09:00"
      to: String,   // e.g., "09:30"
      status: { type: String, enum: ["available", "booked"], default: "available" },
      subSlots: [
        {
          time: String, // e.g., "09:00"
          status: { type: String, enum: ["available", "booked"], default: "available" }
        }
      ],
      type: { type: String, enum: ['online', 'offline'], default: 'online' },
    }
  ]
},




  meetLink: { type: String, default: '' }, // <-- Meet Link field
  
  profileImage: { type: String, default: "" },
  notifications: [
    {
      type: { type: String, enum: ["info", "alert", "reminder", "system"], default: "info" },
      message: String,
      link: String,
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
  status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model("Doctor", doctorSchema);














// const mongoose = require("mongoose");

// // const SlotSchema = new mongoose.Schema({
// //   from: { type: String, required: true },
// //   to: { type: String, required: true },
// //   token: { type: Number, required: true },
// //   status: { type: String, enum: ['available', 'booked'], default: 'available' }
// // });

// // const DailyAvailabilitySchema = new mongoose.Schema({
// //   date: { type: String, required: true }, // Format: YYYY-MM-DD
// //   slots: [SlotSchema]
// // });



// const doctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   phone: String,
//   gender: { type: String, enum: ["male", "female", "other"] },
//   age: Number,
//   specialization: { type: String, required: true },
//   department: String,
//   clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },

//   approved: { type: Boolean, default: false },


//   // availability: {
//   //   days: [String], from: String, to: String,
//   //   slots: [SlotSchema]

//   // },




//   availability: [
//   {
//     days: String, // e.g., "2025-08-01"
//     slots: [
//       {
//         token: Number,
//         from: String, // "10:00"
//         to: String,   // "11:00"
//         status: String,
//         subSlots: [
//           {
//             time: String, // "10:00", "10:30"
//             status: String // "available" or "booked"
//           }
//         ]
//       }
//     ]
//   }
// ],

//   // availabilityByDate: [DailyAvailabilitySchema],

//   videoCallLink: String,
//   profileImage: { type: String, default: "" },
//   notifications: [
//     {
//       type: { type: String, enum: ["info", "alert", "reminder", "system"], default: "info" },
//       message: String,
//       link: String,
//       read: { type: Boolean, default: false },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],
//   appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
//   status: { type: String, enum: ["active", "inactive", "suspended"], default: "active" },
//   createdAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model("Doctor", doctorSchema);





















// const mongoose = require("mongoose");

// const SlotSchema = new mongoose.Schema({
//   from: { type: String, required: true }, // e.g., "09:00"
//   to: { type: String, required: true },   // e.g., "09:30"
//   token: { type: Number, required: true },
//   status: { type: String, enum: ['available', 'booked'], default: 'available' }
// });

// const DailyAvailabilitySchema = new mongoose.Schema({
//   date: { type: String, required: true }, // Format: "YYYY-MM-DD"
//   slots: [SlotSchema]
// });

// const doctorSchema = new mongoose.Schema({
//   // 🔐 Account Details
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   phone: String,
//   gender: { type: String, enum: ["male", "female", "other"] },
//   age: Number,

//   // 🏥 Professional Info
//   specialization: { type: String, required: true },
//   department: String,
//   clinicId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Clinic"
//   },
//   approved: { type: Boolean, default: false },

//   // 📆 Token-Based Availability per Date
//   availabilityByDate: [DailyAvailabilitySchema],

//   // 🗓️ General Weekly Availability
//   availability: {
//     days: [String],   // Example: ["Monday", "Wednesday"]
//     from: String,     // e.g., "09:00"
//     to: String        // e.g., "17:00"
//   },

//   // 🔔 Notifications
//   notifications: [
//     {
//       type: {
//         type: String,
//         enum: ["info", "alert", "reminder", "system"],
//         default: "info"
//       },
//       message: String,
//       link: String,
//       read: { type: Boolean, default: false },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],

//   profileImage: { type: String, default: "" },

//   // 🔗 Video Call Info
//   videoCallLink: String,

//   // 📋 Prescriptions
//   prescriptions: [
//     {
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       prescriptionText: String,
//       date: { type: Date, default: Date.now },
//       fileUrl: String
//     }
//   ],

//   approvalHistory: [
//     {
//       approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
//       status: { type: String, enum: ['approved', 'rejected'], required: true },
//       timestamp: { type: Date, default: Date.now },
//       note: String
//     }
//   ],

//   // 🧪 Test Results
//   testResults: [
//     {
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       testName: String,
//       resultUrl: String,
//       date: Date
//     }
//   ],

//   // 💰 Payments
//   payments: [
//     {
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
//       amount: Number,
//       method: { type: String, enum: ["cash", "card", "online"] },
//       status: { type: String, enum: ["paid", "pending", "failed"], default: "pending" },
//       paidAt: Date
//     }
//   ],

//   // 📖 Appointments
//   appointments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Appointment"
//     }
//   ],

//   // 📂 Reports (doctor uploaded or received)
//   reports: [
//     {
//       title: String,
//       patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//       fileUrl: String,
//       description: String,
//       createdAt: { type: Date, default: Date.now }
//     }
//   ],

//   // ℹ️ Status
//   status: {
//     type: String,
//     enum: ["active", "inactive", "suspended"],
//     default: "active"
//   },

//   createdAt: { type: Date, default: Date.now }
// }, { timestamps: true });

// module.exports = mongoose.model("Doctor", doctorSchema);
