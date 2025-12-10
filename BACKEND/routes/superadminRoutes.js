// const router = require('express').Router();
// const c = require('../controllers/superAdminController');
// const { protect, authorize } = require('../middleware/auth');
// // const router = require('./adminRoutes');

// router.use(protect, authorize('superadmin'));
// router.post('/clinic', c.createClinic);
// router.get('/dashboard', c.getDashboard);
// router.patch('/approve/:id', c.approveUser);
// router.get('/appointments', c.getAllAppointments);
// router.get('/payments', c.getAllPayments);
// module.exports = router;


const express = require("express");
const router = express.Router();
const superAdminCtrl = require("../controllers/superAdminController");
const { protect } = require("../middleware/auth");
const { authorize } = require("../middleware/auth");

// 🚀 AUTH
router.post("/register", superAdminCtrl.registerSuperAdmin); // optional: run once
router.post("/login", superAdminCtrl.loginSuperAdmin);

// 🧑‍💼 USER MANAGEMENT
router.post("/create", protect, authorize("superadmin"), superAdminCtrl.createAdmin);
router.get("/users/:role", protect, authorize("superadmin"), superAdminCtrl.getUsersByRole);
router.put("/approve/:id", protect, authorize("superadmin"), superAdminCtrl.approveUser);
router.delete("/delete/:id", protect, authorize("superadmin"), superAdminCtrl.deleteUser);

// 🏥 CLINICS
router.post("/clinic", protect, authorize("superadmin"), superAdminCtrl.createClinic);

// 📊 DASHBOARD
router.get("/dashboard", protect, authorize("superadmin"), superAdminCtrl.getDashboardStats);

// 📅 APPOINTMENTS & 💳 PAYMENTS
router.get("/appointments", protect, authorize("superadmin"), superAdminCtrl.getAllAppointments);
router.get("/payments", protect, authorize("superadmin"), superAdminCtrl.getAllPayments);

module.exports = router;



