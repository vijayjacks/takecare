import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useClinics from '../Hooks/useClinics';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import Footer from '../Footer/Footer';
import ClinicCarousel from '../Home/ClinicCarousel';

const Home = () => {
  const { clinics, loading, error } = useClinics();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const patientId = localStorage.getItem("patientId");

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectClinic = (id) => {
    if (!patientId) {
      alert("Please login or register first to view clinics.");
      navigate("/PatientLogin");
      return;
    }
    navigate(`/clinic/${id}/patient/${patientId}`);
  };

  return (
    <div>
      {/* <Navbar /> */}
      {/* <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/logo.png" alt="TakeCare" width="40" height="40" />
          <span className="fw-bold text-primary">TakeCare</span>
        </Link> */}


      {/* </div> */}
      {/* Sub Navigation */}
      {/* <div className="flex flex-wrap justify-center gap-4 bg-gray-100 py-3 text-sm md:text-base">

        
        <Link className="text-blue-600 hover:underline" to="/PatientLogin">Login</Link>
        <Link className="text-blue-600 hover:underline" to="/PatientRegister">Register</Link>
        <Link className="text-blue-600 hover:underline" to="/about">About</Link>
        <Link className="text-blue-600 hover:underline" to="/contact">Contact</Link>
        <Link className="text-blue-600 hover:underline" to="/admin-login">Admin</Link>
        <Link className="text-blue-600 hover:underline" to="/LabDashboard">LAB</Link>
        <Link className="text-blue-600 hover:underline" to={`/LabReportList/${patientId}`}>LABREPORT</Link>
      </div> */}


<div>
  <ClinicCarousel />
</div>






      {/* Search Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 my-6 px-4">
        <input
          type="text"
          placeholder="Search clinics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />
        <select
          onChange={(e) => handleSelectClinic(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        >
          <option value="">Select Clinic</option>
          {filteredClinics.map((clinic) => (
            <option key={clinic._id} value={clinic._id}>
              {clinic.name}
            </option>
          ))}
        </select>
      </div>

      {/* Clinic Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 pb-10">
        {loading ? (
          <div className="text-blue-500">Loading clinics...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          filteredClinics.map((clinic) => (
            <div
              key={clinic._id}
              onClick={() => handleSelectClinic(clinic._id)}
              className="cursor-pointer w-full sm:w-72 md:w-1/3 lg:w-1/4 xl:w-1/5 border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold">{clinic.name}</h3>
              <p className="text-gray-700">{clinic.address}</p>
              <p className="text-gray-500">📞 {clinic.phone}</p>
              <p className="text-sm text-gray-400">{clinic.email}</p>
              <p>
                <strong>Location:</strong> {clinic.location.city}, {clinic.location.state},{" "}
                {clinic.location.country}
              </p>
              <p>{clinic.description}</p>
            </div>
          ))
        )}
      </div>
     { <Footer /> }


    </div>
    
  );
};

export default Home;




 