// const multer = require('multer');
// const path = require('path');

// // Store in uploads/ folder
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
    


// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png/;
//     const ext = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mime = filetypes.test(file.mimetype);
//     cb(null, ext && mime);
//   }
// });

// module.exports = upload;

