
// const mongoose = require("mongoose");

// const PharmacySchema = new mongoose.Schema({
//   // 🔗 Linked Clinic
//   clinicId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Clinic",
//     required: true
//   },
  
//   pharmacyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Pharmacy", // If medicines are sent to a specific pharmacy
//   },


//   // 🏪 Basic Details
//   name: {
//     type: String,
//     required: true
//   },
//   location: {
//     city: String,
//     state: String,
//     country: {
//       type: String,
//       default: "India"
//     }
//   },
//   address: {
//     type: String,
//     required: true
//   },
//   phone: String,
//   email: {
//     type: String,
//     unique: true
//   },

//   // 🧑‍⚕️ Pharmacy Staff (linked to Admins)
//   pharmacists: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin"
//     }
//   ],

//   // 💊 Available Medicines Inventory
//   inventory: [
//     {
//       name: { type: String, required: true },
//       brand: String,
//       batchNumber: String,
//       quantity: { type: Number, default: 0 },
//       price: { type: Number, required: true },
//       expiryDate: Date,
//       addedAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ],

//   // 🧾 Orders for Prescriptions
//   orders: [
//     {
//       prescriptionId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Prescription"
//       },
//       patientId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Patient"
//       },
//       doctorId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Admin"
//       },

//       labId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Lab",
//       },



//       medicines: [
//         {
//           name: String,
//           quantity: Number,
//           price: Number,
//            brand: String,
//           dosage: String,
//           frequency: String,
//           duration: String,
//           instructions: String,
//         }
//       ],
//       status: {
//         type: String,
//         enum: ["pending", "prepared", "delivered", "cancelled"],
//         default: "pending"
//       },
//       orderedAt: {
//         type: Date,
//         default: Date.now
//       },
//       deliveredAt: Date
//     }
//   ],

//   // 💵 Billing Information
//   bills: [
//     {
//       patientId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Patient"
//       },
//       amount: Number,
//       method: {
//         type: String,
//         enum: ["cash", "card", "online"],
//         default: "cash"
//       },
//       status: {
//         type: String,
//         enum: ["paid", "pending", "failed"],
//         default: "pending"
//       },
//       billDate: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ],

//   // 📦 Supply Requests
//   supplyRequests: [
//     {
//       medicineName: String,
//       quantityRequested: Number,
//       status: {
//         type: String,
//         enum: ["requested", "fulfilled", "cancelled"],
//         default: "requested"
//       },
//       requestedAt: {
//         type: Date,
//         default: Date.now
//       },
//       fulfilledAt: Date
//     }
//   ],
//  attachedFiles: [
//     {
//       fileUrl: { type: String },
//       fileType: {
//         type: String,
//         enum: ["pdf", "image", "other"],
//         default: "pdf",
//       },
//       uploadedAt: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
//   // 🔐 Status & Meta
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }

// }, { timestamps: true });

// module.exports = mongoose.model("Pharmacy", PharmacySchema);






const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  batchNumber: { type: String },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  expiryDate: { type: Date },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const PharmacySchema = new mongoose.Schema({
  // 🔗 Linked Clinic
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true
  },

  // 🏪 Basic Details
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    city: { type: String },
    state: { type: String },
    country: {
      type: String,
      default: "India"
    }
  },

  // 🧑‍⚕️ Pharmacy Staff
  pharmacists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    }
  ],

  // 💊 Inventory (Available Medicines)
  inventory: [MedicineSchema],

  // 🧾 Orders for Prescriptions
  orders: [
    {
      prescriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription"
      },
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
      },
      labId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lab"
      },
      medicines: [
        {
          name: String,
          quantity: Number,
          price: Number,
          brand: String,
          dosage: String,
          frequency: String,
          duration: String,
          instructions: String
        }
      ],
      status: {
        type: String,
        enum: ["pending", "prepared", "delivered", "cancelled"],
        default: "pending"
      },
      orderedAt: {
        type: Date,
        default: Date.now
      },
      deliveredAt: Date
    }
  ],

  // 💵 Billing Information
  bills: [
    {
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
      },
      amount: Number,
      method: {
        type: String,
        enum: ["cash", "card", "online"],
        default: "cash"
      },
      status: {
        type: String,
        enum: ["paid", "pending", "failed"],
        default: "pending"
      },
      billDate: {
        type: Date,
        default: Date.now
      }
    }
  ],

  // 📦 Supply Requests
  supplyRequests: [
    {
      medicineName: String,
      quantityRequested: Number,
      status: {
        type: String,
        enum: ["requested", "fulfilled", "cancelled"],
        default: "requested"
      },
      requestedAt: {
        type: Date,
        default: Date.now
      },
      fulfilledAt: Date
    }
  ],

  // 📎 Attached Files
  attachedFiles: [
    {
      fileUrl: { type: String },
      fileType: {
        type: String,
        enum: ["pdf", "image", "other"],
        default: "pdf"
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  // 🔐 Status & Meta
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Pharmacy", PharmacySchema);
