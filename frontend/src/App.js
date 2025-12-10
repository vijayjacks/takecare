// import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { myContext } from './components/Context/Context';
import { Navbar } from './components/Navbar/Navbar';

import Home from './components/Home/Home';
import ClinicCarousel from './components/Home/ClinicCarousel';
import Footer from './components/Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import ClinicManagement from './components/Menu/Clinic/ClinicManagement';
import PatientRegistrationForm from "./components/Regster/Register";
import PatientLoginForm from './components/Login/Login'
import DoctorRegister from './components/Menu/Doctors/Doctorsreg'
import DoctorLogin from './components/Menu/Doctors/DoctorLogin'
import ClinicLogin from './components/Menu/Clinic/ClinicLogin'
import ClinicView from './components/Menu/Clinic/ClinicView';
import LabRegister from './components/Menu/Lab/Labs';
import LabLoginForm from './components/Menu/Lab/LabLogin';
import LabDashboard from './components/Menu/Lab/LabDashboard';
import LabBooking from './components/Menu/Lab/LabBooking';
import LabtestReport from './components/Menu/Lab/LabtestReport';
import PatientLabReport from './components/Menu/Lab/PatientLabReport';
import ReportPayment from './components/Menu/Patient/ReportPayment';
import PaymentSuccess from './components/Menu/Patient/PaymentSuccess';
import PaidLabReports from './components/Menu/Patient/PaidLabReports';

import LabReportList from "./components/Menu/Patient/LabReportList";
import LabReportDetails from "./components/Menu/Patient/LabReportDetails";



// import Payment from "./components/Payment";
// import LabReportDetail from "./components/Menu/Patient/patientLabReportDetail";
// import PaymentSuccess from "./components/PaymentSuccess";






import LabApproval from './components/Menu/Lab/LabApprovals';


import Approvedoctor from './components/Menu/Clinic/ApproveDoctor'
import AllDoctors from './components/Menu/Doctors/Doctor';
import DoctorDetail from './components/Menu/Doctors/DoctorDetials';
import Doctorprofile from './components/Menu/Doctors/Doctorprofile';
import PatientBooking from './components/Menu/Patient/PatientBooking';
import Appointmentspayments from './components/Menu/Patient/Appointmentspayments';


import PatientProfilePage from './components/Menu/Patient/Patientprofile';
import PatientConsultationDetails from './components/Menu/Patient/PatientConsultationDetails';
import AllConsultations from './components/Menu/Patient/Allconsultation';


import ClinicAppointments from './components/Menu/Clinic/ClinicAppointments'
import ClinicRegistrations from './components/Menu/Clinic/ClinicRegistrations'
import ConsultationSuccess from './components/Menu/Clinic/ConsultationSuccess'


import DoctorAppointments from './components/Menu/Doctors/DoctorAppointments'
import DoctorConsultationForm from './components/Menu/Doctors/DoctorConsultationList'
import PatientVitals from './components/Menu/Clinic/PatientVitals'
// import PaymentForm from './components/Menu/Clinic/PaymentForm'
import PaymentSuccessed from './components/Menu/Clinic/PaymentSuccessed'

// import DoctorBooking from'./components/Menu/Patient/Doctorbooking'


import PharmacyRegisterForm from './components/Menu/Pharmacy/Pharmacyreg'
// // App.js (entry point with route protection and role-based layout)
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import Login from "./components/Auth/Login";
// import Home from "./components/Home/Home";
// import { useAuth } from "./context/AuthContext";

// const PrivateRoute = ({ children, roles }) => {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" />;
//   if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" />;
//   return children;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/admin-dashboard"
//           element={
//             <PrivateRoute roles={["superadmin", "admin"]}>
//               <AdminDashboard />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

















function App() {
  // const [datas, setDatas] = useState([]); // Holds clinic data globally

  const contextValues = {
    // datas,
    // setDatas,
  };


  return (
    <myContext.Provider value={contextValues}>
      <BrowserRouter>
        <Navbar />
        <Routes>



          {/* Main user-facing homepage */}
          <Route path="/" element={<Home />} />

          <Route path="/ClinicCarousel" element={<ClinicCarousel />} />

          <Route path="/Footer" element={<Footer />} />

          <Route path="/PatientRegister" element={<PatientRegistrationForm />} />
          <Route path="/PatientLogin" element={<PatientLoginForm />} />
          <Route path="/DoctorRegister" element={<DoctorRegister />} />
          <Route path="/DoctorLogin" element={<DoctorLogin />} />
          <Route path="/PharmacyRegister" element={<PharmacyRegisterForm />} />

          <Route path="/LabRegister" element={<LabRegister />} />
          <Route path="/Labapprovals" element={<LabApproval />} />
          <Route path="/Lablogin" element={<LabLoginForm />} />

          <Route path="/Labdashboard" element={<LabDashboard />} />
          <Route path="/LabBooking" element={<LabBooking />} />
          <Route path="/LabtestReport" element={<LabtestReport />} />

          <Route path="/labReports/:reportId" element={<PatientLabReport />} />


          {/* Show all lab reports */}
          <Route path="/LabReportList/:patientId" element={<LabReportList />} />



          {/* Payment page for a specific report */}
          <Route path="/payment/:reportId" element={<ReportPayment />} />

          {/* Payment success */}


          {/* <Route path="/patients/:patientId/labreports/:reportId/payment-success" element={<PaymentSuccess />}/> */}



          <Route
            path="/patients/:patientId/labreports/:reportId/payment-success"
            element={<PaymentSuccess />}
          />


          {/* <Route path="/payment-success/:patientid" element={<PaymentSuccess />} /> */}

          <Route path="/patients/:patientId/labreports/:reportId" element={<LabReportDetails />} />

          <Route path="/patient/lab-reports" element={<PaidLabReports />} />



          {/* View only paid lab reports */}
          {/* <Route path="/paid-reports" element={<PaidLabReports  />} /> */}











          {/* <Route path="bookings/:bookingId" element={<LabBooking />} /> */}
          {/* <Route path="bookings/my" element={<MyLabBookings />} />  */}

          {/* <Route path="/Labsregister/:clinicId" element={<LabRegister />} /> */}

















          {/* <Route path="/login" element={<Login />} />

<Route
            path="/admin-dashboard"
            element={
              <PrivateRoute roles={["superadmin", "admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          /> */}



          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/ClinicManagement" element={<ClinicManagement />} />
          <Route path="/cliniclogin" element={<ClinicLogin />} />



          {/* <Route path="/clinic/:id" element={<ClinicView />} /> */}

          <Route path="/clinic/:clinicId/patient/:patientId" element={<ClinicView />} />

          <Route path="/clinics/:clinicId/patients/:patientId/payment-success" element={<PaymentSuccessed />} />

          <Route path="/clinics/:clinicId/registrations" element={<ClinicRegistrations />} />















          {/* <Route path="/PaymentForm" element={<PaymentForm />} /> */}



          {/*         
<Route
  path="/patients/:patientId/labreports/:reportId/payment-success"
  element={<PaymentSuccess />}
/> */}



          <Route path="/Approvedoctor/:id" element={<Approvedoctor />} />


          <Route path="/DoctorProfile/:id" element={<Doctorprofile />} />
          <Route path="/doctors/dashboard" element={<AllDoctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />

          {/* <Route path="/DoctorBooking/:id" element={<DoctorBooking />} /> */}

          <Route path="/ConsultationSuccess" element={<ConsultationSuccess />} />


          <Route path="/patientbooking" element={<PatientBooking />} />
          <Route path="/appointmentspayment" element={<Appointmentspayments />} />









          <Route path="/PatientProfilePage/:id" element={<PatientProfilePage />} />

          <Route path="/clinicappointmentsview" element={<ClinicAppointments />} />
          <Route path="/doctorappointments" element={<DoctorAppointments />} />
          {/* /consultation/${appId}/${doctorId}/${patientId}/${clinicId}` */}

          <Route
            path="/consultation/:appointmentId/:doctorId/:patientId/:clinicId"
            element={<DoctorConsultationForm />}
          />
          <Route path="/allconsultation" element={<AllConsultations />} />


          <Route path="/patient/consultation/:consultationId" element={<PatientConsultationDetails />} />

          <Route path="/clinic/patient/PatientVitals" element={<PatientVitals />} />










          {/* <Route path="/DoctorConsultationForm" element={<DoctorConsultationForm />} /> */}


          {/* Admin route to manage clinics */}
          {/* <Route path="/admin/clinics" element={<ClinicManagement />} /> */}


          {/* Future pages you may include: */}
          {/* 
           
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/clinic/:clinicId" element={<ClinicDashboard />} />
          */}
        </Routes>
      </BrowserRouter>
    </myContext.Provider>
  );
}

export default App;
