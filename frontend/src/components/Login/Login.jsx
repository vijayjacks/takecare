// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const PatientLoginForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         email: '',
//         password: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post('http://localhost:5000/api/patients/login', formData);
//             toast.success('Login successful!');
//             console.log('Logged in patient:', res.data);
//             // Store token/localStorage or redirect if needed
//         } catch (err) {
//             toast.error(err?.response?.data?.message || 'Login failed');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto p-4 mt-10">
//             <h2 className="text-2xl font-bold mb-6 text-center">Patient Login</h2>

//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Full Name"
//                     className="w-full border px-3 py-2 rounded"
//                     required
//                 />

//                 <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="Phone Number (optional)"
//                     className="w-full border px-3 py-2 rounded"
//                 />

//                 <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email (optional)"
//                     className="w-full border px-3 py-2 rounded"
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="password (optional)"
//                     className="w-full border px-3 py-2 rounded"
//                 />
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//                 >
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default PatientLoginForm;



import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // ✅ 1. Import useNavigate

const PatientLoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate(); // ✅ 2. Create navigate instance

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/patients/login', formData);
            toast.success('Login successful!');
            console.log('Logged in patient:', res.data);

            // Store token if needed
            localStorage.setItem('patientToken', res.data.token);
            localStorage.setItem("patientId",res.data.foundPatient._id)

            // ✅ 3. Navigate to home page
            navigate('/');
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Patient Login</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    className="w-full border px-3 py-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email (optional)"
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default PatientLoginForm;
