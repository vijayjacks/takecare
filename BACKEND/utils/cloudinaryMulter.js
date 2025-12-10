// // utils/cloudinaryMulter.js
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./cloudinary');

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'consultation-reports', // Folder in Cloudinary
//     allowed_formats: ['jpg', 'png', 'pdf'], // Allowed file types
//     transformation: [{ width: 800, crop: 'limit' }],
//   },
// });

// const parser = multer({ storage });

// module.exports = parser;




// utils/cloudinaryMulter.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'consultation-reports',
    allowed_formats: ['jpg', 'png', 'pdf'],
    transformation: [{ width: 800, crop: 'limit' }],
  },
});

const parser = multer({ storage });

module.exports = parser;
