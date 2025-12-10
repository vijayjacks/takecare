// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs=require("fs")

const uploadDir = path.resolve(__dirname, '../uploads/');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mime = filetypes.test(file.mimetype);
    cb(null, ext && mime);
  }
});

module.exports = upload;






//s3 integration

// const multerS3 = require('multer-s3');
// const s3 = require('../config/s3');

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: 'your-bucket-name',
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       cb(null, `consultations/${Date.now()}-${file.originalname}`);
//     }
//   })
// });

// router.post('/:id/upload-report', protectDoctor, upload.single('file'), async (req, res) => {
//   const { id } = req.params;
//   const consultation = await Consultation.findById(id);
//   if (!consultation) return res.status(404).json({ message: 'Not found' });

//   consultation.testResults.push({
//     title: req.file.originalname,
//     fileUrl: req.file.location, // S3 public URL
//     uploadedAt: new Date()
//   });

//   await consultation.save();
//   res.json({ message: 'Uploaded to S3', url: req.file.location });
// });





//cloudinary integration
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'consultation-reports',
//     allowed_formats: ['pdf', 'jpg', 'png'],
//     public_id: (req, file) => `report-${Date.now()}`
//   }
// });

// const upload = multer({ storage });

// router.post('/:id/upload-report', protectDoctor, upload.single('file'), async (req, res) => {
//   const consultation = await Consultation.findById(req.params.id);
//   consultation.testResults.push({
//     title: req.file.originalname,
//     fileUrl: req.file.path,
//     uploadedAt: new Date()
//   });
//   await consultation.save();
//   res.json({ message: 'Uploaded to Cloudinary', url: req.file.path });
// });
