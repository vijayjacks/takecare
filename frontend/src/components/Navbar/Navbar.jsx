// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div className="container">
//         <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
//           <img src="/logo.png" alt="" width="40" height="40" />
//           <span className="fw-bold text-primary">TakeCare</span>
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item"><Link className="nav-link" to="/PatientLogin">Login</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/PatientRegister">Register</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/admin-login">Admin</Link></li>
//             <li className="nav-item"><Link className="nav-link" to="/LabDashboard">LAB</Link></li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// // Navbar Component
//  export const Navbar = () => (
//   <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//     <div className="container">
//       <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
//         <img src="/logo.png" alt="TakeCare" width="40" height="40" />
//         <span className="fw-bold text-primary">TakeCare</span>
//       </Link>
//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item"><Link className="nav-link" to="/PatientLogin">Login</Link></li>
//           <li className="nav-item"><Link className="nav-link" to="/PatientRegister">Register</Link></li>
//           <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
//           <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
//           <li className="nav-item"><Link className="nav-link" to="/admin-login">Admin</Link></li>
//           <li className="nav-item"><Link className="nav-link" to="/LabDashboard">LAB</Link></li>
//         </ul>
//       </div>
//     </div>
//   </nav>
// );
// export default Navbar;








// // src/components/Navbar/Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom'; // ✅ Import Link
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// export const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div className="container">
//         {/* Brand */}
//         <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
//           <img src="/logo.png" alt="TakeCare" width="40" height="40" />
//           <span className="fw-bold text-primary">TakeCare</span>
//         </Link>

//         {/* Toggler */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/PatientLogin">Login</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/PatientRegister">Register</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">Contact</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/admin-login">Admin</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/LabDashboard">LAB</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;












// src/components/Navbar/Navbar.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export const Navbar = ({ user }) => {
  const patientId = localStorage.getItem("patientId");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          {/* <img src="data:image/jpeg;base64,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" alt="" width="40" height="40" /> */}
                   <img src="         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf6UvOBwLSfS-5OaGw79uw_8tyyQ7cT9215Q&s" alt="" width="40" height="40" />


          <span className="fw-bold text-primary">TakeCare</span>
        </Link>


        <div className="flex flex-wrap justify-center gap-4 bg-gray-100 py-3 text-sm md:text-base">

          <Link className="text-blue-600 hover:" to="/PatientRegister">Register</Link>
          <Link className="text-blue-600 hover:underline" to="/PatientLogin">Login</Link>
          <Link className="text-blue-600 hover:underline" to={`/cliniclogin/`}>Cliniclogin</Link>
          <Link className="text-blue-600 hover:underline" to={`/DoctorLogin/`}>Doctorlogin</Link>
          <Link className="text-blue-600 hover:underline" to={`/Lablogin/`}>Lablogin</Link>
          <Link className="text-blue-600 hover:underline" to="/LabDashboard">Labs</Link>
          <Link className="text-blue-600 hover:underline" to={`/LabReportList/${patientId}`}>Labreport</Link>


          {/* <Link className="text-blue-600 hover:underline" to="/about">About</Link>
          <Link className="text-blue-600 hover:underline" to="/contact">Contact</Link>
          <Link className="text-blue-600 hover:underline" to="/admin-login">Admin</Link> */}


        </div>


      </div>
    </nav>
    
  );
};

export default Navbar;
