
const Consultation = require("../models/Consultation");

exports.SuggestedLabsWithTests = async (req, res) => {
  try {
    const patientId = req.user?.id;

    if (!patientId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch consultations for the patient
    const consultations = await Consultation.find({
      patient: patientId,
        "testsAdvised.0": { $exists: true }, // Ensures at least one test is advised
    });

    const labTestsMap = {};

    consultations.forEach((consultation) => {
      if (!Array.isArray(consultation.testsAdvised)) return;

      consultation.testsAdvised.forEach((test) => {
        const labName = test.lab?.trim() || "Unknown Lab";
        const testName = test.name?.trim();

        if (!testName) return;

        if (!labTestsMap[labName]) {
          labTestsMap[labName] = new Set();
        }

        labTestsMap[labName].add(testName);
      });
    });

    // Convert Set to Array for response
    const response = Object.entries(labTestsMap).map(([labName, testsSet]) => ({
      labName,
tests: Array.from(testsSet).sort(),
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching suggested labs:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
