const router = require('express').Router();
const { protect } = require('../middleware/auth');
const nc = require('../controllers/notificationController');

router.use(protect);
router.get('/', nc.getNotifications);
router.patch('/:id/read', nc.markAsRead);

module.exports = router;
