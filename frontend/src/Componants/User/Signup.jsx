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
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

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

  const baseUrl = import.meta.env.REACT_APP_API_URL || "http://13.201.26.192:5000";

  const validate = () => {
    let newErrors = {};
    if (!data.firstName) newErrors.firstName = "First name is required";
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
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
      toast.error("Invalid file type. Upload JPG, PNG, or WEBP.");
      return;
    }

    const imageData = await ImageToBase64(file);
    setData((prev) => ({ ...prev, image: imageData }));
  };

  const handleSendOtp = async () => {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error("Enter a valid email first");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setServerOtp(result.otp); // store OTP for checking
        toast.success("OTP sent to email");
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === serverOtp) {
      toast.success("OTP verified");
      setEmailVerified(true);
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!emailVerified) {
      toast.error("Please verify your email first!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      const dataRes = await response.json();
      if (!response.ok) throw new Error(dataRes.message);

      toast.success(dataRes.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message || 'Signup failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className=" bg-green-50 py-5 px-16 md:px-20 select-none">
      <div className="w-1/3 min-w-[85vh] min-h-[400px] p-8 mx-auto mt-4 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-4 mx-auto rounded-full overflow-hidden w-20 h-20 drop-shadow-md shadow-md relative">
          <img src={data.image || profileImg} alt="Profile" className='w-full h-full' />
          <label htmlFor='profileImage'>
            <div className="absolute bottom-0 h-1/3 bg-primary bg-opacity-80 w-full flex justify-center items-center cursor-pointer">
              <p className='text-sm p-1 text-white'>Upload</p>
            </div>
            <input type="file" id="profileImage" accept='image/*' className='hidden' onChange={handleUploadProfileImg} />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="gap-6 flex flex-col mx-auto">
            <input type="text" name="firstName" placeholder='First Name' className='rounded-full p-2 border' value={data.firstName} onChange={handleOnChange} />
            {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}

            <input type="text" name="lastName" placeholder='Last Name' className='rounded-full p-2 border' value={data.lastName} onChange={handleOnChange} />

            <input type="email" name='email' placeholder='Enter Email' className='rounded-full p-2 border' value={data.email} onChange={handleOnChange} />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

            <button
              type="button"
              onClick={handleSendOtp}
              className='bg-primary text-white rounded-full px-3 py-1 w-fit mt-1 text-sm'
              disabled={otpSent}
            >
              {otpSent ? "OTP Sent" : "Send OTP"}
            </button>

            {otpSent && !emailVerified && (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='rounded-full p-2 border mt-2'
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className='bg-green-500 text-white rounded-full px-3 py-1 w-fit mt-2 text-sm'
                >
                  Verify OTP
                </button>
              </div>
            )}
            {emailVerified && <p className='text-green-600 text-sm'>Email verified ✅</p>}

            <select name="role" className='rounded-full p-2 border' value={data.role} onChange={handleOnChange}>
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>

            <input type="location" name='location' placeholder='Enter location' className='rounded-full p-2 border' value={data.location} onChange={handleOnChange} />
            {errors.location && <p className='text-red-500 text-sm'>{errors.location}</p>}

            <div className="flex relative">
              <input type={showPassword ? "text" : "password"} name='password' placeholder='Enter Password' className='rounded-full w-full p-2 border' value={data.password} onChange={handleOnChange} />
              <span className='text-xl absolute right-3 top-2 p-1 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}

            <div className="flex relative">
              <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' placeholder='Confirm Password' className='rounded-full w-full p-2 border' value={data.confirmPassword} onChange={handleOnChange} />
              <span className='text-xl absolute right-3 top-2 p-1 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}

            <button className='flex justify-center mx-auto rounded-full p-2 bg-secondary w-40 my-3 px-4 text-xl' disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="flex justify-center gap-2">
          <p>Already have an account?</p>
          <span><Link to="/login" className="text-secondary">Login</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
