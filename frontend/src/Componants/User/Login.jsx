import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setUser } from "../../Redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: "", password: "", role: "" });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = data;
  
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
  
    const result = await response.json();
    console.log("API Response:", result); // Debugging log
  
    if (response.ok) {
      toast.success("Login successful");
  
      // Ensure `_id` and `role` are included in user object
      const user = result.user;
  
      dispatch(setUser({ 
        user,  
        token: result.token 
      }));
  
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", result.token);
  
      // Role-based Redirection
      if (user.role === "user") {
        navigate("/"); // Redirect to Home Page
      } else if (user.role === "seller") {
        navigate("/seller-dashboard"); // Redirect to Seller Dashboard
      } else if (user.role === "admin") {
        navigate("/admin-dashboard"); // Redirect to Admin Dashboard
      } else {
        navigate("/"); // Default to home if role is unknown
      }
    } else {
      toast.error(result.message);
    }
  };
  

  
  

  return (
    <div className=" bg-green-50 py-5 px-16 md:px-20 select-none">
    <div className="w-1/3 min-w-[85vh] min-h-[350px] p-8 mx-auto mt-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4 flex justify-center">
        <img src="/All_Icons/profile.gif" alt="Profile" className="w-20 h-20 rounded-full opacity-80" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="gap-6 flex flex-col mx-auto">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="rounded-full p-2 border border-gray-300 focus:ring focus:ring-secondary outline-none"
            value={data.email}
            onChange={handleOnchange}
          />
          <div className="flex relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              className="rounded-full p-2 border border-gray-300 w-full focus:ring focus:ring-secondary outline-none"
              value={data.password}
              onChange={handleOnchange}
            />
            <span className="text-xl absolute right-2 top-2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          {/* Role Selection */}
          <select
            name="role"
            value={data.role}
            onChange={handleOnchange}
            className="rounded-full p-2 border border-gray-300 focus:ring focus:ring-secondary outline-none"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="rounded-full p-2 bg-secondary w-40 px-4 mx-auto text-xl my-3 text-white hover:bg-secondary-dark transition">
            Login
          </button>
        </div>
      </form>
      <div className="flex gap-2 justify-center">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-secondary font-semibold">Sign Up</Link>
      </div>
    </div>
    </div>
  );
};

export default Login;