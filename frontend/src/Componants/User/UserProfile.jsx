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
      navigate('/login'); // Redirect to login if token is missing
    }
  }, [userId, token]);  

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("Sending Token:", token); // Debugging
  
    if (!token) {
      console.error(" No token found, redirecting to login...");
      navigate('/login');
      return;
    }
  
    try {
      const response = await fetch(`http://13.201.26.192:5000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
      });
  
      const data = await response.json();
      console.log("Response Status:", response.status);
      console.log(" Response Data:", data);
  
      if (response.status === 401) {
        console.error(" Unauthorized! Token may be expired. Logging out...");
        handleLogout();
      } else if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user profile");
      }
  
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
    return <p className="text-center text-gray-500">Loading user details...</p>;
  }

  return (
    <section className="min-h-50vh  bg-[url('/main_page_img/aboutpage.jpg')] bg-cover bg-center py-16 px-6 md:px-20 select-none cursor-default">
      <div className="max-w-md mx-auto mt-12 p-7 bg-white h-20xl rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={userData?.image || defaultAvatar}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-500 mb-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
          <h1 className="text-2xl font-bold mb-2">
            {userData?.firstName} {userData?.lastName}
          </h1>
          <p className="text-gray-600 mb-4">{userData?.email}</p>
          <p className="text-gray-600 mb-4">{userData?.location}</p>

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-secondary hover:bg-green-700 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
