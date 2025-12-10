const mongoose = require("mongoose");

const SuperAdminSchema = new mongoose.Schema({
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
  },

  role: {
    type: String,
    enum: ['superadmin'],
    default: 'superadmin',
  },

  // All clinics created or managed by this superadmin
  clinics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  }],

  // All types of admins created/approved by superadmin
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }],

  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // where role = 'doctor'
  }],

  receptionists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // where role = 'receptionist'
  }],

  billingStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // where role = 'billing-staff'
  }],

  nurses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // where role = 'nurse'
  }],

  pharmacies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pharmacy",
  }],

  labs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
  }],

  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  }],

  // For tracking approvals
  approvedUsers: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'approvedUsers.userModel'
    },
    userModel: {
      type: String,
      required: true,
    enum: ['superadmin','admin','doctor','patient','pharmacy','lab','nurse','receptionist','billing-staff'],
    default: 'superadmin',    },
    approvedAt: {
      type: Date,
      default: Date.now,
    }
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
  }
});

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);
