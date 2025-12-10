// // src/components/Footer/Footer.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Footer = () => {
//   return (
//     <footer className="bg-light text-dark pt-5 border-top mt-5">
//       <div className="container">

//         <div className="row">

//           {/* Logo + Description */}
//           <div className="col-md-4 mb-4">
//             <div className="d-flex align-items-center mb-3">
//               <img src="/logo.png" width="50" alt="TakeCare" />
//               <h4 className="ms-2 text-primary fw-bold">TakeCare</h4>
//             </div>
//             <p className="text-muted">
//               A complete digital clinic management solution designed
//               to simplify workflows, improve patient experience, and
//               boost healthcare efficiency.
//             </p>

//             <div className="d-flex gap-3 mt-3">
//               <a href="#" className="text-dark fs-5"><i className="bi bi-facebook"></i></a>
//               <a href="#" className="text-dark fs-5"><i className="bi bi-twitter"></i></a>
//               <a href="#" className="text-dark fs-5"><i className="bi bi-instagram"></i></a>
//               <a href="#" className="text-dark fs-5"><i className="bi bi-linkedin"></i></a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="col-md-2 mb-4">
//             <h5 className="fw-bold">Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><Link className="text-dark text-decoration-none" to="/">Home</Link></li>
//               <li><Link className="text-dark text-decoration-none" to="/about">About</Link></li>
//               <li><Link className="text-dark text-decoration-none" to="/contact">Contact</Link></li>
//               <li><Link className="text-dark text-decoration-none" to="/PatientLogin">Login</Link></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div className="col-md-3 mb-4">
//             <h5 className="fw-bold">Services</h5>
//             <ul className="list-unstyled">
//               <li><Link className="text-dark text-decoration-none" to="/LabDashboard">Lab Dashboard</Link></li>
//               <li><Link className="text-dark text-decoration-none" to="/appointments">Appointments</Link></li>
//               <li><Link className="text-dark text-decoration-none" to="/doctors">Doctors</Link></li>
//               <li><Link className="text-dark text-decoration-none" to="/records">Patient Records</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="col-md-3 mb-4">
//             <h5 className="fw-bold">Contact</h5>
//             <p className="text-muted mb-1"><i className="bi bi-telephone"></i> +1 800 234 7890</p>
//             <p className="text-muted mb-1"><i className="bi bi-envelope"></i> support@takecare.com</p>
//             <p className="text-muted">
//               <i className="bi bi-geo-alt"></i> 42 Healthcare Street, New York, USA
//             </p>
//           </div>

//         </div>

//         {/* Bottom Bar */}
//         <div className="d-flex justify-content-between align-items-center flex-wrap py-3 border-top mt-4">
//           <p className="mb-0 text-muted">© {new Date().getFullYear()} TakeCare - All Rights Reserved.</p>
//           <div className="d-flex gap-4">
//             <Link className="text-muted text-decoration-none" to="/privacy">Privacy Policy</Link>
//             <Link className="text-muted text-decoration-none" to="/terms">Terms & Conditions</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;











// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Footer = () => {
//   return (
//     <footer className="bg-dark text-light pt-5 mt-5">
//       <div className="container">

//         <div className="row gy-4">

//           {/* Logo + Description */}
//           <div className="col-lg-4 col-md-6">
//             <div className="d-flex align-items-center mb-3">
//               <img src="/logo.png" width="50" alt="TakeCare" />
//               <h4 className="ms-2 text-info fw-bold">TakeCare</h4>
//             </div>
//             <p className="text-light opacity-75">
//               TakeCare is an advanced clinic management system designed to 
//               streamline patient appointments, lab reports, doctor schedules, 
//               and digital health records — all in one platform.
//             </p>

//             <div className="d-flex gap-3 mt-3">
//               <a href="#" className="text-light fs-4"><i className="bi bi-facebook"></i></a>
//               <a href="#" className="text-light fs-4"><i className="bi bi-twitter"></i></a>
//               <a href="#" className="text-light fs-4"><i className="bi bi-instagram"></i></a>
//               <a href="#" className="text-light fs-4"><i className="bi bi-linkedin"></i></a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="col-lg-2 col-md-6">
//             <h5 className="fw-bold text-info">Quick Links</h5>
//             <ul className="list-unstyled mt-3">
//               <li><Link className="footer-link" to="/">🏠 Home</Link></li>
//               <li><Link className="footer-link" to="/about">ℹ About Us</Link></li>
//               <li><Link className="footer-link" to="/contact">📞 Contact</Link></li>
//               <li><Link className="footer-link" to="/PatientLogin">🔐 Login</Link></li>
//               <li><Link className="footer-link" to="/PatientRegister">📝 Register</Link></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div className="col-lg-3 col-md-6">
//             <h5 className="fw-bold text-info">Our Services</h5>
//             <ul className="list-unstyled mt-3">
//               <li><Link className="footer-link" to="/LabDashboard">🧪 Lab Management</Link></li>
//               <li><Link className="footer-link" to="/appointments">📅 Appointment Scheduling</Link></li>
//               <li><Link className="footer-link" to="/doctors">👨‍⚕️ Doctor Management</Link></li>
//               <li><Link className="footer-link" to="/records">📁 Medical Records</Link></li>
//               <li><Link className="footer-link" to="/billing">💳 Billing & Payments</Link></li>
//             </ul>
//           </div>

//           {/* Newsletter */}
//           <div className="col-lg-3 col-md-6">
//             <h5 className="fw-bold text-info">Newsletter</h5>
//             <p className="opacity-75">Subscribe for health tips & system updates.</p>
//             <div className="input-group">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter email"
//               />
//               <button className="btn btn-info text-white">Subscribe</button>
//             </div>

//             <div className="mt-3">
//               <h6 className="fw-bold text-info">Contact</h6>
//               <p className="mb-1"><i className="bi bi-telephone"></i> +1 800 555 7890</p>
//               <p className="mb-1"><i className="bi bi-envelope"></i> support@takecare.com</p>
//               <p><i className="bi bi-geo-alt"></i> 42 Healthcare Street, New York, USA</p>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <hr className="border-secondary mt-4" />

//         {/* Bottom Bar */}
//         <div className="d-flex justify-content-between flex-wrap py-3">
//           <p className="mb-0 opacity-75">
//             © {new Date().getFullYear()} <span className="text-info">TakeCare</span> — All Rights Reserved
//           </p>

//           <div className="d-flex gap-4">
//             <Link className="footer-link" to="/privacy">Privacy Policy</Link>
//             <Link className="footer-link" to="/terms">Terms of Service</Link>
//           </div>
//         </div>
//       </div>

//       {/* Extra Styling */}
//       <style>{`
//         .footer-link {
//           color: #ddd;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 8px;
//         }
//         .footer-link:hover {
//           color: #17a2b8;
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default Footer;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Footer = () => {
//   const [theme, setTheme] = useState("dark");

//   // Load saved theme
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) setTheme(savedTheme);
//     document.body.setAttribute("data-theme", savedTheme || "dark");
//   }, []);

//   // Toggle theme
//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.body.setAttribute("data-theme", newTheme);
//   };

//   // Scroll to top
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <footer className={`bg-dark text-light pt-5 mt-5 ${theme === "dark" ? "footer-dark" : ""}`}>
//         <div className="container">

//           <div className="d-flex justify-content-end mb-3">
//             {/* Dark Mode Toggle */}
//             <button className="btn btn-info text-white" onClick={toggleTheme}>
//               {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//             </button>
//           </div>

//           <div className="row gy-4">

//             {/* Logo + Description */}
//             <div className="col-lg-4 col-md-6">
//               <div className="d-flex align-items-center mb-3">
//                 <img src="/logo.png" width="50" alt="TakeCare" />
//                 <h4 className="ms-2 text-info fw-bold">TakeCare</h4>
//               </div>
//               <p className="text-light opacity-75">
//                 TakeCare is an advanced clinic management system designed to 
//                 streamline patient appointments, lab reports, doctor schedules, 
//                 and digital health records — all in one platform.
//               </p>

//               <div className="d-flex gap-3 mt-3">
//                 <a href="#" className="text-light fs-4"><i className="bi bi-facebook"></i></a>
//                 <a href="#" className="text-light fs-4"><i className="bi bi-twitter"></i></a>
//                 <a href="#" className="text-light fs-4"><i className="bi bi-instagram"></i></a>
//                 <a href="#" className="text-light fs-4"><i className="bi bi-linkedin"></i></a>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div className="col-lg-2 col-md-6">
//               <h5 className="fw-bold text-info">Quick Links</h5>
//               <ul className="list-unstyled mt-3">
//                 <li><Link className="footer-link" to="/">🏠 Home</Link></li>
//                 <li><Link className="footer-link" to="/about">ℹ About Us</Link></li>
//                 <li><Link className="footer-link" to="/contact">📞 Contact</Link></li>
//                 <li><Link className="footer-link" to="/PatientLogin">🔐 Login</Link></li>
//                 <li><Link className="footer-link" to="/PatientRegister">📝 Register</Link></li>
//               </ul>
//             </div>

//             {/* Services */}
//             <div className="col-lg-3 col-md-6">
//               <h5 className="fw-bold text-info">Our Services</h5>
//               <ul className="list-unstyled mt-3">
//                 <li><Link className="footer-link" to="/LabDashboard">🧪 Lab Management</Link></li>
//                 <li><Link className="footer-link" to="/appointments">📅 Appointment Scheduling</Link></li>
//                 <li><Link className="footer-link" to="/doctors">👨‍⚕️ Doctor Management</Link></li>
//                 <li><Link className="footer-link" to="/records">📁 Medical Records</Link></li>
//                 <li><Link className="footer-link" to="/billing">💳 Billing & Payments</Link></li>
//               </ul>
//             </div>

//             {/* Newsletter */}
//             <div className="col-lg-3 col-md-6">
//               <h5 className="fw-bold text-info">Newsletter</h5>
//               <p className="opacity-75">Subscribe for health tips & system updates.</p>
//               <div className="input-group">
//                 <input type="email" className="form-control" placeholder="Enter email" />
//                 <button className="btn btn-info text-white">Subscribe</button>
//               </div>

//               <div className="mt-3">
//                 <h6 className="fw-bold text-info">Contact</h6>
//                 <p className="mb-1"><i className="bi bi-telephone"></i> +1 800 555 7890</p>
//                 <p className="mb-1"><i className="bi bi-envelope"></i> support@takecare.com</p>
//                 <p><i className="bi bi-geo-alt"></i> 42 Healthcare Street, New York, USA</p>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <hr className="border-secondary mt-4" />

//           {/* Bottom Bar */}
//           <div className="d-flex justify-content-between flex-wrap py-3">
//             <p className="mb-0 opacity-75">
//               © {new Date().getFullYear()} <span className="text-info">TakeCare</span> — All Rights Reserved
//             </p>

//             <div className="d-flex gap-4">
//               <Link className="footer-link" to="/privacy">Privacy Policy</Link>
//               <Link className="footer-link" to="/terms">Terms of Service</Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to Top Button */}
//       <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

//       <style>{`
//         .footer-link {
//           color: #ddd;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 8px;
//         }
//         .footer-link:hover {
//           color: #17a2b8;
//         }
//         .scroll-to-top {
//           position: fixed;
//           bottom: 25px;
//           right: 25px;
//           background: #17a2b8;
//           color: white;
//           border: none;
//           border-radius: 50%;
//           width: 45px;
//           height: 45px;
//           font-size: 24px;
//           cursor: pointer;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.3);
//           transition: all 0.3s ease-in-out;
//         }
//         .scroll-to-top:hover {
//           transform: translateY(-3px);
//           background: #138496;
//         }
//         body[data-theme="dark"] {
//           background-color: #000;
//           color: #fff;
//         }
//         body[data-theme="light"] {
//           background-color: #f8f9fa;
//           color: #000;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Footer;







































import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme || "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  // Animated scroll-to-top function
  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 500; // animation duration in ms
    let startTime = null;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easing cubic out

      window.scrollTo(0, start * (1 - ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  return (
    <>
      <footer className={`bg-dark text-light pt-5 mt-5 ${theme === "dark" ? "footer-dark" : ""}`}>
        <div className="container">

          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-info text-white" onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
          </div>

          <div className="row gy-4">
            {/* Logo + Description */}
            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center mb-3">
                <img src="/logo.png" width="50" alt="TakeCare" />
                <h4 className="ms-2 text-info fw-bold">TakeCare</h4>
              </div>
              <p className="text-light opacity-75">
                TakeCare is an advanced clinic management system for appointments, labs, doctors, and records.
              </p>

              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-light fs-4"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-light fs-4"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-light fs-4"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-light fs-4"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="fw-bold text-info">Quick Links</h5>
              <ul className="list-unstyled mt-3">
                <li><Link className="footer-link" to="/">🏠 Home</Link></li>
                <li><Link className="footer-link" to="/about">ℹ About Us</Link></li>
                <li><Link className="footer-link" to="/contact">📞 Contact</Link></li>
                <li><Link className="footer-link" to="/PatientLogin">🔐 Login</Link></li>
                <li><Link className="footer-link" to="/PatientRegister">📝 Register</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold text-info">Our Services</h5>
              <ul className="list-unstyled mt-3">
                <li><Link className="footer-link" to="/LabDashboard">🧪 Lab Management</Link></li>
                <li><Link className="footer-link" to="/appointments">📅 Appointment Scheduling</Link></li>
                <li><Link className="footer-link" to="/doctors">👨‍⚕️ Doctor Management</Link></li>
                <li><Link className="footer-link" to="/records">📁 Medical Records</Link></li>
                <li><Link className="footer-link" to="/billing">💳 Billing & Payments</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold text-info">Newsletter</h5>
              <p className="opacity-75">Subscribe for health tips & system updates.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter email" />
                <button className="btn btn-info text-white">Subscribe</button>
              </div>
            </div>
          </div>

          <hr className="border-secondary mt-4" />

          <div className="d-flex justify-content-between flex-wrap py-3">
            <p className="mb-0 opacity-75">
              © {new Date().getFullYear()} <span className="text-info">TakeCare</span> — All Rights Reserved
            </p>

            <div className="d-flex gap-4">
              <Link className="footer-link" to="/privacy">Privacy Policy</Link>
              <Link className="footer-link" to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

      <style>{`
        .footer-link { color: #ddd; text-decoration: none; margin-bottom: 8px; }
        .footer-link:hover { color: #17a2b8; }
        .scroll-to-top {
          position: fixed;
          bottom: 25px;
          right: 25px;
          background: #17a2b8;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 26px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          transition: all 0.3s ease-in-out;
        }
        .scroll-to-top:hover { transform: translateY(-5px); background: #138496; }
        body[data-theme="dark"] { background-color: #000; color: #fff; }
        body[data-theme="light"] { background-color: #f8f9fa; color: #000; }
      `}</style>
    </>
  );
};

export default Footer;



// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Footer = () => {
//   const [theme, setTheme] = useState("light");
//   const [language, setLanguage] = useState("EN");

//   // Load saved theme
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) setTheme(savedTheme);
//     document.body.setAttribute("data-theme", savedTheme || "light");
//   }, []);

//   // Toggle Theme
//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.body.setAttribute("data-theme", newTheme);
//   };

//   // Scroll to top smoothly
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <footer className={`footer-gradient text-light pt-5 mt-5 ${theme === "dark" ? "footer-dark" : ""}`}>
//         <div className="container">

//           <div className="row gy-4">

//             {/* Logo + About */}
//             <div className="col-lg-4 col-md-6">
//               <div className="d-flex align-items-center mb-3">
//                 <img src="/logo.png" width="50" alt="TakeCare" />
//                 <h4 className="ms-2 text-white fw-bold">TakeCare</h4>
//               </div>
//               <p className="opacity-75">
//                 Your trusted digital clinic management system — appointments, lab reports,
//                 doctors, billing & patient care under one secure platform.
//               </p>

//               <div className="d-flex gap-3 mt-3 fs-4">
//                 <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
//                 <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
//                 <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
//                 <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div className="col-lg-2 col-md-6">
//               <h5 className="fw-bold text-white">Quick Links</h5>
//               <ul className="list-unstyled mt-3">
//                 <li><Link className="footer-link" to="/">🏠 Home</Link></li>
//                 <li><Link className="footer-link" to="/about">ℹ About</Link></li>
//                 <li><Link className="footer-link" to="/contact">📞 Contact</Link></li>
//                 <li><Link className="footer-link" to="/PatientLogin">🔐 Login</Link></li>
//               </ul>
//             </div>

//             {/* Services */}
//             <div className="col-lg-3 col-md-6">
//               <h5 className="fw-bold text-white">Services</h5>
//               <ul className="list-unstyled mt-3">
//                 <li><Link className="footer-link" to="/LabDashboard">🧪 Lab Management</Link></li>
//                 <li><Link className="footer-link" to="/appointments">📅 Appointments</Link></li>
//                 <li><Link className="footer-link" to="/doctors">👨‍⚕️ Doctors</Link></li>
//                 <li><Link className="footer-link" to="/records">📁 Medical Records</Link></li>
//                 <li><Link className="footer-link" to="/billing">💳 Billing</Link></li>
//               </ul>
//             </div>

//             {/* Language + Theme Toggle */}
//             <div className="col-lg-3 col-md-6">
//               <h5 className="fw-bold text-white">Preferences</h5>

//               {/* Language Dropdown */}
//               <div className="mb-3">
//                 <label className="mb-1">🌐 Language</label>
//                 <select
//                   className="form-select"
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value)}
//                 >
//                   <option value="EN">English</option>
//                   <option value="HI">Hindi</option>
//                   <option value="AR">Arabic</option>
//                   <option value="FR">French</option>
//                 </select>
//               </div>

//               {/* Dark Mode Toggle */}
//               <div>
//                 <label className="mb-1">🌓 Theme</label>
//                 <button className="btn btn-light w-100" onClick={toggleTheme}>
//                   {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <hr className="border-light mt-4" />

//           {/* Bottom Section */}
//           <div className="d-flex justify-content-between flex-wrap py-3">
//             <p className="mb-0 opacity-75">
//               © {new Date().getFullYear()} TakeCare — All Rights Reserved.
//             </p>
//             <div className="d-flex gap-4">
//               <Link className="footer-link" to="/privacy">Privacy Policy</Link>
//               <Link className="footer-link" to="/terms">Terms & Conditions</Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll to top animated button */}
//       <button className="scroll-to-top" onClick={scrollToTop}>
//         ↑
//       </button>

//       {/* CSS Styles */}
//       <style>{`
//         .footer-gradient {
//           background: linear-gradient(135deg, #0d6efd, #6610f2);
//         }
//         .footer-dark {
//           background: #111 !important;
//         }
//         .footer-link {
//           color: #f8f9fa;
//           text-decoration: none;
//           display: block;
//           margin-bottom: 6px;
//         }
//         .footer-link:hover {
//           color: #ffc107;
//         }
//         .scroll-to-top {
//           position: fixed;
//           bottom: 25px;
//           right: 25px;
//           background: #0d6efd;
//           color: white;
//           border: none;
//           border-radius: 50%;
//           width: 45px;
//           height: 45px;
//           font-size: 24px;
//           cursor: pointer;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.3);
//           transition: 0.3s;
//         }
//         .scroll-to-top:hover {
//           background: #6610f2;
//         }
//         body[data-theme="dark"] {
//           background-color: #121212;
//           color: white;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Footer;












// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Footer = () => {
//   const [theme, setTheme] = useState("dark"); // DEFAULT = BLACK MODE
//   const [language, setLanguage] = useState("EN");
//   const [showAnnouncement, setShowAnnouncement] = useState(true);
//   const [accessibility, setAccessibility] = useState(false);

//   // Load saved theme + language
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "dark";
//     const savedLanguage = localStorage.getItem("language") || "EN";

//     setTheme(savedTheme);
//     setLanguage(savedLanguage);

//     document.body.setAttribute("data-theme", savedTheme);

//     // Auto Dark Mode by Time
//     const hour = new Date().getHours();
//     if (hour >= 18 || hour <= 6) {
//       document.body.setAttribute("data-theme", "dark");
//       setTheme("dark");
//     }
//   }, []);

//   // Toggle theme
//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.body.setAttribute("data-theme", newTheme);
//   };

//   // Scroll to top
//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <>
//       {/* 🔔 Announcement Bar */}
//       {showAnnouncement && (
//         <div className="announcement-bar text-center text-white">
//           🔔 New Update: Lab Reports module improved.  
//           <button
//             onClick={() => setShowAnnouncement(false)}
//             className="btn btn-sm btn-warning ms-2"
//           >
//             Close
//           </button>
//         </div>
//       )}

//       <footer className="footer-black text-light pt-5 mt-5">
//         <div className="container">
//           <div className="row gy-4">

//             {/* Logo + About */}
//             <div className="col-lg-4 col-md-6">
//               <div className="d-flex align-items-center mb-3">
//                 <img src="/logo.png" width="50" alt="TakeCare" />
//                 <h4 className="ms-2 text-white fw-bold">TakeCare</h4>
//               </div>

//               <p className="opacity-75">
//                 Complete digital clinic management system — Appointments, Doctors,
//                 Billing, Lab Reports & Patient Care in one platform.
//               </p>

//               {/* Social Icons */}
//               <div className="d-flex gap-3 mt-3 fs-4">
//                 <i className="bi bi-facebook text-white"></i>
//                 <i className="bi bi-twitter text-white"></i>
//                 <i className="bi bi-instagram text-white"></i>
//                 <i className="bi bi-linkedin text-white"></i>
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div className="col-lg-2 col-md-6">
//               <h5 className="fw-bold text-white">Quick Links</h5>
//               <ul className="list-unstyled mt-3">
//                 <li><Link className="footer-link" to="/">🏠 Home</Link></li>
//                 <li><Link className="footer-link" to="/about">ℹ About</Link></li>
//                 <li><Link className="footer-link" to="/contact">📞 Contact</Link></li>
//                 <li><Link className="footer-link" to="/PatientLogin">🔐 Login</Link></li>
//               </ul>
//             </div>

//             {/* Services */}
//             <div className="col-lg-3 col-md-6">
//               <h5 className="fw-bold text-white">Services</h5>
//               <ul className="list-unstyled mt-3">
//                 <li><Link className="footer-link" to="/LabDashboard">🧪 Lab Dashboard</Link></li>
//                 <li><Link className="footer-link" to="/appointments">📅 Appointments</Link></li>
//                 <li><Link className="footer-link" to="/doctors">👨‍⚕️ Doctors</Link></li>
//                 <li><Link className="footer-link" to="/records">📁 Records</Link></li>
//                 <li><Link className="footer-link" to="/billing">💳 Billing</Link></li>
//               </ul>
//             </div>

//             {/* Preferences */}
//             <div className="col-lg-3 col-md-6">
//               <h5 className="fw-bold text-white">Preferences</h5>

//               {/* Language */}
//               <div className="mb-3">
//                 <label className="mb-1 text-white">🌐 Language</label>
//                 <select
//                   className="form-select"
//                   value={language}
//                   onChange={(e) => {
//                     setLanguage(e.target.value);
//                     localStorage.setItem("language", e.target.value);
//                   }}
//                 >
//                   <option value="EN">English</option>
//                   <option value="HI">Hindi</option>
//                   <option value="AR">Arabic</option>
//                   <option value="FR">French</option>
//                 </select>
//               </div>

//               {/* Theme toggle */}
//               <label className="mb-1 text-white">🌓 Theme</label>
//               <button className="btn btn-light w-100 mb-3" onClick={toggleTheme}>
//                 {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
//               </button>

//               {/* Accessibility */}
//               <button
//                 className="btn btn-warning w-100"
//                 onClick={() => setAccessibility(!accessibility)}
//               >
//                 ♿ Accessibility: {accessibility ? "ON" : "OFF"}
//               </button>
//             </div>
//           </div>

//           <hr className="border-secondary mt-4" />

//           {/* Bottom */}
//           <div className="d-flex justify-content-between flex-wrap py-3">
//             <p className="mb-0 opacity-75">
//               © {new Date().getFullYear()} TakeCare — All Rights Reserved.
//             </p>
//             <div className="d-flex gap-4">
//               <Link className="footer-link" to="/privacy">Privacy Policy</Link>
//               <Link className="footer-link" to="/terms">Terms</Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Scroll To Top */}
//       <button className="scroll-to-top" onClick={scrollToTop}>↑</button>

//       {/* Floating WhatsApp */}
//       <a
//         href="https://wa.me/123456789?text=Hello%20Clinic!"
//         className="whatsapp-float"
//         target="_blank"
//         rel="noreferrer"
//       >
//         <i className="bi bi-whatsapp"></i>
//       </a>

//       {/* Emergency Call */}
//       <a href="tel:+18002347890" className="emergency-call">
//         <i className="bi bi-telephone-fill"></i>
//       </a>

//       {/* AI Assistant */}
//       <button className="ai-assistant">
//         <i className="bi bi-robot"></i>
//       </button>

//       {/* CSS */}
//       <style>{`
//         .footer-black {
//           background: #000 !important;
//         }
//         .footer-link {
//           color: #f8f9fa;
//           text-decoration: none;
//         }
//         .footer-link:hover {
//           color: #00e0ff;
//         }

//         .announcement-bar {
//           background: #000;
//           padding: 8px;
//           font-size: 15px;
//         }

//         /* Scroll to top */
//         .scroll-to-top {
//           position: fixed;
//           bottom: 25px;
//           right: 25px;
//           background: #000;
//           color: white;
//           border: none;
//           border-radius: 50%;
//           width: 45px;
//           height: 45px;
//           font-size: 22px;
//           cursor: pointer;
//           transition: 0.3s;
//         }
//         .scroll-to-top:hover {
//           background: #444;
//         }

//         /* WhatsApp */
//         .whatsapp-float {
//           position: fixed;
//           bottom: 90px;
//           right: 25px;
//           background: #25d366;
//           color: white;
//           padding: 12px;
//           border-radius: 50%;
//           font-size: 26px;
//         }

//         /* Emergency */
//         .emergency-call {
//           position: fixed;
//           bottom: 150px;
//           right: 25px;
//           background: red;
//           color: white;
//           padding: 12px;
//           border-radius: 50%;
//           font-size: 22px;
//         }

//         /* AI Assistant */
//         .ai-assistant {
//           position: fixed;
//           bottom: 210px;
//           right: 25px;
//           background: #6f42c1;
//           color: white;
//           padding: 12px;
//           border-radius: 50%;
//           font-size: 22px;
//         }

//         body[data-theme="dark"] {
//           background-color: #000;
//           color: white;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Footer;



