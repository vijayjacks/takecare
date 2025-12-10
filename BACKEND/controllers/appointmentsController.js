const Appointment = require('../models/Appointment');
const Clinic = require('../models/clinic');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');


const Stripe = require("stripe");
const stripe = new Stripe(process.env.secrete_key);


// const sendNotification = require('../utils/sendNotification'); // optional

//bookingslot genaration 
// const generateTimeSlots = (from, to) => {
//   const slots = [];
//   let [startHour, startMin] = from.split(':').map(Number);
//   let [endHour, endMin] = to.split(':').map(Number);
//   let token = 1;

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
//       const totalMinutes = startHour * 60 + startMin + i * 3;
//       const h = Math.floor(totalMinutes / 60);
//       const m = totalMinutes % 60;
//       const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
//       subSlots.push({ time, status: 'available' });
//     }

//     slots.push({
//       slot: token++,
//       from: slotStart,
//       to: slotEnd,
//       subSlots
//     });

//     startHour = endSlotHour;
//     startMin = endSlotMin;
//   }

//   return slots;
// };


// const generateTimeSlots = (from, to, onlineDurationMins = 60) => {
//   const slots = [];
//   let [startHour, startMin] = from.split(':').map(Number);
//   let [endHour, endMin] = to.split(':').map(Number);

//   // Calculate total end time in minutes
//   const totalEndMinutes = endHour * 60 + endMin;
//   const onlineStartMinutes = totalEndMinutes - onlineDurationMins;

//   let token = 1;

//   while ((startHour * 60 + startMin) < totalEndMinutes) {
//     const currentMinutes = startHour * 60 + startMin;
//     const slotStart = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;

//     let endSlotMin = startMin + 30;
//     let endSlotHour = startHour;
//     if (endSlotMin >= 60) {
//       endSlotHour += 1;
//       endSlotMin %= 60;
//     }
//     const slotEnd = `${String(endSlotHour).padStart(2, '0')}:${String(endSlotMin).padStart(2, '0')}`;

//     const isOnline = currentMinutes >= onlineStartMinutes;

//     const subSlots = [];
//     for (let i = 0; i < 10; i++) {
//       const subMinutes = currentMinutes + i * 3;
//       const h = Math.floor(subMinutes / 60);
//       const m = subMinutes % 60;
//       const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
//       subSlots.push({ time, status: 'available' });
//     }

//     slots.push({
//       slot: token++,
//       from: slotStart,
//       to: slotEnd,
//       isOnline,
//       subSlots,
//     });

//     // Move to next 30-min block
//     startHour = endSlotHour;
//     startMin = endSlotMin;
//   }

//   return slots;
// };


// const generateTimeSlots = (from, to, onlineDurationMins = 60) => {
//   const slots = [];
//   let [startHour, startMin] = from.split(':').map(Number);
//   let [endHour, endMin] = to.split(':').map(Number);

//   const totalEndMinutes = endHour * 60 + endMin;
//   const onlineStartMinutes = totalEndMinutes - onlineDurationMins;

//   let token = 1;

//   while ((startHour * 60 + startMin) < totalEndMinutes) {
//     const currentMinutes = startHour * 60 + startMin;
//     const slotStart = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;

//     // Calculate end of 30-min block
//     let endSlotMin = startMin + 30;
//     let endSlotHour = startHour;
//     if (endSlotMin >= 60) {
//       endSlotHour += 1;
//       endSlotMin %= 60;
//     }

//     const endMinutes = endSlotHour * 60 + endSlotMin;
//     const slotEnd = `${String(endSlotHour).padStart(2, '0')}:${String(endSlotMin).padStart(2, '0')}`;

//     // Check if this entire slot lies within the last 60 minutes
//     const isOnline = currentMinutes >= onlineStartMinutes;

//     const subSlots = [];
//     for (let i = 0; i < 10; i++) {
//       const subMinutes = currentMinutes + i * 3;
//       if (subMinutes >= totalEndMinutes) break;

//       const h = Math.floor(subMinutes / 60);
//       const m = subMinutes % 60;
//       const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
//       subSlots.push({ time, status: 'available' });
//     }

//     slots.push({
//       slot: token++,
//       from: slotStart,
//       to: slotEnd,
//       isOnline,
//       subSlots
//     });

//     // Move to next 30-min block
//     startHour = endSlotHour;
//     startMin = endSlotMin;
//   }

//   return slots;
// };


// //booking
// exports.bookAppointment = async (req, res) => {
//   const {
//     clinicId, doctorId, patientId, date, slot, subTokenNumber, reason, time, timezone,isOnline
//   } = req.body;

//   try {
//     if (!Intl.supportedValuesOf('timeZone').includes(timezone)) {
//       return res.status(400).json({ message: 'Invalid timezone format' });
//     }

//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//     const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
//     if (!doctor.availability.days.includes(dayOfWeek)) {
//       return res.status(400).json({ message: "Doctor is not available on this date" });
//     }

//     const generatedSlots = generateTimeSlots(doctor.availability.from, doctor.availability.to);

//     const slotObj = generatedSlots.find(s => s.slot === slot && s.isOnline === isOnline);
// if (!slotObj) {
//   return res.status(400).json({ message: `Invalid slot for ${isOnline ? 'online' : 'offline'} booking.` });
// }


//     const slotNumber = Number(slot);
//     // const slotObj = generatedSlots.find(s => s.slot === slotNumber);
//     if (!slotObj || !Array.isArray(slotObj.subSlots)) {
//       return res.status(400).json({ message: "Invalid slot or missing sub-slots" });
//     }

//     const subSlotIndex = slotObj.subSlots.findIndex(sub => sub.time === time);
//     if (subSlotIndex === -1) {
//       return res.status(400).json({ message: "Sub-slot not found" });
//     }

//     const alreadyBooked = await Appointment.findOne({ doctorId, date, time });
//     if (alreadyBooked) {
//       return res.status(400).json({ message: "Sub-slot already booked or unavailable" });
//     }

//     const newAppointment = await Appointment.create({
//       clinicId,
//       doctorId,
//       patientId,
//       date,
//       timeSlot: {
//         from: slotObj.from,
//         to: slotObj.to
//       },
//       slot: slotNumber,
//       subTokenNumber,
//       time,
//       reason,
//       timezone,isOnline
//     });



//     // Push to doctor's appointment list
// // await Doctor.appointments.push("clinicId","doctorId");

// await Doctor.findByIdAndUpdate(doctorId, {
//   $push: {
//     appointments: newAppointment._id,
//     notifications: {
//       type: "alert",
//       message: `New appointment booked on ${date} at ${time}`,
//       link: "/doctors/appointments"
//     }
//   }
// });

//     await Patient.findByIdAndUpdate(patientId, {
//       $push: {
//         notifications: {
//           type: "info",
//           message: `Your appointment is confirmed for ${date} at ${time}`
//         }
//       }
//     });

//     return res.status(201).json({
//       message: "Appointment booked successfully",
//       appointment: newAppointment
//     });

//   } catch (err) {
//     console.error("Booking error:", err);
//     return res.status(500).json({ message: "Booking failed", error: err.message });
//   }
// };











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
        time: `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`,
        status: "available"
      });
    }

    slots.push({
      slot: token++,
      from: `${String(sh).padStart(2, "0")}:${String(sm).padStart(2, "0")}`,
      to: `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`,
      type: cur >= onlineStart ? "online" : "offline",
      status: "available",
      subSlots
    });

    sh = nh; sm = nm;
  }

  return slots;
}

function getWeekday(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
}

// GET available slots (filtered by online/offline)
exports.getAvailableSlots = async (req, res) => {
  const { doctorId } = req.params;
  const { date, isOnline } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const weekday = getWeekday(date);
    if (!doctor.availability.days.includes(weekday)) {
      return res.status(400).json({ message: "Doctor not available on this day" });
    }

    const allSlots = generateTimeSlots(doctor.availability.from, doctor.availability.to);
    const filtered = allSlots.filter(s => s.type === (isOnline ? "online" : "offline"));

    const booked = await Appointment.find({ doctorId, date, isOnline });
    const bookedTimes = booked.map(b => b.time);

    const finalSlots = filtered.map(slot => {
      const subSlots = slot.subSlots.map(sub => ({
        ...sub,
        status: bookedTimes.includes(sub.time) ? "booked" : "available"
      }));

      const allBooked = subSlots.every(s => s.status === "booked");
      return {
        ...slot,
        status: allBooked ? "booked" : "available",
        subSlots
      };
    });

    return res.json({ slots: finalSlots });

  } catch (err) {
    console.error("Error loading slots:", err);
    return res.status(500).json({ message: "Error loading slots", error: err.message });
  }
};

// // POST book appointment
// exports.bookAppointment = async (req, res) => {
//   const {
//     clinicId, doctorId, patientId, date,
//     slot, subTokenNumber, reason, time,
//     timezone, isOnline
//   } = req.body;
//   console.log('bookAppointment', req.body);

//   try {
//     // Validate timezone
//     if (!Intl.supportedValuesOf('timeZone').includes(timezone)) {
//       return res.status(400).json({ message: 'Invalid timezone format' });
//     }

//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//     const dayOfWeek = getWeekday(date);
//     if (!doctor.availability.days.includes(dayOfWeek)) {
//       return res.status(400).json({ message: "Doctor is not available on this date" });
//     }

//     const generatedSlots = generateTimeSlots(doctor.availability.from, doctor.availability.to);
//     const slotObj = generatedSlots.find(s => s.slot === slot && s.type === (isOnline ? "online" : "offline"));

//     if (!slotObj) {
//       return res.status(400).json({ message: `Invalid ${isOnline ? 'online' : 'offline'} slot.` });
//     }

//     const subSlot = slotObj.subSlots.find(sub => sub.time === time);
//     if (!subSlot) {
//       return res.status(400).json({ message: "Sub-slot not found" });
//     }

//     // const alreadyBooked = await Appointment.findOne({ doctorId, date, time });
//     const alreadyBooked = await Appointment.findOne({
//       doctorId,
//       date,
//       time,
//       isOnline
//     });
//     if (alreadyBooked) {
//       return res.status(400).json({ message: "Sub-slot already booked" });
//     }

//     const appointment = await Appointment.create({
//       clinicId,
//       doctorId,
//       patientId,
//       date,
//       timeSlot: {
//         from: slotObj.from,
//         to: slotObj.to
//       },
//       slot,
//       subTokenNumber,
//       time,
//       reason,
//       timezone,
//       type: isOnline ? "online" : "offline"
//     });

//     // Push to doctor's appointments and notifications
//     await Doctor.findByIdAndUpdate(doctorId, {
//       $push: {
//         appointments: appointment._id,
//         notifications: {
//           type: "alert",
//           message: `New appointment on ${date} at ${time}`,
//           link: "/doctors/appointments"
//         }
//       }
//     });

//     await Patient.findByIdAndUpdate(patientId, {
//       $push: {
//         notifications: {
//           type: "info",
//           message: `Your appointment is confirmed for ${date} at ${time}`
//         }
//       }
//     });

//     return res.status(201).json({
//       message: "Appointment booked successfully",
//       appointment
//     });

//   } catch (err) {
//     console.error("Booking error:", err);
//     return res.status(500).json({ message: "Booking failed", error: err.message });
//   }
// };




















// function getWeekday(dateStr) {
//   return new Date(dateStr).toLocaleDateString("en-US", { weekday: "long" });
// }

// function generateTimeSlots(from, to, onlineDurationMins = 60) {
//   const slots = [];
//   let [sh, sm] = from.split(":").map(Number);
//   let [eh, em] = to.split(":").map(Number);
//   const endTotal = eh * 60 + em;
//   const onlineStart = endTotal - onlineDurationMins;
//   let token = 1;

//   while ((sh * 60 + sm) < endTotal) {
//     const cur = sh * 60 + sm;
//     let nextMin = sm + 30;
//     let nh = sh, nm = nextMin;
//     if (nextMin >= 60) { nh += 1; nm %= 60; }

//     const subSlots = [];
//     for (let i = 0; i < 10; i++) {
//       const m = cur + i * 3;
//       if (m >= endTotal) break;
//       subSlots.push({ time: `${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`, status: "available" });
//     }

//     slots.push({
//       slot: token++,
//       from: `${String(sh).padStart(2,"0")}:${String(sm).padStart(2,"0")}`,
//       to: `${String(nh).padStart(2,"0")}:${String(nm).padStart(2,"0")}`,
//       type: cur >= onlineStart ? "online" : "offline",
//       status: "available",
//       subSlots
//     });
//     sh = nh; sm = nm;
//   }
//   return slots;
// }

// exports.getAvailableSlots = async (req, res) => {
//   const { doctorId } = req.params;
//   const { date, isOnline } = req.body; // isOnline boolean
//   try {
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//     const weekday = getWeekday(date);
//     if (!doctor.availability.days.includes(weekday)) {
//       return res.status(400).json({ message: "Doctor not available that day" });
//     }

//     const generated = generateTimeSlots(doctor.availability.from, doctor.availability.to);
//     const filtered = generated.filter(s => s.type === (isOnline ? "online" : "offline"));

//     const booked = await Appointment.find({ doctorId, date, isOnline });
//     const bookedTimes = booked.map(b => b.time);

//     const finalSlots = filtered.map(slot => {
//       const subSlots = slot.subSlots.map(sub => ({
//         ...sub,
//         status: bookedTimes.includes(sub.time) ? "booked" : sub.status
//       }));
//       const allBooked = subSlots.every(s => s.status === "booked");
//       return { ...slot, status: allBooked ? "booked" : "available", subSlots };
//     });

//     res.json({ slots: finalSlots });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error loading slots", error: err.message });
//   }
// };

// exports.bookAppointment = async (req, res) => {
//   const { clinicId, doctorId, patientId, date, slot, time, subTokenNumber, reason, timezone, isOnline } = req.body;
//   // similar validation as earlier: check doctor exists, date, slot, timezone, then create
//   // omitted here for brevity
// };













// // GET /api/doctors/:doctorId/availability/:date
// exports.getAvailabilityByDate = async (req, res) => {
//   const { doctorId, date } = req.params;

//   try {
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//     const availability = doctor.availability.find(a => a.date === date);
//     if (!availability) {
//       return res.json({ slots: [] });
//     }

//     res.json({ slots: availability.slots });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch availability", error: err.message });
//   }
// };




// Doctor-side list
// exports.getDoctorAppointments = async (req, res) => {
//   const appts = await Appointment.find({ doctorId: req.params.doctorId }).populate('patientId clinicId');
//   res.json(appts);
// };








// exports.createCheckout = async (req, res) => {
//   try {
//     const { appointmentId, amount } = req.body;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             unit_amount: amount * 100,
//             product_data: { name: "Consultation Fee" }
//           },
//           quantity: 1
//         }
//       ],
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URI}/payment-success?session_id={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`,
//       cancel_url: `${process.env.FRONTEND_URI}/payment-cancel`,
//     });

//     await Appointment.findByIdAndUpdate(appointmentId, {
//       payment: {
//         sessionId: session.id,
//         paymentStatus: "pending",
//         expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000), // 7 days
//       }
//     });

//     return res.json({ url: session.url });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };














// finall
exports.bookAppointment = async (req, res) => {
  const {
    clinicId, doctorId, patientId, date,
    slot, subTokenNumber, reason, time,
    timezone, isOnline
  } = req.body;

  // console.log('📥 Received booking request:', req.body);

  try {
    // ✅ Ensure timezone is valid
    if (!Intl.supportedValuesOf('timeZone').includes(timezone)) {
      return res.status(400).json({ message: 'Invalid timezone format' });
    }

    // ✅ Convert isOnline to boolean safely
    const isOnlineBool = isOnline === true || isOnline === 'true';

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const dayOfWeek = getWeekday(date);
    if (!doctor.availability.days.includes(dayOfWeek)) {
      return res.status(400).json({ message: "Doctor is not available on this date" });
    }

    const generatedSlots = generateTimeSlots(doctor.availability.from, doctor.availability.to);
    const slotObj = generatedSlots.find(s => s.slot === slot && s.type === (isOnlineBool ? "online" : "offline"));

    if (!slotObj) {
      return res.status(400).json({ message: `Invalid ${isOnlineBool ? 'online' : 'offline'} slot.` });
    }

    const subSlot = slotObj.subSlots.find(sub => sub.time === time);
    if (!subSlot) {
      return res.status(400).json({ message: "Sub-slot not found" });
    }

    const alreadyBooked = await Appointment.findOne({
      doctorId,
      date,
      time,
      isOnline: isOnlineBool
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: "Sub-slot already booked" });
    }

    const appointment = await Appointment.create({
      clinicId,
      doctorId,
      patientId,
      date,
      timeSlot: {
        from: slotObj.from,
        to: slotObj.to
      },
      slot,
      subTokenNumber,
      time,
      reason,
      timezone,
      isOnline: isOnlineBool,
      type: isOnlineBool ? "online" : "offline"
    });

    await Doctor.findByIdAndUpdate(doctorId, {
      $push: {
        appointments: appointment._id,
        notifications: {
          type: "alert",
          message: `New appointment on ${date} at ${time}`,
          link: "/doctors/appointments"
        }
      }
    });

    await Patient.findByIdAndUpdate(patientId, {
      $push: {
        notifications: {
          type: "info",
          message: `Your appointment is confirmed for ${date} at ${time}`
        }
      }
    });

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (err) {
    console.error("❌ Booking error:", err);
    return res.status(500).json({ message: "Booking failed", error: err.message });
  }
};


// // ------------------ BOOK APPOINTMENT ------------------
// exports.bookAppointment = async (req, res) => {
//   try {
//     const {
//       clinicId,
//       doctorId,
//       patientId,
//       date,
//       slot,
//       subTokenNumber,
//       reason,
//       time,
//       timezone,
//       isOnline
//     } = req.body;

//     // ---- Validate timezone ----
//     if (!Intl.supportedValuesOf("timeZone").includes(timezone)) {
//       return res.status(400).json({ message: "Invalid timezone format" });
//     }

//     // ---- Normalize boolean ----
//     const isOnlineBool = isOnline === true || isOnline === "true";

//     // ---- Validate doctor ----
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//     // ---- Check doctor's availability for selected date ----
//     const dayOfWeek = getWeekday(date);
//     if (!doctor.availability.days.includes(dayOfWeek)) {
//       return res.status(400).json({ message: "Doctor is not available on this date" });
//     }

//     // ---- Generate all slots for this doctor ----
//     const generatedSlots = generateTimeSlots(
//       doctor.availability.from,
//       doctor.availability.to
//     );

//     // ---- Find selected main slot ----
//     const slotObj = generatedSlots.find(
//       (s) => s.slot === slot && s.type === (isOnlineBool ? "online" : "offline")
//     );

//     if (!slotObj) {
//       return res.status(400).json({
//         message: `Invalid ${isOnlineBool ? "online" : "offline"} slot.`,
//       });
//     }

//     // ---- Find selected sub-slot ----
//     const subSlot = slotObj.subSlots.find((sub) => sub.time === time);
//     if (!subSlot) {
//       return res.status(400).json({ message: "Sub-slot not found" });
//     }

//     // ---- Check if this sub-slot is already booked ----
//     const alreadyBooked = await Appointment.findOne({
//       doctorId,
//       date,
//       time,
//       isOnline: isOnlineBool,
//     });

//     if (alreadyBooked) {
//       return res.status(400).json({ message: "This sub-slot is already booked" });
//     }

//     // ---- Create appointment (default: unpaid) ----
//     const appointment = await Appointment.create({
//       clinicId,
//       doctorId,
//       patientId,
//       date,
//       timeSlot: {
//         from: slotObj.from,
//         to: slotObj.to,
//       },
//       slot,
//       subTokenNumber,
//       time,
//       reason,
//       timezone,
//       isOnline: isOnlineBool,
//       type: isOnlineBool ? "online" : "offline",
//       status: "pending",
//       paymentStatus: "unpaid",
//       payment: { paymentStatus: "unpaid" },
//     });

//     // ---- Add notification for doctor ----
//     await Doctor.findByIdAndUpdate(doctorId, {
//       $push: {
//         appointments: appointment._id,
//         notifications: {
//           type: "alert",
//           message: `New appointment on ${date} at ${time}`,
//           link: "/doctors/appointments",
//         },
//       },
//     });

//     // ---- Add notification for patient ----
//     await Patient.findByIdAndUpdate(patientId, {
//       $push: {
//         notifications: {
//           type: "info",
//           message: `Your appointment is created for ${date} at ${time}. Complete payment to confirm.`,
//         },
//       },
//     });

//     return res.status(201).json({
//       message: "Appointment created. Payment required to confirm.",
//       appointment,
//     });
//   } catch (err) {
//     console.error("❌ Booking Error:", err);
//     return res.status(500).json({ message: "Booking failed", error: err.message });
//   }
// };





// exports.checkPaymentValidity = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { doctorId, date: requestedDate } = req.query; // requested appointment date

//     if (!doctorId || !requestedDate) {
//       return res.status(400).json({ message: "doctorId and date are required" });
//     }

//     // Find the last paid appointment with this doctor
//     const lastAppointment = await Appointment.findOne({
//       patientId,
//       doctorId,
//       "payment.paymentStatus": "paid"
//     }).sort({ date: -1 }); // Sort by appointment date string

//     if (!lastAppointment) {
//       return res.json({ paymentValid: false });
//     }

//     const appointmentDate = lastAppointment.date; // "YYYY-MM-DD" string
//     const expiryDateObj = new Date(appointmentDate);
//     expiryDateObj.setDate(expiryDateObj.getDate() + 7); // 7-day validity

//     const expiryDateStr = expiryDateObj.toISOString().split("T")[0]; // YYYY-MM-DD

//     const paymentValid = requestedDate <= expiryDateStr;

//     return res.json({
//       paymentValid,
//       lastPaidAppointmentDate: appointmentDate,
//       expiryDate: expiryDateStr,
//       requestedDate,
//       appointmentId: lastAppointment._id
//     });

//   } catch (err) {
//     console.error("checkPaymentValidity error", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };






// exports.getPatientAppointmentOnDate = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { date, doctorId } = req.query;

//     if (!date || !doctorId) {
//       return res.status(400).json({ message: "date and doctorId are required" });
//     }

//     const appointment = await Appointment.findOne({
//       patientId,
//       doctorId,
//       date
//     });

//     if (!appointment) {
//       return res.status(200).json({ appointment: null, paymentValid: false });
//     }

//     // ---------- 7-Day Validity ----------
//     let paymentValid = false;
//     const payment = appointment.payment;

//     if (payment?.paymentStatus === "paid") {
//       const now = new Date();
//       const expiresAt = new Date(payment.expiresAt);

//       if (now <= expiresAt) {
//         paymentValid = true;
//       }
//     }

//     return res.status(200).json({
//       appointment,
//       paymentValid
//     });
//   } catch (err) {
//     console.error("Error fetching appointment", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// exports.getPatientAppointmentOnDate = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { date, doctorId } = req.query;

//     if (!date || !doctorId) {
//       return res.status(400).json({ message: "date and doctorId are required" });
//     }

//     const appointment = await Appointment.findOne({
//       patientId,
//       doctorId,
//       date
//     });

//     if (!appointment) {
//       return res.status(200).json({ appointment: null, paymentValid: false });
//     }

//     // ---------- 7-Day Validity ----------
//     let paymentValid = false;
//     const payment = appointment.payment;

//     if (payment?.paymentStatus === "paid") {
//       const now = new Date();
//       const expiresAt = new Date(payment.expiresAt);

//       if (now <= expiresAt) {
//         paymentValid = true;
//       }
//     }

//     return res.status(200).json({
//       appointment,
//       paymentValid,
//     });

//   } catch (err) {
//     console.error("Error fetching appointment", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getPatientAppointmentOnDate = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { date, doctorId } = req.query;

//     if (!date || !doctorId) {
//       return res.status(400).json({ message: "date and doctorId are required" });
//     }

//     // Appointment for the selected date
//     const appointment = await Appointment.findOne({
//       patientId,
//       doctorId,
//       date
//     });

//     // 🔥 Always check the LAST PAID appointment for validity
//     const lastPaidAppointment = await Appointment.findOne({
//       patientId,
//       "payment.paymentStatus": "paid"
//     }).sort({ "payment.expiresAt": -1 });

//     let paymentValid = false;

//     if (lastPaidAppointment) {
//       const now = new Date();
//       const expiresAt = new Date(lastPaidAppointment.payment.expiresAt);

//       if (now <= expiresAt) {
//         paymentValid = true;
//       }
//     }

//     return res.status(200).json({
//       appointment,
//       paymentValid
//     });

//   } catch (err) {
//     console.error("Error fetching appointment", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };









// exports.getPatientAppointmentOnDate = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { date, doctorId } = req.query;

//     if (!date || !doctorId) {
//       return res.status(400).json({ message: "date and doctorId are required" });
//     }

//     // 1️⃣ Fetch the appointment for the selected date (free or paid)
//     const appointment = await Appointment.findOne({ patientId, doctorId, date });

//     // 2️⃣ Fetch the last paid appointment only
//     const lastPaidAppointment = await Appointment.findOne({
//       patientId,
//       "payment.paymentStatus": "paid"
//     }).sort({ "payment.createdAt": -1 });

//     let paymentValid = false;

//     if (lastPaidAppointment) {
//       const now = new Date();
//       const expiresAt = new Date(lastPaidAppointment.payment.expiresAt);

//       if (now <= expiresAt) paymentValid = true;
//     }

//     return res.status(200).json({
//       appointment,
//       paymentValid
//     });

//   } catch (err) {
//     console.error("Error fetching appointment", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// exports.createCheckout = async (req, res) => {
//   try {
//     const { appointmentId, amount } = req.body;

//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     const now = new Date();

//     // ===== 1️⃣ CHECK IF PAYMENT ALREADY VALID =====
//     if (appointment.payment?.paymentStatus === "paid") {
//       const expiresAt = new Date(appointment.payment.expiresAt);
//       if (now <= expiresAt) {
//         return res.status(400).json({
//           message: `Payment already valid until ${expiresAt.toDateString()}`,
//           paymentValid: true,
//         });
//       }
//     }

//     // ===== 2️⃣ FIXED: CALCULATE 7-DAY VALIDITY IN LOCAL TIME =====
//     const [year, month, day] = appointment.date.split("-").map(Number);
//     const appointmentDate = new Date(year, month - 1, day); // Local timezone midnight

//     const expiresAt = new Date(
//       appointmentDate.getTime() + 7 * 24 * 60 * 60 * 1000
//     );

//     // ===== 3️⃣ CREATE STRIPE CHECKOUT SESSION =====
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             unit_amount: amount * 100,
//             product_data: { name: "Consultation Fee" },
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URI}/appointmentspayment?session_id={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`,
//       cancel_url: `${process.env.FRONTEND_URI}/payment-cancel`,
//     });

//     // ===== 4️⃣ SAVE PAYMENT STATUS (PENDING) =====
//     appointment.payment = {
//       sessionId: session.id,
//       amount,
//       paymentStatus: "pending",
//       expiresAt,
//     };

//     await appointment.save();

//     return res.json({ url: session.url });

//   } catch (err) {
//     console.error("Checkout Error", err);
//     res.status(500).json({ message: err.message });
//   }
// };



// exports.confirmPayment = async (req, res) => {
//   try {
//     const { session_id } = req.body;

//     // 1️⃣ Retrieve Stripe payment session
//     const session = await stripe.checkout.sessions.retrieve(session_id);

//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     // 2️⃣ Find Appointment using sessionId
//     const appointment = await Appointment.findOne({
//       "payment.sessionId": session_id,
//     });

//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }

//     // 3️⃣ Update Appointment
//     appointment.payment.paymentStatus = "paid";
//     appointment.paymentId = session.payment_intent;
//     appointment.status = "confirmed";
//     appointment.paymentStatus = "paid";
//     await appointment.save();

//     // 4️⃣ Update Patient Payment History
//     const patient = await Patient.findById(appointment.patientId);

//     if (!patient) {
//       return res.status(404).json({ message: "Patient not found" });
//     }

//     // Prevent duplicate entries
//     const alreadyPaid = patient.bookedAppointments.find(
//       (b) => b.appointmentId.toString() === appointment._id.toString()
//     );

//     if (!alreadyPaid) {
//       patient.bookedAppointments.push({
//         appointmentId: appointment._id,
//         paymentStatus: "paid",
//         paymentId: session.payment_intent,
//         paidAt: new Date(),
//       });
//     } else {
//       // Update existing payment info
//       alreadyPaid.paymentStatus = "paid";
//       alreadyPaid.paymentId = session.payment_intent;
//       alreadyPaid.paidAt = new Date();
//     }

//     await patient.save();

//     return res.json({
//       message: "Payment confirmed. Appointment booked successfully!",
//       appointment,
//     });

//   } catch (err) {
//     console.error("Confirm Payment Error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };


// ---------------- GET PATIENT APPOINTMENT & PAYMENT VALIDITY ----------------










// exports.  checkPaymentValidity = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { doctorId, date: requestedDate } = req.query;

//     if (!doctorId || !requestedDate) {
//       return res.status(400).json({ message: "doctorId and date are required" });
//     }

//     const lastAppointment = await Appointment.findOne({
//       patientId,
//       doctorId,
//       "payment.paymentStatus": "paid"
//     }).sort({ date: -1 });

//     if (!lastAppointment) return res.json({ paymentValid: false });

//     const appointmentDate = lastAppointment.date;
//     const expiryDateObj = new Date(appointmentDate);
//     expiryDateObj.setDate(expiryDateObj.getDate() + 7);

//     const expiryDateStr = expiryDateObj.toISOString().split("T")[0];
//     const paymentValid = requestedDate <= expiryDateStr;

//     return res.json({
//       paymentValid,
//       lastPaidAppointmentDate: appointmentDate,
//       expiryDate: expiryDateStr,
//       requestedDate,
//       appointmentId: lastAppointment._id
//     });
//   } catch (err) {
//     console.error("checkPaymentValidity error", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };




// exports.checkPaymentValidity = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { doctorId } = req.query;

//     if (!doctorId) return res.status(400).json({ message: "doctorId required" });

//     // Find last paid appointment for this doctor
//     const lastPaid = await Appointment.findOne({
//       patientId,
//       doctorId,
//       "payment.paymentStatus": "paid"
//     }).sort({ "payment.expiresAt": -1 });
//     console.log("lastpayment",lastPaid)
    
//     if (!lastPaid) return res.json({ paymentValid: false });
    
//     const now = new Date();
//     const paymentValid = now <= new Date(lastPaid.payment.expiresAt);

//     return res.json({
//       paymentValid,
//       lastPaidAppointmentDate: lastPaid.date,
//       expiryDate: lastPaid.payment.expiresAt,
//       appointmentId: lastPaid._id
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.checkPaymentValidity = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { doctorId } = req.query;

    if (!doctorId) return res.status(400).json({ message: "doctorId required" });

    // Check if there is a paid appointment for this doctor (only for reference)
    const lastPaid = await Appointment.findOne({
      patientId,
      doctorId,
      "payment.paymentStatus": "paid",
    }).sort({ createdAt: -1 });

    // For this new logic, we ignore "expiresAt" or 7-day validity
    const paymentValid = lastPaid ? true : false;

    return res.json({
      paymentValid,
      lastPaidAppointmentDate: lastPaid?.date || null,
      appointmentId: lastPaid?._id || null,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// exports.getPatientAppointmentOnDate = async (req, res) => {
//   try {
//     const { patientId } = req.params;
//     const { date, doctorId } = req.query;

//     if (!date || !doctorId) {
//       return res.status(400).json({ message: "date and doctorId are required" });
//     }

//     const appointment = await Appointment.findOne({ patientId, doctorId, date });

//     if (!appointment) {
//       return res.status(200).json({ appointment: null, paymentValid: false });
//     }

//     // ---------- Check last paid appointment for 7-day validity ----------
//     const lastPaid = await Appointment.findOne({
//       patientId,
//       "payment.paymentStatus": "paid"
//     }).sort({ "payment.expiresAt": -1 });


//     console.log("appointments",appointment)

//     let paymentValid = false;
//     if (lastPaid) {
//       const now = new Date();
//       if (now <= new Date(lastPaid.payment.expiresAt)) {
//         paymentValid = true;
//       }
//     }

//     return res.status(200).json({ appointment, paymentValid });

//   } catch (err) {
//     console.error("Error fetching appointment", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// ---------------- CREATE STRIPE CHECKOUT ----------------


exports.getPatientAppointmentOnDate = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { date, doctorId } = req.query;

    if (!date || !doctorId) {
      return res.status(400).json({ message: "date and doctorId are required" });
    }

    const appointment = await Appointment.findOne({ patientId, doctorId, date });

    if (!appointment) {
      // No appointment found
      return res.status(200).json({ appointment: null, paymentValid: false });
    }

    // For the new logic, paymentValid is true only if this appointment itself is already paid
    const paymentValid = appointment.payment?.paymentStatus === "paid";

    return res.status(200).json({ appointment, paymentValid });

  } catch (err) {
    console.error("Error fetching appointment", err);
    res.status(500).json({ message: "Server error" });
  }
};


// exports.createCheckout = async (req, res) => {
//   try {
//     const { appointmentId, amount } = req.body;

//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) return res.status(404).json({ message: "Appointment not found" });

//     const now = new Date();

//     // If already paid, check 7-day validity
//     if (appointment.payment?.paymentStatus === "paid") {
//       if (now <= new Date(appointment.payment.expiresAt)) {
//         return res.status(400).json({
//           message: `Payment already valid until ${new Date(appointment.payment.expiresAt).toDateString()}`,
//           paymentValid: true
//         });
//       }
//     }

//     // Calculate new 7-day validity from appointment date
//     const [year, month, day] = appointment.date.split("-").map(Number);
//     const appointmentDate = new Date(year, month - 1, day);
//     const expiresAt = new Date(appointmentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

//     // Create Stripe session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             unit_amount: amount * 100,
//             product_data: { name: "Consultation Fee" },
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URI}/appointmentspayment?session_id={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`,
//       cancel_url: `${process.env.FRONTEND_URI}/payment-cancel`,
//     });

//     // Save pending payment
//     appointment.payment = {
//       sessionId: session.id,
//       amount,
//       paymentStatus: "pending",
//       expiresAt
//     };
//     await appointment.save();

//     return res.json({ url: session.url });

//   } catch (err) {
//     console.error("Checkout Error", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// ---------------- CONFIRM PAYMENT ----------------
exports.createCheckout = async (req, res) => {
  try {
    const { appointmentId, amount } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    // If already paid, simply prevent duplicate payment
    if (appointment.payment?.paymentStatus === "paid") {
      return res.status(400).json({
        message: "Appointment is already paid",
        paymentValid: true
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: amount * 100,
            product_data: { name: "Consultation Fee" },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URI}/appointmentspayment?session_id={CHECKOUT_SESSION_ID}&appointmentId=${appointmentId}`,
      cancel_url: `${process.env.FRONTEND_URI}/payment-cancel`,
    });

    // Save pending payment (no 7-day expiry)
    appointment.payment = {
      sessionId: session.id,
      amount,
      paymentStatus: "pending"
    };
    await appointment.save();

    return res.json({ url: session.url });

  } catch (err) {
    console.error("Checkout Error", err);
    res.status(500).json({ message: err.message });
  }
};


// exports.confirmPayment = async (req, res) => {
//   try {
//     const { session_id } = req.body;

//     const session = await stripe.checkout.sessions.retrieve(session_id);

//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     const appointment = await Appointment.findOne({ "payment.sessionId": session_id });
//     if (!appointment) return res.status(404).json({ message: "Appointment not found" });

//     appointment.payment.paymentStatus = "paid";
//     appointment.paymentId = session.payment_intent;
//     appointment.status = "confirmed";
//     appointment.paymentStatus = "paid";
//     await appointment.save();

//     // Update patient payment history
//     const patient = await Patient.findById(appointment.patientId);
//     if (!patient) return res.status(404).json({ message: "Patient not found" });

//     const alreadyPaid = patient.bookedAppointments.find(
//       b => b.appointmentId.toString() === appointment._id.toString()
//     );

//     if (!alreadyPaid) {
//       patient.bookedAppointments.push({
//         appointmentId: appointment._id,
//         paymentStatus: "paid",
//         paymentId: session.payment_intent,
//         paidAt: new Date(),
//       });
//     } else {
//       alreadyPaid.paymentStatus = "paid";
//       alreadyPaid.paymentId = session.payment_intent;
//       alreadyPaid.paidAt = new Date();
//     }

//     await patient.save();

//     return res.json({ message: "Payment confirmed. Appointment booked successfully!", appointment });

//   } catch (err) {
//     console.error("Confirm Payment Error:", err);
//     return res.status(500).json({ message: err.message });
//   }
// };



exports.confirmPayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // Find the appointment linked to this Stripe session
    const appointment = await Appointment.findOne({ "payment.sessionId": session_id });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    // Update appointment payment status
    appointment.payment.paymentStatus = "paid";
    appointment.paymentId = session.payment_intent;
    appointment.status = "confirmed";
    appointment.paymentStatus = "paid";
    await appointment.save();

    // Update patient payment history
    const patient = await Patient.findById(appointment.patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const alreadyPaid = patient.bookedAppointments.find(
      b => b.appointmentId.toString() === appointment._id.toString()
    );

    if (!alreadyPaid) {
      patient.bookedAppointments.push({
        appointmentId: appointment._id,
        paymentStatus: "paid",
        paymentId: session.payment_intent,
        paidAt: new Date(),
      });
    } else {
      alreadyPaid.paymentStatus = "paid";
      alreadyPaid.paymentId = session.payment_intent;
      alreadyPaid.paidAt = new Date();
    }

    await patient.save();

    return res.json({ message: "Payment confirmed. Appointment booked successfully!", appointment });

  } catch (err) {
    console.error("Confirm Payment Error:", err);
    return res.status(500).json({ message: err.message });
  }
};






exports.validatePayment = async (req, res) => {
  try {
    const { patientId } = req.body;

    // Find last paid appointment
    const lastPaid = await Appointment.findOne({
      patientId,
      "payment.paymentStatus": "paid"
    }).sort({ "payment.expiresAt": -1 });

    if (!lastPaid) {
      return res.json({ valid: false, message: "No active payment found" });
    }

    const now = new Date();

    if (now > lastPaid.payment.expiresAt) {
      return res.json({
        valid: false,
        message: "Consultation fee expired. Please pay again."
      });
    }

    return res.json({ valid: true, message: "Payment still valid" });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};







exports.getDoctorAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ doctorId: req.params.doctorId })
      .populate({
        path: 'patientId',
        select: 'name age gender phone' // select only necessary fields
      })
      .populate({
        path: 'clinicId',
        select: 'name location' // adjust as needed
      })
      .populate({
        path: 'doctorId',
        select: 'name specialization' // Include if needed in frontend
      });

    res.json(appts);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// // Doctor confirms / rejects
exports.respondToAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  const appt = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status },
    { new: true }
  );
  if (!appt) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  const readableDate = new Date(appt.date).toDateString();
  const msg = {
    type: 'info',
    message: `Your appointment on ${readableDate} at ${appt.timeSlot.from} is ${appt.status}.`
  };

  await Patient.findByIdAndUpdate(appt.patientId, {
    $push: { notifications: msg }
  });

  await Clinic.findByIdAndUpdate(appt.clinicId, {
    $push: { notifications: msg }
  });

  return res.json(appt);
};



// // POST: Assign doctor and notify
// exports.assignDoctorToAppointment = async (req, res) => {
//   const { appointmentId } = req.params;
//   const { doctorId, date, from, to } = req.body;

//   const appt = await Appointment.findById(appointmentId);
//   if (!appt) return res.status(404).json({ message: "Appointment not found" });

//   appt.doctorId = doctorId;
//   appt.date = date;
//   appt.from = from;
//   appt.to = to;
//   appt.status = 'confirmed';
//   await appt.save();

//   const doctors = await Doctor.findById(doctorId);
//   const patient = await Patient.findById(appt.patientId);

//   // Send email to patient
//   await sendEmail(patient.email, "Appointment Confirmed", `
//     Your appointment with Dr. ${doctors.name} is confirmed for ${date} from ${from} to ${to}.
//   `);

//   // Notify doctor
//   doctors.notifications.push({
//     type: 'alert',
//     message: `Assigned appointment on ${date} from ${from} to ${to}`,
//     read: false,
//     link: '/doctors/appointments'
//   });
//   await doctors.save();

//   res.json({ message: 'Doctor assigned and patient notified.' });
// };







// Patient-side list
exports.getPatientAppointments = async (req, res) => {
  const appts = await Appointment.find({ patientId: req.params.patientId }).populate('doctorId clinicId');
  res.json(appts);
};
