
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Consultation = require("../models/Consultation");

Consultation
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Patient = require('../models/Patient');
const twilio = require('twilio');


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const whatsappFrom = process.env.TWILIO_WHATSAPP_NUMBER;

const upload=require("../middleware/upload")

// doctor registration
exports.registerDoctor = [
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        phone,
        gender,
        age,
        specialization,
        clinicId,
        // videoCallLink,
      } = req.body;

      // Parse availability JSON string
      let availability = {};
      try {
        availability = JSON.parse(req.body.availability);
      } catch (err) {
        return res.status(400).json({ message: "Invalid availability format" });
      }

      // Check if email already exists
      const existing = await Doctor.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: "Doctor with this email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Construct profile image path
      const profileImagePath = req.file ? `/uploads/${req.file.filename}` : '';

      const newDoctor = new Doctor({
        name,
        email,
        password: hashedPassword,
        phone,
        gender,
        age,
        specialization,
        clinicId,
        // videoCallLink,
        profileImage: profileImagePath,
        availability,
        approved: false, // Default: not approved
      });

      await newDoctor.save();

      res.status(201).json({
        message: "Doctor registered successfully",
        doctor: {
          id: newDoctor._id,
          name: newDoctor.name,
          email: newDoctor.email,
          specialization: newDoctor.specialization,
          clinicId: newDoctor.clinicId,
          approved: newDoctor.approved,
          phone: newDoctor.phone,
          gender: newDoctor.gender,
          age: newDoctor.age,
          profileImage: newDoctor.profileImage,
          availability: newDoctor.availability,
        }
      });
    } catch (error) {
      console.error("Doctor registration error:", error);
      res.status(500).json({ message: "Failed to register doctor", error: error.message });
    }
  }
];



// // ⏱️ Utility to generate 30-minute slots with last 60 minutes marked as online
// const generateSlotsWithOnlineFlag = (from, to, onlineMinutes = 60) => {
//   const slots = [];
//   let [startHour, startMin] = from.split(':').map(Number);
//   let [endHour, endMin] = to.split(':').map(Number);
//   let token = 1;

//   const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
//   const totalSlotCount = Math.floor(totalMinutes / 30);
//   const onlineSlotCount = Math.floor(onlineMinutes / 30);

//   while (startHour < endHour || (startHour === endHour && startMin < endMin)) {
//     const slotStart = `${startHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`;
//     let nextMin = startMin + 30;
//     let endSlotHour = startHour;
//     let endSlotMin = nextMin;

//     if (nextMin >= 60) {
//       endSlotHour += 1;
//       endSlotMin = nextMin % 60;
//     }

//     const slotEnd = `${endSlotHour.toString().padStart(2, '0')}:${endSlotMin.toString().padStart(2, '0')}`;

//     const subSlots = [];
//     for (let i = 0; i < 10; i++) {
//       const totalSubMin = startHour * 60 + startMin + i * 3;
//       const h = Math.floor(totalSubMin / 60);
//       const m = totalSubMin % 60;
//       subSlots.push({
//         time: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
//         status: 'available'
//       });
//     }

//     const isOnline = token > (totalSlotCount - onlineSlotCount);

//     slots.push({
//       slot: token++,
//       from: slotStart,
//       to: slotEnd,
//       isOnline,
//       status: 'available',
//       subSlots
//     });

//     startHour = endSlotHour;
//     startMin = endSlotMin;
//   }

//   return slots;
// };





// exports.registerDoctor = [
//   async (req, res) => {
//     try {
//       const {
//         name,
//         email,
//         password,
//         phone,
//         gender,
//         age,
//         specialization,
//         clinicId,
//         // videoCallLink,
//       } = req.body;

//       let availability;
//       try {
//         availability = JSON.parse(req.body.availability); // expects { days: [...], from: "09:00", to: "17:00" }
//       } catch (err) {
//         return res.status(400).json({ message: "Invalid availability format" });
//       }

//       const existing = await Doctor.findOne({ email });
//       if (existing) {
//         return res.status(409).json({ message: "Doctor with this email already exists" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const profileImagePath = req.file ? `/uploads/${req.file.filename}` : '';

//       // Generate time slots with last 60 min marked as online
//       const slots = generateTimeSlots(availability.from, availability.to);

//       const newDoctor = new Doctor({
//         name,
//         email,
//         password: hashedPassword,
//         phone,
//         gender,
//         age,
//         specialization,
//         clinicId,
//         profileImage: profileImagePath,
//         approved: false,
//         availability: {
//           days: availability.days,
//           from: availability.from,
//           to: availability.to,
//           slots
//         }
//       });

//       await newDoctor.save();

//       res.status(201).json({
//         message: "Doctor registered successfully",
//         doctor: {
//           id: newDoctor._id,
//           name: newDoctor.name,
//           email: newDoctor.email,
//           specialization: newDoctor.specialization,
//           clinicId: newDoctor.clinicId,
//           approved: newDoctor.approved,
//           phone: newDoctor.phone,
//           gender: newDoctor.gender,
//           age: newDoctor.age,
//           profileImage: newDoctor.profileImage,
//           availability: newDoctor.availability,
//         }
//       });
//     } catch (error) {
//       console.error("Doctor registration error:", error);
//       res.status(500).json({ message: "Failed to register doctor", error: error.message });
//     }
//   }
// ];



//doctor login
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, doctor });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
};

//GET ALL DOCTOR 
exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find()
    console.log('doctor', doctor);

    // .populate('clinicId doctorId patientId  superadminId');
    if (!doctor) return res.status(404).json({ message: "doctor not found" });
    res.json(doctor)
  } catch (err) {
    res.status(500).json({ message: err.message });

  }
};


// GET /api/doctors/:doctorId
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);

    // console.log("doc",doctor)

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching doctor', error: err.message });
  }

};


//approved doctor by clinic
exports.approveDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { clinicId, currentStatus } = req.body;
  console.log('currentStatus', currentStatus);

  try {
    const doctor = await Doctor.findOne({ _id: doctorId, clinicId, });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found for this clinic' });
    }

    // Optionally verify clinicId matches doctor.clinicId
    if (doctor.clinicId && doctor.clinicId.toString() !== clinicId) {
      return res.status(403).json({ message: "Doctor doesn't belong to this clinic" });
    }

    // Toggle approval
    doctor.approved = !currentStatus;
    await doctor.save();

    doctor.notifications.push({
      type: 'alert',
      message: doctor.approved ? 'Your profile has been approved by clinic.' : 'Your approval was revoked.',
      link: '/doctors/profile', // optional
    });
    await doctor.save();


    res.status(200).json({ message: doctor.approved ? 'Doctor approved' : 'Approval revoked' });
  } catch (err) {
    console.error('Error toggling approval:', err);
    res.status(500).json({ message: 'Server error while updating approval status' });
  }


};


//upload profileimage
exports.uploadProfileImage = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.profileImage = `/uploads/${req.file.filename}`;
    await doctor.save();

    res.status(200).json({
      message: "Profile image updated",
      imageUrl: doctor.profileImage,
    });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// Get profile by ID
exports.getDoctorProfileById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    console.log('doctor', doctor);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctor", error: err.message });
  }
};

// Update profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    console.log('doctor', doctor);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    Object.assign(doctor, req.body);
    doctor.profileUpdateCount = (doctor.profileUpdateCount || 0) + 1;
    await doctor.save();

    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};


//get all notification
exports.getDoctorNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const doctor = await Doctor.findById(req.user.id).select('notifications');
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const start = (page - 1) * limit;
    const paginated = doctor.notifications
      .slice()
      .reverse()
      .slice(start, start + parseInt(limit));

    res.status(200).json({
      notifications: paginated,
      total: doctor.notifications.length
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching notifications", error: err.message });
  }
};


// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    console.log('doctor', doctor);

    const notification = doctor.notifications.id(req.params.id);

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.read = true;
    await doctor.save();
    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark notification", error: err.message });
  }  
};  

// Get unread count
exports.getNotificationCount = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id);
    console.log('doctor', doctor);

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const count = doctor.notifications.filter(n => !n.read).length;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }  
};  

// Helper to generate 30-minute slots between "from" and "to" times ALSO MAKE LAST ONE HR SLOT as online
function generateTimeSlots(from, to, onlineDurationMins = 60) {
  const slots = [];
  let [sh, sm] = from.split(":").map(Number);
  let [eh, em] = to.split(":").map(Number);
  const endTotal = eh * 60 + em;
  const onlineStart = endTotal - onlineDurationMins;
  let token = 1;

  while ((sh * 60 + sm) < endTotal) {
    const cur = sh * 60 + sm;
    let nextMin = sm + 30;
    let nh = sh, nm = nextMin;
    if (nextMin >= 60) { nh += 1; nm %= 60; }

    const subSlots = [];
    for (let i = 0; i < 10; i++) {
      const m = cur + i * 3;
      if (m >= endTotal) break;
      subSlots.push({
        time: `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`,
        status: "available"
      });
    }

    slots.push({
      slot: token++,
      from: `${String(sh).padStart(2,"0")}:${String(sm).padStart(2,"0")}`,
      to: `${String(nh).padStart(2,"0")}:${String(nm).padStart(2,"0")}`,
      type: cur >= onlineStart ? "online" : "offline",
      status: "available",
      subSlots
    });

    sh = nh; sm = nm;
  }

  return slots;
}


// helper to get weekday
function getWeekday(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
}

// getAvailableSlotsByWeekAvailability 
exports.getAvailableSlotsByWeekAvailability = async (req, res) => {
  const { doctorId } = req.params;
  const {date}=req.body
console.log("doctorId",doctorId);
console.log("date",date);

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const weekday = getWeekday(date);

    if (!doctor.availability.days.includes(weekday)) {
      return res.status(400).json({ message: 'Doctor not available on selected day' });
    }
    
    const generatedSlots = generateTimeSlots(doctor.availability.from, doctor.availability.to);
    console.log("slots",generatedSlots)

    // Get already booked appointments on this date
    const bookedAppointments = await Appointment.find({ doctorId, date });

    // Mark slots as booked
    const bookedTimes = bookedAppointments.map(app => app.from);
    const finalSlots = generatedSlots.map(slot => {
      if (bookedTimes.includes(slot.from)) {
        return { ...slot, status: 'booked' };
      }
      return slot;
    });

    res.json({ slots: finalSlots });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error loading slots', error: err.message });
  }
};

// getPatientsByDoctor
exports.getPatientsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId).populate("appointments");
    const patients = await Promise.all(
      doctor.appointments.map(async (apptId) => {
        const appt = await Appointment.findById(apptId).populate("patientId");
        return appt?.patientId;
      })
    );
    res.json(patients.filter(Boolean));
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients", error: err });
  }
};





// // Update doctor profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedDoctor);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating profile' });
//   }
// };



// Send Google Meet Link to assigned patient via WhatsApp
// exports.sendMeetLinkToPatient = async (req, res) => {
//   const { doctorId, meetLink,patientId } = req.body;
//   console.log('meetLink',meetLink);
//     console.log('doctorId',doctorId);


//   try {
//     const doctor = await Doctor.findById(doctorId);
//     const patient = await Consultation.findOne({ patientId });
// console.log("patient",patient);

//     if (!patient || !patient.contact.phone) {
//       return res.status(404).json({ message: 'Patient or phone not found' });
//     }

//     const messageBody = `Hello ${patient.name}, this is Dr. ${doctor.name}. Here is your Google Meet link for the appointment: ${meetLink}`;

//     await client.messages.create({
//       from: `whatsapp:${whatsappFrom}`,
//       to: `whatsapp:${patient.contact.phone}`,
//       body: messageBody,
//     });

//     res.status(200).json({ message: 'WhatsApp message sent successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to send WhatsApp message' });
//   }
// };



// exports.sendMeetLinkToPatient = async (req, res) => {
//   const { doctorId, meetLink, patientId } = req.body;
// console.log('doctorId',doctorId);
// console.log('meetLink',meetLink);
// console.log('patientId',patientId);


//   try {
//     const doctor = await Doctor.findById(doctorId);
//     const patient = await Patient.findById(patientId);

//     if (!doctor || !patient || !patient.contact?.phone) {
//       return res.status(404).json({ message: 'Doctor, patient or phone number not found' });
//     }

//     const messageBody = `Hello ${patient.name}, this is Dr. ${doctor.name}. Here is your Google Meet link for the appointment: ${meetLink}`;

//     await client.messages.create({
//       from: whatsappFrom,
//       to: `whatsapp:+91${patient.contact.phone}`,
//       body: messageBody,
//     });

//     res.status(200).json({ message: 'WhatsApp message sent successfully' });
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Failed to send WhatsApp message' });
//   }
// };










// 💬 Generate Prescription
exports.generatePrescription = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { patientId, prescriptionText, fileUrl } = req.body;
    const doctor = await Doctor.findById(doctorId);
    doctor.prescriptions.push({ patientId, prescriptionText, fileUrl });
    await doctor.save();
    res.json({ message: "Prescription added", prescriptions: doctor.prescriptions });
  } catch (err) {
    res.status(500).json({ message: "Prescription error", error: err });
  }
};



// 📎 Upload Report for Patient (by Doctor)
exports.uploadReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { title, patientId, fileUrl, description } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const report = {
      title,
      patientId,
      fileUrl,
      description,
      createdAt: new Date()
    };

    doctor.reports.push(report);
    await doctor.save();

    res.status(200).json({ message: "Report uploaded", report });
  } catch (error) {
    res.status(500).json({ message: "Error uploading report", error });
  }
};











// 🧪 View Test Results
exports.getTestResults = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    res.json(doctor.testResults);
  } catch (err) {
    res.status(500).json({ message: "Error fetching test results", error: err });
  }
};

// 💰 View Payments
exports.getPayments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    res.json(doctor.payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments", error: err });
  }
};




// 📨 Send Notification to Doctor
exports.sendNotification = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { message, type = "info" } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.notifications.push({ message, type });
    await doctor.save();

    res.status(200).json({ message: "Notification sent", notifications: doctor.notifications });
  } catch (error) {
    res.status(500).json({ message: "Error sending notification", error });
  }
};






// // SAVE MEET LINK & SEND WHATSAPP URL
// exports.sendMeetLink = async (req, res) => {
//   try {
//     const { doctorId, patientId, meetLink,appointmentId } = req.body;

//     // if (!doctorId || !patientId || !meetLink) {
//     //   return res.status(400).json({ error: "Missing required fields" });
//     // }

//     // 🔥 Save meetlink in the appointment collection
//     const appointments = await Appointment.findByIdAndUpdate(appointmentId,{meetLink},{new:true}
//       // { doctorId, patientId },
      
//     );

//     if (!appointments) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     // Get patient phone
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ error: "Patient not found" });
//     }

//     const phoneNumber = patient.contact.phone;

//     console.log("Patient",patient)

//     const message = `Hello! Your Google Meet link is: ${meetLink}`;
//     const encodedMessage = encodeURIComponent(message);

//     const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;

//     res.json({
//       success: true,
//       message: "Meet link saved successfully",
//       whatsappUrl,
//       appointments
//     });

//   } catch (error) {
//     console.log("Error sending meet link:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };










// SAVE MEET LINK & SEND WHATSAPP URL
exports.sendMeetLink = async (req, res) => {
  try {
    const { appointmentId, meetLink } = req.body;

    if (!appointmentId || !meetLink) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Save meet link in appointment
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { meetLink },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Get patient phone
    const patient = await Patient.findById(appointment.patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const phoneNumber = patient.contact.phone;

    const message = `Hello! Your Google Meet link is: ${meetLink}`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodedMessage}`;

    res.json({
      success: true,
      message: "Meet link saved successfully",
      whatsappUrl,
      appointment
    });
  } catch (error) {
    console.error("Error sending meet link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




// exports.sendMeetLink = async (req, res) => {
//   try {
//     const { doctorId, patientId, meetLink } = req.body;

//     if (!doctorId || !patientId || !meetLink) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // ⬇ Save Meet Link inside the appointment
//     const appointment = await Appointment.findOneAndUpdate(
//       { doctorId, patientId },
//       { meetLink },
//       { new: true }
//     );

//     if (!appointment) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     // ⬇ Fetch patient phone
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ error: "Patient not found" });
//     }

//     const phoneNumber = patient.phone;

//     // ⬇ Create WhatsApp message URL
//     const message = `Hello ${patient.name}, your Google Meet link is:\n${meetLink}`;
//     const encodedMessage = encodeURIComponent(message);
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

//     return res.json({
//       success: true,
//       message: "Meet link saved and WhatsApp link ready",
//       whatsappUrl,
//       appointment
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

















// // 🔔 Send Notification
// exports.sendNotification = async (req, res) => {
//   try {
//     const { doctorId } = req.params;
//     const { message, type = "info" } = req.body;
//     const doctor = await Doctor.findById(doctorId);
//     doctor.notifications.push({ message, type });
//     await doctor.save();
//     res.json({ message: "Notification sent", notifications: doctor.notifications });
//   } catch (err) {
//     res.status(500).json({ message: "Notification error", error: err });
//   }
// };

// 📂 Upload Report
// exports.uploadReport = async (req, res) => {
//   try {
//     const { doctorId } = req.params;
//     const { title, patientId, fileUrl, description } = req.body;
//     const doctor = await Doctor.findById(doctorId);
//     doctor.reports.push({ title, patientId, fileUrl, description });
//     await doctor.save();
//     res.json({ message: "Report uploaded", reports: doctor.reports });
//   } catch (err) {
//     res.status(500).json({ message: "Report error", error: err });
//   }
// };








