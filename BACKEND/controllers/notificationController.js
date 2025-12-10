const Notification = require('../models/Notification');
exports.createNotification = async (uId, type, msg) => {
  await Notification.create({ userId: uId, type, message: msg });
};

exports.getNotifications = async (req, res) => {
  const notes = await Notification.find({ userId: req.user._id }).sort('-createdAt');
  res.json(notes);
};

exports.markAsRead = async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ message: 'Marked as read' });
};
