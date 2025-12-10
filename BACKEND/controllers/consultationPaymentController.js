
// const ConsultationPayment = require("../models/ConsultationPayment");

// const Stripe = require("stripe");
// const stripe = new Stripe(process.env.secrete_key);

// const Patient = require("../models/Patient");




// // ✅ Validate Consultation Fee (used before booking)
// exports.validateConsultationPayment = async (req, res) => {
//     try {
//         const { clinicId, patientId, doctorId, consultationDate } = req.body;
//         console.log("body", req.body);




//         if (!clinicId || !patientId || !doctorId || !consultationDate) {
//             return res.status(400).json({ valid: false, message: "Missing fields" });
//         }

//         const consultationDateObj = new Date(consultationDate);

//         // Find latest paid consultation fee
//         const latestPayment = await ConsultationPayment.findOne({
//             clinicId,
//             patientId,
//             doctorId,
//             paymentStatus: "paid",
//         })
//             .sort({ createdAt: -1 })
//             .lean();

//         if (!latestPayment) {
//             return res.status(400).json({
//                 valid: false,
//                 message: "Consultation fee not found. Please pay first.",
//             });
//         }

//         const validUntil = new Date(latestPayment.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);

//         if (consultationDateObj > validUntil) {
//             return res.status(400).json({
//                 valid: false,
//                 message: "Consultation fee expired. Please repay.",
//             });
//         }

//         return res.status(200).json({
//             valid: true,
//             message: "Consultation fee is valid for this booking",
//             payment: latestPayment,
//         });
//     } catch (error) {
//         console.error("Error validating consultation fee:", error);
//         res.status(500).json({ valid: false, message: "Internal server error", error });
//     }
// };

// // ✅ Create Stripe Checkout Session for Consultation Fee
// exports.createConsultationCheckout = async (req, res) => {
//     try {
//         const { clinicId, patientId, doctorId } = req.body;

//         if (!clinicId || !patientId || !doctorId)
//             return res.status(400).json({ message: "Clinic, Patient, and Doctor ID required" });

//         const amount = 500;
//         const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

//         const existingPayment = await ConsultationPayment.findOne({
//             clinicId,
//             patientId,
//             doctorId,
//             paymentStatus: "paid",
//             createdAt: { $gte: sevenDaysAgo },
//         });

//         if (existingPayment) {
//             return res.status(200).json({
//                 message: "Consultation fee already paid within 7 days",
//                 alreadyPaid: true,
//             });
//         }

//         const newPayment = await ConsultationPayment.create({
//             clinicId,
//             patientId,
//             doctorId,
//             amount,
//             paymentStatus: "unpaid",
//         });

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "inr",
//                         product_data: {
//                             name: "Doctor Consultation Fee",
//                             description: "Valid for 7 days",
//                         },
//                         unit_amount: amount * 100,
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: "payment",
//             success_url: `${process.env.FRONTEND_URI}/ConsultationSuccess?session_id={CHECKOUT_SESSION_ID}&payment_id=${newPayment._id}&clinicId=${clinicId}&patientId=${patientId}&doctorId=${doctorId}`,
//             cancel_url: `${process.env.FRONTEND_URI}/consultation-cancel`,
//         });

//         newPayment.sessionId = session.id;
//         await newPayment.save();

//         res.status(200).json({ url: session.url });
//     } catch (error) {
//         console.error("Error creating consultation checkout:", error);
//         res.status(500).json({ message: "Failed to create consultation checkout", error });
//     }
// };

// // ✅ Confirm Consultation Payment after success
// exports.confirmConsultationPayment = async (req, res) => {
//     try {
//         const { sessionId, paymentId, clinicId, patientId, doctorId } = req.body;

//         const session = await stripe.checkout.sessions.retrieve(sessionId);
//         if (session.payment_status !== "paid") {
//             return res.status(400).json({ message: "Payment not completed" });
//         }

//         const payment = await ConsultationPayment.findByIdAndUpdate(
//             paymentId,
//             {
//                 paymentStatus: "paid",
//                 sessionId,
//                 updatedAt: new Date(),
//             },
//             { new: true }
//         );

//         await Patient.findByIdAndUpdate(patientId, {
//             $push: {
//                 consultationPayments: {
//                     paymentId: payment._id,
//                     clinicId,
//                     doctorId,
//                     amount: payment.amount,
//                     paidAt: new Date(),
//                     validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//                 },
//             },
//         });

//         res.status(200).json({ message: "Consultation payment successful", payment });
//     } catch (error) {
//         console.error("Error confirming consultation payment:", error);
//         res.status(500).json({ message: "Error confirming consultation payment", error });
//     }
// };







// // ✅ Create Stripe Checkout Session for Consultation Fee
// exports.createConsultationCheckout = async (req, res) => {
//   try {
//     const { clinicId, patientId, doctorId } = req.body;

//     if (!clinicId || !patientId || !doctorId)
//       return res.status(400).json({ message: "Clinic, Patient and Doctor ID required" });

//     const amount = 500; // ₹500 consultation fee

//     // ✅ STEP 1 — Check if the patient already paid within the last 7 days for this clinic
//     const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

//     const existingPayment = await Consultation.findOne({
//       clinicId,
//       patientId,
//       paymentStatus: "paid",
//       createdAt: { $gte: sevenDaysAgo },
//     });

//     if (existingPayment) {
//       // ✅ Already paid within 7 days
//       return res.status(200).json({
//         message: "You have already paid the consultation fee within the last 7 days.",
//         alreadyPaid: true,
//       });
//     }

//     // ✅ STEP 2 — Create a new unpaid payment entry
//     const newPayment = await ConsultationPayment.create({
//       clinicId,
//       patientId,
//       amount,
//       paymentStatus: "unpaid",
//     });

//     // ✅ STEP 3 — Create a new Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: "Doctor Consultation Fee",
//               description: "One-time consultation payment valid for 7 days",
//             },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URI}/ConsultationSuccess?session_id={CHECKOUT_SESSION_ID}&payment_id=${newPayment._id}&clinicId=${clinicId}&patientId=${patientId}&doctorId=${doctorId}`,
//       cancel_url: `${process.env.FRONTEND_URI}/consultation-cancel`,
//     });

//     // ✅ STEP 4 — Save session ID
//     newPayment.sessionId = session.id;
//     await newPayment.save();

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error("Error creating consultation checkout:", error);
//     res.status(500).json({ message: "Failed to create consultation checkout", error });
//   }
// };

// // ✅ Confirm Consultation Payment (called after success redirect)
// exports.confirmConsultationPayment = async (req, res) => {
//   try {
//     const { sessionId, paymentId, clinicId, patientId, doctorId } = req.body;

//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     if (session.payment_status !== "paid") {
//       return res.status(400).json({ message: "Payment not completed" });
//     }

//     // ✅ Update consultation payment
//     const payment = await ConsultationPayment.findByIdAndUpdate(
//       paymentId,
//       {
//         paymentStatus: "paid",
//         sessionId,
//         updatedAt: new Date(),
//       },
//       { new: true }
//     );

//     // ✅ Save payment reference in patient record
//     await Patient.findByIdAndUpdate(patientId, {
//       $push: {
//         consultationPayments: {
//           paymentId: payment._id,
//           clinicId,
//           doctorId,
//           amount: payment.amount,
//           paidAt: new Date(),
//           validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // valid for 7 days
//         },
//       },
//     });

//     res.status(200).json({ message: "Consultation payment successful", payment });
//   } catch (error) {
//     console.error("Error confirming consultation payment:", error);
//     res.status(500).json({ message: "Error confirming consultation payment", error });
//   }
// };










