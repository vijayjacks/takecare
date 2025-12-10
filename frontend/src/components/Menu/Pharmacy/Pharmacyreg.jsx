// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const PharmacyRegister = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//     // clinicId: "",
//   });

//   const [clinics, setClinics] = useState([]);

//   // Fetch clinics on mount
//   useEffect(() => {
//     const fetchClinics = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/clinics");
//         setClinics(res.data);
//       } catch (err) {
//         toast.error("Failed to load clinics");
//       }
//     };
//     fetchClinics();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/pharmacies/register", formData);
//       toast.success("Pharmacy registered successfully");
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         address: "",
//         // clinicId: "",
//       });
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-6 text-center">Pharmacy Registration</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Pharmacy Name"
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           placeholder="Phone"
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="w-full border p-2 rounded"
//         />

//         <select
//           name="clinicId"
//           value={formData.clinicId}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">Select Clinic</option>
//           {clinics.map((clinic) => (
//             <option key={clinic._id} value={clinic._id}>
//               {clinic.name}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit" value={handleSubmit}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PharmacyRegister;














import React, { useState } from 'react';
import axios from 'axios';
//  import toast from "react-hot-toast";

const PharmacyRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    clinicId: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    country: 'India',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        clinicId: formData.clinicId,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        location: {
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
      };

      const res = await axios.post('/api/pharmacy/register', payload);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert('Pharmacy registration failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register Pharmacy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Pharmacy Name" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="text" name="clinicId" placeholder="Clinic ID" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="text" name="city" placeholder="City" className="w-full p-2 border rounded" onChange={handleChange} />
        <input type="text" name="state" placeholder="State" className="w-full p-2 border rounded" onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register Pharmacy</button>
      </form>
    </div>
  );
};

export default PharmacyRegisterForm;
