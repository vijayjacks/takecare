const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminController");
// const {protect} = require("../middleware/auth");
const { protect, authorize } = require('../middleware/auth');

router.post("/register", adminCtrl.registerAdmin);
router.post("/login", adminCtrl.loginAdmin);
router.get("/",  adminCtrl.getAllAdmins);
router.delete("/:id", adminCtrl.deleteAdmin);

router.use(protect, authorize('admin'));
router.get('/appointments',protect, adminCtrl.getMyAppointments);
router.post('/appointments', adminCtrl.schedule);

module.exports = router;


