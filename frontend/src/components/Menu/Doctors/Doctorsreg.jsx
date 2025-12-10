// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const DoctorRegister = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     gender: 'male',
//     age: '',
//     specialization: '',
//     clinicId: '',
//     // videoCallLink: '',
//     availability: {
//       days: [],
//       from: '',
//       to: '',
//     },
//   });

//   const [clinics, setClinics] = useState([]);

//   useEffect(() => {
//     const fetchClinics = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/clinics');
//         setClinics(res.data);
//       } catch (err) {
//         toast.error('Failed to fetch clinics');
//       }
//     };

//     fetchClinics();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('availability.')) {
//       const key = name.split('.')[1];
//       setFormData((prev) => ({
//         ...prev,
//         availability: {
//           ...prev.availability,
//           [key]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleDayToggle = (day) => {
//     setFormData((prev) => ({
//       ...prev,
//       availability: {
//         ...prev.availability,
//         days: prev.availability.days.includes(day)
//           ? prev.availability.days.filter((d) => d !== day)
//           : [...prev.availability.days, day],
//       },
//     }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     await axios.post('http://localhost:5000/api/doctors/register', formData);
//   //     toast.success('Doctor registered successfully');
//   //     setFormData({
//   //       name: '',
//   //       email: '',
//   //       password: '',
//   //       phone: '',
//   //       gender: 'male',
//   //       age: '',
//   //       specialization: '',
//   //       clinicId: '',
//   //       videoCallLink: '',
//   //       availability: {
//   //         days: [],
//   //         from: '',
//   //         to: '',
//   //       },
//   //     });
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error(err?.response?.data?.message || 'Registration failed');
//   //   }
//   // };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const data = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === 'availability') {
//         data.append('availability', JSON.stringify(value)); // convert to string
//       } else if (key === 'profileImage') {
//         data.append('profileImage', value); // file
//       } else {
//         data.append(key, value);
//       }
//     });

//     await axios.post('http://localhost:5000/api/doctors/register', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     toast.success('Doctor registered successfully');

//     // Reset form
//     setFormData({
//       name: '',
//       email: '',
//       password: '',
//       phone: '',
//       gender: 'male',
//       age: '',
//       specialization: '',
//       clinicId: '',
//       // videoCallLink: '',
//       profileImage: null,
//       availability: {
//         days: [],
//         from: '',
//         to: '',
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     toast.error(err?.response?.data?.message || 'Registration failed');
//   }
// };








//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold text-center mb-6">Doctor Registration</h2>
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
//         <div className="grid md:grid-cols-2 gap-4">
//           <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="border px-3 py-2 rounded w-full" required />
//           <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border px-3 py-2 rounded w-full" required />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="border px-3 py-2 rounded w-full" required />
//           <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="border px-3 py-2 rounded w-full" />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <select name="gender" value={formData.gender} onChange={handleInputChange} className="border px-3 py-2 rounded w-full">
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" className="border px-3 py-2 rounded w-full" />
//         </div>

// {/* <input type="text" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Specialization" className="border px-3 py-2 rounded w-full" required /> */}
// <select
//   name="specialization"
//   value={formData.specialization}
//   onChange={handleInputChange}
//   className="border px-3 py-2 rounded w-full"
//   required
// >
//   <option value="">Select Specialization</option>                                                               
//   <option value="Cardiologist">Cardiologist</option>
//   <option value="Dermatologist">Dermatologist</option>
//   <option value="General Physician">General Physician</option>
//   <option value="Gynecologist">Gynecologist</option>
//   <option value="Neurologist">Neurologist</option>
//   <option value="Orthopedic">Orthopedic</option>
//   <option value="Pediatrician">Pediatrician</option>
//   <option value="Psychiatrist">Psychiatrist</option>
//   <option value="ENT">ENT Specialist</option>
//   <option value="Oncologist">Oncologist</option>
//   <option value="Urologist">Urologist</option>
// </select>

//         <select name="clinicId" value={formData.clinicId} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" required>
//           <option value="">Select Clinic</option>
//           {clinics.map((clinic) => (
//             <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
//           ))}
//         </select>

//         {/* <input type="url" name="videoCallLink" value={formData.videoCallLink} onChange={handleInputChange} placeholder="Video Call Link (Zoom/Meet)" className="border px-3 py-2 rounded w-full" /> */}

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Available Days:</label>
//           <div className="flex flex-wrap gap-2">
//             {daysOfWeek.map((day) => (
//               <label key={day} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.availability.days.includes(day)}
//                   onChange={() => handleDayToggle(day)}
//                 />
//                 {day}
//               </label>
//             ))}
//           </div>
//         </div>





// <div>
//   <label className="block mb-1 font-medium text-gray-700">Profile Image:</label>
//   <input
//     type="file"
//     name="profileImage"
//     accept="image/*"
//     onChange={(e) => setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }))}
//     className="w-full border px-3 py-2 rounded"
//     required  
//   />
// </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <input type="time" name="availability.from" value={formData.availability.from} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="From" />
//           <input type="time" name="availability.to" value={formData.availability.to} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" placeholder="To" />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Register</button>
//       </form>
//     </div>
//   );
// };

// export default DoctorRegister;

































import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: 'male',
    age: '',
    specialization: '',
    clinicId: '',
    availability: {
      days: [],
      from: '',
      to: '',
    },
    profileImage: null,
  });

  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clinics');
        setClinics(res.data);
      } catch (err) {
        toast.error('Failed to fetch clinics');
      }
    };

    fetchClinics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('availability.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter((d) => d !== day)
          : [...prev.availability.days, day],
      },
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'availability') {
          data.append('availability', JSON.stringify(value));
        } else if (key === 'profileImage') {
          data.append('profileImage', value);
        } else {
          data.append(key, value);
        }
      });

      await axios.post('http://localhost:5000/api/doctors/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Doctor registered successfully');

      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        gender: 'male',
        age: '',
        specialization: '',
        clinicId: '',
        availability: {
          days: [],
          from: '',
          to: '',
        },
        profileImage: null,
      });
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Registration failed');
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Doctor Registration</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="border px-3 py-2 rounded w-full" required />
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border px-3 py-2 rounded w-full" required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className="border px-3 py-2 rounded w-full" required />
          <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="border px-3 py-2 rounded w-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select name="gender" value={formData.gender} onChange={handleInputChange} className="border px-3 py-2 rounded w-full">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Age" className="border px-3 py-2 rounded w-full" />
        </div>

        <select
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full"
          required
        >
          <option value="">Select Specialization</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="General Physician">General Physician</option>
          <option value="Gynecologist">Gynecologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="ENT">ENT Specialist</option>
          <option value="Oncologist">Oncologist</option>
          <option value="Urologist">Urologist</option>
        </select>

        <select name="clinicId" value={formData.clinicId} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" required>
          <option value="">Select Clinic</option>
          {clinics.map((clinic) => (
            <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
          ))}
        </select>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Available Days:</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.availability.days.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Profile Image:</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input type="time" name="availability.from" value={formData.availability.from} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" />
          <input type="time" name="availability.to" value={formData.availability.to} onChange={handleInputChange} className="border px-3 py-2 rounded w-full" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Register</button>
      </form>
    </div>
  );
};

export default DoctorRegister;
