// src/pages/Signup.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from "react-icons/bi";
import { ImageToBase64 } from '../../utility/ImageToBase64';
import profileImg from "/All_Icons/profile.gif";
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    image: "",
    location: "",
  });

  const validate = () => {
    let newErrors = {};
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Invalid email format";
    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUploadProfileImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Upload JPG, PNG, or WEBP only");
      return;
    }
    const imageData = await ImageToBase64(file);
    setData((prev) => ({ ...prev, image: imageData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(result.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Signup failed");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full border border-gray-400 rounded px-3 py-2 text-sm text-gray-800 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition bg-white";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">


      {/* ── Main ── */}
      <main className="flex-1 flex items-start justify-center px-4 py-8 gap-6">

        {/* ── Card ── */}
        <div className="w-full max-w-xl bg-white border border-gray-300 rounded shadow-sm p-6">

          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Create account</h2>
          <p className="text-sm text-gray-500 mb-5">Join PlantStore and start shopping</p>

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 shadow">
              <img
                src={data.image || profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <label htmlFor="profileImage" className="absolute bottom-0 w-full h-1/3 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                <span className="text-white text-[10px] font-semibold">Upload</span>
                <input type="file" id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImg} />
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First + Last Name */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                <input type="text" name="firstName" placeholder="First name" value={data.firstName} onChange={handleOnChange} className={inputClass} />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                <input type="text" name="lastName" placeholder="Last name" value={data.lastName} onChange={handleOnChange} className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={data.email} onChange={handleOnChange} className={inputClass} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="At least 6 characters" value={data.password} onChange={handleOnChange} className={inputClass + " pr-10"} />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-lg text-gray-500 cursor-pointer hover:text-gray-700">
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Re-enter Password</label>
              <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm your password" value={data.confirmPassword} onChange={handleOnChange} className={inputClass + " pr-10"} />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-lg text-gray-500 cursor-pointer hover:text-gray-700">
                  {showConfirmPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <input type="text" name="location" placeholder="City, State" value={data.location} onChange={handleOnChange} className={inputClass} />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Register as</label>
              <select name="role" value={data.role} onChange={handleOnChange} className={inputClass}>
                <option value="user">Customer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-green-600 text-white font-semibold text-sm py-2.5 rounded transition shadow-sm border border-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : "Create your PlantStore account"}
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            By creating an account, you agree to EcoEden's{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span>{" "}
            and{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
          </p>

          {/* Divider */}
          <div className="flex items-center my-5 gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">Already have an account?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <Link to="/login">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm py-2.5 rounded border border-gray-400 transition shadow-sm">
              Sign in to EcoEden
            </button>
          </Link>
        </div>

        {/* ── Side Panel ── */}
        <div className="hidden lg:flex flex-col gap-4 w-60 pt-2">
          <div className="bg-white border border-gray-200 rounded p-4 shadow-sm">
            <p className="text-sm font-bold text-gray-700 mb-2">🌿 Why PlantStore?</p>
            <ul className="text-xs text-gray-600 space-y-1.5">
              <li>✅ 1000+ plant varieties</li>
              <li>✅ Free delivery above ₹499</li>
              <li>✅ 7-day easy returns</li>
              <li>✅ Expert care guides included</li>
            </ul>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 shadow-sm">
            <p className="text-sm font-bold text-gray-700 mb-1">🎁 New User Offer</p>
            <p className="text-xs text-gray-600">Use code <span className="font-bold text-green-700">GREEN10</span> for 10% off your first order!</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded p-4 shadow-sm">
            <p className="text-sm font-bold text-gray-700 mb-1">🚚 Fast Delivery</p>
            <p className="text-xs text-gray-600">Get your plants delivered within 2–4 business days, safely packaged.</p>
          </div>
        </div>

      </main>

      

    </div>
  );
};

export default Signup;