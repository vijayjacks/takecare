const Appointment = require('../models/Appointment');
const Payment = require('../models/Payment');

// Daily/Monthly summary
exports.getReport = async (req, res) => {
  const { clinicId } = req.user;
  const now = new Date();

  const dailyAppts = await Appointment.countDocuments({
    clinicId,
    date: { $gte: new Date(now.setHours(0,0,0)), $lte: new Date(now.setHours(23,59,59)) }
  });

  const monthlyIncome = await Payment.aggregate([
    { $match: { clinicId: req.user.clinicId, status: 'paid' } },
    { $group: {
      _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
      total: { $sum: '$amount' }
    } }
  ]);

  res.json({ dailyAppts, monthlyIncome });
};
