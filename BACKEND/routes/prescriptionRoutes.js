
// routes/prescriptionRoutes.js
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/PrescriptionController');
const { protect, authorize } = require('../middleware/auth');

// Create prescription – only doctor
router.post('/', protect, authorize('doctor'), prescriptionController.createPrescription);

// Get all prescriptions – superadmin, doctor, lab, pharmacy, patient
router.get('/getAllPrescriptions', protect, authorize( 'doctor', 'lab', 'pharmacy', 'patient'), prescriptionController.getAllPrescriptions);

// Get by ID – superadmin, doctor, lab, pharmacy, patient
router.get('/:id', protect, authorize('superadmin', 'doctor', 'lab', 'pharmacy', 'patient'), prescriptionController.getPrescriptionById);

// Get by patient ID – superadmin, doctor, lab, pharmacy, patient
router.get('/patient/:patientId', protect, authorize('superadmin', 'doctor', 'lab', 'pharmacy', 'patient'), prescriptionController.getPrescriptionsByPatient);

// Update status – doctor or lab
router.put('/:id/status', protect, authorize('doctor', 'lab'), prescriptionController.updatePrescriptionStatus);

// Delete – superadmin only
router.delete('/:id', protect, authorize('superadmin'), prescriptionController.deletePrescription);

module.exports = router;
