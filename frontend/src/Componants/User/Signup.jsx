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

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50 px-4 py-8">
      <div className="w-full max-w-2xl   bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6 mx-auto rounded-full overflow-hidden w-24 h-24 shadow-md relative">
          <img src={data.image || profileImg} alt="Profile" className='w-full h-full object-cover' />
          <label htmlFor='profileImage'>
            <div className="absolute bottom-0 h-1/3 bg-primary bg-opacity-80 w-full flex justify-center items-center cursor-pointer">
              <p className='text-sm text-white'>Upload</p>
            </div>
            <input type="file" id="profileImage" accept='image/*' className='hidden' onChange={handleUploadProfileImg} />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input type="text" name="firstName" placeholder='First Name' className='rounded-full p-2 border' value={data.firstName} onChange={handleOnChange} />
            {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}

            <input type="text" name="lastName" placeholder='Last Name' className='rounded-full p-2 border' value={data.lastName} onChange={handleOnChange} />

            <input type="email" name='email' placeholder='Enter Email' className='rounded-full p-2 border' value={data.email} onChange={handleOnChange} />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

            <div className="relative">
              <input type={showPassword ? "text" : "password"} name='password' placeholder='Password' className='rounded-full p-2 border w-full pr-10' value={data.password} onChange={handleOnChange} />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-xl cursor-pointer">{showPassword ? <BiHide /> : <BiShow />}</span>
            </div>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' placeholder='Confirm Password' className='rounded-full p-2 border w-full pr-10' value={data.confirmPassword} onChange={handleOnChange} />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-xl cursor-pointer">{showConfirmPassword ? <BiHide /> : <BiShow />}</span>
            </div>
            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}

            <input type="text" name="location" placeholder='Location' className='rounded-full p-2 border' value={data.location} onChange={handleOnChange} />

            <button type="submit" className='bg-primary text-white py-2 rounded-full mt-2' disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </form>

        <p className='mt-4 text-sm text-center'>
          Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
