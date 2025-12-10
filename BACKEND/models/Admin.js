
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const AdminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['superadmin','admin','doctor','patient','pharmacy','lab','nurse','receptionist','billing-staff'],
//     default: 'admin',
//   },
//   clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
//   specialization: String,
//   approved: { type: Boolean, default: false },
//   status: { type: String, enum: ['active','suspended','removed'], default: 'active' },
//   createdAt: { type: Date, default: Date.now },
//   lastLogin: Date
// });

// // Hash password
// // AdminSchema.pre('save', async function() {
// //   if (this.isModified('password')) {
// //     this.password = await bcrypt.hash(this.password, 10);
// //   }
// // });

// module.exports = mongoose.model('Admin', AdminSchema);

const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['superadmin','admin','doctor','patient','pharmacy','lab','nurse','receptionist','billing-staff'],
    default: 'admin',
    required: true,
  },

  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },

        pharmacists: [{
          type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
}], // Expecting array of pharmacist admin details or IDs


  // Doctors managed/added by this admin
  managedDoctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  }],

  // Patients approved by this admin
  approvedPatients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  }],

  // Approved pharmacy accounts
  approvedPharmacies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
  }],

  // Approved lab accounts
  approvedLabs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
  }],

  // Appointments scheduled
  scheduledAppointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  }],

  // Payments visible by admin
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  }],

  notifications: [{
    message: String,
    type: {
      type: String,
      enum: ["info", "warning", "alert"],
      default: "info",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],

  approved: {
    type: Boolean,
    default: false,
  },

  lastLogin: {
    type: Date,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);


