
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.approveDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.approved = true;
    doctor.approvalHistory.push({
      approvedBy: req.user.id,
      status: 'approved',
      timestamp: new Date()
    });

    await doctor.save();
    sendApprovalEmail(doctor.email, doctor.name); // ⬅️ see next section
    res.json({ message: "Doctor approved successfully" });
  } catch (err) {
    console.error("Error approving doctor:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});


exports.sendApprovalEmail = (email, doctorName) => {
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Doctor Approval Notification",
    html: `<p>Dear Dr. ${doctorName},</p>
           <p>Your profile has been approved. You can now access all features on the platform.</p>
           <p>Regards,<br/>TakeCare Team</p>`
  };

  return transporter.sendMail(mailOptions);
};
