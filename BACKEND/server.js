
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const express = require('express');
const upload = require('./middleware/upload');
const path = require('path');

// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
const superadminRoutes = require('./routes/superadminRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clinicRoutes = require("./routes/clinicRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentsRoutes =require("./routes/appointmentsRoutes")
const paymentsRoutes  =require("./routes/paymentsRoutes")
const consultationRoutes = require('./routes/consultationRoutes');


const pharmacyRoutes = require("./routes/pharmacyRoutes");
const labRoutes = require("./routes/labRoutes");
const labtestRoutes = require('./routes/labtestRoutes');
// const consultationPaymentRoutes = require("./routes/consultationPaymentRoutes");

const prescriptionRoutes = require('./routes/prescriptionRoutes');


// connectDB();
const app = express();
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error:", err));


// app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/pharmacy",pharmacyRoutes);
app.use("/api/labs",labRoutes);
app.use('/api/prescriptions',prescriptionRoutes);
app.use('/api/appointments',appointmentsRoutes);
app.use('/api/payments', paymentsRoutes);

// app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/appointments', appointmentRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/tests', labtestRoutes);
// app.use("/api/consultation", consultationPaymentRoutes);


// // Root endpoint
// app.get('/', (req, res) => {
//   res.send('Hospital Management API is running...');
// });

// // Error handling middleware (optional)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });


app.listen(process.env.PORT || 5000, () => console.log('Server running at port 5000'));










// app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superadminRoutes);
app.use('/api/admin', adminRoutes);

