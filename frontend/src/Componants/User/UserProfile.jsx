// src/pages/UserProfile.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/userSlice';
import defaultAvatar from '/main_page_img/default_profile_img.png';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      navigate('/login');
    }
  }, [userId, token]);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) { navigate('/login'); return; }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 401) { handleLogout(); return; }
      if (!response.ok) throw new Error(data.message || "Failed to fetch user profile");
      setUserData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate('/login');
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
       
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

    
      {/* ── Breadcrumb ── */}
      <div className="max-w-5xl mx-auto w-full px-4 pt-3 pb-1 text-xs text-gray-500">
        Home &rsaquo; <span className="text-green-700 font-medium">My Account</span>
      </div>

      {/* ── Main Layout ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-4 flex gap-4 items-start">

        {/* ── Left: Profile Card ── */}
        <div className="w-full sm:w-72 shrink-0 bg-white border border-gray-200 rounded shadow-sm">

          {/* Avatar + Name */}
          <div className="flex flex-col items-center py-6 px-4 border-b border-gray-100">
            <div className="relative mb-3">
              <img
                src={userData?.image || defaultAvatar}
                alt="User Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-green-500 shadow"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatar; }}
              />
              <span className="absolute bottom-1 right-1 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white" title="Active" />
            </div>
            <h1 className="text-lg font-bold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h1>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full mt-1 capitalize">
              {userData.role || "Customer"}
            </span>
          </div>

          {/* Quick Nav */}
          <ul className="py-2 text-sm text-gray-700">
            {[
              { icon: "📦", label: "My Orders" },
              { icon: "❤️", label: "Wishlist" },
              { icon: "📍", label: "Saved Addresses" },
              { icon: "⚙️", label: "Account Settings" },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="px-4 pb-4 pt-2">
            <button
              onClick={handleLogout}
              className="w-full bg-secondary hover:bg-green-700 text-white font-semibold text-sm py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ── Right: Details Panel ── */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {/* Personal Info Card */}
          <div className="bg-white border border-gray-200 rounded shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">Personal Information</h2>
              <button className="text-xs text-blue-600 hover:underline font-medium">Edit</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", value: userData.firstName },
                { label: "Last Name", value: userData.lastName },
                { label: "Email Address", value: userData.email },
                { label: "Location", value: userData.location || "—" },
                { label: "Role", value: userData.role || "Customer" },
                { label: "Member Since", value: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }) : "—" },
              ].map((field) => (
                <div key={field.label}>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{field.label}</p>
                  <p className="text-sm text-gray-800 font-medium capitalize">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Summary */}
          <div className="bg-white border border-gray-200 rounded shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">My Orders</h2>
              <button className="text-xs text-blue-600 hover:underline font-medium">View All</button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Active", count: "2", color: "text-blue-600" },
                { label: "Delivered", count: "14", color: "text-green-600" },
                { label: "Cancelled", count: "1", color: "text-red-500" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded p-3 border border-gray-100">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-sm font-bold text-gray-800">🎁 Exclusive Member Offer</p>
              <p className="text-xs text-gray-600 mt-0.5">Use code <span className="font-bold text-green-700">GREEN10</span> for 10% off your next order!</p>
            </div>
            <button className="shrink-0 text-xs bg-yellow-400 hover:bg-yellow-500 font-semibold text-gray-900 px-3 py-1.5 rounded transition">
              Shop Now
            </button>
          </div>

        </div>
      </main>

   

    </div>
  );
};

export default UserProfile;