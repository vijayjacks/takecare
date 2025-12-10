    // controllers/prescriptionController.js
    const Prescription = require('../models/Prescription');

    // Create a new prescription
    exports.createPrescription = async (req, res) => {
    try {
        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(201).json({ message: 'Prescription created successfully', prescription });
    } catch (err) {
        console.error("Error creating prescription:", err);
        res.status(500).json({ error: 'Failed to create prescription', details: err.message });
    }
    };
// Get all prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate('clinicId doctorId patientId labId pharmacyId superadminId');
    res.json(prescriptions);
  } catch (err) {
    console.error("Error fetching prescriptions:", err);
    res.status(500).json({ error: 'Failed to fetch prescriptions' });
  }
};
    

    // Get a prescription by ID
    exports.getPrescriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id)
        // .populate('clinicId doctorId patientId labId pharmacyId superadminId');

        if (!prescription) {
        return res.status(404).json({ error: 'Prescription not found' });
        }

        res.json(prescription);
    } catch (err) {
        console.error("Error fetching prescription:", err);
        res.status(500).json({ error: 'Failed to fetch prescription' });
    }
    };

    // Get prescriptions by patient ID
    exports.getPrescriptionsByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;
        const prescriptions = await Prescription.find({ patientId })
        .populate('clinicId doctorId labId pharmacyId superadminId');
        res.json(prescriptions);
    } catch (err) {
        console.error("Error fetching patient prescriptions:", err);
        res.status(500).json({ error: 'Failed to fetch prescriptions' });
    }
    };

    // Update prescription status
    exports.updatePrescriptionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const prescription = await Prescription.findByIdAndUpdate(
        id,
        { status },
        { new: true }
        );

        if (!prescription) {
        return res.status(404).json({ error: 'Prescription not found' });
        }

        res.json({ message: 'Status updated', prescription });
    } catch (err) {
        console.error("Error updating prescription status:", err);
        res.status(500).json({ error: 'Failed to update status' });
    }
    };

    // Delete prescription
    exports.deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Prescription.findByIdAndDelete(id);

        if (!deleted) {
        return res.status(404).json({ error: 'Prescription not found' });
        }

        res.json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        console.error("Error deleting prescription:", err);
        res.status(500).json({ error: 'Failed to delete prescription' });
    }
    };





