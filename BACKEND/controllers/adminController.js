  const Admin = require("../models/Admin");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const Appointment = require('../models/Appointment');

  exports.registerAdmin = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      const admin = new Admin({ name, email, password: hashed, role });
      await admin.save();
      res.status(200).json({ message: "Admin registered" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      
      if (!admin) return res.status(404).json({ message: "Admin not found" });
      
      const match = await bcrypt.compare(password, admin.password);
      console.log("admin log",match);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: admin._id, role: "admin"}, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });

      admin.lastLogin = new Date();
      await admin.save();

      res.json({ token, admin });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getAllAdmins = async (req, res) => {
    const admins = await Admin.find();
    res.json(admins);
  };


  exports.deleteAdmin = async (req, res) => {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted" });
  };



  exports.getMyAppointments = async (req, res) => {
    console.log(req.user.role)

    if(req.user.role==="admin"){
    const appts = await Appointment.find({ clinicId: req.user.clinicId })
      .populate('doctorId patientId', 'name');
    res.json(appts);
  };
  }


  exports.schedule = async (req, res) => {
    const appt = await Appointment.create({
      ...req.body,
      clinicId: req.user.clinicId
    });
    res.status(201).json(appt);
  };
