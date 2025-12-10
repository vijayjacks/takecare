const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
          tls: {
        rejectUnauthorized: false, // <- THIS IS THE FIX
      },
    });

    const mailOptions = {
      from: `"Hospital Management System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

module.exports = sendEmail;









// const nodemailer = require('nodemailer');

// exports.sendEmailWithAttachment = async (to, subject, text, attachmentPath) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // or smtp config
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     },
//     tls: {
//       rejectUnauthorized: false // needed if using self-signed cert
//     }
//   });

//   await transporter.sendMail({
//     from: `"Clinic" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//     attachments: [
//       {
//         filename: 'consultation.pdf',
//         path: attachmentPath
//       }
//     ]
//   });
// };
