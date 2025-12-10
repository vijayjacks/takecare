const express = require("express");
const router = express.Router();
const pharmacyController = require("../controllers/pharmacyController");
const { protect, authorize } = require("../middleware/auth"); // ⬅️ Import middleware

// 📌 Public Routes
router.post('/register',pharmacyController.registerPharmacy );

router.post("/login", pharmacyController.loginPharmacy);

//get all pharmacy

router.get('/', protect, authorize("superadmin", "admin", "clinic","patient"),pharmacyController.getAllpharmacy);










// 🧪 Medicines
router.post("/:pharmacyId/medicines", protect, authorize("pharmacy"), pharmacyController.addMedicine);
router.get("/:pharmacyId/medicines", protect, authorize("pharmacy"), pharmacyController.getMedicines);

// 📦 Medicine Orders
router.post(
    "/:pharmacyId/orders",
    protect,
    authorize("pharmacy"),
    pharmacyController.createMedicineOrder
);
router.get(
    "/:pharmacyId/orders",
    protect,
    authorize("pharmacy"),
    pharmacyController.getMedicineOrders
);

// 📬 Medicine Requests
router.post(
    "/:pharmacyId/requests",
    protect,
    authorize("pharmacy"),
    pharmacyController.requestMedicine
);
router.get(
    "/:pharmacyId/requests",
    protect,
    authorize("pharmacy"),
    pharmacyController.getMedicineRequests
);
router.patch(
    "/:pharmacyId/requests/:requestId",
    protect,
    authorize("pharmacy"),
    pharmacyController.updateRequestStatus
);

// 📃 Prescriptions
router.get(
    "/:pharmacyId/prescriptions",
    protect,
    authorize("pharmacy"),
    pharmacyController.getPrescriptions
);

module.exports = router;
