const router = require('express').Router();
const { protect, authorize } = require('../middleware/auth');
const rc = require('../controllers/reportController');

router.use(protect, authorize('admin', 'superadmin'));
router.get('/clinic', rc.getReport);

module.exports = router;
