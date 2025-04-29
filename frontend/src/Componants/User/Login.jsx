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

    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Login successful");
      const user = result.user;

      dispatch(setUser({ user, token: result.token }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", result.token);

      if (user.role === "user") {
        navigate("/");
      } else if (user.role === "seller") {
        navigate("/seller-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="py-8 bg-green-50 flex justify-center px-4">
  <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <div className="mb-6 flex justify-center">
          <img
            src="/All_Icons/profile.gif"
            alt="Profile"
            className="w-20 h-20 rounded-full opacity-80"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-secondary outline-none"
              value={data.email}
              onChange={handleOnchange}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-secondary outline-none"
                value={data.password}
                onChange={handleOnchange}
              />
              <span
                className="text-xl absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <select
              name="role"
              value={data.role}
              onChange={handleOnchange}
              className="w-full rounded-full p-2 border border-gray-300 focus:ring focus:ring-secondary outline-none"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full rounded-full p-2 bg-secondary text-white text-lg font-medium hover:bg-secondary-dark transition"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-secondary font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
