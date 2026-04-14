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

      if (user.role === "user") navigate("/");
      else if (user.role === "seller") navigate("/seller-dashboard");
      else if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── Top Nav Bar (Amazon/Flipkart style) ── */}
      {/* <header className="bg-green-700 px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl font-extrabold tracking-tight">🌱 PlantStore</span>
        </div>
        <div className="flex-1 hidden sm:flex items-center bg-white rounded overflow-hidden max-w-xl">
          <input
            type="text"
            placeholder="Search plants, pots, seeds..."
            className="flex-1 px-4 py-2 text-sm text-gray-600 outline-none"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-sm font-bold text-gray-900 transition">
            🔍
          </button>
        </div>
        <div className="ml-auto text-white text-sm font-medium hidden sm:block">
          🛒 Cart
        </div>
      </header> */}

      {/* ── Main Content ── */}
      <main className="flex-1 flex items-start justify-center px-4 py-8 gap-6">

        {/* ── Login Card ── */}
        <div className="w-full max-w-xl bg-white border border-gray-300 rounded p-6 shadow-sm">

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">Log in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleOnchange}
                required
                className="w-full border border-gray-400 rounded px-3 py-2 text-sm text-gray-800 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={handleOnchange}
                  required
                  className="w-full border border-gray-400 rounded px-3 py-2 pr-10 text-sm text-gray-800 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                />
                <span
                  className="absolute right-3 top-2.5 text-lg text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
              <p className="text-xs text-blue-600 hover:text-orange-600 cursor-pointer mt-1">
                Forgot your password?
              </p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Sign in as
              </label>
              <select
                name="role"
                value={data.role}
                onChange={handleOnchange}
                required
                className="w-full border border-gray-400 rounded px-3 py-2 text-sm text-gray-700 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition bg-white"
              >
                <option value="">Select Role</option>
                <option value="user">Customer</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-green-600  text-gray-900 font-semibold text-sm py-2.5 rounded transition shadow-sm border border-yellow-500"
            >
              Continue
            </button>
          </form>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            By continuing, you agree to PlantStore's{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span>{" "}
            and{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
          </p>

          {/* Divider */}
          <div className="flex items-center my-5 gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">New to PlantStore?</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign up */}
          <Link to="/signup">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm py-2.5 rounded border border-gray-400 transition shadow-sm">
              Create your EcoEden account
            </button>
          </Link>
        </div>

        {/* ── Side Panel (desktop only) ── */}
        <div className="hidden lg:flex flex-col justify-center gap-6 w-64 pt-2">
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
        </div>

      </main>

     
    </div>
  );
};

export default Login;