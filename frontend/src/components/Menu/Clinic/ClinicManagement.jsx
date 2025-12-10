// import React, { useState } from "react";
// import axios from "axios";
// import useClinics from '../../Hooks/useClinics';
// import { toast } from "react-hot-toast";

// function ClinicManagement() {
//     const { clinics, loading, error, refetch } = useClinics(); // ✅ Use centralized fetching
//     const [location, setLocation] = useState('');

//     const filteredClinics = clinics.filter(clinic =>
//         clinic.address.toLowerCase().includes(location.toLowerCase())
//     );

//     const [formData, setFormData] = useState({
//         name: "",
//         address: "",
//         phone: "",
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:5000/api/clinics/register", formData);
//             toast.success("Clinic registered successfully");
//             setFormData({ name: "", address: "", phone: "", email: "", password: "" });
//             refetch(); // ✅ Refresh clinic list
//         } catch (err) {
//             console.error("Error registering clinic:", err);
//             toast.error("Failed to register clinic");
//         }
//     };

//     return (
//         <div className="container p-6">
//             <h1 className="text-2xl font-bold mb-4">Clinic Management</h1>

//             {/* Clinic Registration Form */}
//             <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 shadow rounded-md mb-6">
//                 <input className="w-full border px-3 py-2 rounded" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Clinic Name" required />
//                 <input className="w-full border px-3 py-2 rounded" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
//                 <input className="w-full border px-3 py-2 rounded" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
//                 <input className="w-full border px-3 py-2 rounded" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//                 <input className="w-full border px-3 py-2 rounded" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//                 <input
//                     type="text"
//                     placeholder="Filter by location"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="border px-3 py-2 rounded"
//                 />

//                 <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Clinic</button>
//             </form>

//             {/* Clinic List */}
//             <h2 className="text-xl font-semibold mb-3">All Clinics</h2>

//             {loading ? (
//                 <div className="text-blue-500">Loading clinics...</div>
//             ) : error ? (
//                 <div className="text-red-500">{error}</div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {clinics.map(clinic => (
//                         <div key={clinic._id} className="border p-4 rounded shadow bg-white">
//                             <h3 className="text-lg font-bold">{clinic.name}</h3>
//                             <p><strong>Address:</strong> {clinic.address}</p>
//                             <p><strong>Phone:</strong> {clinic.phone}</p>
//                             <p><strong>Email:</strong> {clinic.email}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ClinicManagement;







// import React, { useState } from "react";
// import axios from "axios";
// import useClinics from '../../Hooks/useClinics';
// import { toast } from "react-hot-toast";

// function ClinicManagement() {
//     const { clinics, loading, error, refetch } = useClinics();
//     const [location, setLocation] = useState("");

//     const filteredClinics = clinics.filter((clinic) =>
//         clinic?.location?.city?.toLowerCase().includes(location.toLowerCase())
//     );

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: "",
//     description: "",
//     location: {
//       city: "",
//       state: "",
//       country: ""
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (["city", "state", "country"].includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         location: {
//           ...prev.location,
//           [name]: value
//         }
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:5000/api/clinics/register", formData);
//       toast.success("Clinic registered successfully");

//       // Clear form
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         address: "",
//         phone: "",
//         description: "",
//         location: { city: "", state: "", country: "" }
//       });
//       refetch();
//     } catch (error) {
//       console.error("Registration error:", error);
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

  
//     return (
//         <div className="container p-6">
//             <h1 className="text-2xl font-bold mb-4">Clinic Management</h1>

//             {/* Registration Form */}
//             <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 shadow rounded-md mb-6">
//                 <input className="w-full border px-3 py-2 rounded" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Clinic Name" required />
//                 <input className="w-full border px-3 py-2 rounded" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
//                 <input className="w-full border px-3 py-2 rounded" type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
//                 <input className="w-full border px-3 py-2 rounded" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//                 <input className="w-full border px-3 py-2 rounded" type="text" name="description" value={formData.description} onChange={handleChange} placeholder="description" required />

//                 <input className="w-full border px-3 py-2 rounded" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />


//                 <input
//                     className="w-full border px-3 py-2 rounded"
//                     type="text"
//                     name="city"
//                     value={formData.location.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     required
//                 />

//                 <input
//                     className="w-full border px-3 py-2 rounded"
//                     type="text"
//                     name="state"
//                     value={formData.location.state}
//                     onChange={handleChange}
//                     placeholder="State"
//                 />

//                 <input
//                     className="w-full border px-3 py-2 rounded"
//                     type="text"
//                     name="country"
//                     value={formData.location.country}
//                     onChange={handleChange}
//                     placeholder="Country"
//                 />

//                 <button type="submit" value={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Add Clinic</button>

//             </form>
//             <br />

//             {/* Filter Input */}
//             <input
//                 type="text"
//                 placeholder="Filter clinics by location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="w-full md:w-1/2 border px-3 py-2 rounded mb-6"
//             />

//             {/* Clinic List */}
//             <h2 className="text-xl font-semibold mb-3">All Clinics</h2>

//             {loading ? (
//                 <div className="text-blue-500">Loading clinics...</div>
//             ) : error ? (
//                 <div className="text-red-500">{error}</div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {filteredClinics.map((clinic) => (
//                         <div key={clinic._id} className="border p-4 rounded shadow bg-white">
//                             <h3 className="text-lg font-bold">{clinic.name}</h3>
//                             <p><strong>Address:</strong> {clinic.address}</p>
//                             <p><strong>Phone:</strong> {clinic.phone}</p>
//                             <p><strong>Email:</strong> {clinic.email}</p>
//                             <p><strong>description:</strong> {clinic.description}</p>

//                             <p><strong>Location:</strong> {clinic.location.city}, {clinic.location.state}, {clinic.location.country}</p>

//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ClinicManagement;



import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useClinics from "../../Hooks/useClinics";

function ClinicManagement() {
  const { clinics, loading, error, refetch } = useClinics();
  const [location, setLocation] = useState("");

  const filteredClinics = clinics.filter((clinic) =>
    clinic?.location?.city?.toLowerCase().includes(location.toLowerCase())
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    description: "",
    location: { city: "", state: "", country: "" }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "state", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/clinics/register", formData);
      toast.success("Clinic registered successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        description: "",
        location: { city: "", state: "", country: "" }
      });
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-4">Clinic Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 shadow rounded-md mb-6">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Clinic Name" className="w-full border px-3 py-2 rounded" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border px-3 py-2 rounded" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full border px-3 py-2 rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border px-3 py-2 rounded" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full border px-3 py-2 rounded" required />
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" required />
        <input type="text" name="city" value={formData.location.city} onChange={handleChange} placeholder="City" className="w-full border px-3 py-2 rounded" required />
        <input type="text" name="state" value={formData.location.state} onChange={handleChange} placeholder="State" className="w-full border px-3 py-2 rounded" />
        <input type="text" name="country" value={formData.location.country} onChange={handleChange} placeholder="Country" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Clinic</button>
      </form>

      {/* Filter */}
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Filter by city..." className="w-full border px-3 py-2 rounded mb-4" />

      {/* Clinic List */}
      <h2 className="text-xl font-semibold mb-3">All Clinics</h2>
      {loading ? (
        <p className="text-blue-500">Loading clinics...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClinics.map((clinic) => (
            <div key={clinic._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-lg font-bold">{clinic.name}</h3>
              <p><strong>Address:</strong> {clinic.address}</p>
              <p><strong>Phone:</strong> {clinic.phone}</p>
              <p><strong>Email:</strong> {clinic.email}</p>
              <p><strong>City:</strong> {clinic.location.city}</p>
              <p><strong>Description:</strong> {clinic.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClinicManagement;
