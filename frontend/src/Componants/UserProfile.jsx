import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRedux } from '../Redux/userSlice'; // Update the path as per your project
import defaultAvatar from '/main_page_img/default_profile_img.png';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = () => {
    const url = `http://127.0.0.1:5000/users/${userId}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        alert('Failed to load profile. Please try again later.');
      });
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    navigate('/login');
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <section className="min-h-50vh bg-green-50 py-16 px-6 md:px-20 select-none cursor-default">
    <div className="max-w-md mx-auto mt-12 p-7 bg-white h-20xl rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={userData.image || defaultAvatar}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-green-500 mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultAvatar;
          }}
        />
        <h1 className="text-2xl font-bold mb-2">
          {userData.firstName} {userData.lastName}
        </h1>
        <p className="text-gray-600 mb-4">{userData.email}</p>

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
