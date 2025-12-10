
// // const Lab = require("../models/Labs");

// // exports.getAvailableTests = async (req, res) => {
// //   try {
// //     const labs = await Lab.find({
// //       clinicApproved: true,
// //       adminApproved: true,
// //       isActive: true
// //     }).select("availableTests name");

// //     if (!labs.length) {
// //       return res.status(404).json({ message: "No approved labs found." });
// //     }

// //     const tests = labs.flatMap(lab =>
// //       lab.availableTests.map(test => ({
// //         testName: test.name,
// //         cost: test.cost,
// //         department: test.department,
// //         description: test.description,
// //         labId: lab._id,
// //         labName: lab.name,
// //       }))
// //     );

// //     return res.status(200).json({ tests });
// //   } catch (err) {
// //     console.error("Error fetching available lab tests:", err);
// //     return res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };



// const Lab = require("../models/Labs");

// exports.getAvailableTests = async (req, res) => {
//   try {
//     const labs = await Lab.find({
//       clinicApproved: true,
//       adminApproved: true,
//       isActive: true
//     }).select("availableTests name");

//     if (!labs.length) {
//       return res.status(404).json({ message: "No approved labs found." });
//     }

//     // Flatten all tests from all labs with associated lab details
//     const tests = labs.flatMap(lab =>
//       lab.availableTests.map(test => ({
//         testName: test.name,
//         cost: test.cost,
//         department: test.department,
//         description: test.description,
//         labId: lab._id,
//         labName: lab.name,
//       }))
//     );

//     return res.status(200).json({ tests });
//   } catch (err) {
//     console.error("Error fetching available lab tests:", err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



const Lab = require("../models/Labs.js");
exports.getAvailableTests = async (req, res) => {
  try {
    // Find labs that are active and approved by both admin and clinic
   const labs = await Lab.find({
  $or: [
    { clinicApproved: true },
    { adminApproved: true },
  ]
}).select("availableTests name");

    // If no labs found, return 404
    if (!labs.length) {
      return res.status(404).json({ message: "No approved labs found." });
    }

    // Combine and flatten all available tests across labs
    const tests = labs.flatMap(lab =>
      lab.availableTests.map(test => ({
        testName: test.name,
        cost: test.cost,
        department: test.department,
        description: test.description,
        labId: lab._id,
        labName: lab.name,
      }))
    );

    // Return the list of available tests
    return res.status(200).json({ tests });
  } catch (err) {
    console.error("Error fetching available lab tests:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
























