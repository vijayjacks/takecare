// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // ✅ Validation Schema
// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Min 6 characters").required("Password is required"),
//   phone: yup.string().required("Phone is required"),
//   address: yup.string().required("Address is required"),
// //   clinicId: yup.string().required("Clinic ID is required"),
// });

// export default function LabRegister() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async data => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/labs/register", data);
//       toast.success("Lab registered successfully");
//       reset();
//       navigate("/labs/dashboard"); // or another route
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
//       <h2 className="text-xl font-bold mb-4">Register Lab</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block">Name</label>
//           <input {...register("name")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.name?.message}</p>
//         </div>

//         <div>
//           <label className="block">Email</label>
//           <input {...register("email")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.email?.message}</p>
//         </div>

//         <div>
//           <label className="block">Password</label>
//           <input type="password" {...register("password")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.password?.message}</p>
//         </div>

//         <div>
//           <label className="block">Phone</label>
//           <input {...register("phone")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.phone?.message}</p>
//         </div>

//         <div>
//           <label className="block">Address</label>
//           <input {...register("address")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.address?.message}</p>
//         </div>

//         <div>
//           <label className="block">Clinic ID</label>
//           <input {...register("clinicId")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.clinicId?.message}</p>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {isSubmitting ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
//   phone: yup.string().required("Phone is required"),
//   address: yup.string().required("Address is required"),
//   clinicId: yup.string().required("Please select a clinic"),
// });

// export default function LabRegister() {
//   const [clinics, setClinics] = useState([]);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting }
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/clinics/all")
//       .then(res => setClinics(res.data))
//       .catch(err => {
//         console.error("Failed to fetch clinics", err);
//         toast.error("Failed to load clinics");
//       });
//   }, []);

//   const onSubmit = async data => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/labs/register", data);
//       toast.success("Lab registered successfully");
//       reset();
//       navigate("/labs/dashboard"); // Update route as needed
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
//       <h2 className="text-xl font-bold mb-4">Register Lab</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block">Name</label>
//           <input {...register("name")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.name?.message}</p>
//         </div>

//         <div>
//           <label className="block">Email</label>
//           <input {...register("email")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.email?.message}</p>
//         </div>

//         <div>
//           <label className="block">Password</label>
//           <input type="password" {...register("password")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.password?.message}</p>
//         </div>

//         <div>
//           <label className="block">Phone</label>
//           <input {...register("phone")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.phone?.message}</p>
//         </div>

//         <div>
//           <label className="block">Address</label>
//           <input {...register("address")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.address?.message}</p>
//         </div>

//         <div>
//           <label className="block">Clinic</label>
//           <select {...register("clinicId")} className="w-full border p-2 rounded">
//             <option value="">Select a clinic</option>
//             {clinics.map(clinic => (
//               <option key={clinic._id} value={clinic._id}>
//                 {clinic.name}
//               </option>
//             ))}
//           </select>
//           <p className="text-red-500 text-sm">{errors.clinicId?.message}</p>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {isSubmitting ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

















// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // ✅ Yup Validation Schema
// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   phone: yup
//     .string()
//     .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
//     .required("Phone is required"),
//   address: yup.string().required("Address is required"),
//   clinicId: yup.string().required("Please select a clinic"),
// });

// export default function LabRegister() {
//   const [clinics, setClinics] = useState([]);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // ✅ Fetch clinics
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/clinics")
//       .then((res) => {
//         setClinics(res.data || []);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch clinics", err);
//         toast.error("Failed to load clinics");
//       });
//   }, []);

//   // ✅ On form submit
//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/labs/register", data);
//       toast.success("Lab registered successfully! Awaiting approval.");
//       reset();
//       navigate("/Lablogin"); // 🔁 Change this to your actual route
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4 text-center">Lab Registration</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Name */}
//         <div>
//           <label className="block mb-1 font-medium">Name</label>
//           <input {...register("name")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.name?.message}</p>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input type="email" {...register("email")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.email?.message}</p>
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block mb-1 font-medium">Password</label>
//           <input type="password" {...register("password")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.password?.message}</p>
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block mb-1 font-medium">Phone</label>
//           <input type="tel" {...register("phone")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.phone?.message}</p>
//         </div>

//         {/* Address */}
//         <div>
//           <label className="block mb-1 font-medium">Address</label>
//           <input {...register("address")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.address?.message}</p>
//         </div>

//         {/* Clinic Select */}
//         <div>
//           <label className="block mb-1 font-medium">Select Clinic</label>
//           <select {...register("clinicId")} className="w-full border p-2 rounded">
//             <option value="">-- Select Clinic --</option>
//             {clinics.map((clinic) => (
//               <option key={clinic._id} value={clinic._id}>
//                 {clinic.name}
//               </option>
//             ))}
//           </select>
//           <p className="text-red-500 text-sm">{errors.clinicId?.message}</p>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {isSubmitting ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // ✅ Yup Validation Schema
// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   phone: yup
//     .string()
//     .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
//     .required("Phone is required"),
//   address: yup.string().required("Address is required"),
//   clinicId: yup.string().required("Please select a clinic"),
//   availableTests: yup
//     .array()
//     .of(
//       yup.object().shape({
//         name: yup.string().required("Test name is required"),
//         cost: yup
//           .number()
//           .typeError("Cost must be a number")
//           .positive("Cost must be positive")
//           .required("Cost is required"),
//         department: yup.string().required("Department is required"),
//         description: yup.string().required("Description is required"),
//       })
//     )
//     .min(1, "At least one test is required"),
// });

// export default function LabRegister() {
//   const [clinics, setClinics] = useState([]);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       availableTests: [{ name: "", cost: "", department: "", description: "" }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "availableTests",
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/clinics")
//       .then((res) => setClinics(res.data || []))
//       .catch((err) => {
//         console.error("Failed to fetch clinics", err);
//         toast.error("Failed to load clinics");
//       });
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         ...data,
//         availableTests: JSON.stringify(data.availableTests),
//       };

//       await axios.post("http://localhost:5000/api/labs/register", payload);
//       toast.success("Lab registered successfully! Awaiting approval.");
//       reset();
//       navigate("/Lablogin");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4 text-center">Lab Registration</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* BASIC INFO */}
//         {["name", "email", "password", "phone", "address"].map((field) => (
//           <div key={field}>
//             <label className="block mb-1 font-medium capitalize">{field}</label>
//             <input
//               type={field === "email" ? "email" : field === "password" ? "password" : "text"}
//               {...register(field)}
//               className="w-full border p-2 rounded"
//             />
//             <p className="text-red-500 text-sm">{errors[field]?.message}</p>
//           </div>
//         ))}

//         {/* Clinic Select */}
//         <div>
//           <label className="block mb-1 font-medium">Select Clinic</label>
//           <select {...register("clinicId")} className="w-full border p-2 rounded">
//             <option value="">-- Select Clinic --</option>
//             {clinics.map((clinic) => (
//               <option key={clinic._id} value={clinic._id}>
//                 {clinic.name}
//               </option>
//             ))}
//           </select>
//           <p className="text-red-500 text-sm">{errors.clinicId?.message}</p>
//         </div>

//         <hr className="my-4" />
//         <h3 className="text-lg font-semibold">Available Tests</h3>

//         {/* TEST FIELDS */}
//         {fields.map((test, index) => (
//           <div key={test.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded mb-2">
//             <div>
//               <label className="block text-sm font-medium">Test Name</label>
//               <input {...register(`availableTests.${index}.name`)} className="border p-2 w-full rounded" />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.name?.message}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Cost (₹)</label>
//               <input
//                 type="number"
//                 {...register(`availableTests.${index}.cost`)}
//                 className="border p-2 w-full rounded"
//               />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.cost?.message}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Department</label>
//               <input {...register(`availableTests.${index}.department`)} className="border p-2 w-full rounded" />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.department?.message}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Description</label>
//               <input {...register(`availableTests.${index}.description`)} className="border p-2 w-full rounded" />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.description?.message}</p>
//             </div>

//             <div className="col-span-full text-right">
//               <button
//                 type="button"
//                 onClick={() => remove(index)}
//                 className="text-red-600 text-sm hover:underline"
//               >
//                 Remove Test
//               </button>
//             </div>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={() =>
//             append({ name: "", cost: "", department: "", description: "" })
//           }
//           className="text-blue-600 text-sm"
//         >
//           + Add Another Test
//         </button>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {isSubmitting ? "Registering..." : "Register Lab"}
//         </button>
//       </form>
//     </div>
//   );
// }


// fiinnalll

// import React, { useEffect, useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone is required"),
//   address: yup.string().required("Address is required"),
//   clinicId: yup.string().required("Please select a clinic"),
//   availableTests: yup
//     .array()
//     .of(
//       yup.object().shape({
//         name: yup.string().required("Test name is required"),
//         cost: yup.number().typeError("Cost must be a number").positive("Cost must be positive").required("Cost is required"),
//         department: yup.string().required("Department is required"),
//         description: yup.string().required("Description is required"),
//       })
//     )
//     .min(1, "At least one test is required"),
// });

// export default function LabRegister() {
//   const [clinics, setClinics] = useState([]);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       availableTests: [{ name: "", cost: "", department: "", description: "" }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "availableTests",
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/clinics")
//       .then((res) => setClinics(res.data))
//       .catch(() => toast.error("Failed to load clinics"));
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       const payload = {
//         ...data,
//         availableTests: JSON.stringify(data.availableTests), // stringify tests for backend
//       };

//       await axios.post("http://localhost:5000/api/labs/register", payload);
//       toast.success("Lab registered successfully! Awaiting approval.");
//       reset();
//       navigate("/Lablogin");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4 text-center">Lab Registration</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
//         {/* Basic Fields */}
//         {["name", "email", "password", "phone", "address"].map((field) => (
//           <div key={field}>
//             <label className="block mb-1 font-medium capitalize" htmlFor={field}>
//               {field}
//             </label>
//             <input
//               id={field}
//               type={field === "email" ? "email" : field === "password" ? "password" : "text"}
//               {...register(field)}
//               className={`w-full border p-2 rounded ${errors[field] ? "border-red-500" : "border-gray-300"}`}
//               autoComplete={field === "password" ? "new-password" : "off"}
//             />
//             <p className="text-red-500 text-sm">{errors[field]?.message}</p>
//           </div>
//         ))}

//         {/* Clinic Select */}
//         <div>
//           <label htmlFor="clinicId" className="block mb-1 font-medium">
//             Select Clinic
//           </label>
//           <select
//             id="clinicId"
//             {...register("clinicId")}
//             className={`w-full border p-2 rounded ${errors.clinicId ? "border-red-500" : "border-gray-300"}`}
//           >
//             <option value="">-- Select Clinic --</option>
//             {clinics.map((clinic) => (
//               <option key={clinic._id} value={clinic._id}>
//                 {clinic.name}
//               </option>
//             ))}
//           </select>
//           <p className="text-red-500 text-sm">{errors.clinicId?.message}</p>
//         </div>

//         <hr className="my-4" />
//         <h3 className="text-lg font-semibold">Available Tests</h3>

//         {/* Available Tests */}
//         {fields.map((test, index) => (
//           <div key={test.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded mb-2">
//             <div>
//               <label className="block text-sm font-medium" htmlFor={`availableTests.${index}.name`}>
//                 Test Name
//               </label>
//               <input
//                 id={`availableTests.${index}.name`}
//                 {...register(`availableTests.${index}.name`)}
//                 className={`border p-2 w-full rounded ${
//                   errors?.availableTests?.[index]?.name ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.name?.message}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium" htmlFor={`availableTests.${index}.cost`}>
//                 Cost (₹)
//               </label>
//               <input
//                 id={`availableTests.${index}.cost`}
//                 type="number"
//                 {...register(`availableTests.${index}.cost`)}
//                 className={`border p-2 w-full rounded ${
//                   errors?.availableTests?.[index]?.cost ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.cost?.message}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium" htmlFor={`availableTests.${index}.department`}>
//                 Department
//               </label>
//               <input
//                 id={`availableTests.${index}.department`}
//                 {...register(`availableTests.${index}.department`)}
//                 className={`border p-2 w-full rounded ${
//                   errors?.availableTests?.[index]?.department ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.department?.message}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium" htmlFor={`availableTests.${index}.description`}>
//                 Description
//               </label>
//               <input
//                 id={`availableTests.${index}.description`}
//                 {...register(`availableTests.${index}.description`)}
//                 className={`border p-2 w-full rounded ${
//                   errors?.availableTests?.[index]?.description ? "border-red-500" : "border-gray-300"
//                 }`}
//               />
//               <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.description?.message}</p>
//             </div>

//             <div className="col-span-full text-right">
//               <button
//                 type="button"
//                 onClick={() => remove(index)}
//                 className="text-red-600 text-sm hover:underline"
//                 aria-label={`Remove test ${index + 1}`}
//               >
//                 Remove Test
//               </button>
//             </div>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={() => append({ name: "", cost: "", department: "", description: "" })}
//           className="text-blue-600 text-sm"
//         >
//           + Add Another Test
//         </button>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//         >
//           {isSubmitting ? "Registering..." : "Register Lab"}
//         </button>
//       </form>
//     </div>
//   );
// }



// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";

// // ✅ Yup validation schema
// const schema = yup.object().shape({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone is required"),
//   address: yup.string().required("Address is required"),
//   clinicId: yup.string().required("Clinic ID is missing or invalid"),
// });

// export default function LabRegister() {
//   const { clinicId } = useParams(); // ✅ Get clinic ID from route
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // ✅ Set clinicId from route
//   useEffect(() => {
//     if (clinicId) {
//       setValue("clinicId", clinicId);
//     } else {
//       toast.error("No clinic selected. Please go back and choose a clinic.");
//     }
//   }, [clinicId, setValue]);

//   // ✅ On form submit
//   const onSubmit = async (data) => {
//     try {
//       await axios.post("http://localhost:5000/api/labs/register", data);
//       toast.success("Lab registered successfully! Awaiting approval.");
//       reset();
//       setTimeout(() => navigate("/Lablogin"), 2000); // 🔁 Adjust route if needed
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4 text-center">Lab Registration</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Name */}
//         <div>
//           <label className="block mb-1 font-medium">Name</label>
//           <input {...register("name")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.name?.message}</p>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input type="email" {...register("email")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.email?.message}</p>
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block mb-1 font-medium">Password</label>
//           <input type="password" {...register("password")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.password?.message}</p>
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block mb-1 font-medium">Phone</label>
//           <input type="tel" {...register("phone")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.phone?.message}</p>
//         </div>

//         {/* Address */}
//         <div>
//           <label className="block mb-1 font-medium">Address</label>
//           <input {...register("address")} className="w-full border p-2 rounded" />
//           <p className="text-red-500 text-sm">{errors.address?.message}</p>
//         </div>

//         {/* Hidden Clinic ID */}
//         <input type="hidden" {...register("clinicId")} />
//         {errors.clinicId && <p className="text-red-500 text-sm">{errors.clinicId.message}</p>}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {isSubmitting ? "Registering..." : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone is required"),
  address: yup.string().required("Address is required"),
  clinicId: yup.string().required("Clinic is required"),
  availableTests: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Test name is required"),
        cost: yup.number().typeError("Cost must be a number").positive().required("Cost is required"),
        department: yup.string().required("Department is required"),
        description: yup.string().required("Description is required"),
        normalRange: yup.string().required("Normal range is required"),
      })
    )
    .min(1, "At least one test is required"),
});

export default function LabRegister() {
  const [clinics, setClinics] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      availableTests: [
        { name: "", cost: "", department: "", description: "", normalRange: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availableTests",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/clinics")
      .then((res) => setClinics(res.data))
      .catch(() => toast.error("Failed to load clinics"));
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        availableTests: JSON.stringify(data.availableTests),
      };

      await axios.post("http://localhost:5000/api/labs/register", payload);
      toast.success("Lab registered successfully! Awaiting approval.");
      reset();
      navigate("/Lablogin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4 text-center">Lab Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {["name", "email", "password", "phone", "address"].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium capitalize">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              {...register(field)}
              className={`w-full border p-2 rounded ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm">{errors[field]?.message}</p>
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium">Select Clinic</label>
          <select
            {...register("clinicId")}
            className={`w-full border p-2 rounded ${errors.clinicId ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">-- Select Clinic --</option>
            {clinics.map((clinic) => (
              <option key={clinic._id} value={clinic._id}>
                {clinic.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm">{errors.clinicId?.message}</p>
        </div>

        <h3 className="text-lg font-semibold">Available Tests</h3>

        {fields.map((test, index) => (
          <div key={test.id} className="border p-4 rounded mb-2">
            {["name", "cost", "department", "description", "normalRange"].map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type={field === "cost" ? "number" : "text"}
                  {...register(`availableTests.${index}.${field}`)}
                  className={`w-full border p-2 rounded ${
                    errors?.availableTests?.[index]?.[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <p className="text-red-500 text-sm">{errors?.availableTests?.[index]?.[field]?.message}</p>
              </div>
            ))}

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 text-sm hover:underline"
            >
              Remove Test
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              cost: "",
              department: "",
              description: "",
              normalRange: "",
            })
          }
          className="text-blue-600 text-sm"
        >
          + Add Another Test
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4"
        >
          {isSubmitting ? "Registering..." : "Register Lab"}
        </button>
      </form>
    </div>
  );
}
