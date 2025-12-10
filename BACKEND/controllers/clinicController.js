const Clinic = require('../models/clinic');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const Patient = require('../models/Patient');
const Consultation = require('../models/Consultation');
// const VitalsHistory = require('../models/VitalsHistory');

const sendEmail = require('../utils/sendEmail'); // your custom mailer function


// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Stripe = require("stripe");
const stripe = new Stripe(process.env.secrete_key);


// const Patient = require("../models/Patient");




exports.registerClinic = async (req, res) => {
  try {
    const { name, email, password, address, phone, location, description } = req.body;

    // Validate required fields
    if (!name || !email || !password || !address || !phone || !location?.city || !description) {
      return res.status(400).json({ message: "All fields are required including city in location." });
    }

    const existing = await Clinic.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Clinic with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClinic = new Clinic({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      location,
      description
    });

    await newClinic.save();

    res.status(201).json({
      message: "Clinic registered successfully",
      clinic: {
        id: newClinic._id,
        name: newClinic.name,
        email: newClinic.email,
        address: newClinic.address,
        location: newClinic.location,
        phone: newClinic.phone,
        description: newClinic.description
      }
    });
  } catch (err) {
    console.error("Error registering clinic:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.loginClinic = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const clinic = await Clinic.findOne({ email });

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    const isMatch = await bcrypt.compare(password, clinic.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: clinic._id, role: 'clinic' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token, clinic });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};




//Get all clinics
exports.getAllClinics = async (req, res) => {
  try {
    const clinic = await Clinic.find()
    // .populate('clinicId doctorId  labId pharmacyId superadminId');
    // console.log("cli",clinic);

    if (!clinic) return res.status(404).json({ message: "Clinic not found" });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId);
    // console.log("clinic",clinic)
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinic', error });
    console.log();

  }
};



exports.getDoctorsBySpecialization = async (req, res) => {
  const { clinicId } = req.params;
  // const clinicId  = req.params.clinicId.toString()
  const { specialization } = req.body;
  console.log('clinicId', clinicId);
  console.log('specialization', specialization);


  try {

    const doctors = await Doctor.find({ clinicId, specialization, approved: true })
    console.log('doctors', doctors)
    // const query = {
    //   clinicId,  // Use correct field name from Doctor model
    //   approved: true
    // };

    // if (specialization) {
    //   query.specialization = specialization;
    // }

    // const doctors = await Doctor.find(query).select('name specialization email phone availability');
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching doctors by specialization',
      error
    });
  }
};





// ✅ Check if patient is registered for clinic
exports.checkClinicRegistration = async (req, res) => {
  try {
    const { clinicId, patientId } = req.params;
    console.log("clinic", clinicId);
    console.log("patient", patientId);

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const record = patient.registeredClinics.find(
      (r) => r.clinicId.toString() === clinicId && r.paymentStatus === "paid"
    );

    res.status(200).json({ registered: !!record });
  } catch (error) {
    res.status(500).json({ message: "Error checking registration", error });
  }
};

// // ✅ Start Stripe payment for registration
// exports.createClinicRegistrationPayment = async (req, res) => {
//   try {
//     const { clinicId, patientId } = req.body;
//     console.log("clinic", clinicId);
//     console.log("patient", patientId);

//     const amount = 500 * 100; // ₹500 in paise

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "inr",
//       metadata: { clinicId, patientId },
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Payment initiation failed", error });
//   }
// };





// // ✅ Confirm successful payment and save registration
// exports.confirmClinicRegistration = async (req, res) => {
//   try {
//     const { clinicId, patientId, paymentId } = req.body;
//     console.log("clinic", clinicId);
//     console.log("patient", patientId);
//     console.log("payment", paymentId);

//     const patient = await Patient.findById(patientId);
//     if (!patient) return res.status(404).json({ message: "Patient not found" });

//     // prevent duplicate entries
//     const exists = patient.registeredClinics.find(
//       (r) => r.clinicId.toString() === clinicId && r.paymentStatus === "paid"
//     );

//     console.log("exisist",exists)
//     if (exists) return res.status(400).json({ message: "Already registered" });

//     patient.registeredClinics.push({
//       clinicId,
//       paymentStatus: "paid",
//       paymentId,
//       registeredAt: new Date(),
//     });

//     await patient.save();

//     res.status(200).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error confirming registration", error });
//   }
// };




// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.SECRET_KEY);


// 1️⃣ Create Stripe Checkout Session for clinic registration
exports.createClinicRegistrationCheckout = async (req, res) => {
  try {
    const { clinicId, patientId } = req.body;
    if (!clinicId || !patientId)
      return res.status(400).json({ message: "Clinic and Patient ID required" });

    const amount = 500; // INR ₹500 registration fee

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Clinic Registration Fee",
              description: "Access to clinic and doctors list",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URI}/clinics/${clinicId}/patients/${patientId}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URI}/clinics/${clinicId}/patients/${patientId}/payment-cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: "Error creating Stripe checkout", error });
  }
};


// // 2️⃣ Confirm successful payment (after redirect from Stripe)
// exports.confirmClinicRegistration = async (req, res) => {
//   try {
//     const { sessionId, clinicId, patientId } = req.body;

//     const patient = await Patient.findById(patientId);
//     const clinic = await Clinic.findById(clinicId);

//     if (!patient || !clinic)
//       return res.status(404).json({ message: "Clinic or Patient not found" });

//      // Prevent duplicates
//     const alreadyRegistered = patient.registeredClinics.find(
//       (r) => r.clinicId.toString() === clinicId && r.paymentStatus === "paid"
//     );
//     if (alreadyRegistered)
//       return res.status(409).json({ message: "Already registered in this clinic" });

//     // Retrieve session from Stripe to verify payment
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

    
//        // Save in Patient
//     patient.registeredClinics.push({
//       clinicId,
//       paymentStatus: "paid",
//       paymentId: session.payment_intent,
//       registeredAt: new Date(),
//     });
//     await patient.save();

//     // Add patient to clinic
//     if (!clinic.patients.includes(patientId)) {
//       clinic.patients.push({patientId});
//       await clinic.save();
//     }

//     res.status(200).json({ message: "Registration successful" });
//   } catch (error) {
//     console.error("Confirm Registration Error:", error);
//     res.status(500).json({ message: "Error confirming registration", error });
//   }
// };


// exports.confirmClinicRegistration = async (req, res) => {
//   try {
//     const { sessionId, clinicId, patientId } = req.body;

//     // 1️⃣ Fetch patient and clinic
//     const patient = await Patient.findById(patientId);
//     const clinic = await Clinic.findById(clinicId);

//     if (!patient || !clinic)
//       return res.status(404).json({ message: "Clinic or Patient not found" });

//     // 2️⃣ Prevent duplicate registration
//     const alreadyRegistered = patient.registeredClinics.find(
//       (r) => r.clinicId.toString() === clinicId && r.paymentStatus === "paid"
//     );
//     if (alreadyRegistered)
//       return res.status(409).json({ message: "Already registered in this clinic" });

//     // 3️⃣ Verify payment using Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     // 4️⃣ Save registration in Patient model
//     patient.registeredClinics.push({
//       clinicId,
//       paymentStatus: "paid",
//       paymentId: session.payment_intent,
//       registeredAt: new Date(),
//     });
//     await patient.save();

//     // 5️⃣ Save patient in Clinic model
//     if (!clinic.patients.some((id) => id.toString() === patientId)) {
//       clinic.patients.push(patientId);
//     }

//     // 6️⃣ Save registration details in Clinic model
//     if (!clinic.registrations) clinic.registrations = [];
//     const alreadyRecorded = clinic.registrations.find(
//       (r) => r.patientId.toString() === patientId
//     );

//     if (!alreadyRecorded) {
//       clinic.registrations.push({
//         patientId,
//         paymentStatus: "paid",
//         paymentId: session.payment_intent,
//         registeredAt: new Date(),
//       });
//     }

//     await clinic.save();

//     // 7️⃣ Respond
//     res.status(200).json({ message: "Registration saved in both Patient and Clinic" });
//   } catch (error) {
//     console.error("Confirm Registration Error:", error);
//     res.status(500).json({
//       message: "Error confirming registration",
//       error: error.message,
//     });
//   }
// };






// 🧩 Confirm Clinic Registration (Patient paying to register)
exports.confirmClinicRegistration = async (req, res) => {
  try {
    const { sessionId, clinicId, patientId } = req.body;

    const patient = await Patient.findById(patientId);
    const clinic = await Clinic.findById(clinicId);

    if (!patient || !clinic)
      return res.status(404).json({ message: "Clinic or Patient not found" });

    // ✅ Verify payment
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid")
      return res.status(400).json({ message: "Payment not completed" });

    // ✅ Prevent duplicate in patient.registeredClinics
    const alreadyRegistered = patient.registeredClinics.find(
      (r) => r.clinicId.toString() === clinicId && r.paymentStatus === "paid"
    );
    if (alreadyRegistered)
      return res.status(409).json({ message: "Already registered in this clinic" });

    // ✅ Save registration in patient model
    patient.registeredClinics.push({
      clinicId,
      paymentStatus: "paid",
      paymentId: session.payment_intent,
      registeredAt: new Date(),
    });
    await patient.save();

    // ✅ Prevent duplicate registration entry in clinic model
    const alreadyRegisteredInClinic = clinic.registrations.some(
      (r) => r.patientId.toString() === patientId
    );

    if (!alreadyRegisteredInClinic) {
      clinic.registrations.push({
        patientId,
        paymentStatus: "paid",
        paymentId: session.payment_intent,
        registeredAt: new Date(),
      });
    }

    // ✅ Add patient to clinic.patients if not already there
    if (!clinic.patients.includes(patientId)) {
      clinic.patients.push(patientId);
    }

    await clinic.save();

    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Confirm Registration Error:", error);
    res.status(500).json({
      message: "Error confirming registration",
      error: error.message,
    });
  }
};

// // 🧩 Get All Clinic Registrations
// exports.getClinicRegistrations = async (req, res) => {
//   try {
//     const { clinicId } = req.params;

//     const clinic = await Clinic.findById(clinicId)
//       .populate("registrations.patientId", "name email phone");

//     if (!clinic) {
//       return res.status(404).json({ message: "Clinic not found" });
//     }

//     res.status(200).json({
//       message: "Clinic registrations fetched successfully",
//       registrations: clinic.registrations,
//     });
//   } catch (error) {
//     console.error("Error fetching clinic registrations:", error);
//     res.status(500).json({
//       message: "Error fetching clinic registrations",
//       error: error.message,
//     });
//   }
// };




// 🧩 Get All Clinic Registrations with full patient info
exports.getClinicRegistrations = async (req, res) => {
  try {
    const { clinicId } = req.params;

    // Find clinic and populate patient details from registrations
    const clinic = await Clinic.findById(clinicId)
      .select("name email phone registrations") // Clinic info + registrations
      .populate({
        path: "registrations.patientId",
        select: "name email gender age contact", // Get required patient fields
      });

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    // Map registrations to include clinic info for each registration
    const clinicDetails={name:clinic.name,email:clinic.email,phone:clinic.phone}
    const registrationsWithClinic = clinic.registrations.map((reg) => ({
      _id: reg._id,
      paymentId: reg.paymentId,
      paymentStatus: reg.paymentStatus,
      registeredAt: reg.registeredAt,
      clinic: {
        _id: clinic._id,
        name: clinic.name,
        email: clinic.email,
        phone: clinic.phone,
      },
      patient: reg.patientId
        ? {
            _id: reg.patientId._id,
            name: reg.patientId.name,
            email: reg.patientId.email,
            gender: reg.patientId.gender,
            age: reg.patientId.age,
            phone: reg.patientId.contact?.phone || "N/A",
          }
        : null,
    }));

    res.status(200).json({
      message: "Clinic registrations fetched successfully",
      registrations: registrationsWithClinic,
      clinicDetails
    });
  } catch (error) {
    console.error("Error fetching clinic registrations:", error);
    res.status(500).json({
      message: "Error fetching clinic registrations",
      error: error.message,
    });
  }
};



// vii
// // Get all appointments for a clinic
// exports.getClinicAppointments = async (req, res) => {
//   const { clinicId } = req.params;
//     console.log("clinicId",clinicId)

//   const appointments = await Appointment.find({ clinicId })
//     .populate('patientId', 'name email phone')
//     .populate('clinicId', 'name')
//     .populate('doctorId', 'name');

//   res.json(appointments);
// };

// // Update appointment status (confirm or reject)
// // exports.updateAppointmentStatus = async (req, res) => {
// //   const { appointmentId } = req.params;
// //       console.log("appointmentId",appointmentId)

// //   const { status } = req.body;

// //   if (!['confirmed', 'cancelled'].includes(status)) {
// //     return res.status(400).json({ message: 'Invalid status' });
// //   }

// //   const appointment = await Appointment.findById(appointmentId)
// //     .populate('patientId', 'email name')
// //     .populate('clinicId', 'name');

// //   if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

// //   appointment.status = status;
// //   await appointment.save();

// //   // Send email to patient
// //   const subject = `Your appointment has been ${status}`;
// //   const message = `
// //     Hello ${appointment.patientId.name},

// //     Your appointment at ${appointment.clinicId.name} has been ${status}.

// //     Date: ${appointment.date}
// //     Time: ${appointment.from} - ${appointment.to}

// //     Thank you.
// //   `;

// //   await sendEmail(appointment.patientId.email, subject, message);

// //   res.json({ message: `Appointment ${status}` });
// // };

// vii
// exports.updateAppointmentStatus = async (req, res) => {
//   const { appointmentId } = req.params;
//   const { status } = req.body;

//   if (!['confirmed', 'cancelled'].includes(status)) {
//     return res.status(400).json({ message: 'Invalid status' });
//   }

//   const appointment = await Appointment.findByIdAndUpdate(
//     appointmentId,
//     { status },
//     { new: true, runValidators: false } // disable full validation
//   )
//     .populate('patientId', 'email name')
//     .populate('clinicId', 'name');

//   if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

//   const subject = `Your appointment has been ${status}`;
//   const message = `
//     Hello ${appointment.patientId.name},

//     Your appointment at ${appointment.clinicId.name} has been ${status}.

//     Date: ${appointment.date}
//     Time: ${appointment.from} - ${appointment.to}

//     Thank you.
//   `;

//   await sendEmail(appointment.patientId.email, subject, message);

//   res.json({ message: `Appointment ${status}` });
// };





// ✅ Get bookings












// Get all appointments for a clinic
exports.getClinicAppointments = async (req, res) => {
  try {
    const { clinicId } = req.params;
    console.log("clinicId", clinicId);

    const appointments = await Appointment.find({ clinicId })
      .populate('patientId', 'name email contact')
      .populate('clinicId', 'name')
      .populate('doctorId', 'name')
      .lean(); // improves performance

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update appointment status (confirm or cancel)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;


    if (!['confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true, runValidators: false }
    )
      .populate('patientId', 'email name')
      .populate('clinicId', 'name');

    console.log("apptst", appointment)
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const subject = `Your appointment has been ${status}`;
    const message = `
Hello ${appointment.patientId.name},

Your appointment at ${appointment.clinicId.name} has been ${status}.

Date: ${new Date(appointment.date).toLocaleDateString()}
Time: ${appointment.timeSlot.from} - ${appointment.timeSlot.to}

Thank you.
    `;

    await sendEmail({ to: appointment.patientId.email, subject, text: message });

    res.json({ message: `Appointment ${status}` });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ message: 'Server error' });
  }
};






// Sync latest vitals from latest consultation into patient's vitals
// exports.syncLatestVitalsToPatient = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     console.log('patientId',patientId);


//     // Step 1: Find patient by ID
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     // Step 2: Get the latest consultation
//     const latestConsultation = await Consultation.findOne({ patient: patientId })
//       .sort({ consultationDate: -1 }) // newest first
//       .select('vitals consultationDate') // only get vitals and date
//       .lean();

//     if (!latestConsultation || !latestConsultation.vitals) {
//       return res.status(404).json({ message: "No recent vitals found in consultation" });
//     }

//     // Step 3: Update patient's vitals and timestamp
//     patient.vitals = latestConsultation.vitals;
//     patient.vitalsUpdatedAt = new Date();

//     await patient.save();

//     res.status(200).json({
//       message: "Vitals updated successfully from latest consultation.",
//       vitals: patient.vitals,
//       updatedAt: patient.vitalsUpdatedAt
//     });

//   } catch (error) {
//     console.error("Error syncing latest vitals:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



// exports.syncLatestVitalsToPatient = async (req, res) => {
//   try {
//     const { patientId } = req.params;

//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     // First, check for the latest consultation
//     const latestConsultation = await Consultation.findOne({ patient: patientId })
//       .sort({ consultationDate: -1 })
//       .select('vitals consultationDate')
//       .lean();

//     if (latestConsultation && latestConsultation.vitals) {
//       patient.vitals = latestConsultation.vitals;
//       patient.vitalsUpdatedAt = new Date();
//       await patient.save();
//     }

//     // Either way, return whatever vitals exist
//     res.status(200).json({
//       message: latestConsultation?.vitals
//         ? "Vitals updated from latest consultation."
//         : "No recent consultation. Showing last known vitals from clinic.",
//       vitals: patient.vitals || {},
//       updatedAt: patient.vitalsUpdatedAt || null,
//     });

//   } catch (error) {
//     console.error("Error syncing latest vitals:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// exports.addVitals = async (req, res) => {
//   const { patientId } = req.params;
//   console.log('patientId',patientId);

//   const { vitals } = req.body;
//   console.log('vitals',vitals);

//   if (!vitals || typeof vitals !== 'object') {
//     return res.status(400).json({ message: 'Vitals data is invalid' });
//   }

//   const patient = await Patient.findById(patientId);
//   if (!patient) return res.status(404).json({ message: "Patient not found" });

//   patient.vitals = vitals;
//   patient.vitalsUpdatedAt = new Date();

//   await patient.save();

//   await VitalsHistory.create({ patient: patientId, vitals, updatedAt: new Date() });

//   res.status(200).json({ message: "Vitals updated", vitals });
// };
// vii

// exports.addVitals = async (req, res) => {
//   const { patientId } = req.params;
//   const { vitals } = req.body;

//   console.log('patientId', patientId);
//   console.log('vitals', vitals);

//   if (!vitals || typeof vitals !== 'object') {
//     return res.status(400).json({ message: 'Vitals data is invalid' });
//   }

//   try {
//     const patient = await Patient.findById(patientId);
//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     // Update patient's vitals
//     patient.vitals = vitals;
//     patient.vitalsUpdatedAt = new Date();
//     await patient.save();

//     // Save vitals history
//     await VitalsHistory.create({
//       patient: patientId,
//       vitals,
//       updatedAt: new Date(),
//     });

//     // ✅ Optional: Sync to the latest or active consultation
//     // const consultation = await Consultation.findOne({
//     //   patient: patientId,
//     //   status: 'active', // or use sort: { createdAt: -1 } if no status
//     // });

//         // ✅ Optional: Sync to the latest or active consultation
//     const consultation = await Consultation.findOne({ patient: patientId }).sort({ createdAt: -1 });


//     if (consultation) {
//       consultation.vitals = vitals;
//       consultation.vitalsUpdatedAt = new Date();
//       await consultation.save();
//       console.log("Vitals synced with consultation:", consultation._id);
//     } else {
//       console.log("No active consultation found to sync vitals.");
//     }

//     return res.status(200).json({
//       message: "Vitals updated successfully.",
//       vitals,
//     });

//   } catch (error) {
//     console.error("Error updating vitals:", error);
//     return res.status(500).json({ message: "Server error while updating vitals." });
//   }
// };


// exports.getVitalsHistory = async (req, res) => {
//   const { patientId } = req.params;
//   const history = await VitalsHistory.find({ patient: patientId }).sort({ updatedAt: -1 }).limit(10);
//   res.status(200).json({ history });
// };






// Optional: You can customize this based on your actual schema
const validateVitals = (vitals) => {
  if (typeof vitals !== 'object' || Array.isArray(vitals)) {
    return 'Vitals should be a valid object.';
  }
  const validKeys = [
    'temperature',
    'pulse',
    'bloodPressure',
    'respirationRate',
    'oxygenSaturation',
    'height',
    'weight',
    'bmi',
    'glucose'
  ];

  const invalidFields = Object.keys(vitals).filter(key => !validKeys.includes(key));
  if (invalidFields.length) {
    return `Invalid fields in vitals: ${invalidFields.join(', ')}`;
  }

  return null;
};

// ✅ 1. Add Vitals (from clinic) and sync to latest consultation
exports.addVitals = async (req, res) => {
  const { patientId } = req.params;
  console.log('patientId', patientId);

  const { vitals } = req.body;
  console.log('vitals', vitals);

  if (!vitals || typeof vitals !== 'object') {
    return res.status(400).json({ message: 'Vitals data is invalid or missing.' });
  }

  const validationError = validateVitals(vitals);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    // Update patient's vitals
    patient.vitals = vitals;
    patient.vitalsUpdatedAt = new Date();
    await patient.save();

    // // Save to vitals history
    // await VitalsHistory.create({
    //   patient: patientId,
    //   vitals,
    //   updatedAt: new Date(),
    // });

    // Sync to latest consultation
    const consultation = await Consultation.findOne({ patient: patientId }).sort({ createdAt: -1 });

    if (consultation) {
      consultation.vitals = vitals;
      consultation.vitalsUpdatedAt = new Date();
      await consultation.save();
    }

    return res.status(200).json({
      message: 'Vitals updated successfully.',
      vitals,
    });

  } catch (error) {
    console.error('Error updating vitals:', error);
    return res.status(500).json({ message: 'Server error while updating vitals.' });
  }
};



//  Sync Latest Consultation Vitals to Patient
exports.syncLatestVitalsToPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    const latestConsultation = await Consultation.findOne({ patient: patientId })
      .sort({ consultationDate: -1, createdAt: -1 }) // Fallback to createdAt
      .select('vitals consultationDate')
      .lean();

    if (latestConsultation && latestConsultation.vitals) {
      patient.vitals = latestConsultation.vitals;
      patient.vitalsUpdatedAt = new Date();
      await patient.save();

      return res.status(200).json({
        message: 'Vitals updated from latest consultation.',
        vitals: patient.vitals,
        updatedAt: patient.vitalsUpdatedAt,
      });
    }

    return res.status(200).json({
      message: 'No recent consultation found. Showing existing vitals.',
      vitals: patient.vitals || {},
      updatedAt: patient.vitalsUpdatedAt || null,
    });

  } catch (error) {
    console.error('Error syncing vitals from consultation:', error);
    return res.status(500).json({ message: 'Server error while syncing vitals.' });
  }
};






// // ✅Get Vitals History
// exports.getVitalsHistory = async (req, res) => {
//   const { patientId } = req.params;
//   const limit = parseInt(req.query.limit) || 10;

//   try {
//     const history = await VitalsHistory.find({ patient: patientId })
//       .sort({ updatedAt: -1 })
//       .limit(limit);

//     return res.status(200).json({
//       message: 'Vitals history fetched successfully.',
//       history,
//     });
//   } catch (error) {
//     console.error('Error fetching vitals history:', error);
//     return res.status(500).json({ message: 'Server error while fetching vitals history.' });
//   }
// };















exports.getBookings = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId).populate("bookings");
    res.json(clinic.bookings || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




















// Update clinic

exports.updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.clinicId, req.body, { new: true });
    res.json({ message: "Clinic updated", clinic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete clinic
exports.deleteClinic = async (req, res) => {
  try {
    await Clinic.findByIdAndDelete(req.params.clinicId);
    res.json({ message: "Clinic deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add test
exports.addTest = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.clinicId,
      { $push: { availableTests: req.body } },
      { new: true }
    );
    res.json({ message: "Test added", clinic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId);
    res.json(clinic.availableTests || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add medicine
exports.addMedicine = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.clinicId,
      { $push: { availableMedicines: req.body } },
      { new: true }
    );
    res.json({ message: "Medicine added", clinic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId);
    res.json(clinic.availableMedicines || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get payments
exports.getPayments = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId).populate("bills");
    const payments = clinic.bills.map(b => b.payment);
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get bills
exports.getBills = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId).populate("bills");
    res.json(clinic.bills || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId).populate("prescriptions");
    res.json(clinic.prescriptions || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Upload report
exports.uploadReport = async (req, res) => {
  try {
    const report = req.body; // title, fileUrl, etc.
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.clinicId,
      { $push: { reports: report } },
      { new: true }
    );
    res.json({ message: "Report uploaded", clinic });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get reports
exports.getReports = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId);
    res.json(clinic.reports || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.clinicId)
      .populate("doctors nurses receptionists billingStaff");
    const staff = {
      doctors: clinic.doctors,
      nurses: clinic.nurses,
      receptionists: clinic.receptionists,
      billingStaff: clinic.billingStaff
    };
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
