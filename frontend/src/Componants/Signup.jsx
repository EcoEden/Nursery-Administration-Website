import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from "react-icons/bi";
import process from 'process';
import { ImageToBase64 } from '../utility/ImageToBase64';
import profileImg from "/All_Icons/profile.gif";
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });

  const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProfileImg = async (e) => {
    const imageData = await ImageToBase64(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: imageData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, email, password, confirmPassword } = data;

    if (!firstName || !email || !password || !confirmPassword) {
      toast.error('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match!');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataRes = await response.json();
      toast.success(dataRes.message);

      if (dataRes.alert) {
        setTimeout(() => {
          navigate("/login");  // Redirect after success
        }); // Delay for toast visibility
      }

    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <div className="w-1/3 min-h-[350px] p-8 mx-auto mt-4 bg-gray-100 select-none cursor-default">
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
            <input type="text" name="lastName" placeholder='Last Name' className='rounded-full p-2' value={data.lastName} onChange={handleOnChange} />
            <input type="email" name='email' placeholder='Enter Email' className='rounded-full p-2' value={data.email} onChange={handleOnChange} />

            <div className="flex relative">
              <input type={showPassword ? "text" : "password"} name='password' placeholder='Enter Password' className='rounded-full w-full p-2' value={data.password} onChange={handleOnChange} />
              <span className='text-xl absolute right-3 top-2 p-1 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <div className="flex relative">
              <input type={showConfirmPassword ? "text" : "password"} name='confirmPassword' placeholder='Confirm Password' className='rounded-full w-full p-2' value={data.confirmPassword} onChange={handleOnChange} />
              <span className='text-xl absolute right-3 top-2 p-1 cursor-pointer' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button className='flex justify-center mx-auto rounded-full p-2 bg-secondary w-40 my-3 px-4 text-xl'>Sign Up</button>
          </div>
        </form>

        <div className="flex justify-center gap-2">
          <p>Already have an account?</p>
          <span><Link to="/login" className="text-secondary">Login</Link></span>
        </div>
      </div>
    </>
  );
};

export default Signup;
