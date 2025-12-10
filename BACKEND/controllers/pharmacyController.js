
const Pharmacy = require('../models/Pharmacy');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Register Pharmacy
// exports.registerPharmacy = async (req, res) => {
//   try {
//     const { name, email, password, phone, address, clinicId } = req.body;

//     const existing = await Pharmacy.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already in use" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const pharmacy = new Pharmacy({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       clinicId
//     });

//     await pharmacy.save();
//     res.status(201).json({ message: "Pharmacy registered successfully", pharmacy });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// // ✅ Register Pharmacy
// exports.registerPharmacy = async (req, res) => {
//   try {
//     const { name, email, password, phone, address } = req.body;

//     // Check if email already exists
//     const existing = await Pharmacy.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new pharmacy
//     const pharmacy = new Pharmacy({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
      
//     });

//     await pharmacy.save();

//     res.status(201).json({
//       message: "Pharmacy registered successfully",
//       pharmacy: {
//         id: pharmacy._id,
//         name: pharmacy.name,
//         email: pharmacy.email,
//         phone: pharmacy.phone,
//         address: pharmacy.address,
//       }
//     });
//   } catch (err) {
//     console.error("Pharmacy registration error:", err);
//     res.status(500).json({ message: "Registration failed", error: err.message });
//   }
// };







const Admin = require('../models/Admin'); // assuming pharmacists are Admins with role = "pharmacist"

// exports.registerPharmacy = async (req, res) => {
//   try {
//     const {
//       name,
//       clinicId,
//       location,
//       address,
//       phone,
//       email,
//       pharmacists = [], // Expecting array of pharmacist admin details or IDs
//       inventory = []
//     } = req.body;

//     // 🧪 Required field validation
//     if (!name || !clinicId || !address || !email || !location?.city) {
//       return res.status(400).json({
//         message: "Required fields missing: name, clinicId, address, email, and location.city are mandatory"
//       });
//     }

//     // 🛑 Duplicate email check
//     const existing = await Pharmacy.findOne({ email });
//     if (existing) {
//       return res.status(409).json({ message: "Pharmacy with this email already exists." });
//     }

//     // ✅ (Optional) Validate pharmacists
//     let pharmacistIds = [];
//     if (pharmacists.length > 0 && typeof pharmacists[0] === "object") {
//       // Creating new pharmacist Admin accounts
//       for (const pharmacist of pharmacists) {
//         const { name, email, password, phone } = pharmacist;

//         if (!name || !email || !password) {
//           return res.status(400).json({ message: "Each pharmacist must have name, email, and password" });
//         }

//         const existingAdmin = await Admin.findOne({ email });
//         if (existingAdmin) {
//           return res.status(409).json({ message: `Pharmacist email already in use: ${email}` });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newPharmacist = new Admin({
//           name,
//           email,
//           password: hashedPassword,
//           phone,
//           role: "pharmacist"
//         });
//         await newPharmacist.save();
//         pharmacistIds.push(newPharmacist._id);
//       }
//     } else {
//       pharmacistIds = pharmacists; // assumed to be existing Admin IDs
//     }

//     // 🧾 Create new Pharmacy entry
//     const newPharmacy = new Pharmacy({
//       name,
//       clinicId,
//       location,
//       address,
//       phone,
//       email,
//       pharmacists: pharmacistIds,
//       inventory
//     });

//     await newPharmacy.save();

//     res.status(201).json({
//       message: "Pharmacy registered successfully",
//       pharmacy: {
//         id: newPharmacy._id,
//         name: newPharmacy.name,
//         clinicId: newPharmacy.clinicId,
//         location: newPharmacy.location,
//         address: newPharmacy.address,
//         phone: newPharmacy.phone,
//         pharmacists: newPharmacy.pharmacists,
//         createdAt: newPharmacy.createdAt
//       }
//     });
//   } catch (error) {
//     console.error("Pharmacy registration failed:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };








// ✅ Login Pharmacy

const Clinic = require("../models/clinic");

exports.registerPharmacy = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      location,
      clinicId,
      availableMedicines, // ✅ new field
    } = req.body;

    if (!name || !email || !password || !phone || !address || !clinicId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(400).json({ message: "Invalid clinic selected" });
    }

    const existingPharmacy = await Pharmacy.findOne({ email });
    if (existingPharmacy) {
      return res.status(409).json({ message: "Pharmacy with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Parse and validate available medicines
    let parsedMedicines = [];
    if (availableMedicines) {
      if (typeof availableMedicines === "string") {
        try {
          parsedMedicines = JSON.parse(availableMedicines);
        } catch (err) {
          return res.status(400).json({ message: "Invalid medicine format (JSON expected)" });
        }
      } else if (Array.isArray(availableMedicines)) {
        parsedMedicines = availableMedicines;
      }
    }

    const newPharmacy = new Pharmacy({
      name,
      email,
      phone,
      address,
      clinicId,
      location,
      password: hashedPassword,
      inventory: parsedMedicines, // ✅ Save into inventory field
    });

    await newPharmacy.save();

    res.status(201).json({
      message: "Pharmacy registered successfully.",
      pharmacy: {
        _id: newPharmacy._id,
        name: newPharmacy.name,
        email: newPharmacy.email,
        clinicId: newPharmacy.clinicId,
        location: newPharmacy.location,
        inventory: newPharmacy.inventory,
      },
    });
  } catch (error) {
    console.error("Pharmacy registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



















exports.loginPharmacy = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pharmacy = await Pharmacy.findOne({ email });
    if (!pharmacy) return res.status(404).json({ message: "Pharmacy not found" });

    const isMatch = await bcrypt.compare(password, pharmacy.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: pharmacy._id, role: "pharmacy" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, pharmacy });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//getAll pharmacy
exports.getAllpharmacy=async(req,res)=>{
    try{
const pharmacy=await Pharmacy.find()
// .populate('clinicId doctorId patientId  pharmacyId superadminId');
    if(!pharmacy)return res.status(404).jason({message:"labs not found"});
    res.json(pharmacy)
    }catch(err){
    res.status(500).json({ message: err.message });

    }
};







// ✅ Add Medicine
exports.addMedicine = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const medicine = req.body;

    const pharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId,
      { $push: { medicines: medicine } },
      { new: true }
    );

    res.json({ message: "Medicine added", pharmacy });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Medicines
exports.getMedicines = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const pharmacy = await Pharmacy.findById(pharmacyId);
    res.json(pharmacy.medicines || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create Medicine Order (by patient)
exports.createMedicineOrder = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const order = req.body; // patientId, medicineList, deliveryAddress

    const pharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId,
      { $push: { medicineOrders: { ...order, status: "pending" } } },
      { new: true }
    );

    res.status(201).json({ message: "Order placed", pharmacy });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All Medicine Orders
exports.getMedicineOrders = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const pharmacy = await Pharmacy.findById(pharmacyId).populate("medicineOrders.patientId", "name");
    res.json(pharmacy.medicineOrders || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Request Medicine (by patient)
exports.requestMedicine = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const request = req.body; // patientId, requestedMedicine: { name, brand }, quantity, note

    const pharmacy = await Pharmacy.findByIdAndUpdate(
      pharmacyId,
      { $push: { medicineRequests: { ...request, status: "pending" } } },
      { new: true }
    );

    res.status(201).json({ message: "Request submitted", pharmacy });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ View All Medicine Requests
exports.getMedicineRequests = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const pharmacy = await Pharmacy.findById(pharmacyId).populate("medicineRequests.patientId", "name");
    res.json(pharmacy.medicineRequests || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update Request Status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { pharmacyId, requestId } = req.params;
    const { status } = req.body;

    const pharmacy = await Pharmacy.findById(pharmacyId);
    const request = pharmacy.medicineRequests.id(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = status;
    await pharmacy.save();

    res.json({ message: "Request updated", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ View Prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const pharmacy = await Pharmacy.findById(pharmacyId).populate("prescriptions");
    res.json(pharmacy.prescriptions || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
