// routes/testRoutes.js

const express = require('express');
const router = express.Router();
const { getAvailableTests} = require('../controllers/labtestController');
const { protect, authorize } = require('../middleware/auth');

router.get(
  '/available',
  protect,
  authorize('doctor',"patient","lab"),  
  getAvailableTests
);







module.exports = router;
