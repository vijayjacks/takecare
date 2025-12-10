// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // ✅ Yup validation schema
// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().required("Password is required"),
// });

// export default function LabLoginForm() {
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // ✅ Handle login submit
//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/labs/login", data);
//       const { token, lab } = res.data;

//       // Store token and user info
//       localStorage.setItem("labToken", token);
//       localStorage.setItem("labInfo", JSON.stringify(lab));

//       toast.success("Login successful!");

//       // Navigate to lab dashboard (adjust path if needed)
//       navigate("/LabDashboard");
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Login failed";
//       toast.error(errorMsg);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-6 text-center">Lab Login</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         {/* Email */}
//         <div>
//           <label className="block font-semibold mb-1">Email</label>
//           <input
//             type="email"
//             {...register("email")}
//             className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block font-semibold mb-1">Password</label>
//           <input
//             type="password"
//             {...register("password")}
//             className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//         >
//           {isSubmitting ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }






import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LabLoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/labs/login", data);

      const { token, lab } = res.data;

      localStorage.setItem("labToken", token);
      localStorage.setItem("labInfo", JSON.stringify(lab));

      toast.success("Login successful!");
      navigate("/LabBooking");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6 text-center">Lab Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
