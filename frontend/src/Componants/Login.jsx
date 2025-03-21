import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setUser } from "../Redux/userSlice"; // ✅ Import the correct Redux action

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [data, setData] = useState({ email: "", password: "" });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
  
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }
  
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("API Response:", result); // Debugging log
  
      if (!response.ok) {
        toast.error(result.message || "Login failed.");
        return;
      }
  
      if (!result.user || !result.token) {
        toast.error("Invalid response from server.");
        return;
      }
  
      // ✅ Store token in localStorage
      localStorage.setItem("token", result.token);

      // ✅ Dispatch user data to Redux store
      dispatch(setUser({ user: result.user, token: result.token })); 

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="w-1/3 min-h-[350px] p-8 mx-auto mt-4 bg-gray-100">
      <div className="mb-4">
        <img src="/All_Icons/profile.gif" alt="Profile" className="mx-auto w-20 h-20 rounded-full opacity-60" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="gap-6 flex flex-col mx-auto">
          <input type="email" name="email" placeholder="Enter Email" className="rounded-full p-2" value={data.email} onChange={handleOnchange} />
          <div className="flex relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter Password" className="rounded-full p-2 w-full" value={data.password} onChange={handleOnchange} />
            <span className="text-xl absolute right-2 top-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button type="submit" className="rounded-full p-2 bg-secondary w-40 px-4 mx-auto text-xl my-3">Login</button>
        </div>
      </form>

      <div className="flex gap-2 justify-center">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
