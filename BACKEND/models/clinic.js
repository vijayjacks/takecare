const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // clinicId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'doctor',
  //   required: true
  // },

  address: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  specialisation: [String], // E.g. ['Cardiology', 'ENT', 'Dermatology']



  // 🔔 Notifications
  notifications: [
    {
      type: {
        type: String,
        enum: ["info", "alert", "reminder", "system"],
        default: "info",
        required: true

      },

      message: String,
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],





  // Medical & Support Staff
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clinic' // or 'Doctor' if you have separate doctor model
  }],
  nurses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }],
  receptionists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }],
  billingStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }],

  // Patients linked to the clinic
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  }],

registrations: [
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    paymentId: String,
    registeredAt: Date,
  },
],








  
  // Location information
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String
    },
    country: {
      type: String,
      default: 'India'
    },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0]
      }
    }
  },

  // Pharmacy & Lab Features
  pharmacies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacy'
  }],

  availableMedicines: [{
    name: String,
    brand: String,
    stock: Number,
    price: Number,
    expiryDate: Date
  }],

  labs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab'
  }],

  availableTests: [{
    name: String,
    department: String,
    description: String,
    cost: Number
  }],

  // Booking, billing, prescription
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],

  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }],

  bills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bill'
  }],

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Clinic', ClinicSchema);








