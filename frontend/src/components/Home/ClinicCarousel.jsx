import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClinicCarousel = () => {
  return (
    <div id="clinicCarousel" className="carousel slide" data-bs-ride="carousel">
      
      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#clinicCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#clinicCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#clinicCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      {/* Carousel Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://thumbs.dreamstime.com/b/concept-medical-care-management-concept-medical-care-management-doctor-work-control-mechanism-174348529.jpg" className="d-block w-100" alt="Appointment Scheduling" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Efficient Appointment Scheduling</h5>
            <p>Manage your patients' appointments effortlessly.</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRekoelm4H8IO2fPAZcbqzG27lhmIdTNVijZ0SVrth4uphuDWaKJLz1atY&s" className="d-block w-100" alt="Lab Management" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Smart Lab Management</h5>
            <p>Track lab reports and test results in real-time.</p>
          </div>
        </div>

        <div className="carousel-item ">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tO2Ic4c-k_SXUr6mMI8xx-s26XgR4kd1CuUzGFYa87onZ0cj_pVmlx5FjAN5E_kiaCq1Og&s" className="d-block w-100" alt="Doctor Management" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Doctor & Staff Management</h5>
            <p>Organize schedules, consultations, and patient care seamlessly.</p>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#clinicCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#clinicCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      {/* Custom Styling */}
      <style>{`
        .carousel-item img {
          height: 500px;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .carousel-item img {
            height: 300px;
          }
          .carousel-caption h5 {
            font-size: 1.2rem;
          }
          .carousel-caption p {
            font-size: 0.9rem;
          }
        }
        .carousel-caption {
          background: rgba(0, 0, 0, 0.4);
          padding: 10px 20px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default ClinicCarousel;




// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ClinicCarousel = () => {
//   const slides = [
//     {
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tO2Ic4c-k_SXUr6mMI8xx-s26XgR4kd1CuUzGFYa87onZ0cj_pVmlx5FjAN5E_kiaCq1Og&s",
//       title: "Efficient Appointment Scheduling",
//       desc: "Manage your patients' appointments effortlessly."
//     },
//     {
//       img: "/images/clinic_lab.jpg",
//       title: "Smart Lab Management",
//       desc: "Track lab reports and test results in real-time."
//     },
//     {
//       img: "/images/clinic_doctors.jpg",
//       title: "Doctor & Staff Management",
//       desc: "Organize schedules, consultations, and patient care seamlessly."
//     }
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto-change slide every 5 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [currentSlide, slides.length]);

//   const handlePrev = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const handleNext = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   return (
//     <div className="position-relative">
//       {/* Slides */}
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`carousel-item ${index === currentSlide ? "active" : ""}`}
//           style={{ display: index === currentSlide ? "block" : "none" }}
//         >
//           <img src={slide.img} className="d-block w-100" alt={slide.title} />
//           <div className="carousel-caption d-none d-md-block">
//             <h5>{slide.title}</h5>
//             <p>{slide.desc}</p>
//           </div>
//         </div>
//       ))}

//       {/* Controls */}
//       <button
//         className="carousel-control-prev"
//         type="button"
//         onClick={handlePrev}
//       >
//         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Previous</span>
//       </button>
//       <button
//         className="carousel-control-next"
//         type="button"
//         onClick={handleNext}
//       >
//         <span className="carousel-control-next-icon" aria-hidden="true"></span>
//         <span className="visually-hidden">Next</span>
//       </button>

//       {/* Custom Styling */}
//       <style>{`
//         .carousel-item img {
//           height: 500px;
//           object-fit: cover;
//         }
//         @media (max-width: 768px) {
//           .carousel-item img {
//             height: 300px;
//           }
//           .carousel-caption h5 {
//             font-size: 1.2rem;
//           }
//           .carousel-caption p {
//             font-size: 0.9rem;
//           }
//         }
//         .carousel-caption {
//           background: rgba(0, 0, 0, 0.4);
//           padding: 10px 20px;
//           border-radius: 10px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ClinicCarousel;
