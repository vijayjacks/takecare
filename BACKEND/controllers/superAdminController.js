// // const Clinic = require("../models/clinic");
// // const Admin = require('../models/Admin');
// // const Appointment = require('../models/Appointment');
// // const Payment = require('../models/Payment');

// // // Clinic CRUD and stats
// // exports.createClinic = async (req, res) => {
// //   const clinic = await Clinic.create({ ...req.body, createdBy: req.user._id });
// //   res.status(201).json(clinic);
// // };

// // exports.getDashboard = async (req, res) => {
// //   const [clinics, admins, doctors, patients] = await Promise.all([
// //     Clinic.countDocuments(),
// //     Admin.countDocuments({ role: 'admin' }),
// //     Admin.countDocuments({ role: 'doctor' }),
// //     Admin.countDocuments({ role: 'patient' })
// //   ]);
// //   res.json({ clinics, admins, doctors, patients });
// // };

// // // User approval
// // exports.approveUser = async (req, res) => {
// //   const user = await Admin.findById(req.params.id);
// //   if (user) { user.approved = true; await user.save(); }
// //   res.json({ message: 'Approved', user });
// // };

// // // Query appointments/payments
// // exports.getAppointments = async (req, res) => {
// //   const appts = await Appointment.find()
// //     .populate('doctorId patientId clinicId', 'name');
// //   res.json(appts);
// // };

// // exports.getPayments = async (req, res) => {
// //   const pays = await Payment.find()
// //     .populate('patientId clinicId', 'name');
// //   res.json(pays);
// // };

// const Admin = require("../models/Admin");
// const Clinic = require("../models/clinic");
// const Appointment = require("../models/Appointment");
// const Payment = require("../models/Payment");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const SuperAdmin = require("../models/Superadmin");

// //  Register SuperAdmin
// exports.registerSuperAdmin = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await SuperAdmin.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const hashed = await bcrypt.hash(password, 10);
//     const superAdmin = new SuperAdmin({
//       name,
//       email,
//       password: hashed,
//       role: "superadmin" // saved as role
//     });

//     await superAdmin.save();
//     res.status(201).json({ message: "Superadmin registered", superAdmin });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// //  Login SuperAdmin
// exports.loginSuperAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const superAdmin = await SuperAdmin.findOne({ email, role: "superadmin" });
//     if (!superAdmin) return res.status(404).json({ message: "Superadmin not found" });
//      console.log("superAdmin log",superAdmin);
     
//     const match = await bcrypt.compare(password, superAdmin.password);
//     if (!match) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: superAdmin._id, role: "superadmin" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     superAdmin.lastLogin = new Date();
//     await superAdmin.save();

//     res.json({ token, user: superAdmin });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // Create Admin or Other Roles
// exports.createAdmin = async (req, res) => {
//   try {
//     const { name, email, password, role, clinicId } = req.body;
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new Admin({
//       name,
//       email,
//       password: hashed,
//       role,
//       clinicId
//     });
//     await user.save();
//     res.status(201).json({ message: `${role} created`, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// //  Get All Users by Role
// exports.getUsersByRole = async (req, res) => {
//   try {
//     const { role } = req.params;
//     const users = await Admin.find({ role });
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// //  Approve a Doctor, Pharmacy, Lab
// exports.approveUser = async (req, res) => {
//   try {
//     const user = await Admin.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     user.approved = true;
//     await user.save();
//     res.json({ message: `${user.role} approved`, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// //  Create Clinic
// exports.createClinic = async (req, res) => {
//   try {
//     const clinic = await Clinic.create(req.body);
//     res.status(201).json(clinic);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 📊 Dashboard Stats
// exports.getDashboardStats = async (req, res) => {
//   try {
//     const [admins, doctors, patients, clinics] = await Promise.all([
//       Admin.countDocuments({ role: "admin" }),
//       Admin.countDocuments({ role: "doctor" }),
//       Admin.countDocuments({ role: "patient" }),
//       Clinic.countDocuments()
//     ]);
//     res.json({ admins, doctors, patients, clinics });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 📅 View All Appointments
// exports.getAllAppointments = async (req, res) => {
//   try {
//     const appts = await Appointment.find().populate("doctorId patientId", "name email");
//     res.json(appts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 💳 View All Payments
// exports.getAllPayments = async (req, res) => {
//   try {
//     const payments = await Payment.find().populate("patientId clinicId", "name");
//     res.json(payments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ❌ Delete Admin/Doctor
// exports.deleteUser = async (req, res) => {
//   try {
//     await Admin.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SuperAdmin = require("../models/Superadmin");
const Admin = require("../models/Admin");
const Clinic = require("../models/clinic");
const Appointment = require("../models/Appointment");
const Payment = require("../models/Payment");

// 🔐 Register SuperAdmin
exports.registerSuperAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await SuperAdmin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const superAdmin = new SuperAdmin({
      name,
      email,
      phone,
      password: hashed,
      role: "superadmin"
    });

    await superAdmin.save();
    res.status(201).json({ message: "Superadmin registered", superAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔐 Login SuperAdmin
exports.loginSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email, role: "superadmin" });
    if (!superAdmin) return res.status(404).json({ message: "Superadmin not found" });

    const match = await bcrypt.compare(password, superAdmin.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: superAdmin._id, role: "superadmin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    superAdmin.lastLogin = new Date();
    await superAdmin.save();

    res.json({ message: "Login successful", token, user: superAdmin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👤 Create Any Admin Role
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, role, clinicId, phone } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      name,
      email,
      phone,
      password: hashed,
      role,
      clinicId,
      approved: true
    });

    await newUser.save();

    res.status(201).json({ message: `${role} created`, user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📋 Get All Users by Role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await Admin.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Approve a User (Doctor/Pharmacy/Lab)
exports.approveUser = async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.approved = true;
    await user.save();

    res.json({ message: `${user.role} approved`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🏥 Create Clinic
exports.createClinic = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);
    res.status(201).json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 Dashboard Summary
exports.getDashboardStats = async (req, res) => {
  try {
    const [admins, doctors, patients, clinics] = await Promise.all([
      Admin.countDocuments({ role: "admin" }),
      Admin.countDocuments({ role: "doctor" }),
      Admin.countDocuments({ role: "patient" }),
      Clinic.countDocuments()
    ]);

    res.json({ admins, doctors, patients, clinics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📅 Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find()
      .populate("doctorId patientId clinicId", "name email");

    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 💳 Get All Payments
exports.getAllPayments = async (req, res) => {
  try {
    const pays = await Payment.find()
      .populate("patientId clinicId", "name");

    res.json(pays);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete Admin or Role
exports.deleteUser = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
