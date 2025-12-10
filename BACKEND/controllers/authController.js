// const Admin = require('../models/Admin');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // exports.register = async (req, res) => {
// //   const { name, email, password, role, clinicId, specialization } = req.body;
// //   if (await Admin.findOne({ email }))
// //     return res.status(400).json({ message: 'Email in use' });

// //   const approvedRoles = ['superadmin','admin','doctor'];
// //   const user = await Admin.create({
// //     name, email, password, role, clinicId, specialization,
// //     approved: approvedRoles.includes(role)
// //   });

// //   res.status(201).json({ message: 'Registered', user });
// // };

// // exports.login = async (req, res) => {
// //   const { email, password } = req.body;
// //   const user = await Admin.findOne({ email });
// //   if (!user || !(await bcrypt.compare(password, user.password)))
// //     return res.status(400).json({ message: 'Invalid creds' });

// //   if (!user.approved && ['patient','pharmacy','lab'].includes(user.role))
// //     return res.status(403).json({ message: 'Approval pending' });

// //   const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
// //   user.lastLogin = Date.now();
// //   await user.save();

// //   res.json({ token, user });
// // };
